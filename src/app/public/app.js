const url = "http://lvh.me:3000/event/";
var app = angular.module('event.horizon', ['ngMaterial', 'ngMessages', 'ngResource']);

function showSnack(msg) {
    var snackbarContainer = document.querySelector('#snackbar');
    var data = {
        message: msg,
        timeout: 2000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

app.config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
}])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    })
    /**
     * controller for dashboard
     */
    .controller('dash', function ($scope, $http) {
        $scope.points = {
            c: 187,
            e: 190,
            p: 186,
            v: 100
        };
        $scope.points.max = Math.max($scope.points.c, $scope.points.e, $scope.points.p, $scope.points.v);
        $scope.points.total = $scope.points.c + $scope.points.e + $scope.points.p + $scope.points.v;
        console.log($scope.points);
        $http.get(url).then(
            (res) => {
                if (res.data.success) {
                    if (res.data.events.length == 0) document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
                    console.log(res);
                    $scope.data = res.data;
                    $scope.events = res.data.events;
                    setTimeout(() => {
                        $scope.countUp('c', 0, $scope.points.c, 500);
                        $scope.countUp('e', 0, $scope.points.e, 500);
                        $scope.countUp('p', 0, $scope.points.p, 500);
                        $scope.countUp('v', 0, $scope.points.v, 500);
                    }, 1000)
                } else {
                    console.log(res.data.message);
                    document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";

                }

            },
            (err) => {
                console.log(err);
                document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
            }
        )

        $scope.init = () => {
            console.log(localStorage.getItem('jwt'));
            if (localStorage.getItem('jwt') /*$cookies.get('jwt')*/)
                $http.post("http://lvh.me:3000/auth/verify", {
                    token: localStorage.getItem('jwt')
                }).then((res) => {
                    if (!res.data.success) {
                        localStorage.removeItem('jwt');
                        window.location.replace("login.html");
                    } else {
                        $scope.payload = res.data.payload;
                    }
                }, () => {
                    window.location.replace("login.html");
                });
            else {
                window.location.replace("login.html");
            }
        }
        $scope.goEvent = (id) => {
            window.location.assign("events.html?e=" + String(id));
        }
        $scope.countUp = (id, start, end, duration) => {
            // assumes integer values for start and end
            var obj = document.getElementById(id);
            var range = end - start;
            // no timer shorter than 50ms (not really visible any way)
            var minTimer = 50;
            // calc step time to show all interediate values
            var stepTime = Math.abs(Math.floor(duration / range));
            // never go below minTimer
            stepTime = Math.max(stepTime, minTimer);
            // get current time and calculate desired end time
            var startTime = new Date().getTime();
            var endTime = startTime + duration;
            var timer;

            function run() {
                var now = new Date().getTime();
                var remaining = Math.max((endTime - now) / duration, 0);
                var value = Math.round(end - (remaining * range));
                obj.innerHTML = value;
                if (value == end) {
                    clearInterval(timer);
                }
            }

            timer = setInterval(run, stepTime);
            run();
        }

        $scope.logOut = () => {
            localStorage.removeItem('jwt');
            window.location.replace("login.html");
        }
    })
    /**
     * controller for events page
     */
    .controller('events', ($scope, $http) => {
        var eventURL = new URL(window.location);
        var id = encodeURI(eventURL.searchParams.get("e"));

        $http.get(url + id).then(
            (res) => {
                if (res.data.success) {
                    if (res.data.events.length == 0) document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
                    console.log(res);
                    $scope.data = res.data;
                    $scope.event = res.data.events;
                    $scope.event.type = "holiday";
                } else {
                    console.log(res.data.message);
                    document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";

                }

            },
            (err) => {
                console.log(err);
                document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
            });

        

        $scope.init = () => {
            console.log(localStorage.getItem('jwt'));
            if (localStorage.getItem('jwt') /*$cookies.get('jwt')*/)
                $http.post("http://lvh.me:3000/auth/verify", {
                    token: localStorage.getItem('jwt')
                }).then((res) => {
                    if (!res.data.success) {
                        localStorage.removeItem('jwt');
                        window.location.replace("login.html");
                    } else {
                        $scope.payload = res.data.payload;
                        
                        if($scope.payload.status === '0'){
                            $scope.edit = () => {
                                console.log(document.getElementById('e').value)
                                if (document.getElementById('e').value == 'true') {
                                    document.getElementById('name').setAttribute('contenteditable', true);
                                    document.getElementById('details').setAttribute('contenteditable', true);
                                    document.getElementById('date').setAttribute('contenteditable', true);
                                    document.getElementById('edit').innerHTML = 'save';
                                    document.getElementById('e').value = false;
                                    console.log(document.getElementById('e').value)
                                } else {
                                    var data = {
                                        id: $scope.event._id,
                                        update: {
                                            name: document.getElementById('name').innerHTML,
                                            date: document.getElementById('date').innerHTML,
                                            details: document.getElementById('details').innerHTML
                                        }
                                    }
                                    $http.post('http://localhost:3000/event/edit/' + String($scope.event._id), data).then(() => {
                                        if(res.data.success) window.location.reload();
                                        else showSnack(res.data.message);
                                    });                    
                                }
                            }
                        } else document.getElementById('edit').setAttribute('style', 'display: none');
                    }
                }, () => {
                    window.location.replace("login.html");
                });
            else {
                window.location.replace("login.html");
            }
        }

        $scope.logOut = () => {
            localStorage.removeItem('jwt');
            window.location.replace("login.html");
        }
    });