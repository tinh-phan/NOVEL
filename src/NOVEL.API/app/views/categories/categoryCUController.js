'use strict'
app.controller('categoryCUController', ['$scope', '$rootScope', '$routeParams', '$location', 'categoryService', '$filter', 'modalService', function ($scope, $rootScope, $routeParams, $location, categoryService, $filter, modalService) {

    $scope.init = function () {
        $rootScope.showFullScreen = false;
        $rootScope.showMultiScreen = true;
        $scope.category = {};
        $scope.alerts = [];
        $scope.title = "Thông tin";
        $scope.originalCategory = {};
        var categoryId = ($routeParams.categoryId || "");
        $scope.categoryId = categoryId;
        if (categoryId == "") {
            $scope.category.name = "";
            $scope.title = "Tạo mới";
            $scope.AddMode = true;
            $scope.UpdateMode = false;

            $scope.ShowEditButton = false;
            $scope.ShowCancelButton = false;
            $scope.ShowUpdateButton = false;
        }
        else
        {
            $scope.AddMode = false;
            $scope.UpdateMode = true;
            var getCategory = new Object();
            getCategory.categoryId = categoryId;
            categoryService.getCategoriesWithId(getCategory, $scope.categoryCompleted, $scope.categoryError);
            
        }
        
        //$scope.getCategories();
    }

    $scope.categoryCompleted = function (response, status) {
        $scope.EditMode = false;
        $scope.DisplayMode = true;
        $scope.ShowEditButton = true;
        $scope.ShowCancelButton = false;
        $scope.ShowUpdateButton = false;
        $scope.title = "Thông tin";

        $scope.category.id = response.id;
        $scope.category.name = response.name;
        $scope.originalCategory = $scope.category;
        $scope.addAlert('success', 'Lấy dữ liệu thành công !');
        
    }



    $scope.resetValues = function () {
        $scope.category = $scope.originalCategory;
    }

    $scope.editCategory = function () {
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

    $scope.categoryError = function (response, status) {
        $scope.addAlert('danger', 'Lấy dữ liệu thất bại !');
    }

    $scope.addCategory = function () {
        var category = new Object();
        category.name = $scope.category.name;
        categoryService.createCategory(category, function (response, status) {
            //complete
            $scope.EditMode = false;
            $scope.DisplayMode = true;
            $scope.ShowCreateButton = false;
            $scope.ShowEditButton = true;
            $scope.ShowCancelButton = false;
            $scope.ShowUpdateButton = false;
            $scope.category = response;
            $scope.addAlert('success', 'Tạo mới thành công !');
            }, function (response, status) {
                //error
                $scope.addAlert('danger', 'Tạo mới thất bại !');
        });
    }

    $scope.updateCategory = function () {
        var category = new Object();
        category.categoryId = $scope.category.id;
        category.name = $scope.category.name;
        categoryService.updateCategory(category, function (response, status) {
            //complete
            $scope.category = response;
            $scope.addAlert('success', 'Cập nhật thành công !');

        }, function (response, status) {
            $scope.addAlert('danger', 'Cập nhật thất bại !');
            //error
        });
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
            $scope.addCategory();
        });
    }
    $scope.categoryRemovedCompleted = function () {
        $location.path("#/categories")
    }

    $scope.categoryRemovedError = function (response) {

    }
    ////
    $scope.showAdd = function (category) {
        var txt = "Bạn có muốn tạo mới " + category.name + " !";
        var modalOptions = {
            closeButtonText: 'Không',
            actionButtonText: 'Đồng ý',
            headerText: 'Tạo mới',
            bodyText: txt,
        };

        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.addCategory();
        });
    }

    $scope.showUpdate = function (category) {
        var txt = "Bạn có muốn cập nhật " + category.name + " !";
        var modalOptions = {
            closeButtonText: 'Không',
            actionButtonText: 'Đồng ý',
            headerText: 'Cập nhật',
            bodyText: txt,
        };

        modalService.showModal({}, modalOptions).then(function (result) {
            $scope.updateCategory();
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

}]);