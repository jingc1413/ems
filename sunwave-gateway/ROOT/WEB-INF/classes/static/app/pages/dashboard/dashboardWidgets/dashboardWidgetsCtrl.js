(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard')
        .controller('dashboardWidgetsCtrl', dashboardWidgetsCtrl);

    /** @ngInject */
    function dashboardWidgetsCtrl($scope, $rootScope, $state, dashboardService) {
        $scope.goDeviceList = function() {
            $state.go("deviceManagement.deviceList");
            window.sessionStorage.setItem('menuId', 1401);

            // $scope.searchFun();

        };

        $scope.goNotInService = function() {
            $state.go("deviceManagement.NotInService");
            window.sessionStorage.setItem('menuId', 1402);

        };
        // $scope.searchFun = function() {
        //     $rootScope.$emit("CallDashboardFun", {});
        // }
    }

})();