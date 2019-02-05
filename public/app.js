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
    .controller('dash', function ($scope, $http, $window) {
        $scope.points = {
            c: 187,
            e: 190,
            p: 186,
            v: 100
        };
        $scope.points.max = Math.max($scope.points.c, $scope.points.e, $scope.points.p, $scope.points.v);
        $scope.points.total = $scope.points.c + $scope.points.e + $scope.points.p + $scope.points.v;
        console.log($scope.points);


        $scope.init = () => {
            console.log(localStorage.getItem('jwt'));
            if (localStorage.getItem('jwt') /*$cookies.get('jwt')*/)
                $http.post("http://lvh.me:3000/auth/verify", {
                    token: localStorage.getItem('jwt')
                }).then((res) => {
                    if (!res.data.success) {
                        localStorage.removeItem('jwt');
                        window.location.replace("landing");
                    } else {
                        $scope.payload = res.data.payload;
                        if ($scope.payload.status != 'admin') {
                            document.getElementById('ce').setAttribute('hidden', 'true');
                            document.getElementById('modaledit').setAttribute('hidden', 'true');
                        }
                        $http.get("http://lvh.me:3000/event/").then(
                            (res) => {
                                if (res.data.success) {
                                    if (res.data.events.length == 0) document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
                                    console.log(res);
                                    $scope.data = res.data;
                                    $scope.events = res.data.events;
                                    $scope.events.sort(function (a, b) {
                                        a = new Date(a.date);
                                        b = new Date(b.date);
                                        return a > b ? -1 : a < b ? 1 : 0;
                                    });

                                    $scope.participating = $scope.events.filter(function (el) { return el.participants.indexOf($scope.payload.username) >= 0 });


                                    for (var i = 0; i < $scope.events.length; i++) {
                                        $scope.events[i].isparticipating = false;
                                        console.log($scope.events[i]);
                                        for (var j = 0; j < $scope.events[i].participants.length; j++) {
                                            if ($scope.events[i].participants[j] == $scope.payload.username) {
                                                $scope.events[i].isparticipating = true;
                                                break;
                                            }
                                        }
                                    }
                                    for (var i = 0; i < $scope.events.length; i++) {
                                        // console.log($scope.events[i]);
                                        var d = new Date($scope.events[i].date);
                                            if (d < Date.now() - 3*3600*24) {
                                                $scope.events.splice(i,1);
                                                i--;
                                            }
                                    }

                                    var eventURL = new URL(window.location);
                                    var e = encodeURI(eventURL.searchParams.get("e"));
                                    if (typeof e !== 'undefined') $scope.goEvent(id);
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
                    }
                }, () => {
                    window.location.replace("landing");
                });
            else {
                window.location.replace("landing");
            }
        }
        $scope.goEvent = (id) => {
            console.log(id);

            m = document.getElementById('id01');
            $scope.modEvent = search(id, $scope.events);
            var d = new Date(String($scope.modEvent.date));
            $scope.modEvent.d = d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
            document.getElementById('modname').innerHTML = $scope.modEvent.name;
            //document.getElementById('mreg').setAttribute('ng-click', $scope.modEvent._id);
            //document.getElementById('moddetails').innerHTML= '<span>' + d.getFullYear() + '.' + d.getMonth() + '.' + d.getDate() + '<span><p>' + $scope.modEvent.details + '</p>';
            $http.get("http://lvh.me:3000/user/"+ $scope.modEvent.organizers[0]).then(
                (res) => {
                    if (res.data.success) {
                        $scope.name = res.data.user.name;
                        $scope.grade = res.data.user.grade;
                        $scope.sec = res.data.user.sec;
                        //console.log(res.data);
                    }
            });
            m.style.display = 'block';
        }

        setTimeout(() => {
            $scope.countUp('c', 0, $scope.points.c, 500);
            $scope.countUp('e', 0, $scope.points.e, 500);
            $scope.countUp('p', 0, $scope.points.p, 500);
            $scope.countUp('v', 0, $scope.points.v, 500);
        }, 1000)

        $scope.edit = (id) => {
            console.log(id);
            window.location.replace('eventEdit.html?e=' + String(id));
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
            window.location.replace("landing");
        }
        $scope.newEvent = () => window.location.replace("eventForm.html");

        $scope.register = (id) => {
            var event = search(id, $scope.events);
            console.log(event.participants, event.participants.indexOf($scope.payload.username));
            if (event.participants.indexOf($scope.payload.username) < 0) {
                event.participants.push($scope.payload.username);
                console.log(event.participants);
                var data = {
                    update: {
                        participants: event.participants
                    }
                };
                $http.post('http://localhost:3000/event/edit/' + String(id), data).then((res) => {
                    console.log(res);
                    if (res.data.success) showSnack("Registered.");
                    else showSnack(res.data.message);
                    $scope.init();
                    //window.location.reload();
                });

            } else {
                console.log("Already participating");
                showSnack("Already participating")
            }

        }

        $scope.deregister = (id) => {
            var event = search(id, $scope.events);
            event.participants.splice(event.participants.indexOf($scope.payload.username),1);
            var data = {
                update: {
                    participants: event.participants
                }
            };
            $http.post('http://localhost:3000/event/edit/' + String(id), data).then((res) => {
                console.log(res);
                if (res.data.success) showSnack("Unregistered.");
                else showSnack(res.data.message);
                $scope.init();
            });
        }
    })

    /**
     * controller for events page
     */
    .controller('events', ($scope, $http) => {
        var eventURL = new URL(window.location);
        var id = encodeURI(eventURL.searchParams.get("e"));

        $scope.init = () => {
            console.log(localStorage.getItem('jwt'));
            if (localStorage.getItem('jwt') /*$cookies.get('jwt')*/)
                $http.post("http://lvh.me:3000/auth/verify", {
                    token: localStorage.getItem('jwt')
                }).then((res) => {

                    if (!res.data.success) {
                        localStorage.removeItem('jwt');
                        window.location.replace("landing");
                    } else {

                        $scope.payload = res.data.payload;

                        if ($scope.payload.status === 'admin') {
                            if (id == 'new') {
                                $scope.event = {
                                    name: 'event.name',
                                    date: 'event.date',
                                    details: 'event.details',
                                    organizers: []
                                }
                                document.getElementById('name').setAttribute('contenteditable', true);
                                document.getElementById('details').setAttribute('contenteditable', true);
                                document.getElementById('date-picker').setAttribute('ng-hide', false);
                                document.getElementById('edit').innerHTML = 'save';
                                document.getElementById('e').value = false;
                                $scope.edit = () => {
                                    data = {
                                        name: document.getElementById('name').innerHTML,
                                        date: $scope.data.date,
                                        details: document.getElementById('details').innerHTML,
                                        organizers: [$scope.payload.username]
                                    }
                                    console.log('edited', data)
                                    $http.post('http://localhost:3000/event/', data).then(() => {
                                        if (res.data.success) window.location.replace('/events.html?e=' + res.data.id);
                                        else showSnack(res.data.message);
                                    });
                                }
                                console.log($scope.event);
                            } else {
                                $scope.edit = () => {
                                    if (document.getElementById('e').value == 'true') {
                                        document.getElementById('name').setAttribute('contenteditable', true);
                                        document.getElementById('details').setAttribute('contenteditable', true);
                                        document.getElementById('date-picker').setAttribute('ng-hide', false);
                                        document.getElementById('edit').innerHTML = 'save';
                                        document.getElementById('e').value = false;
                                        console.log(document.getElementById('e').value)
                                    } else {
                                        var data = {
                                            id: $scope.event._id,
                                            update: {
                                                name: document.getElementById('name').innerHTML,
                                                date: $scope.data.date,
                                                details: document.getElementById('details').innerHTML
                                            }
                                        }
                                        $http.post('http://localhost:3000/event/edit/' + String($scope.event._id), data).then(() => {
                                            if (res.data.success) window.location.reload();
                                            else showSnack(res.data.message);
                                        });
                                    }
                                }
                            }
                        } else document.getElementById('edit-btn').setAttribute('style', 'display: none');
                    }
                }, () => {
                    window.location.replace("landing");
                });
            else {
                window.location.replace("landing");
            }

            if (id != 'new') {
                $http.get(url + id).then(
                    (res) => {
                        if (res.data.success) {
                            if (res.data.events.length == 0) document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
                            console.log(res);
                            $scope.data = res.data;
                            $scope.event = res.data.events;
                        } else {
                            console.log(res.data.message);
                            window.location.replace('/')
                        }

                    },
                    (err) => {
                        window.location.replace('/');
                    });
            }
        }

        $scope.logOut = () => {
            localStorage.removeItem('jwt');
            window.location.replace("landing");
        }
    })
    .controller("act", ($scope, $http) => {

        $scope.goEvent = (id) => {
            m = document.getElementById('id01');
            $scope.modEvent = search(id, $scope.events);
            document.getElementById('modname').innerHTML = $scope.modEvent.name;
            document.getElementById('moddetails').innerHTML = '<span>' + $scope.modEvent.date + '<span><p>' + $scope.modEvent.details + '</p>';
            m.style.display = 'block';
        }

        $scope.init = () => {
            console.log(localStorage.getItem('jwt'));
            if (localStorage.getItem('jwt') /*$cookies.get('jwt')*/)
                $http.post("http://lvh.me:3000/auth/verify", {
                    token: localStorage.getItem('jwt')
                }).then((res) => {
                    if (!res.data.success) {
                        localStorage.removeItem('jwt');
                        window.location.replace("landing");
                    } else {
                        $scope.payload = res.data.payload;
                        if($scope.payload.status != 'admin') document.getElementById("organizing").innerHTML = "Sorry, you are not an organizer";
                        $http.get("http://lvh.me:3000/event/").then(
                            (res) => {
                                if (res.data.success) {
                                    if (res.data.events.length == 0) document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>No events</code></h2>";
                                    console.log(res);
                                    $scope.data = res.data;
                                    $scope.events = res.data.events;
                                    $scope.events.sort(function (a, b) {
                                        a = new Date(a.date);
                                        b = new Date(b.date);
                                        return a > b ? -1 : a < b ? 1 : 0;
                                    });
                                    $scope.participating = $scope.events.filter(function (el) { return el.participants.indexOf($scope.payload.username) >= 0 });
                                    $scope.organizing = $scope.events.filter(function (el) { return el.organizers.indexOf($scope.payload.username) >= 0 });
                                    $scope.upcomingP = [];
                                    $scope.completedP = [];
                                    $scope.upcomingO = [];
                                    $scope.completedO = [];
                                    for (var i = 0; i < $scope.participating.length; i++) {
                                        var date = new Date($scope.participating[i].date);
                                        if (date >= Date.now()) {
                                            $scope.upcomingP.push($scope.participating[i]);
                                        }
                                        else {
                                            $scope.completedP.push($scope.participating[i]);
                                        }
                                    }
                                    for (var i = 0; i < $scope.organizing.length; i++) {
                                        var date = new Date($scope.organizing[i].date);
                                        if (date >= Date.now()) {
                                            $scope.upcomingO.push($scope.organizing[i]);
                                        }
                                        else {
                                            $scope.completedO.push($scope.organizing[i]);
                                        }
                                    }
                                    if ($scope.upcomingP.length == 0) {
                                        document.getElementById("upcomingP").innerHTML = "<h4 style='position:relative; left: 4vw'>No events</h4>";
                                    }
                                    if ($scope.completedP.length == 0) {
                                        document.getElementById("completedP").innerHTML = "<h4 style='position:relative; left: 4vw'><span style='color: #444'>No events</span></h4>";
                                    }
                                    if ($scope.payload.status == 'admin' && $scope.upcomingO.length == 0) {
                                        document.getElementById("upcomingO").innerHTML = "<h4 style='position:relative; left: 4vw'>No events</h4>";
                                    }
                                    if ($scope.payload.status == 'admin' && $scope.completedO.length == 0) {
                                        document.getElementById("completedO").innerHTML = "<h4 style='position:relative; left: 4vw'><span style='color: #444'>No events</span></h4>";
                                    }

                                    console.log($scope.participating, '1',$scope.organizing, '2', $scope.upcomingP, $scope.completedP);
                                } else {
                                    console.log(res.data.message);
                                    //document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";

                                }

                            },
                            (err) => {
                                console.log(err);
                                //document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
                            }
                        );
                    }
                }, () => {
                    window.location.replace("landing");
                });
            else {
                window.location.replace("landing");
            }
        }
        
        $scope.parti = (eventC) => {

            m = document.getElementById('id02');

            $http.get("http://lvh.me:3000/event/"+ eventC).then(
                (res) => {
                    console.log("hi1:", res.data);
                    if (res.data.success) {
                        $scope.part = res.data.events.participants;
                        console.log("hi2:",$scope.part.length);
                    }
                });

            
            $http.get("http://lvh.me:3000/user").then(
                (res) => {
                    if (res.data.success) {
                        $scope.participant_names = [];
                        for(var i=0; i < res.data.users.length; i++) {
                            for(var j=0; j < $scope.part.length; j++){
                                //console.log(res.data.users[i], $scope.part[j]);
                                if(res.data.users[i].username == $scope.part[j])
                                    $scope.participant_names.push(res.data.users[i].name);    
                            }    
                        }
                    }
                });
            
            m.style.display = 'block';

        }
    
        $scope.logOut = () => {
            localStorage.removeItem('jwt');
            window.location.replace("landing");
        }
    });

function search(id, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]._id === id) {
            return myArray[i];
        }
    }
    return -1;
}