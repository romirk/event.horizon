const url = "http://lvh.me:3000/event";
var jsonData, events;

var app = angular.module('event.horizon', ['ngMaterial', 'ngMessages']);

app.config(['$mdIconProvider', function ($mdIconProvider) {
        $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
    }])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    })
    .controller('events', function ($scope, $http) {
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
                console.log(res);
                $scope.data = res.data;
                events = $scope.data.events;
                $scope.events = events;
            },
            (err) => {
                console.log(err);
            }
        )

        function displayEvent(id) {
            console.log(id);
            document.getElementById('id01').style.display = 'block';
        }


    });

function formatDate(date) {
    date = new Date(date);
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}
window.onscroll = () => {

}