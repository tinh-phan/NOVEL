'use strict'
app.controller('categoriesController', ['$scope', '$rootScope', '$location', 'categoryService', '$filter', 'modalService', function ($scope, $rootScope, $location, categoryService, $filter, modalService) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.categories = [];
        //$scope.getCategories();
        
        categoryService.getCategoriesAsync().then(function (data) {
            $scope.categories = data;
            //alert($scope.categories);
        });
        
        //window.location.reload();
    }

    $scope.changes = function () {
        $scope.getCategories();
    }

    $scope.categoryCompleted = function (response, status) {
        $scope.categories = response;
    }

    $scope.categoryError = function (response, status) {

    }
    $scope.getCategories = function () {
        // category = $scope.createcategoryOject();
        categoryService.getCategories($scope.categoryCompleted, $scope.categoryError);
    }

    $scope.getCategoriesById = function () {
        category = $scope.createcategoryOject();
        categoryService.getCategories(category, $scope.categoryCompleted, $scope.categoryError);
    }
    $scope.createcategoryOject = function () {
        var category = new Object();

        return category;
    }

    $scope.createCategoryOject = function () {
        var category = new Object();

        return category;
    }
    $scope.showRemove = function (category) {
        var txt = "Bạn có muốn xóa " + category.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Xóa',
            bodyText: txt,
        };

        modalService.showModal({}, modalOptions).then(function (result) {
            var categoryObj = new Object();
            categoryObj.categoryId = category.id;
            categoryService.removeCategory(categoryObj, $scope.categoryRemovedCompleted, $scope.categoryRemovedError);
        });
    }
    $scope.categoryRemovedCompleted = function () {
        $location.path("#/categories");
    }

    $scope.categoryRemovedError = function (response, status) {

    }

}]);