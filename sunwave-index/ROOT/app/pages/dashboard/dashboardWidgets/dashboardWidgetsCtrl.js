(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard')
        .controller('dashboardWidgetsCtrl', dashboardWidgetsCtrl);

    /** @ngInject */
    function dashboardWidgetsCtrl($scope, $rootScope, $state, dashboardService) {
        $scope.goDeviceList = function() {
            $state.go("deviceManagement.deviceList");
            window.sessionStorage.setItem('menuId', 1401);
            window.sessionStorage.setItem('menuTitle', 'Device List');


            // $scope.searchFun();

        };

        $scope.goNotInService = function() {
            $state.go("deviceManagement.NotInService");
            window.sessionStorage.setItem('menuId', 1402);
            window.sessionStorage.setItem('menuTitle', 'Not In Service');

        };
        // $scope.searchFun = function() {
        //     $rootScope.$emit("CallDashboardFun", {});
        // }
    }

})();