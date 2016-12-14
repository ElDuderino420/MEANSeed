/**
 * Created by David on 03 Dec 2016.
 */
angular.module('meanseed')

    .controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $location) {
        $scope.user = {
            name: '',
            password: ''
        };

        $scope.login = function() {
            AuthService.login($scope.user).then(function(msg) {
                $location.path('/inside');
            }, function(errMsg) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: errMsg
                });
            });
        };
    })

    .controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $location) {
        $scope.user = {
            name: '',
            password: ''
        };

        $scope.signup = function() {
            AuthService.register($scope.user).then(function(msg) {
                $location.path('/login');
                var alertPopup = $ionicPopup.alert({
                    title: 'Register success!',
                    template: msg
                });
            }, function(errMsg) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Register failed!',
                    template: errMsg
                });
            });
        };
    })

    .controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $location) {
        $scope.destroySession = function() {
            AuthService.logout();
        };

        $scope.getInfo = function() {
            $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
                $scope.memberinfo = result.data.msg;
            });
        };

        $scope.logout = function() {
            AuthService.logout();
            $location.path('/login');
        };
    })

    .controller('AppCtrl', function($scope, $location, AuthService, AUTH_EVENTS) {
        $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            AuthService.logout();
            $location.path('/login');
            var alertPopup = {
                title: 'Session Lost!',
                template: 'Sorry, You have to login again.'
            };
        });
    });