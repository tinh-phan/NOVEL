/// <reference path="../../appbuild/ngscripts.min.js" />
/// <reference path="../../scripts/angular.min.js" />
/// <reference path="../app.js" />

"use strict"
app.service('booksService', ['$q', '$http', 'ajaxService', function ($q, $http, ajaxService, toaster) {

    this.getBooksAll = function (successFunction, errorFunction) {
        ajaxService.ajaxGet("api/books/GetBooksAll", successFunction, errorFunction);
    };

    this.getBooks = function (data, successFunction, errorFunction) {
        ajaxService.ajaxGet("api/books?pageSize="+data.pageSize+"&&pageNum="+data.pageNum, successFunction, errorFunction);
    };

    this.getBooksWithCategory = function (successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(categoryId, "api/books/GetBooksByCategory", successFunction, errorFunction);
    };

    this.getBooksWithCategoryName = function (categoryName, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(categoryName, "api/books/GetBooksByCategoryName", successFunction, errorFunction);
    };

    this.getBooksWithBookName = function (bookName, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(bookName, "api/books/GetBookByName", successFunction, errorFunction);
    };

    this.getBooksWithBookNameAsync = function (bookName, pageSize, pageNum) {
        var deferred = $q.defer();
        var Url = "api/books/GetBookByName?bookName=" + bookName + "&&pageSize=" + pageSize + "&&pageNum=" + pageNum;
        $http({ method: 'GET', url: Url }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        })
        return deferred.promise;
    };
    this.FindBookByName = function (requestString, pageSize, pageNum) {
        var deferred = $q.defer();
        var Url = "api/books/FindBookByName?requestString=" + requestString + "&&pageSize=" + pageSize + "&&pageNum=" + pageNum;
        $http({ method: 'GET', url: Url }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        })
        return deferred.promise;
    };
    

    this.getBooksWithAuthorName = function (authorName, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(authorName, "api/books/GetBooksByAuthorName", successFunction, errorFunction);
    };

    this.getBooksWithAuthor = function (successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(authorId, "api/books/GetBooksByAuthor", successFunction, errorFunction);
    };

    this.getBooksWithId = function (bookId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(bookId, "api/books/GetBookById", successFunction, errorFunction);
    };

    this.createBook = function (book, successFunction, errorFunction) {
        ajaxService.ajaxPost(book, "api/books/CreateBook", successFunction, errorFunction);
    };

    this.updateBook = function (book, successFunction, errorFunction) {
        ajaxService.ajaxPost(book, "api/books/UpdateBook", successFunction, errorFunction);
    };
    this.removeBook = function (bookId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(bookId, "api/books/DeleteBook", successFunction, errorFunction);
    };

    this.getBooksAsync = function (data) {
        var deferred = $q.defer();
        var Url = "api/books?pageSize=" + data.pageSize + "&&pageNum=" + data.pageNum;
        $http({ method: 'GET', url: Url }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        })
        return deferred.promise;
    };

    //booksDataFactory.getBooks = _getBooks;
    //booksDataFactory.getBooksWithCategory = _getBooksWithCategory;
    //booksDataFactory.getBooksWithAuthor = _getBooksWithAuthor;
    //booksDataFactory.getBooksWithId = _getBooksWithId;
    //booksDataFactory.createBook = _createBook;
    //booksDataFactory.updateBook = _updateBook
    //booksDataFactory

    //return booksDataFactory;
}]);