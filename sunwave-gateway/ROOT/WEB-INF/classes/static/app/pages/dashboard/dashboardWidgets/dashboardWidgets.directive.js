(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard')
        .directive('dashboardWidgets', dashboardWidgets);

    /** @ngInject */
    function dashboardWidgets() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/dashboard/dashboardWidgets/dashboardWidgets.html',
            controller: 'dashboardWidgetsCtrl'
        };
    }
})();