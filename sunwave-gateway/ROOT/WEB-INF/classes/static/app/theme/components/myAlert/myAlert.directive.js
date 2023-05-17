/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('myAlert', myAlert);

    /** @ngInject */
    function myAlert() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/myAlert/myAlert.html',
            controller: 'myAlertCtrl',
            link: function($scope, elem) {
                $scope.$on('toMyAlert', function(event, data) {
                    $scope.rules = data;
                    $scope.isLoginMessage = $scope.rules.isLoginMessage;
                    $scope.content = $scope.rules.loginMessageContent;
                    if ($scope.isLoginMessage == "0") {
                        $scope.isMessage = true;
                    };

                });
                $scope.close = function() {
                    $scope.isMessage = false;
                };
            }
        };
    }

})();