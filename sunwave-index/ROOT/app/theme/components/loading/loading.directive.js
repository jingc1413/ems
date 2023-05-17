/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('myLoading', myLoading);

    /** @ngInject */
    function myLoading($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/loading/loading.html',
            // controller: 'myLoadingCtrl',
            link: function($scope, elem) {
                $rootScope.loading = false;
            }
        };
    }

})();