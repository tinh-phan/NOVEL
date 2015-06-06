'use strict'
app.controller('chapterUpdateController', ['$scope', '$rootScope', '$routeParams', '$location', 'chapterService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, chapterService, $filter, $modal, modalService, $log) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.chapter = {};
        $scope.alerts = [];
        $scope.title = "Thông tin";
        var chapterId = ($routeParams.chapterId || "");
        $scope.chapterId = chapterId;
        if (chapterId == "") {
            $location.path('/books');
        }
        else {
            $scope.chapterId = chapterId;
            var chapterObj = new Object();
            chapterObj.chapterId = chapterId;
            chapterService.getChapterWithId(chapterObj, function (response, status) {
                $scope.chapter = response;
                $scope.addAlert('success', 'Lấy dữ liệu thành công !');
            }, function (response) {
                $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
            })
            
        }


    }
    $scope.UpdateChapter = function (chapter) {
        var chapterObj = new Object();
        chapterObj.id = chapter.id;
        chapterObj.ordinal = chapter.ordinal;
        chapterObj.name = chapter.name;
        chapterObj.description = chapter.description;
        chapterObj.content = chapter.content;
        chapterObj.tempContent = chapter.tempContent;
        chapterObj.imageUrl = chapter.imageUrl;
        chapterObj.isLocked = chapter.isLocked;

        chapterService.updateChapter(chapterObj, function (response, status) {
            $scope.chapter = response;
            $scope.addAlert('success', 'Cập nhật dữ liệu thành công !');

        }, function (response) {
            $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
        });
    }

    $scope.showUpdate = function () {
        var txt = "Bạn có muốn cập nhật " + $scope.chapter.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Cập nhật',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            var chapterObj = new Object();
            chapterObj.id = $scope.chapter.id;
            chapterObj.ordinal = $scope.chapter.ordinal;
            chapterObj.name = $scope.chapter.name;
            chapterObj.description = $scope.chapter.description;
            chapterObj.content = $scope.chapter.content;
            chapterObj.tempContent = $scope.chapter.tempContent;
            chapterObj.imageUrl = $scope.chapter.imageUrl;
            chapterObj.isLocked = $scope.chapter.isLocked;

            chapterService.updateChapter(chapterObj, function (response, status) {
                $scope.chapter = response;
                $scope.addAlert('success', 'Cập nhật dữ liệu thành công !');
                $location.path('/book/'+$scope.chapter.bookId+'/chapters');
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

