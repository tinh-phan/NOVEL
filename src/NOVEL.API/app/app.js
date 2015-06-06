/// <reference path="../scripts/angular.min.js" />

var app = angular.module('NovelApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'toaster', 'chieffancypants.loadingBar', 'LocalStorageModule', 'textAngular', 'ngAnimate']);
//var app = angular.module('NovelApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'toaster', 'chieffancypants.loadingBar', 'LocalStorageModule']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "app/views/home.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "app/views/signup.html"
    });

    $routeProvider.when("/books", {
        controller: "booksController",
        templateUrl: "app/views/books/books.html"
    });
    $routeProvider.when("/books/category/:categoryName", {
        controller: "booksOfCategoryController",
        templateUrl: "app/views/books/booksOfCategory.html"
    });
    $routeProvider.when("/books/author/:authorName", {
        controller: "booksOfAuthorController",
        templateUrl: "app/views/books/booksOfAuthor.html"
    });
    $routeProvider.when("/books/:bookName", {
        controller: "bookDetailController",
        templateUrl: "app/views/books/bookDetail.html"
    });
    $routeProvider.when("/books/:bookName/page/:page", {
        controller: "bookDetailController",
        templateUrl: "app/views/books/bookDetail.html"
    });
    $routeProvider.when("/categories", {
        controller: "categoriesController",
        templateUrl: "app/views/categories/categories.html"
    });
    $routeProvider.when("/category", {
        controller: "categoryCUController",
        templateUrl: "app/views/categories/categoryCU.html"
    });
    $routeProvider.when("/category/:categoryId", {
        controller: "categoryCUController",
        templateUrl: "app/views/categories/categoryCU.html"
    });
    $routeProvider.when("/book", {
        controller: "bookCUController",
        templateUrl: "app/views/books/bookCU.html"
    });
    $routeProvider.when("/book/:bookId", {
        controller: "bookCUController",
        templateUrl: "app/views/books/bookCU.html"
    });

    $routeProvider.when("/book/:bookId/chapters", {
        controller: "chaptersController",
        templateUrl: "app/views/chapters/chapters.html"
    });

    $routeProvider.when("/book/:bookId/chapter", {
        controller: "chapterAddController",
        templateUrl: "app/views/chapters/chapterAdd.html"
    });

    $routeProvider.when("/chapter/:chapterId", {
        controller: "chapterUpdateController",
        templateUrl: "app/views/chapters/chapterUpdate.html"
    });

    $routeProvider.when("/book/:bookId/chapter/:ordinal", {
        controller: "chapterController",
        templateUrl: "app/views/chapters/chapter.html"
    });

    $routeProvider.when("/authors", {
        controller: "authorsController",
        templateUrl: "app/views/authors/authors.html"
    });

    $routeProvider.when("/author", {
        controller: "authorAddController",
        templateUrl: "app/views/authors/authorAdd.html"
    });

    $routeProvider.when("/author/:authorId", {
        controller: "authorUpdateController",
        templateUrl: "app/views/authors/authorUpdate.html"
    });

    $routeProvider.when("/books/search/:input", {
        controller: "searchResultsController",
        templateUrl: "app/views/books/searchResults.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);