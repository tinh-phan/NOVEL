/// <reference path="F:\Xproject\ASPNet\QuanLyTaiKhoan\Client.Web\scripts/angular.js" />
/// <reference path="F:\Xproject\ASPNet\QuanLyTaiKhoan\Client.Web\scripts/angular-local-storage.js" />

'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var serviceBase = '';
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();
        
        //var req = { method: 'POST', url: 'api/accounts', headers: { 'Content-Type': 'application/json' }, data: registration };

        //return $http(req).then(function (response) {
        //    return response;
        //});

        return $http.post(serviceBase + 'api/accounts/CreateUser', registration, { headers: [{ 'Content-Type': 'application/json' }] }).then(function (response) {
            return response;
        });

    };

    var _get = function()
    {
        $http.get(serviceBase + 'api/accounts').then(function (response) {
            return response;
        });
    }

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.getUsers = _get;

    return authServiceFactory;
}]);