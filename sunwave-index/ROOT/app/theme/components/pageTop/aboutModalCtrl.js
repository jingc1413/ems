angular.module('SunWave.theme.components', [])
    .controller('aboutModalCtrl', aboutModalCtrl);

function aboutModalCtrl($rootScope, $scope, $uibModalInstance) {

    $scope.title = "About";
    // $rootScope.version = '1.0';
    $scope.myVersion = $rootScope.version;
    $scope.close = function() {
        $uibModalInstance.close();
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}