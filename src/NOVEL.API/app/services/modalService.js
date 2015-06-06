/// <reference path="../../scripts/angular.min.js" />
app.service('modalService', ['$modal', function ($modal) {
    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        size: 'sm',
        templateUrl: 'app/views/modalService.html'
    };

    var modalOptions = {
        closeButtonText: 'Close',
        actionButtonText: 'Ok',
        headerText: 'Proceed?',
        bodyText: 'Body',
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        //customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
        //Tạo đối tượng tạm để làm việc với singleton service 
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //ánh xạ angular-ui modal tùy chỉnh mặc định sang modal mặc định được định nghĩa trong service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //ánh xạ modal.html $scope thuộc tính tùy chọn vào mặc định đã định nghĩa trong service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        //
        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    //
                    //result = modalOptions.bodyText;
                    $modalInstance.close(result);
                };

                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }
        }

        return $modal.open(tempModalDefaults).result;
    };
}]);