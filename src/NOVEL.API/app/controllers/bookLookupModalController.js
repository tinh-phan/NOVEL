"use strict";

app.controller('bookLookupModalController', ['$scope', '$rootScope', 'booksService', function ($scope, $rootScope, booksService) {

    $scope.init = function () {
        $scope.books = [];
        $scope.getBooks();
    }
    $scope.book = book;
    
    $scope.bookCompleted = function (response, status) {
        $scope.books = response;
    }

    $scope.bookError = function (response, status) {

    }
    $scope.getBooks = function () {
        // book = $scope.createBookOject();
        booksService.getBooks($scope.bookCompleted, $scope.bookError);
    }

}]);