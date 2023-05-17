angular.module('SunWave.pages.map', ['SunWave.pages.deviceManagement.deviceList'])
    .controller('detailModalCtrl', detailModalCtrl);

function detailModalCtrl($scope, $uibModalInstance, transmitModalItems, deviceListService) {

    $scope.transmitModalItems = transmitModalItems;
    $scope.close = function() {
        $uibModalInstance.close();
    };

}