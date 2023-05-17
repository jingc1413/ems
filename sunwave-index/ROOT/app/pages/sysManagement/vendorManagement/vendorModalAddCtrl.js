angular.module('SunWave.pages.sysManagement.vendorModal', [])
    .controller('vendorModalAddCtrl', vendorModalAddCtrl);

function vendorModalAddCtrl($rootScope, $scope, vendorManagementService, isAdd, transmitModalItems, $uibModalInstance, messageAlertService) {

    // //console.log('transmitModalItems:' + transmitModalItems);
    $scope.transmitModalItems = transmitModalItems;
    $scope.IsSave = true;

    $scope.vendor = {
        coName: "",
        coAddress: "",
        coMan: "",
        coTel: "",
        coMoble: "",
        coEmail: "",
        coMan: "",
        coManufacturerOUI: "",
        coManufacturer: "",
        coShow: 0
    };

    $scope.isShow = false;
    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'add') {
        // $scope.title = 'Add';
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
        $scope.isShow = true;
    } else if ($scope.isAdd == 'modify') {
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '修改'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.isShow = true;
        $scope.vendor = transmitModalItems;


    } else {
        // $scope.title = "View";
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        };
        $scope.IsSave = true;

        $scope.isShow = false;
        $scope.vendor = transmitModalItems;
    }

    $scope.save = function() {
        var newItems = {};
        newItems = $scope.vendor;

        if ($scope.isAdd == 'add') {
            vendorManagementService.addContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        // alert("Success");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert("failed" + response.data.msg)
                        messageAlertService.successFun('failed', response.msg);
                    }
                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'modify') {
            vendorManagementService.editContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        // alert("Success");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert("failed" + response.data.msg)
                        messageAlertService.successFun('failed', response.msg);
                    }
                })
                .error(function(err) {
                    console.info(err);
                });

        } else {
            $scope.close();
        }


    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };
}