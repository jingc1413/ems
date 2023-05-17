(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('MsgCenterCtrl', MsgCenterCtrl);

    /** @ngInject */
    function MsgCenterCtrl($scope, $http, $uibModal, $sce) {



        $scope.isPlay = false;
        $scope.istPlay = true;
        //播放

        $scope.sce = $sce.trustAsResourceUrl;


        $scope.model = {
            url: ""
        };
        $scope.model.url = "app/theme/components/msgCenter/alarm_158.mp3";

        // $scope.isPlay = false;
        // $scope.istPlay = true;

        $scope.playAudio = function() {
            document.getElementById("play").play();
            $scope.isPlay = false;
            $scope.istPlay = true;

        };
        $scope.stopAudio = function() {
            document.getElementById("play").pause(); //pause停止
            // $scope.istPaly = !$scope.istPaly;
            $scope.isPlay = true;
            $scope.istPlay = false;

        };

        $scope.$on('processSignOut', function(e) {
            $scope.stopAudio();
            $scope.isPlay = false;
            $scope.istPlay = true;
        });

        //跳转
        $scope.goCurrentAlarm = function() {
            // $state.go("currentAlarm");
            window.sessionStorage.setItem('menuId', 603);
        };
        $scope.goServerStatus = function() {
            window.sessionStorage.setItem('menuId', 1205);
        };



        // $('#tooltip').tooltip();
        $scope.tooltips = "关闭声音";
        $scope.tooltips2 = "开启声音";
        $scope.belltooltips = "查看告警";



        //变更是否告警
        $scope.alarmStatus = function() {
            $http({
                url: Url + '/sunwave-alarm-management/alarm/alarmlog/changeNewAlarms',
                method: "POST"
            }).success(function(res) {
                if (res.data == true) {} else {}
            })

        };

        $scope.stopAlarm = function() {
            alert('Success! No more reminders today.')
        };


        $scope.serverDetail = (server) => {
            $scope.server_id = server.id;
            $scope.open_serverDetailModal($scope.server_id);
        };



        $scope.alarmDetail = function(alarm) {
            console.log(alarm);

            $scope.alarm = alarm;
            // alarm.AlarmDurations = parseInt(((new Date(alarm.algCleartime)) - (new Date(alarm.algAlarmtime))) / 1000 / 60);
            var nowDate = new Date();
            alarm.AlarmDurations = parseInt(((new Date(nowDate)) - (new Date(alarm.algAlarmtime))) / 1000 / 60);
            $scope.item = $scope.alarm;
            $scope.openDetailModal();
        };


        $scope.addAlarm = function(alarm) {
            $scope.alarms.push(alarm);
            $scope.playAudio();
        };

        $scope.openDetailModal = function() {

            $scope.currentFlag = 'current';
            // $scope.alarmTimeFlag='alarmTime'
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/AlarmManagement/historyAlarm/detailAlarmNameModal.html',
                controller: 'detailAlarmNameModalCtrl',
                size: "md",
                resolve: {
                    transmitModalItems: function() {
                        return $scope.item;
                    },
                    // currentAlarmService: function() {
                    //     return currentAlarmService;
                    // },
                    currentFlag: function() {
                        return $scope.currentFlag;
                    },
                    // alarmTimeFlag: function() {
                    //     return $scope.alarmTimeFlag;
                    // },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/AlarmManagement/historyAlarm/detailAlarmNameModalCtrl.js',
                                'app/pages/AlarmManagement/currentAlarm/currentAlarmService.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                searchForm();
                // // $scope.items.push(newItems);
            }, function(newItems) {
                console.log(newItems);

            });
        };

        $scope.open_serverDetailModal = (id) => {

            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/theme/components/msgCenter/serverStatusModal.html',
                controller: 'serverStatusModalCtrl',
                size: "md",
                resolve: {
                    id: function() {
                        return id;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/theme/components/msgCenter/serverStatusModalCtrl.js',
                                'app/theme/components/msgCenter/serverStatusModalService.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
            }, function(newItems) {
                console.log(newItems);

            });
        };
        // $scope.openDetailModal = function() {
        //     $scope.currentFlag = 'msgTop';
        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         templateUrl: 'app/pages/AlarmManagement/historyAlarm/detailAlarmNameModal.html',
        //         controller: 'detailAlarmNameModalCtrl',
        //         size: "md",
        //         resolve: {
        //             transmitModalItems: function() {
        //                 return $scope.alarm;
        //             },
        //             currentAlarmService: function() {
        //                 return currentAlarmService;
        //             },
        //             currentFlag: function() {
        //                 return $scope.currentFlag;
        //             },
        //             deps: ['$ocLazyLoad',
        //                 function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                         'app/pages/AlarmManagement/historyAlarm/detailAlarmNameModalCtrl.js'
        //                     ]);
        //                 }
        //             ]
        //         }
        //     });

        //     modalInstance.result.then(function(newItems) {
        //         console.log(newItems);
        //         // $scope.items.push(newItems);
        //     }, function(newItems) {
        //         console.log(newItems);

        //     });
        // }


        // $scope.getMessage = function(msg) {
        //     var text = msg.template;
        //     if (msg.userId || msg.userId === 0) {
        //         text = text.replace('&name', '<strong>' + $scope.users[msg.userId].name + '</strong>');
        //     }
        //     return $sce.trustAsHtml(text);
        // };
    }
})();