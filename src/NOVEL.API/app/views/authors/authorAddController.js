'use strict'
app.controller('authorAddController', ['$scope', '$rootScope', '$routeParams', '$location', 'authorService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, authorService, $filter, $modal, modalService, $log) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.author = {};
        $scope.alerts = [];
        $scope.title = "Thông tin";
    }

    $scope.authorError = function (response, status) {
        $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
    }


    $scope.showAdd = function () {
        var txt = "Bạn có muốn tạo " + $scope.author.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Tạo mới',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            var author = new Object();
            author.name = $scope.author.name;
            author.description = $scope.author.description;
            author.imageUrl = $scope.author.imageUrl;
            authorService.createAuthor(author, function (response, status) {
                //complete

                $scope.author = response;
                $scope.addAlert('success', 'Tạo mới thành công !');
                $location.path('/authors');
            }, function (response, status) {
                //error
                $scope.addAlert('danger', 'Tạo mới thất bại !');
            });
        });
    };

    $scope.addAlert = function (type, message) {
        $scope.alerts.push({ type: type, msg: message });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };



}]);

