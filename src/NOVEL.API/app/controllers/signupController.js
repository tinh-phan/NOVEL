'use strict';

app.controller('signupController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {
    $scope.savedSuccessfully = false;
    $scope.message = "";
    $scope.initializeController = function () {
        $scope.Email = "";
        $scope.FirstName = "";
        $scope.LastName = "";
        $scope.Password = "";
        $scope.ConfirmPassword = "";
        $scope.UserName = "";
    }

    $scope.createUser = function () {

        var user = new Object();
        user.Email = $scope.Email;
        user.FirstName = $scope.FirstName;
        user.LastName = $scope.LastName;
        user.Password = $scope.Password;
        user.ConfirmPassword = $scope.ConfirmPassword;
        user.UserName = $scope.UserName;
        return user;

    }
    $scope.createCompleted = function (response) {

    }

    $scope.createError = function (response) {

    }

    //$scope.signUp = function () {
    //    var user = $scope.createUser();
    //    authService.saveRegistration(user, $scope.createCompleted, $scope.createError);
    //}

    $scope.signUp = function () {
        var user = $scope.createUser();
        authService.saveRegistration(user).then(function (response) {
            $scope.savedSuccessfully = true;
            $scope.message = "Tài khoản đã được đăng ký thành công, Chuyển đến trang đăng nhập trong 5 giây."
            startTimer();
        },
        function (response) {
            var errors = [];
            for (var key in response.data.modelState) {
                for (var i = 0; i < response.data.modelState[key].length; i++) {
                    errors.push(response.data.modelState[key][i]);
                }
            }
            $scope.message = "Lỗi khi đăng ký: " + errors.join(' ');
        });
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 5000);
    }

}]);