angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('deviceCountCtrl', deviceCountCtrl);

function deviceCountCtrl($rootScope, $scope, isAdd, $filter, $uibModalInstance, $uibModal, $log, ) {

    $scope.modal = {
        neLastupdatetime: ""
    }

    $scope.title = "Choose Group"
    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    $scope.modal.neLastupdatetime = $filter('date')("2020-07-22 20:11", 'yyyy-MM-dd')
    $scope.items = [{
            "name": "sunwave",
            "description": "1111"
        },
        {
            "name": "sunwave1",
            "description": "11112"
        }
    ]

    //console.log($scope.items);

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}