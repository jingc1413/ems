(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('pageTop', pageTop);

    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/pageTop/pageTop.html',
            controller: 'pageTopCtrl'
        };
    }

})();