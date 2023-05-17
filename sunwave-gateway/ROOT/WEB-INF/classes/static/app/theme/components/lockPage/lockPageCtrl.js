(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('lockPageCtrl', lockPageCtrl);

    /** @ngInject */
    function lockPageCtrl($rootScope, $scope, $http, $window) {
        $scope.isLock = false;
        $scope.psdInput = '';
        var lockFlag_s = $window.sessionStorage.getItem('lockFlag');
        // if (lockFlag_s == 'true' || lockFlag_s == undefined) {
        //     $scope.isLock = true;
        // };

        $scope.goIndex = () => {
            if ($scope.psdInput == $rootScope.user.password) {
                $scope.isLock = false;
                $scope.lockFlag = false;
                $window.sessionStorage.removeItem('lockFlag');
                $window.sessionStorage.setItem('lockFlag', $scope.lockFlag);

            } else {
                alert('Password Error!');
            }
        }
    }
})();