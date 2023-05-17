angular.module('SunWave.pages.deviceManagement.deviceType', [])
    .controller('editModalCtrl', editModalCtrl);

function editModalCtrl($rootScope, $scope, isAdd, checkedItems, deviceTypeService, $uibModalInstance, messageAlertService) {

    $scope.isModify = true;

    // $scope.isSave = true;

    $scope.list = {
        dtpClassifyid: "",
        dtpDevicetypeid: "",
        dtpName: "",
        dtpProtocoldevicetypeid: "",
        dtpProtocoltypeid: "",
        dtpIseffectcontrol: ""
    }

    $scope.checkedItems = checkedItems;
    // //console.log($scope.item);

    if (isAdd == "add") {
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
        // $scope.title = "Add";
        $scope.isReadonly = false;
        $scope.isModify = false;
    } else {
        if ($rootScope.language == 'chinese') {
            $scope.title = '编辑'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        // $scope.title = "Modify";
        $scope.list = $scope.checkedItems;
        $scope.isReadonly = true;

    }

    //保存
    $scope.saveEdit = function() {

        var newItems = {};
        newItems = $scope.list;
        newItems.dtpClassifyid = Number($scope.list.dtpClassifyid);
        newItems.dtpDevicetypeid = Number($scope.list.dtpDevicetypeid);
        newItems.dtpProtocoldevicetypeid = Number($scope.list.dtpProtocoldevicetypeid);
        newItems.dtpProtocoltypeid = Number($scope.list.dtpProtocoltypeid);
        newItems.dtpIseffectcontrol = Number($scope.list.dtpIseffectcontrol);
        if (isAdd == 'add') {
            deviceTypeService.addContent(newItems).success(function(res) {
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
            deviceTypeService.editContent(newItems).success(function(res) {
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