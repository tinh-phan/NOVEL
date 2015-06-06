'use strict';
app.controller('bookDetailController', ['$scope', '$rootScope', '$routeParams', 'booksService', 'chapterService', '$location', 'authService', '$filter', '$log', function ($scope, $rootScope, $routeParams, booksService, chapterService, $location, authService, $filter, $log) {


    $scope.authentication = authService.authentication;

    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.rate = value;
    };

    //$scope.currentPage = 1;
    //$scope.itemsPerPage = 2;
    //$scope.maxSize = 7;
    $scope.totalItems = 1;

    $scope.setPage = function (pageNo) {
        $scope.pagination.currentPage = pageNo;
    };

    $scope.pageChanged = function () {

        booksService.getBooksWithBookNameAsync($scope.bookName, $scope.itemsPerPage, $scope.pagination.currentPage).then(function (data) {
            $scope.book = data;
            $scope.chapters = $scope.book.chapters;
            $scope.totalItems = $scope.book.totalChapter;
            $log.log('totalItems: ' + $scope.totalItems);
        });
    };

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.book = [];
        $scope.error = {};
        $scope.pagination = {};
        $scope.pagination.currentPage = 1;
        $scope.itemsPerPage = 2;
        $scope.maxSize = 7;
        var page = ($routeParams.page || "");
        if (page == "") {
            $scope.pagination.currentPage = 1;
        } else {
            if (angular.isNumber(page) == true) {
                $scope.pagination.currentPage = page;
            }
        }

        var bookName = ($routeParams.bookName || "");
        
        if (bookName == "") {
            $location.path('/home');
        }
        else {
            $scope.bookName = bookName;
            booksService.getBooksWithBookNameAsync($scope.bookName, $scope.itemsPerPage, $scope.pagination.currentPage).then(function (data) {
                $scope.book = data;
                $scope.chapters = $scope.book.chapters;
                $scope.totalItems = $scope.book.totalChapter;
                $log.log('totalItems: ' + $scope.totalItems);
            });
        }

        $log.log('total items :' + $scope.totalItems);
        $log.log('currentPage :' + $scope.pagination.currentPage);

    };


    

    $scope.getBooksById = function () {
        book = $scope.createBookOject();
        booksService.getBooks(book, $scope.bookCompleted, $scope.bookError);
    }

    $scope.getBookByName = function (getBook) {
        booksService.getBooksWithBookName(getBook, $scope.bookCompleted, $scope.bookError);
    }
}]);