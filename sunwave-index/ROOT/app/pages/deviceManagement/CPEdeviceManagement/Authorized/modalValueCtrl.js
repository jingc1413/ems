angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('modalValueCtrl', modalValueCtrl);

function modalValueCtrl($rootScope, $scope, showInfo, neNeId, $filter, AuthorizedService, $uibModalInstance, $uibModal, $log, ) {

    $scope.info = showInfo;
    $scope.neNeId = neNeId;
    $scope.valueChange = false;
    $scope.valueIsChange = false;
    $scope.valueIsChange = function() {
        $scope.valueIsChange = true;
    };

    $scope.save = function() {
        $scope.info.newValue = $scope.newValue;
        AuthorizedService.saveModalValue($scope.info, neNeId)
            .success(function(response) {
                // alert("Waiting !");
                swal({
                    title: "Tips:",
                    text: "Waiting !",
                    icon: "success",
                    timer: 4000,
                });
                // $scope.info.nodeValue = '';
                $scope.valueChange = true;
                $uibModalInstance.close($scope.valueChange);
            })
            .error(function(err) {
                console.info(err);
                // alert("Fail !");
                swal({
                    title: "Tips:",
                    text: "Fail !",
                    icon: "error",
                    timer: 4000,
                });
            });
    }

    $scope.close = function() {
        // var truthBeTold = window.confirm("After closing,your chenges will not be saved, Are you sure ?");
        if ($scope.valueIsChange) {
            swal({
                title: "Waring",
                text: "After closing,your chenges will not be saved, Are you sure ?",
                icon: "warning",
                buttons: {
                    cancel: true,
                    confirm: true,
                },
            }).then(function(isOk) {
                if (isOk) {
                    $uibModalInstance.close();
                }
            })
        } else {
            $uibModalInstance.close();
        }

    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}