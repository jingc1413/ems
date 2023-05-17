(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard', [])
        .controller('dashboardCtrl', dashboardCtrl);

    function dashboardCtrl($rootScope, $scope, dashboardService, $interval) {

        $scope.getDashboardNums = function() {
            dashboardService.initFrontNums().success(function(res) {
                //console.log(res.data);
                $scope.totalElements = res.data.allElementNum;
                $scope.currentAlarms = res.data.currentAlarmNum;
                $scope.notInServices = res.data.notInServiceNum;
                $scope.offLines = res.data.offLineNum;
                $scope.deviceLists = res.data.deviceListNum;
            })
        };

        var stopEvent = $interval(function() {
            dashboardService.initFrontNums().success(function(res) {
                //console.log(res.data);
                $scope.totalElements = res.data.allElementNum;
                $scope.currentAlarms = res.data.currentAlarmNum;
                $scope.notInServices = res.data.notInServiceNum;
                $scope.offLines = res.data.offLineNum;
                $scope.deviceLists = res.data.deviceListNum;
            })
        }, 180000);
        $scope.getDashboardNums();

        $scope.$on('toDashboard', function(event, data) {
            $scope.getDashboardNums();
        });

        $scope.$on("$destroy", function() {
            //离开controller时清除配置,不然scroll会重复请求
            $interval.cancel(stopEvent);
        })

        $scope.$on('processSignOut', function(e) {
            $interval.cancel(stopEvent);
        });

    }
})();