/// <reference path="F:\Xproject\ASPNet\QuanLyTaiKhoan\Client.Web\scripts/angular.js" />
'use strict';

app.factory('authInterceptorService', ['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
    var authInterceptorServiceFactory = {};

    var _request = function (config) {
        config.headers = config.header || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            //var authService = $injector.get('authService');
            //var authData = localStorageService.get('authorizationData');
            //authService.logOut();
            $location.path('/login');

        }

        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);