'use strict';

app.controller('loginController', ['$scope', '$location', '$modal', '$log', 'authService', function ($scope, $location, $modal, $log, authService) {
    $scope.init = function () {
        $scope.loginData = {
            userName: "",
            password: ""
        };
        $scope.message = "";
    }
    $scope.loginData = {
        userName: "",
        password: ""
    };
    $scope.message = "";
    $scope.login = function () {
        authService.login($scope.loginData).then(function (response) {
            $location.path('/home');
        },
        function (err) {
            $scope.message = err.error_description;
        });
    };

    $scope.open = function () {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'loginModal.html',
            controller: 'loginModalInstanceCtrl',
            size: 'sm',
            resolve: {
                loginData: function () {
                    return $scope.loginData;
                }
            }
        });

        modalInstance.result.then(function (loginData) {
            $scope.loginData.userName = loginData.userName;
            $scope.loginData.password = loginData.password;
            $scope.login();
            $scope.init();
        }, function () {
            $log.info('Modal Dismissed at: ' + new Date());
            $scope.init();
        });
        
    };
}]);

app.controller('loginModalInstanceCtrl', ['$scope', '$modal', '$modalInstance', 'loginData', function ($scope, $modal, $modalInstance, loginData) {
    $scope.loginData = loginData;
    $scope.ok = function () {
        if ($scope.loginData.userName != '' && $scope.loginData.password != '') {
            $modalInstance.close($scope.loginData);
        }
        
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);