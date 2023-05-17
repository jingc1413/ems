/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('myOrder', myOrder);

    /** @ngInject */
    function myOrder() {
        return {
            restrict: 'AE',
            templateUrl: 'app/theme/components/order/order.html',
            controller: 'orderCtrl',
            scope: {
                orderName: '@',
                query: "=",
                search: "&"
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