"use strict"
app.service('authorService', ['$q', '$http', 'ajaxService', function ($q, $http, ajaxService, toaster) {
    this.getAuthors = function (data, successFunction, errorFunction) {
        ajaxService.ajaxGet(data, "api/authors/GetAuthorsAll", successFunction, errorFunction);
    };

    this.getAuthorsAll = function (successFunction, errorFunction) {
        ajaxService.ajaxGet("api/authors/GetAuthorsAll", successFunction, errorFunction);
    };

    this.getAuthorsAllWithPaging = function (pageSize, pageNum) {
            var deferred = $q.defer();
            var Url = "api/authors/GetAuthorsAll?pageSize=" + pageSize + "&&pageNum=" + pageNum;
            $http({ method: 'GET', url: Url }).success(function (data) {
                deferred.resolve(data);
            }).error(function (reason) {
                deferred.reject(reason);
            })
            return deferred.promise;
        };

    this.getAuthorsWithId = function (authorId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(authorId, "api/authors/GetAuthorById", successFunction, errorFunction);
    };

    this.createAuthor = function (author, successFunction, errorFunction) {
        ajaxService.ajaxPost(author, "api/authors/CreateAuthor", successFunction, errorFunction);
    };

    this.updateAuthor = function (author, successFunction, errorFunction) {
        ajaxService.ajaxPost(author, "api/authors/UpdateAuthor", successFunction, errorFunction);
    };

    this.removeAuthorWithId = function (authorId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(authorId, "api/authors/DeleteAuthor", successFunction, errorFunction);
    };

}]);