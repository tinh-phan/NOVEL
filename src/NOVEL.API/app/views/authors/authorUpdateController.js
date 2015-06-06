'use strict'
app.controller('authorUpdateController', ['$scope', '$rootScope', '$routeParams', '$location', 'authorService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, authorService, $filter, $modal, modalService, $log) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.author = {};
        $scope.alerts = [];
        $scope.title = "Thông tin";
        var authorId = ($routeParams.authorId || "");
        $scope.authorId = authorId;
        if (authorId == "") {
            $location.path('/authors');
        }
        else {
            $scope.authorId = authorId;
            var authorObj = new Object();
            authorObj.authorId = authorId;
            authorService.getAuthorsWithId(authorObj, function (response, status) {
                $scope.author = response;
                $scope.addAlert('success', 'Lấy dữ liệu thành công !');
            }, function (response) {
                $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
            })

        }


    }
    $scope.UpdateAuthor = function (author) {
        var authorObj = new Object();
        authorObj.id = author.id;
        authorObj.name = author.name;
        authorObj.description = author.description;
        authorObj.imageUrl = author.imageUrl;

        authorService.updateAuthor(authorObj, function (response, status) {
            $scope.author = response;
            $scope.addAlert('success', 'Cập nhật dữ liệu thành công !');

        }, function (response) {
            $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
        });
    }

    $scope.showUpdate = function () {
        var txt = "Bạn có muốn cập nhật " + $scope.author.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Cập nhật',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            var authorObj = new Object();
            authorObj.authorId = $scope.author.id;
            authorObj.name = $scope.author.name;
            authorObj.description = $scope.author.description;
            authorObj.imageUrl = $scope.author.imageUrl;

            authorService.updateAuthor(authorObj, function (response, status) {
                $scope.author = response;
                $scope.addAlert('success', 'Cập nhật dữ liệu thành công !');
                $location.path('/book/' + $scope.author.bookId + '/authors');
                $scope.init();
            }, function (response) {
                $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
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

