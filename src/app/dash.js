const url = "http://lvh.me:3000/event";
var app = angular.module('event.horizon', ['ngMaterial', 'ngMessages', 'ngCookies']);

app.config(['$mdIconProvider', function ($mdIconProvider) {
        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
    }])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    })
    .controller('events', function ($scope, $http, $cookies) {
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
                }

            },
            (err) => {
                console.log(err);
                document.getElementById('cardwrap').innerHTML = "<h2 style='margin:auto; text-align:center'><code style='color: #444'>no events</code></h2>";
            }
        )

        $scope.init = () => {
            console.log(localStorage.getItem('jwt'));
            if (localStorage.getItem('jwt') /*$cookies.get('jwt')*/ )
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
    });