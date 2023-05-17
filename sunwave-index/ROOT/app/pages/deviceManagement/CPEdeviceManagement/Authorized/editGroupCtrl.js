angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('editGroupCtrl', editGroupCtrl);

function editGroupCtrl($rootScope, $scope, $filter, AuthorizedService, $uibModalInstance, $uibModal, $log, item) {
    $scope.param = angular.copy(item);
    // $scope.param = item;

    $scope.save = function() {
        AuthorizedService.editGroup($scope.param)
            .success(function(response) {
                if (response.code == 200) {
                    alert(response.msg);
                    $scope.close();
                } else {
                    alert(response.msg);
                };
            })
            .error(function(err) {
                console.info(err);
                alert("Fail !")
            });
    }

    $scope.close = function(items) {
        $uibModalInstance.close(items);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}