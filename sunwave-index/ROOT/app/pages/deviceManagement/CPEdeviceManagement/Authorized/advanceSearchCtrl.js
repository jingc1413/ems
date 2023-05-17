angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('advanceSearchCtrl', advanceSearchCtrl);

function advanceSearchCtrl($rootScope, $scope, $location, $filter, $uibModalInstance, $uibModal, $log, ) {

    $scope.title = "Choose Group"
    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };


    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}