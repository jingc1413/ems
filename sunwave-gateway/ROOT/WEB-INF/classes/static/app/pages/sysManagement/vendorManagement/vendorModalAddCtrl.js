angular.module('SunWave.pages.sysManagement.vendorModal', [])
    .controller('vendorModalAddCtrl', vendorModalAddCtrl);

function vendorModalAddCtrl($scope, vendorManagementService, isAdd, transmitModalItems, $uibModalInstance) {

    // console.log('transmitModalItems:' + transmitModalItems);
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
        coShow: 0
    };

    $scope.isShow = false;
    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'add') {
        $scope.title = 'Add';
        $scope.isShow = true;
    } else if ($scope.isAdd == 'modify') {
        $scope.title = "Modify";
        $scope.isShow = true;
        $scope.vendor = transmitModalItems;


    } else {
        $scope.title = "View";
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
                        alert("Success");
                        $scope.close();
                    } else {
                        alert("failed" + response.data.msg)
                    }
                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'modify') {
            vendorManagementService.editContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        alert("Success");
                        $scope.close();
                    } else {
                        alert("failed" + response.data.msg)
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