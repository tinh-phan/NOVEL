'use strict'
app.controller('chaptersController', ['$scope', '$rootScope', '$routeParams', '$location', 'chapterService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, chapterService, $filter, $modal, modalService, $log) {

    $scope.init = function () {

        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;

        $scope.chapters = {};
        $scope.currentPage = 1;
        $scope.itemsPerPage = 50;
        $scope.maxSize = 7;

        $scope.alerts = [];
        $scope.title = "Danh sách";
        var bookId = ($routeParams.bookId || "");
        $scope.bookId = bookId;
        if (bookId == "") {
            $location.path('/home');
        }
        else {
            $scope.AddMode = false;
            $scope.UpdateMode = true;
            var getChapter = new Object();
            getChapter.bookId = bookId;
            getChapter.pageSize = $scope.itemsPerPage;
            getChapter.pageNum = $scope.currentPage;
            chapterService.getChaptersAllWithBookId(getChapter, $scope.chapterCompleted, $scope.chapterError);
        }

        //$scope.getCategories();
    }

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
        var getChapter = new Object();
        getChapter.bookId = bookId;
        getChapter.pageSize = $scope.itemsPerPage;
        getChapter.pageNum = $scope.currentPage;
        chapterService.getChaptersAllWithBookId(getChapter, $scope.chapterCompleted, $scope.chapterError);
    };

    $scope.chapterCompleted = function (response, status) {
        $scope.totalItem = response.totalItem;
        $scope.chapters = response.chapters;
        $scope.originalChapter = response;
        $scope.addAlert('success', 'Lấy dữ liệu thành công !');
    }

    $scope.resetValues = function () {
        $scope.chapters = $scope.originalChapter;
    }

    $scope.chapterError = function (response) {
        $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
    }

    //$scope.showRemove = function (chapter) {
    //    var txt = "Bạn có muốn xóa " + chapter.name + " !";
    //    var modalOptions = {
    //        closeButtonText: 'Hủy',
    //        actionButtonText: 'Đồng ý',
    //        headerText: 'Xóa',
    //        bodyText: txt,
    //    };
    //    // Không sử dụng service modal
    //    modalService.showModal({}, modalOptions).then(function (result) {
    //        $scope.addChapter();
    //    });
    //}
    $scope.chapterRemovedCompleted = function () {
        $location.path("#/books")
    }

    $scope.chapterRemovedError = function (response) {

    }

    $scope.addAlert = function (type, message) {
        $scope.alerts.push({ type: type, msg: message });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.showRemove = function (chapter) {
        var txt = "Bạn có muốn xóa " + chapter.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Xóa',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            var chapterObj = new Object();
            chapterObj.chapterId = chapter.id;
            chapterService.removeChapter(chapterObj, function (response, status) {
                $scope.addAlert('success', 'Xóa dữ liệu thành công !');
                $location.path('#book/' + chapter.bookId + '/chapters');
            }, function (response) {
                $scope.addAlert('danger', 'Xóa dữ liệu thất bại !');
            });
        });
    };

}]);