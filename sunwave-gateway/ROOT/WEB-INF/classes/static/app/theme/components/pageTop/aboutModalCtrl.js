angular.module('SunWave.theme.components', [])
    .controller('aboutModalCtrl', aboutModalCtrl);

function aboutModalCtrl($scope, $uibModalInstance) {

    $scope.title = "About";
    $scope.close = function() {
        $uibModalInstance.close();
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}