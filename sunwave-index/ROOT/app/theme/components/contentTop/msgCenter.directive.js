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
                $scope.newAlarmcom = false;
                $scope.serverAlarmcom = false;


                $scope.$on('toTopAlarm', function(event, data) {

                    if (data.length != 0) {
                        if ($scope.istPlay == true) {
                            document.getElementById("play").play();
                        } else if ($scope.istPlay == true) {
                            // document.getElementById("play").play();
                        };
                        $scope.newAlarmcom = true;
                        $scope.data = data;
                        $scope.alarms = $scope.data;
                    } else {
                        document.getElementById("play").pause(); //pause停止
                    }

                });

                $scope.$on('toTopServerStatus', function(event, data) {
                    if (data.length != 0) {
                        var datas = [];
                        if ($scope.istPlay == true) {
                            document.getElementById("play").play();
                        } else if ($scope.istPlay == true) {
                            // document.getElementById("play").play();
                        };
                        $scope.serverAlarmcom = true;
                        for (let i = 0; i < data.length; i++) {
                            const el = data[i];
                            if (el.alarmStatus.astAlarmStatusId == 1) {
                                datas.push(el);
                            }
                        };
                        $scope.servers = datas;
                    } else {}

                });
            }
        };
    }

})();