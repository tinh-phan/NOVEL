'use strict'
app.controller('bookCUController', ['$scope', '$rootScope', '$routeParams', '$location', 'booksService', '$filter', '$modal', 'modalService', '$log', function ($scope, $rootScope, $routeParams, $location, booksService, $filter, $modal, modalService, $log) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.book = {};
        $scope.alerts = [];
        $scope.title = "Thông tin";
        var bookId = ($routeParams.bookId || "");
        $scope.bookId = bookId;
        if (bookId == "") {
            $scope.book.name = "";
            $scope.title = "Tạo mới";
            $scope.AddMode = true;
            $scope.UpdateMode = false;

            $scope.ShowEditButton = false;
            $scope.ShowCancelButton = false;
            $scope.ShowUpdateButton = false;
        }
        else {
            $scope.AddMode = false;
            $scope.UpdateMode = true;
            var getbook = new Object();
            getbook.bookId = bookId;
            booksService.getBooksWithId(getbook, $scope.bookCompleted, $scope.bookError);

        }

        //$scope.getCategories();
    }

    $scope.bookCompleted = function (response, status) {
        $scope.EditMode = false;
        $scope.DisplayMode = true;
        $scope.ShowEditButton = true;
        $scope.ShowCancelButton = false;
        $scope.ShowUpdateButton = false;
        $scope.title = "Thông tin";

        $scope.book.id = response.id;
        $scope.book.name = response.name;
        $scope.book.description = response.description;
        $scope.book.imageUrl = response.imageUrl;
        $scope.book.status = response.status;
        $scope.book.authorId = response.authorId;

        $scope.originalbook = $scope.book;
        $scope.addAlert('success', 'Lấy dữ liệu thành công !');

    }

    $scope.resetValues = function () {
        $scope.book = $scope.originalbook;
    }

    $scope.editBook = function () {
        $scope.title = "Cập nhật";
        $scope.ShowEditButton = false;
        $scope.ShowCancelButton = true;
        $scope.EditMode = true;
        $scope.DisplayMode = false;
    }

    $scope.cancelChanges = function () {
        $scope.title = "Thông tin";
        $scope.ShowCreateButton = false;
        $scope.ShowEditButton = true;
        $scope.ShowCancelButton = false;
        $scope.ShowUpdateButton = false;
        $scope.EditMode = false;
        $scope.DisplayMode = true;

        $scope.resetValues();
    }

    $scope.bookError = function (response, status) {
        $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
    }

    $scope.addBook = function () {
        var book = new Object();

        book.name = $scope.book.name;
        book.description = $scope.book.description;
        book.imageUrl = $scope.book.imageUrl;
        book.status = $scope.book.status;
        book.authorId = $scope.book.authorId;
        book.categoriesId = $scope.book.categoriesId
        booksService.createBook(book, function (response, status) {
            //complete
            $scope.EditMode = false;
            $scope.DisplayMode = true;
            $scope.ShowCreateButton = false;
            $scope.ShowEditButton = true;
            $scope.ShowCancelButton = false;
            $scope.ShowUpdateButton = false;
            $scope.book = response;
            $scope.addAlert('success', 'Tạo mới thành công !');
        }, function (response, status) {
            //error
            $scope.addAlert('danger', 'Tạo mới thất bại !');
        });
    }

    $scope.updateBook = function () {
        var book = new Object();

        book.bookId = $scope.book.id;
        book.name = $scope.book.name;
        book.description = $scope.book.description;
        book.imageUrl = $scope.book.imageUrl;
        book.status = $scope.book.status;
        book.authorId = $scope.book.authorId;
        booksService.updateBook(book, function (response, status) {
            //complete
            $scope.book = response;
            $scope.addAlert('success', 'Cập nhật thành công !');

        }, function (response, status) {
            $scope.addAlert('danger', 'Cập nhật thất bại !');
            //error
        });
    }

    $scope.createbookOject = function () {
        var book = new Object();

        return book;
    }

    $scope.createbookOject = function () {
        var book = new Object();

        return book;
    }
    $scope.showRemove = function (book) {
        var txt = "Bạn có muốn xóa " + book.name + " !";
        var modalOptions = {
            closeButtonText: 'Hủy',
            actionButtonText: 'Đồng ý',
            headerText: 'Xóa',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.addBook();
        });
    }
    $scope.bookRemovedCompleted = function () {
        $location.path("#/books")
    }

    $scope.bookRemovedError = function (response) {

    }
    ////
    $scope.showAdd = function (book) {
        var txt = "Bạn có muốn tạo mới " + book.name + " !";
        var modalOptions = {
            closeButtonText: 'Không',
            actionButtonText: 'Đồng ý',
            headerText: 'Tạo mới',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.addBook();
        });
    }

    $scope.showUpdate = function (book) {
        var txt = "Bạn có muốn cập nhật " + book.name + " !";
        var modalOptions = {
            closeButtonText: 'Không',
            actionButtonText: 'Đồng ý',
            headerText: 'Cập nhật',
            bodyText: txt,
        };
        // Không sử dụng service modal
        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.updateBook();
        });
    }

    //alert


    //[
    //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    //];

    $scope.addAlert = function (type, message) {
        $scope.alerts.push({ type: type, msg: message });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    // Thêm modal vào author

    $scope.openAuthorModal = function () {
        var modalInstances = $modal.open({
            animation: true,
            templateUrl: 'authorModal.html',
            controller: 'authorModalInstanceCtrl',
            size: 'lg',
            resolve: {
                authorId: function () {
                    return $scope.book.authorId;
                }
            }
        });

        modalInstances.result.then(function (authorId) {
            $scope.book.authorId = authorId;
            
        }, function () {
            $log.info('Modal Dismissed at: ' + new Date());
            $scope.init();
        });


    };

    ///

    //Them modal vao category
    $scope.openCategoryModal = function () {
        var modalInstances = $modal.open({
            animation: true,
            templateUrl: 'categoryModal.html',
            controller: 'categoryModalInstanceCtrl',
            size: 'lg',
            resolve: {
                categoriesId: function () {
                    return $scope.book.categoriesId;
                }
            }
        });

        modalInstances.result.then(function (categoriesId) {
            $scope.book.categoriesId = categoriesId;
            $log.log('Ket qua :');
            for (var i = 0 ; i < $scope.book.categoriesId.length; i++) {
                $log.log($scope.book.categoriesId[i]);
            }

        }, function () {
            $log.info('Modal Dismissed at: ' + new Date());
            $scope.init();
        });


    };

    $scope.htmlContent = 'Hello';

}]);

app.controller('authorModalInstanceCtrl', ['$scope', '$modal', '$modalInstance', 'authorId', 'authorService', '$log', function ($scope, $modal, $modalInstance, authorId, authorService, $log) {
    
    $scope.init = function () {
        
        //$scope.authorId = authorId;
        $scope.authors = [];
        $scope.alerts = [];
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.maxSize = 7;
        //authorService.getAuthorsAll(function (response, status) {
        //    $scope.authors = response;
        //}, function (response) {

        //});

        authorService.getAuthorsAllWithPaging($scope.itemsPerPage, $scope.currentPage).then(function (data) {
            $scope.totalItems = data.totalItem;
            $log.log($scope.totalItems);
            $scope.authors = data.authors;
            $scope.addAlert('success', 'Lấy dữ liệu thành công !');
        })
        $scope.currentSelect();

        //
        $scope.AddMode = false;
        $scope.UpdateMode = false;
        $scope.DisplayMode = true;
        $scope.ShowEditButton = true;
        $scope.ShowAddButton = true;
        $scope.ShowCancelButton = false;
        $scope.ShowUpdateButton = false;
    }

    $scope.maxSize = 7;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
        
        authorService.getAuthorsAllWithPaging($scope.itemsPerPage, $scope.currentPage).then(function (data) {
            $scope.totalItem = data.totalItem;
            $scope.authors = data.authors;
            //$scope.addAlert('success', 'Lấy dữ liệu thành công !');
        })
    };

    $scope.SelectAddMode = function () {
        $scope.author = {};

        $scope.AddMode = true;
        $scope.UpdateMode = false;
        $scope.DisplayMode = false;
        $scope.ShowEditButton = false;
        $scope.ShowAddButton = true;

        $scope.ShowCancelButton = false;
        $scope.ShowUpdateButton = false;

    }

    $scope.SelectEditMode = function (authorId) {
        $scope.author = {};
        var authorObj = new Object();
        
        authorObj.authorId = authorId;
        authorService.getAuthorsWithId(authorObj, function (response, status) {
            $scope.author = response;
            $scope.addAlert("success", "Lấy dữ liệu thành công !");
        }, function (response) {
            $scope.addAlert("success", "Lấy dữ liệu thất bại !");
        });
        $scope.AddMode = false;
        $scope.UpdateMode = true;
        $scope.DisplayMode = false;
        $scope.ShowEditButton = true;
        $scope.ShowAddButton = false;
        $scope.ShowCancelButton = false;

        $scope.ShowUpdateButton = true;

    }

    $scope.RemoveAuthor = function (authorId) {
        var authorObj = new Object();
        authorObj.authorId = authorId;

        authorService.removeAuthorWithId(authorObj, function (response, status) {
            //$scope.author = response;
            $scope.addAlert("success", "Xóa dữ liệu thành công !");
        }, function (response) {
            $scope.addAlert("success", "Xóa dữ liệu thất bại !");
        });
        $scope.init();
    }

    $scope.AddAuthor = function () {
        var author = new Object();
        author.name = $scope.author.name;
        author.description = $scope.author.description;
        author.imageUrl = $scope.author.imageUrl;
        //author.userName = $scope.author.userName;
        authorService.createAuthor(author, function (response, status) {
            $scope.addAlert("success", "Tạo tác giả thành công !");
        }, function (response) {
            $scope.addAlert("danger", "Tạo tác giả thất bại !");
        })
        $scope.init();
        //$scope.AddMode = false;
        //$scope.UpdateMode = false;
        //$scope.DisplayMode = true;
        //$scope.ShowEditButton = true;
        //$scope.ShowAddButton = true;
        //$scope.ShowCancelButton = false;
        //$scope.ShowUpdateButton = false;
    }

    $scope.UpdateAuthor = function () {

        var authorObj = new Object();
        authorObj.authorId = $scope.author.id;
        authorObj.name = $scope.author.name;
        authorObj.description = $scope.author.description;
        authorObj.imageUrl = $scope.author.imageUrl;
        //authorObj.isLocked = $scope.author.isLocked;
        authorService.updateAuthor(authorObj, function (response, status) {
            $scope.addAlert("success", "Cập nhật tác giả thành công !");
        }, function (response) {
            $scope.addAlert("danger", "Cập nhật tác giả thất bại !");
        })
        $scope.init();
        //$scope.AddMode = false;
        //$scope.UpdateMode = false;
        //$scope.DisplayMode = true;
        //$scope.ShowEditButton = true;
        //$scope.ShowAddButton = true;
        //$scope.ShowCancelButton = false;
        //$scope.ShowUpdateButton = false;
    }

    $scope.currentSelect = function () {
        for (var i = 0; i < $scope.authors.length; i++) {
            if ($scope.authors[i].id == $scope.authorId) {
                return $scope.authors[i].name;
            }
        }
        return "";
    }

    $scope.select = function (id) {
        $scope.authorId = id;
        $scope.currentSelect();
    }

    $scope.ok = function (authorId) {
        if (authorId != '') {
            $modalInstance.close(authorId);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.addAlert = function (type, message) {
        $scope.alerts.push({ type: type, msg: message });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    
}]);


app.controller('categoryModalInstanceCtrl', ['$scope', '$modal', '$modalInstance', 'categoriesId', 'categoryService', '$log', function ($scope, $modal, $modalInstance, categoriesId, categoryService, $log) {

    $scope.init = function () {

        $scope.categories = [];
        $scope.alerts = [];
        $scope.categoriesObj = [];
        categoryService.getCategoriesAsync().then(function (data) {
            $scope.categories = data;
            $scope.addAlert('success', 'Lấy dữ liệu thành công !');
            //alert($scope.categories);
        });
        //$scope.currentSelect();

        //
    }

    $scope.currentSelect = function () {
        for (var i = 0; i < $scope.authors.length; i++) {
            if ($scope.authors[i].id == $scope.authorId) {
                return $scope.authors[i].name;
            }
        }
        return "";
    }

    $scope.select = function (categoryId) {
        var duplicate = false;
        for (var i = 0; i < $scope.categoriesObj.length; i++) {
            if ($scope.categoriesObj[i] == categoryId) {
                duplicate = true;
            }
        }
        if (duplicate == false) {
            $scope.categoriesObj.push(categoryId);
        }
        $log.log('select');
        for (var i = 0; i < $scope.categoriesObj.length; i++) {
            $log.log($scope.categoriesObj[i]);
        }
        
    }

    $scope.deSelect = function (categoryId) {
        for (var i = 0; i < $scope.categoriesObj.length; i++) {
            if ($scope.categoriesObj[i] == categoryId) {
                $scope.categoriesObj.splice(i, 1);
            }
        }
        $log.log('deSelect');
        for (var i = 0; i < $scope.categoriesObj.length; i++) {
            $log.log($scope.categoriesObj[i]);
        }
    }

    $scope.btnShow = function (categoryId) {
        for (var i = 0; i < $scope.categoriesObj.length; i++) {
            if ($scope.categoriesObj[i] == categoryId) {
                return false;
            }
        }
        return true;
    }

    $scope.ok = function () {
        if ($scope.categoriesObj.length > 0) {
            $modalInstance.close($scope.categoriesObj);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.addAlert = function (type, message) {
        $scope.alerts.push({ type: type, msg: message });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

}]);


