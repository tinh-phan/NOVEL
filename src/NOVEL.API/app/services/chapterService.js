"use strict"
app.service('chapterService', ['$q', '$http', 'ajaxService', function ($q, $http, ajaxService, toaster) {
    this.getChapters = function (successFunction, errorFunction) {
        ajaxService.ajaxGet("api/chapters", successFunction, errorFunction);
    };

    this.getChaptersAllWithBookId = function (bookId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(bookId, "api/chapters/GetChaptersAll", successFunction, errorFunction);
    };
    
    this.getChapterWithId = function (chapterId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(chapterId, "api/chapters/GetChapterById", successFunction, errorFunction);
    };

    this.getChapterWithOrdinal = function (bookId, ordinal) {
        var deferred = $q.defer();
        var Url = "api/chapters/GetChapterByOrdinal?bookId=" + bookId + "&&ordinal=" + ordinal;
        $http({ method: 'GET', url: Url }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        })
        return deferred.promise;
    };

    this.getChapterWithBookId = function (bookId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(bookId, "api/chapters/GetChapterByBookId", successFunction, errorFunction);
    };

    this.createChapter = function (chapter, successFunction, errorFunction) {
        ajaxService.ajaxPost(chapter, "api/chapters/CreateChapter", successFunction, errorFunction);
    };

    this.updateChapter = function (chapter, successFunction, errorFunction) {
        ajaxService.ajaxPost(chapter, "api/chapters/UpdateChapter", successFunction, errorFunction);
    };

    this.removeChapter = function (chapterId, successFunction, errorFunction) {
        ajaxService.ajaxGetWithData(chapterId, "api/chapters/DeleteChapter", successFunction, errorFunction);
    };

}]);