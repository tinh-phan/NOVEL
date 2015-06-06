'use strict';
app.controller('homeController', ['$scope', '$rootScope', '$filter', '$location', 'booksService', 'modalService', '$log', function ($scope, $rootScope, $filter,$location, booksService, modalService, $log) {
    $scope.pageSize = 2;
    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.books = [];
        $scope.originalBooks = [];
        $scope.pageSize = 12;
        $scope.disabled = false;

        booksService.getBooksAll(function (response, status) {
            $scope.totalItems = response.totalItem;
            $scope.originalBooks = response.books;
            $log.log($scope.pageSize);
            $scope.books = $scope.originalBooks.slice(0, $scope.pageSize);
        }, function (response) {

        });
        
        $rootScope.isShowFull = true;
        
    }

    $scope.fnSearch = function (input) {
        
    }

    $scope.expandPageSize = function () {
        if (($scope.originalBooks.length - $scope.pageSize) > 4) {
            $log.log('if');
            $scope.pageSize = $scope.pageSize + 4;
            $log.log($scope.pageSize);
        } else
        {
            $log.log('else');
            $scope.pageSize = $scope.pageSize + ($scope.originalBooks.length - $scope.pageSize);
            $log.log($scope.pageSize);
        }
        if ($scope.originalBooks.length == $scope.pageSize) {
            $scope.disabled = true;
        }
        $scope.books = $scope.originalBooks.slice(0, $scope.pageSize);
    }
    
    $scope.bookCompleted = function (response, status) {
        $scope.books = response;
    }

    $scope.bookError = function (response, status) {

    }
    //$scope.getBooks = function () {
        // book = $scope.createBookOject();
        ///booksService.getBooks($scope.bookCompleted, $scope.bookError);
    //}

}]);