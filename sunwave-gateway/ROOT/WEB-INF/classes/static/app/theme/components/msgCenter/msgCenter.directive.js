(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('msgCenter', msgCenter);

    /** @ngInject */
    function msgCenter() {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/msgCenter/msgCenter.html',
            controller: 'MsgCenterCtrl',
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/pages/AlarmManagement/currentAlarm/currentAlarmService.js',
                    ]);
                }
            },
            link: function($scope, elem) {
                $scope.isPlay = false;
                $scope.istPlay = true;

                $scope.$on('toTopAlarm', function(event, data) {

                    if (data.length != 0) {
                        document.getElementById("play").play();
                        $scope.data = data;
                        $scope.alarms = $scope.data;
                    } else {
                        document.getElementById("play").pause(); //pause停止
                    }

                });

                $scope.$on('toTopServerStatus', function(event, data) {
                    if (data.length != 0) {
                        $scope.servers = data;
                    } else {}

                });
            }
        };
    }

})();