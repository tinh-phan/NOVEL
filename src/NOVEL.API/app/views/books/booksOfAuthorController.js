/// <reference path="../../scripts/angular.min.js" />
'use strict'
app.controller('booksOfAuthorController', ['$scope', '$rootScope', '$routeParams', '$location', 'booksService', '$filter', 'modalService', function ($scope, $rootScope, $routeParams, $location, booksService, $filter, modalService) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        var authorName = ($routeParams.authorName || "");
        $scope.booksOfAuthor = [];
        if (authorName == "") {
            $location.path('/home');
            //alert('khong co ');
        }
        else {
            var getBook = new Object();
            getBook.authorName = authorName;
            $scope.getBooksByAuthorName(getBook);
            //alert(categoryName);
        }
    }

    $scope.bookCompleted = function (response, status) {
        $scope.booksOfAuthor = response;
    }

    $scope.bookError = function (response, status) {

    }

    $scope.getBooksById = function () {
        book = $scope.createBookOject();
        booksService.getBooks(book, $scope.bookCompleted, $scope.bookError);
    }

    $scope.getBooksByAuthorName = function (getBook) {
        booksService.getBooksWithAuthorName(getBook, $scope.bookCompleted, $scope.bookError);
    }
}]);