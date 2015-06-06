/// <reference path="../../scripts/angular.min.js" />
'use strict'

app.service('ajaxService', ['$q', '$http', function ($q, $http) {
    //var ajaxServiceFactory = {};

    this.ajaxPost = function (data, route, successFunction, errorFunction) {
        $http.post(route, data).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            //if (reponse.IsAuthenticated == false) {
            //    //window.location = "/index.html";
            //}
            errorFunction(response);
        });
    };

    this.ajaxPostWithHeader = function (data, route, successFunction, errorFunction) {
        $http({ method: 'POST', url: route, data: data, headers: { 'Content-Type': 'application/json' } }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            errorFunction(response);
        });
    };

    this.ajaxPostWithNoAuthentication = function (data, route, successFunction, errorFunction) {
        $http.post(route, data).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            errorFunction(response);
        });
    };

    this.ajaxGet = function (route, successFunction, errorFunction) {
        $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            errorFunction(response);
        });
    };

    this.ajaxGetWithData = function (data, route, successFunction, errorFunction) {
        $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {
            successFunction(response, status);
        }).error(function (response) {
            errorFunction(response);
        });
    };

    this.ajaxGetWithAsync = function (route) {
        var deferred = $q.defer();
        $http({ method: 'GET', url: route}).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        })
        return deferred.promise;
    };
    //ajaxServiceFactory.ajaxPost = _ajaxPost;
    //ajaxServiceFactory.ajaxPostWithNoAuthentication = _ajaxPostWithNoAuthentication;
    //ajaxServiceFactory.ajaxGet = _ajaxGet;
    //ajaxServiceFactory.ajaxGetWithData = _ajaxGetWithData;
}]);