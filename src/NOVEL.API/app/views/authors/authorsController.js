'use strict'
app.controller('authorsController', ['$scope', '$rootScope', '$routeParams', '$location', 'authorService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, authorService, $filter, $modal, modalService, $log) {

    $scope.init = function () {

        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;

        $scope.authors = {};
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.maxSize = 7;

        $scope.alerts = [];
        $scope.title = "Danh sách";
        
            $scope.AddMode = false;
            $scope.UpdateMode = true;
            authorService.getAuthorsAllWithPaging($scope.itemsPerPage, $scope.currentPage).then(function (data) {
                $scope.totalItem = data.totalItem;
                $scope.authors = data.authors;
                $scope.addAlert('success', 'Lấy dữ liệu thành công !');
            })
        //$scope.getCategories();
    }

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
        authorService.getAuthorsAllWithPaging($scope.itemsPerPage, $scope.currentPage).then(function (data) {
            $scope.totalItem = data.totalItem;
            $scope.authors = data.authors;
            $scope.addAlert('success', 'Lấy dữ liệu thành công !');
        })
    };

    $scope.authorCompleted = function (response, status) {
        $scope.totalItem = response.totalItem;
        $scope.authors = response.authors;
        $scope.originalAuthor = response;
        $scope.addAlert('success', 'Lấy dữ liệu thành công !');
    }

    $scope.resetValues = function () {
        $scope.authors = $scope.originalAuthor;
    }

    $scope.authorError = function (response) {
        $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
    }

    //$scope.showRemove = function (author) {
    //    var txt = "Bạn có muốn xóa " + author.name + " !";
    //    var modalOptions = {
    //        closeButtonText: 'Hủy',
    //        actionButtonText: 'Đồng ý',
    //        headerText: 'Xóa',
    //        bodyText: txt,
    //    };
    //    // Không sử dụng service modal
    //    modalService.showModal({}, modalOptions).then(function (result) {
    //        $scope.addAuthor();
    //    });
    //}
    $scope.authorRemovedCompleted = function () {
        $location.path("#/books")
    }

    $scope.authorRemovedError = function (response) {

    }

    $scope.addAlert = function (type, message) {
        $scope.alerts.push({ type: type, msg: message });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.showRemove = function (author) {
        var txt = "Bạn có muốn xóa " + author.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Xóa',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            var authorObj = new Object();
            authorObj.authorId = author.id;
            authorService.removeAuthorWithId(authorObj, function (response, status) {
                $scope.addAlert('success', 'Xóa dữ liệu thành công !');
                $location.path('#/authors');
            }, function (response) {
                $scope.addAlert('danger', 'Xóa dữ liệu thất bại !');
            });
        });
    };

}]);