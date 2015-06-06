'use strict'
app.controller('chapterAddController', ['$scope', '$rootScope', '$routeParams', '$location', 'chapterService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, chapterService, $filter, $modal, modalService, $log) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.chapter = {};
        $scope.alerts = [];
        $scope.title = "Thông tin";
        var bookId = ($routeParams.bookId || "");
        $scope.bookId = bookId;
        if (bookId == "") {
            $location.path('/books');
        }
        else {
            $scope.bookId = bookId;
        }
    }

    $scope.chapterError = function (response, status) {
        $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
    }

    //$scope.addChapter = function () {
    //    var chapter = new Object();
    //    chapter.ordinal = $scope.chapter.ordinal;
    //    chapter.name = $scope.chapter.name;
    //    chapter.description = $scope.book.description;
    //    chapter.content = $scope.book.content;
    //    chapter.tempContent = $scope.book.tempContent;
    //    chapter.imageUrl = $scope.book.imageUrl;
    //    chapter.bookId = $scope.bookId;
    //    chapterService.createChapter(chapter, function (response, status) {
    //        //complete
            
    //        $scope.chapter = response;
    //        $scope.addAlert('success', 'Tạo mới thành công !');
    //        $location.path('#book/' + chapter.bookId + '/chapters');
    //    }, function (response, status) {
    //        //error
    //        $scope.addAlert('danger', 'Tạo mới thất bại !');
    //    });
    //}

    $scope.showAdd = function () {
        var txt = "Bạn có muốn tạo " + $scope.chapter.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Tạo mới',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            var chapter = new Object();
            chapter.ordinal = $scope.chapter.ordinal;
            chapter.name = $scope.chapter.name;
            //chapter.description = $scope.chapter.description;
            chapter.content = $scope.chapter.content;
            //chapter.tempContent = $scope.chapter.tempContent;
            //chapter.imageUrl = $scope.chapter.imageUrl;
            chapter.bookId = $scope.bookId;
            chapterService.createChapter(chapter, function (response, status) {
                //complete

                $scope.chapter = response;
                $scope.addAlert('success', 'Tạo mới thành công !');
                $location.path('/book/' + $scope.bookId + '/chapters');
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

