angular.module('SunWave.pages.deviceManagement.objectsList', [])
    .controller('editModalCtrl', editModalCtrl);

function editModalCtrl($rootScope, $scope, isAdd, checkedItems, objectsListService, $uibModalInstance, messageAlertService) {

    $scope.list = {
        objActiveTypeDiv: "",
        objActivetype: "",
        objObjid: "",
        objObjname: "",
        objObjtype: "",
        objOid: ""
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
        $scope.isReadonly = false;
    } else {
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
        if (newItems.objObjid.length <= 4) {
            if (isAdd == "add") {
                // newItems.valueId = 11;
                //校验objid
                objectsListService.checkObjIdExist(newItems.objObjid).success(function(res) {
                    if (res.data == true) {
                        objectsListService.addContent(newItems).success(function(response) {
                            if (response.msg == '操作成功') {
                                // alert('Save Success！');
                                messageAlertService.successFun('success');
                                $scope.close();
                            } else {
                                // alert('Save Failed!' + res.msg)
                                messageAlertService.successFun('failed');
                            }
                        });
                    } else {
                        // alert('Objid is already in use!')
                        messageAlertService.inuseFun('in');
                    }
                })

            } else {
                objectsListService.editContent(newItems).success(function(response) {
                    if (response.msg == '操作成功') {
                        // alert('Modify Success！');
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert('Modify Failed!' + response.msg);
                        messageAlertService.successFun('failed');
                    }
                });
            }
        } else {
            alert('objId 长度只能小于等于4')
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