angular.module('SunWave.pages.deviceManagement.deviceType', [])
    .controller('editModalCtrl', editModalCtrl);

function editModalCtrl($scope, isAdd, checkedItems, deviceTypeService, $uibModalInstance) {

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
    // console.log($scope.item);

    if (isAdd == "add") {
        $scope.title = "Add";
        $scope.isReadonly = false;
        $scope.isModify = false;
    } else {
        $scope.title = "Modify";
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
                    alert('Success!');
                    $scope.close();
                } else {
                    alert('Falied!' + res.msg)

                };
            });
        } else if (isAdd == 'edit') {
            deviceTypeService.editContent(newItems).success(function(res) {
                if (res.msg == '操作成功') {
                    alert('Success!');
                    $scope.close();
                } else {
                    alert('Failed!' + res.msg)

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