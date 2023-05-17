/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('passwordNotice', passwordNotice);

    /** @ngInject */
    function passwordNotice() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/passwordNotice/passwordNotice.html',
            controller: 'passwordNoticeCtrl',
            link: function($scope, elem) {
                $scope.$on('toMyAlert', function(event, data) {
                    $scope.rules = data;
                    if ($scope.rules.isPasswordRemind == '0') {
                        // $scope.isReminder = true;
                    }


                });
                $scope.closeAlert = function() {
                    $scope.isReminder = false;
                };
                setTimeout(function() {
                    $scope.closeAlert();
                }, 5000);
            }
        };
    }

})();