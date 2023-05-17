/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('searchCondition', searchCondition);

    /** @ngInject */
    function searchCondition() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                query: "=",
                switchSearchCondition: "&"
            },
            templateUrl: 'app/theme/components/searchCondition/searchCondition.html',
            controller: 'searchConditionCtrl',
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/pages/deviceManagement/deviceList/deviceListService.js'
                    ]);
                }
            },

            // link: function(scope, elem, attr) {
            //     elem.bind('click', function() {
            //         scope.orderName = scope.ordername;
            //         //console.log(scope.orderName);
            //     })
            // }
        };
    }

})();