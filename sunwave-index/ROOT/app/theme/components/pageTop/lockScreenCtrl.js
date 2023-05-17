angular.module('SunWave.theme.components', [])
    .controller('lockScreenCtrl', lockScreenCtrl);

function lockScreenCtrl($rootScope, $scope, $window, $uibModalInstance) {

    $scope.locktimes = [{
        'id': 0,
        'name': '1 minutes'

    }, {
        'id': 1,
        'name': '10 minutes'

    }, {
        'id': 2,
        'name': '15 minutes'

    }, {
        'id': 3,
        'name': '30 minutes'

    }, {
        'id': 4,
        'name': '50 minutes'

    }, {
        'id': 5,
        'name': '60 minutes'

    }];
    switch (Number($rootScope.outTime)) {
        case 1:
            $scope.locktime = 0;
            break;
        case 10:
            $scope.locktime = 1;
            break;
        case 15:
            $scope.locktime = 2;
            break;
        case 30:
            $scope.locktime = 3;
            break;
        case 50:
            $scope.locktime = 4;
            break;
        case 60:
            $scope.locktime = 5;
            break;

        default:
            break;
    };

    // $scope.title = "Lock Screen Setting";
    $scope.close = function() {
        $uibModalInstance.close();
    };
    $scope.save = function() {
        var outTime;
        switch ($scope.locktime) {
            case 0:
                outTime = 1;
                break;
            case 1:
                outTime = 10;
                break;
            case 2:
                outTime = 15;
                break;
            case 3:
                outTime = 30;
                break;
            case 4:
                outTime = 50;
                break;
            case 5:
                outTime = 60;
                break;

            default:
                break;
        }
        $rootScope.outTime = outTime;
        $window.sessionStorage.setItem('outTime', $rootScope.outTime);
        $rootScope.count = 0;
        alert('Success!')
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}