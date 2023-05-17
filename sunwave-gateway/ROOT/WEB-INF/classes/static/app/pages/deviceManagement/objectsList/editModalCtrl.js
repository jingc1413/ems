
angular.module('SunWave.pages.deviceManagement.objectsList', [])
.controller('editModalCtrl', editModalCtrl);

function editModalCtrl($scope,isAdd,checkedItems,objectsListService,$uibModalInstance) {

$scope.list={
    objActiveTypeDiv:"",
    objActivetype:"",
    objObjid:"",
    objObjname:"",
    objObjtype:"",
    objOid:""
}

$scope.checkedItems = checkedItems;
// console.log($scope.item);

if(isAdd=="add"){
    $scope.title = "Add";
    $scope.isReadonly = false;
}
else{
    $scope.title = "Modify";
    $scope.list = $scope.checkedItems;
    $scope.isReadonly = true;

}

//保存
$scope.saveEdit = function() {

    var newItems = {};
    newItems = $scope.list;
    if (newItems.objObjid.length <= 4) {
        if (isAdd=="add") {
            // newItems.valueId = 11;
            //校验objid
            objectsListService.checkObjIdExist(newItems.objObjid).success(res=>{
                if (res.data == true) {
                    objectsListService.addContent(newItems).success(response=>{
                        if (response.msg == '操作成功') {
                            alert('Save Success！');
                            $scope.close();
                        }else{
                            alert('Save Failed!'+ res.msg)
                        }
                    });
                }else{
                    alert('Objid is already in use!')
                }
            })

        }else{
            objectsListService.editContent(newItems).success(function(response){
                if (response.msg == '操作成功') {
                    alert('Modify Success！');
                    $scope.close();
                }else{
                    alert('Modify Failed!'+ response.msg);
                }
            });
        }
    }else{
        alert('objId 长度只能小于等于4')
    }

}

/*点取消按钮*/
$scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
};

$scope.close = function(newItems){
    $uibModalInstance.close(newItems);
};

}