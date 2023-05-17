/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('lockPage', lockPage);

    /** @ngInject */
    function lockPage($window) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/lockPage/lockPage.html',
            controller: 'lockPageCtrl',
            link: function($scope, elem) {
                // var lockFlag = false;

                var lockShowFun = () => {
                    let lockFlag = true;
                    $scope.isLock = true;
                    $scope.psdInput = '';
                    $window.sessionStorage.setItem('lockFlag', lockFlag);
                    $scope.$apply();
                    return lockFlag;
                };
                $scope.$on('toLockPage', function(event, data) {
                    lockShowFun();
                });
            }
        };
    }

})();