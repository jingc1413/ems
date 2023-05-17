angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('domainModalCtrl', domainModalCtrl);

function domainModalCtrl($rootScope, $scope, items, $filter, $uibModalInstance, $uibModal, $log, ) {

    $scope.title = "Choose Group"
    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };

    $scope.items = items;

    //console.log($scope.items);

    $scope.save = function(item) {
            $uibModalInstance.close(item);
        }
        /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}