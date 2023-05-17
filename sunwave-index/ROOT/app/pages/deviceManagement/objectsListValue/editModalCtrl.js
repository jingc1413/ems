angular.module('SunWave.pages.deviceManagement.objectsListValue', [])
    .controller('editModalCtrl', editModalCtrl);

function editModalCtrl($rootScope, $scope, isAdd, checkedItems, objectsListValueService, $uibModal, $uibModalInstance, messageAlertService) {

    $scope.listValue = {
        valueDesc: "",
        valueId: "",
        valueKey: "",
        valueSort: "",
        valueValue: ""
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
    } else {
        if ($rootScope.language == 'chinese') {
            $scope.title = '编辑'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.listValue = $scope.checkedItems;

    }

    //保存
    $scope.saveEdit = function() {

        var newItems = {};
        newItems = $scope.listValue;
        if (isAdd == "add") {
            newItems.valueId = 11;
            objectsListValueService.addContent(newItems).success(function(res) {
                if (res.msg == '操作成功') {
                    // alert('Save Success！');
                    messageAlertService.successFun('success');
                    $scope.close();
                } else {
                    // alert('Save Failed!' + res.msg)
                    messageAlertService.successFun('failed');
                }
            });
        } else {
            objectsListValueService.editContent(newItems).success(function(response) {
                if (response.msg == '操作成功') {
                    // alert('Modify Success！');
                    messageAlertService.successFun('success');
                    $scope.close();
                } else {
                    // alert('Modify Failed!' + res.msg);
                    messageAlertService.successFun('failed');
                }
            });
        }
    }

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}