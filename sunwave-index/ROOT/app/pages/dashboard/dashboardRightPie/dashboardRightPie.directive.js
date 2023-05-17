(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard')
        .directive('dashboardRightPie', dashboardRightPie);

    /** @ngInject */
    function dashboardRightPie($templateRequest, $compile) {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/dashboard/dashboardRightPie/dashboardRightPie.html',
            // link: function(scope, el) {
            //     $templateRequest("app/pages/dashboard/dashboardRightPie/dashboardRightPie.html").then(function(html) {
            //         var template = angular.element(html);
            //         el.append(template);
            //         $compile(template)(scope);
            //     });
            // }

        };
    }
})();