/// <reference path="../../scripts/angular.min.js" />
'use strict'
app.controller('booksController', ['$scope', '$rootScope', '$location', 'booksService', '$filter', 'modalService', '$log', function ($scope, $rootScope, $location, booksService, $filter, modalService, $log) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.books = [];
        
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        var data = new Object();
        data.pageSize = $scope.itemsPerPage;
        data.pageNum = $scope.currentPage;

        booksService.getBooks(data, function (response, status) {
            $scope.totalItems = response.totalItem;
            $scope.books = response.books;
            
        }, function (response) {

        });

    }

    //


    $scope.maxSize = 7;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
        var data = new Object();
        data.pageSize = $scope.itemsPerPage;
        data.pageNum = $scope.currentPage;
        booksService.getBooks(data, function (response, status) {
            $scope.totalItems = response.totalItem;
            $scope.books = response.books;
        }, function (response) {

        });
    };
    //

    $scope.bookCompleted = function (response, status) {
        $scope.books = response;
    }

    $scope.bookError = function(response){

    }
    $scope.getBooks = function () {
        // book = $scope.createBookOject();
        booksService.getBooks($scope.bookCompleted, $scope.bookError);
    }

    $scope.getBooksById = function () {
        book = $scope.createBookOject();
        booksService.getBooks(book, $scope.bookCompleted, $scope.bookError);
    }

    $scope.getBooksByCategoryId = function () {
        category = $scope.createCategoryOject();
        booksService.getBooks(category, $scope.bookCompleted, $scope.bookError);
    }

    $scope.getBooksByAuthorId = function () {
        author = $scope.createAuthorOject();
        booksService.getBooks(author, $scope.bookCompleted, $scope.bookError);
    }

    $scope.getBooks = function () {
        // book = $scope.createBookOject();
        booksService.getBooks($scope.bookCompleted, $scope.bookError);
    }
    $scope.createBookOject = function(){
        var book = new Object();

        return book;
    }

    $scope.createCategoryOject = function () {
        var category = new Object();

        return category;
    }

    $scope.createAuthorOject = function () {
        var author = new Object();

        return author;
    }


    $scope.showRemove = function (book) {
        var txt = "Bạn có muốn xóa " + book.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Xóa',
            bodyText: txt,
        };

        modalService.showModal({}, modalOptions).then(function (result) {
            var bookObj = new Object();
            bookObj.bookId = book.id;
            booksService.removeBook(bookObj, $scope.bookRemovedCompleted, $scope.bookRemovedError);
        });
    }
    $scope.bookRemovedCompleted = function () {
        $location.path("#/categories");
    }

    $scope.bookRemovedError = function (response, status) {

    }

}]);