const url = "http://lvh.me:3000/event";
var jsonData, events;

// function createCORSRequest(method, url) {
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {

//         // Check if the XMLHttpRequest object has a "withCredentials" property.
//         // "withCredentials" only exists on XMLHTTPRequest2 objects.
//         xhr.open(method, url, true);

//     } else if (typeof XDomainRequest != "undefined") {

//         // Otherwise, check if XDomainRequest.
//         // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//         xhr = new XDomainRequest();
//         xhr.open(method, url);

//     } else {

//         // Otherwise, CORS is not supported by the browser.
//         xhr = null;

//     }
//     return xhr;
// }

// var xhr = createCORSRequest('GET', url);


// if (!xhr) {
//     throw new Error('CORS not supported');
// }

// xhr.onload = function () {
//     jsonData = JSON.parse(xhr.responseText);
//     console.log(jsonData);
//     // process the response.
//     if (jsonData.success) {
//         events = jsonData.events;
//     }
// };
var app = angular.module('event.horizon', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.config(['$mdIconProvider', function($mdIconProvider) {
    $mdIconProvider.icon('md-toggle-arrow', 'img/icons/toggle-arrow.svg', 48);
  }])
  .controller('events', function ($scope, $http) {
    $scope.formatDate = function(date) {
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
    $http.get(url).then(
        (res) => {
            console.log(res);
            $scope.data = res.data;
            events = $scope.data.events;
            $scope.events = events;
        }
    )
});


// xhr.onerror = function () {
//     console.log('There was an error!');
// };

// xhr.send();

function displayEvent(id) {
    document.getElementById('id01').style.display = 'block';
}