'use strict';
app.controller('indexController', ['$scope', '$rootScope', '$location', 'authService', function ($scope, $rootScope, $location, authService) {

    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }
    
    

    $rootScope.init = function () {
        $scope.authentication = authService.authentication;
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
    }
    
}]);