"use strict"
app.service('categoryService', ['$q', '$http', 'ajaxService', function ($q, $http, ajaxService, toaster) {
    this.getCategories = function (successFunction, errorFunction) {
        ajaxService.ajaxGet("api/categories", successFunction, errorFunction);
    };

    this.getCategoriesWithId = function (categoryId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(categoryId, "api/categories/GetCategoryById", successFunction, errorFunction);
    };

    this.createCategory = function (category, successFunction, errorFunction) {
        ajaxService.ajaxPost(category, "api/categories/CreateCategory", successFunction, errorFunction);
    };

    this.updateCategory = function (category, successFunction, errorFunction) {
        ajaxService.ajaxPost(category, "api/categories/UpdateCategory", successFunction, errorFunction);
    };

    this.removeCategory = function (categoryId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(categoryId, "api/categories/DeleteCategory", successFunction, errorFunction);
    };

    //this.getCategoriesAsync = function () {
    //    ajaxService.ajaxGetWithAsync("api/categories");
    //};

    //Khong su dung ajaxService
    this.getCategoriesAsync = function () {
        var deferred = $q.defer();
        $http({ method: 'GET', url: "api/categories" }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        })
        return deferred.promise;
    };

}]);