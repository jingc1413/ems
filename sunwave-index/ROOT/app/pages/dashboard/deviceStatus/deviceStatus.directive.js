(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard')
        .directive('deviceStatus', deviceStatus);

    /** @ngInject */
    function deviceStatus() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/dashboard/deviceStatus/deviceStatus.html'
        };
    }
})();