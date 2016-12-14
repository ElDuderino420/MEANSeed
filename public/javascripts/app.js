/**
 * Created by David on 03 Dec 2016.
 */
angular.module('meanseed', ['meanseed', 'ngRoute'])

    .config(['$routeProvider', '$locationProvider', '$httpProvider'],function($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider
            .when('/outside', {
                abstract: true,
                templateUrl: 'templates/outside.html'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .when('/register', {
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/inside', {
                templateUrl: 'templates/inside.html',
                controller: 'InsideCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .run(function ($rootScope, $location, AuthService, AUTH_EVENTS) {
        $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
            if (!AuthService.isAuthenticated()) {
                console.log(next.name);
                if (next.name !== 'outside.login' && next.name !== 'outside.register') {
                    event.preventDefault();
                    $location.path('/login');
                }
            }
        });
    });