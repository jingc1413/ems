
angular.module('SunWave.pages.deviceManagement.objectsListValue', [])
.controller('editModalCtrl', editModalCtrl);

function editModalCtrl($scope,isAdd,checkedItems,objectsListValueService,$uibModal,$uibModalInstance) {

$scope.listValue={
    valueDesc:"",
    valueId:"",
    valueKey:"",
    valueSort:"",
    valueValue:""
}

$scope.checkedItems = checkedItems;
// console.log($scope.item);

if(isAdd=="add"){
    $scope.title = "Add";
}
else{
    $scope.title = "Modify";
    $scope.listValue = $scope.checkedItems;

}

//保存
$scope.saveEdit = function() {

    var newItems = {};
    newItems = $scope.listValue;
    if (isAdd=="add") {
        newItems.valueId = 11;
        objectsListValueService.addContent(newItems).success(function(res){
            if (res.msg == '操作成功') {
                alert('Save Success！');
                $scope.close();
            }else{
                alert('Save Failed!'+ res.msg)
            }
        });
    }else{
        objectsListValueService.editContent(newItems).success(function(response){
            if (response.msg == '操作成功') {
                alert('Modify Success！');
                $scope.close();
            }else{
                alert('Modify Failed!'+ res.msg);
            }
        });
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