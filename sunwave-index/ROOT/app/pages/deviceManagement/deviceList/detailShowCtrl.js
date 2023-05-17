angular.module('SunWave.pages.deviceManagement.deviceList', [])
    .controller('detailShowCtrl', detailShowCtrl);

function detailShowCtrl($rootScope, $scope, transmitModalItems, deviceListService, $uibModalInstance, $uibModal, $log) {
    $scope.title = 'Detail';
    $scope.detail = transmitModalItems;
    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };


}