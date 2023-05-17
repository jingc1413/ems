angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagment', [])
    .controller('editGroupCtrl', editGroupCtrl);

function editGroupCtrl($rootScope, $scope, groupName, $filter, $uibModalInstance, $uibModal, $log, ) {
    //console.log(groupName);
    $scope.info = {
        fullName: "",
        name: "",
    }

    $scope.info.fullName = groupName;
    $scope.info.name = groupName;

    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}