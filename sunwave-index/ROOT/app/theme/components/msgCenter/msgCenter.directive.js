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

                $scope.alarms = [];
                $scope.servers = [];

                var isOpenFun = function() {

                    if ($scope.alarms.length == 0 || $scope.servers.length == 0) {
                        if ($scope.alarms.length !== 0 && $scope.servers.length == 0) {

                            $scope.newAlarmcom = true;
                            $scope.serverAlarmcom = false;

                            $scope.isPlay = false;
                            $scope.istPlay = true;
                            document.getElementById("play").play();
                        } else if ($scope.alarms.length == 0 && $scope.servers.length !== 0) {
                            $scope.newAlarmcom = false;
                            $scope.serverAlarmcom = true;

                            $scope.isPlay = false;
                            $scope.istPlay = true;
                            document.getElementById("play").play();
                        } else {

                        }
                    } else if ($scope.alarms.length == 0 && $scope.servers.length == 0) {
                        $scope.isPlay = true;
                        $scope.istPlay = false;
                        $scope.newAlarmcom = false;
                        $scope.serverAlarmcom = false;
                        document.getElementById("play").pause(); //pause停止

                    } else {
                        $scope.isPlay = false;
                        $scope.istPlay = true;
                        $scope.newAlarmcom = true;
                        $scope.serverAlarmcom = true;

                        document.getElementById("play").play();
                    }

                };


                $scope.$on('toTopAlarm', function(event, data) {
                    // data = [];
                    var data_2 = [];
                    if (data) {
                        for (let i = 0; i < data.length; i++) {
                            const el = data[i];
                            if (el.alarmStatus.astAlarmStatusId == 1) {
                                data_2.push(el);
                            } else {};
                        };
                        if (data_2.length !== 0) {
                            if ($scope.istPlay == true) {
                                document.getElementById("play").play();
                            } else if ($scope.istPlay == true) {
                                // document.getElementById("play").play();
                            };
                            $scope.newAlarmcom = true;
                            $scope.alarms = data_2;
                        } else {
                            document.getElementById("play").pause(); //pause停止
                            $scope.alarms = [];
                        }

                    } else {
                        document.getElementById("play").pause(); //pause停止
                        $scope.alarms = [];
                    };
                    isOpenFun();

                });

                $scope.$on('toTopServerStatus', function(event, data) {
                    var data_ = [];
                    // data = [];
                    if (data) {
                        for (let i = 0; i < data.length; i++) {
                            const el = data[i];
                            if (el.alarmStatus.astAlarmStatusId == 1) {
                                data_.push(el);
                            } else {};
                        };
                        if (data_.length !== 0) {
                            if ($scope.istPlay == true) {
                                document.getElementById("play").play();
                            } else if ($scope.istPlay == true) {
                                // document.getElementById("play").play();
                            };
                            $scope.serverAlarmcom = true;
                            $scope.servers = data_;
                        } else {
                            document.getElementById("play").pause(); //pause停止
                            $scope.servers = [];
                        }

                    } else {
                        document.getElementById("play").pause(); //pause停止
                        $scope.servers = [];
                    };
                    isOpenFun();

                    // if (data.length != 0) {
                    //     if ($scope.istPlay == true) {
                    //         document.getElementById("play").play();
                    //     } else if ($scope.istPlay == true) {
                    //         // document.getElementById("play").play();
                    //     };
                    //     $scope.serverAlarmcom = true;
                    //     $scope.servers = data;
                    // } else {
                    //     document.getElementById("play").pause(); //pause停止
                    //     $scope.servers = [];
                    // }

                });



            }
        };
    }

})();