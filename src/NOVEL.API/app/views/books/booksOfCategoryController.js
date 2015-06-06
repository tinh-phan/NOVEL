/// <reference path="../../scripts/angular.min.js" />
'use strict'
app.controller('booksOfCategoryController', ['$scope', '$rootScope', '$routeParams', '$location', 'booksService', '$filter', 'modalService', function ($scope, $rootScope, $routeParams, $location, booksService, $filter, modalService) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        var categoryName = ($routeParams.categoryName || "");
        $scope.booksOfCategory = [];
        if (categoryName == "") {
            $location.path('/home');
            //alert('khong co ');
        }
        else
        {
            var getBook = new Object();
            getBook.categoryName = categoryName;
            $scope.getBooksByCategoryName(getBook);
            //alert(categoryName);
        }
    }

    $scope.bookCompleted = function (response, status) {
        $scope.booksOfCategory = response;
    }

    $scope.bookError = function (response, status) {

    }

    $scope.getBooksById = function () {
        book = $scope.createBookOject();
        booksService.getBooks(book, $scope.bookCompleted, $scope.bookError);
    }

    $scope.getBooksByCategoryName = function (getBook) {
        booksService.getBooksWithCategoryName(getBook, $scope.bookCompleted, $scope.bookError);
    }
}]);