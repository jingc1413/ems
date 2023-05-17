(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('myAlertCtrl', myAlertCtrl);

    /** @ngInject */
    function myAlertCtrl($scope) {
        setTimeout(function() {
            $scope.isMessage = false;
        }, 3000);
    }
})();