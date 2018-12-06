var app = angular.module("Events", ['ngMaterial', 'ngMessages']);

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('pink');
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});

app.controller('MainController', function ($scope) {
    

    $scope.init = () => {
        console.log(localStorage.getItem('jwt'));
        if (localStorage.getItem('jwt')/*$cookies.get('jwt')*/)
            $http.post("http://lvh.me:3000/auth/verify", {
                token: localStorage.getItem('jwt')
            }).then((res) => {
                if (!res.data.success) {
                    localStorage.removeItem('jwt');
                    window.location.replace("login.html");
                }
                else {
                    $scope.payload = res.data.payload;
                }
            }, () => {
                window.location.replace("login.html");
            });
        else{
            window.location.replace("login.html");
        }
    }

});