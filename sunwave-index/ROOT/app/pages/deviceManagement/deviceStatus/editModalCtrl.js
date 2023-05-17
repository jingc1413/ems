angular.module('SunWave.pages.deviceManagement.deviceStatus', [])
    .controller('editModalCtrl', editModalCtrl);

function editModalCtrl($rootScope, $scope, isAdd, checkedItems, deviceStatusService, $uibModalInstance, messageAlertService) {

    $scope.list = {
        dsId: "",
        dsName: ""
    }

    $scope.checkedItems = checkedItems;
    // //console.log($scope.item);

    if (isAdd == "add") {
        // $scope.title = "Add";
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
        $scope.isReadonly = false;
    } else {
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '编辑'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.list = $scope.checkedItems;
        $scope.isReadonly = true;

    }

    //保存
    $scope.saveEdit = function() {

        var newItems = {};
        newItems = $scope.list;
        if (isAdd == 'add') {
            deviceStatusService.addContent(newItems).success(function(res) {
                if (res.msg == '操作成功') {
                    // alert('Success!');
                    messageAlertService.successFun('success');
                    $scope.close();
                } else {
                    // alert('Falied!' + res.msg)
                    messageAlertService.successFun('failed');

                };
            });
        } else if (isAdd == 'edit') {
            deviceStatusService.editContent(newItems).success(function(res) {
                if (res.msg == '操作成功') {
                    // alert('Success!');
                    messageAlertService.successFun('success');
                    $scope.close();
                } else {
                    // alert('Failed!' + res.msg)
                    messageAlertService.successFun('failed');

                };
            });
        } else {
            $scope.close();
        };

    };

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}