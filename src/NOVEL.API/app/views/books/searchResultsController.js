app.controller('searchResultsController', ['$scope', '$rootScope', '$routeParams', 'booksService', '$location', 'authService', '$filter', '$log', function ($scope, $rootScope, $routeParams, booksService, $location, authService, $filter, $log) {
    $scope.itemsPerPage = 2;
    $scope.maxSize = 7;
    $scope.totalItems = 1;
    

    $scope.setPage = function (pageNo) {
        $scope.pagination.currentPage = pageNo;
    };

    $scope.pageChanged = function () {

        booksService.FindBookByName($scope.requestString, $scope.itemsPerPage, $scope.pagination.currentPage).then(function (data) {
            //$scope.totalItems = data.totalItem;
            $scope.books = data.books;
            $log.log('totalItems: ' + $scope.totalItems);
            if ($scope.totalItems == 0) {

            } else {

            }
        });
    };
    
    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.books = [];
        $scope.error = {};
        $scope.pagination = {};
        $scope.pagination.currentPage = 1;
        $scope.itemsPerPage = 8;

        var input = ($routeParams.input || "");
        if (input == "") {
            $scope.showResult = "";
        } else {
            $scope.requestString = input;
            booksService.FindBookByName($scope.requestString, $scope.itemsPerPage, $scope.pagination.currentPage).then(function (data) {
                $scope.totalItems = data.totalItem;
                $scope.books = data.books;
                $log.log('totalItems: ' + $scope.totalItems);
                if ($scope.totalItems == 0) {

                } else {

                }
            });
            
        }
    }
}]);