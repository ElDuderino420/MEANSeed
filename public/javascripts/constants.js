/**
 * Created by David on 03 Dec 2016.
 */
angular.module('meanseed')

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated'
    })

    .constant('API_ENDPOINT', {
        url: 'localhost:1337/api'
        //  For a simulator use: url: 'http://127.0.0.1:8080/api'
    });