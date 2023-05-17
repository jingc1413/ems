angular.module('SunWave.theme.components', [])
    .controller('serverStatusModalCtrl', serverStatusModalCtrl);

function serverStatusModalCtrl($scope, id, item, serverStatusModalService, $filter, $uibModalInstance) {
    $scope.id = id;
    $scope.item = item;
    if ($scope.item) {
        $scope.modal = $scope.item;
        $scope.modal.updatetime = $scope.item.updateTime;
        $scope.modal.updatetime = $filter('date')(new Date(), 'yyyy-MM-dd 00:00:00');
        $scope.modal.hostname = $scope.item.hostName;
    }

    $scope.title = 'Detail';
    // serverStatusModalService.findNecomputerById($scope.id).success(function(res) {
    //     //console.log(res);
    //     $scope.modal = res.data;
    //     $scope.modal.changetime = $filter('date')(new Date(), 'yyyy-MM-dd 00:00:00');
    //     $scope.modal.updatetime = $filter('date')(new Date(), 'yyyy-MM-dd 00:00:00');
    // });


    $scope.alarmConfirm = function() {
        serverStatusModalService.confirmNeComputer($scope.id).success(function(res) {
            if (res.data == true && res.code == 200) {
                alert('Success!')
            } else {
                alert(res.msg)
            }
        })
    };


    $scope.close = function(items) {
        $uibModalInstance.close();
    };

}