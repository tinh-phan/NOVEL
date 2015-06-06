'use strict'
app.controller('chapterController', ['$scope', '$rootScope', '$routeParams', '$location', 'chapterService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, chapterService, $filter, $modal, modalService, $log) {

    $scope.init = function () {
        $rootScope.showFullScreen = true;
        $rootScope.showMultiScreen = false;
        $scope.chapter = [];
        $scope.ordinal = 1;
        $scope.max = 1;
        $scope.dynamic = 1;

        var bookId = ($routeParams.bookId || "");
        $scope.bookId = bookId;
        if (bookId == "") {
            $location.path('/home');
        }
        else {
            var ordinal = ($routeParams.ordinal || "");
            if (ordinal == "") {

            }
            else
            {
                $scope.ordinal = ordinal;
                chapterService.getChapterWithOrdinal($scope.bookId, $scope.ordinal).then(function (data) {
                    $scope.chapter = data;
                    $scope.max = data.chapterTotal;
                    $log.log('chapter Total' + data.chapterTotal);
                    $scope.dynamic = data.ordinal;
                });
            }
        }

    }




}]);