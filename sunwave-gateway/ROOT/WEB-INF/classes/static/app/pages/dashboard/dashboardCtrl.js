(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard', [])
        .controller('dashboardCtrl', dashboardCtrl);

    function dashboardCtrl($rootScope, $scope, dashboardService) {

        $scope.getDashboardNums = function() {
            dashboardService.initFrontNums().success(function(res) {
                console.log(res.data);
                $scope.totalElements = res.data.allElementNum;
                $scope.currentAlarms = res.data.currentAlarmNum;
                $scope.notInServices = res.data.notInServiceNum;
                $scope.offLines = res.data.offLineNum;
                $scope.deviceLists = res.data.deviceListNum;
            })
        };
        $scope.getDashboardNums();

        $scope.$on('toDashboard', function(event, data) {
            $scope.getDashboardNums();
        });

    }
})();