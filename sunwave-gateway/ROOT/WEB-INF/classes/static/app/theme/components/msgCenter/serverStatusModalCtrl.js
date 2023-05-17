angular.module('SunWave.theme.components', [])
    .controller('serverStatusModalCtrl', serverStatusModalCtrl);

function serverStatusModalCtrl($scope, id, serverStatusModalService, $filter, $uibModalInstance) {
    $scope.id = id;

    $scope.title = 'Detail';
    serverStatusModalService.findNecomputerById($scope.id).success((res) => {
        console.log(res);
        $scope.modal = res.data;
        $scope.modal.changetime = $filter('date')(new Date(), 'yyyy-MM-dd 00:00:00');
        $scope.modal.updatetime = $filter('date')(new Date(), 'yyyy-MM-dd 00:00:00');
    });


    $scope.alarmConfirm = () => {
        serverStatusModalService.confirmNeComputer($scope.id).success((res) => {
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