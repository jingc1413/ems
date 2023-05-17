angular.module('SunWave.pages.AlarmManagement.historyAlarm', [
        'SunWave.pages.AlarmManagement.currentAlarm'
    ])
    .controller('detailAlarmNameModalCtrl', detailAlarmNameModalCtrl);

function detailAlarmNameModalCtrl($scope, transmitModalItems, currentAlarmService, currentFlag, $uibModalInstance, $filter, messageAlertService) {


    $scope.transmitModalItems = transmitModalItems;
    $scope.title = transmitModalItems.neElement.neName;
    $scope.isCurrent = false;

    //判断currentFlag
    $scope.currentFlag = currentFlag;

    if ($scope.currentFlag == 'current') {
        $scope.isCurrent = true;
        $scope.clearALM = true;
        // var nowDate = new Date();
        // $scope.transmitModalItems.AlarmDurations = parseInt(((new Date(nowDate)) - (new Date($scope.transmitModalItems.algAlarmtime))) / 1000 / 60);
    } else if ($scope.currentFlag == 'mask') {
        $scope.isCurrent = false;
        $scope.clearALM = true;
    } else {
        $scope.isCurrent = false;
        $scope.clearALM = false;
    };
    //$scope.alarmTimeFlag=alarmTimeFlag;
    //if ($scope.alarmTimeFlag == 'alarmTime') {
    // var nowDate = new Date();
    // $scope.transmitModalItems.AlarmDurations = parseInt(((new Date(nowDate)) - (new Date($scope.transmitModalItems.algAlarmtime))) / 1000 / 60);
    // }

    //deviceLevel渲染
    $scope.deviceLevelShow = function() {
        $scope.deviceLevelF = $scope.modal.neElement.neSitelevelid;
        if ($scope.deviceLevelF == '1') {
            $scope.modal.neElement.neSitelevel = 'Normal';
        } else {
            $scope.modal.neElement.neSitelevel = 'Vip';
        }
    };

    $scope.modal = {
        almAlarm: {
            almName: "",
            alarmKind: {
                name: ""
            }
        },
        almAlarmlevel: {
            alvName: ""
        },
        AlarmTimes: "",
        algAlarmtime: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        AlarmDurations: "",
        neElement: {
            neDeviceid: "",
            neRepeaterid16: "",
            neName: "",
            neCompany: {
                coName: ""
            },
            areaName: "",
            neSitelevelid: "",
            neSitelevel: "",
            neDevicestatus: {
                dsName: ""
            }
        },
        alarmStatus: {
            astAlarmStatusName: ""
        },

    };

    $scope.modal = transmitModalItems;
    $scope.modal.AlarmDurations = transmitModalItems.alarmDuration;
    $scope.neRepeaterid = $scope.modal.neElement.neRepeaterid;
    $scope.modal.neElement.neRepeaterid16 = $filter('uppercase')($scope.neRepeaterid.toString(16));
    if ($scope.modal.neElement.neRepeaterid16.length < 8) {
        for (let index = $scope.modal.neElement.neRepeaterid16.length; index < 8; index++) {
            $scope.modal.neElement.neRepeaterid16 = '0' + $scope.modal.neElement.neRepeaterid16;

        }
    };

    $scope.modal.algAlarmtime = $filter('date')(transmitModalItems.algAlarmtime, 'yyyy-MM-dd HH:mm:ss');
    //$scope.modal.algAlarmtime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
    $scope.deviceLevelShow();

    $scope.Acknowledge = function() {
        $scope.AlarmStatus = $scope.transmitModalItems.alarmStatus.astAlarmStatusId;
        $scope.AlarmLogId = $scope.transmitModalItems.algAlarmlogid;
        //判断当前告警是否可以做告警确认
        currentAlarmService.checkAcknowledged($scope.AlarmLogId).success(function(res) {
            if (res.data == true) {
                //告警确认   2
                $scope.AlarmStatus = "2";
                currentAlarmService.alarmConfirm($scope.AlarmLogId, $scope.AlarmStatus).success(function(res) {
                    if (res.data == true) {
                        // alert(res.msg)
                        messageAlertService.successFun('success');
                    } else {
                        // alert(res.msg)
                        messageAlertService.successFun('failed');

                    }
                })
            } else {
                alert('No alarm confirmation at present！')
            }
        })

    };

    $scope.reactiveAlarm = function() {

        $scope.AlarmStatus = $scope.transmitModalItems.alarmStatus.astAlarmStatusId;
        $scope.AlarmLogId = $scope.transmitModalItems.algAlarmlogid;
        //判断是否可以取消确认
        if ($scope.AlarmStatus == "2") {
            currentAlarmService.checkCancelConfirm($scope.AlarmLogId).success(function(res) {
                if (res.data == true) {
                    //取消确认
                    currentAlarmService.cancelConfirm($scope.AlarmLogId).success(function() {
                        if (res.data == true) {
                            // alert('Cancel confirmation succeeded!');
                            messageAlertService.successFun('success');
                        } else {
                            // alert('Cancel confirmation failed!' + res.msg)
                            messageAlertService.successFun('failed');
                        }
                    })
                } else {
                    alert('Current alarm cannot be cancelled!' + res.msg)
                }
            })
        } else {
            alert('Only after the first alarm is confirmed can it be cancelled!')
        }
    };

    $scope.clearAlarm = function() {

        $scope.AlarmStatus = $scope.transmitModalItems.alarmStatus.astAlarmStatusId;
        $scope.AlarmLogId = $scope.transmitModalItems.algAlarmlogid;
        //告警清除判断
        if ($scope.AlarmStatus == '2' || $scope.AlarmStatus == '1') {
            currentAlarmService.checkClear($scope.AlarmLogId.toString()).success(function(res) {
                if (res.data == true) {
                    if ($scope.currentFlag == 'mask') {
                        currentAlarmService.clearMask($scope.AlarmLogId.toString(), '4').success(function() {
                            if (res.error == null || res.data == true) {
                                messageAlertService.successFun('success');
                                $scope.close();
                            } else {
                                alert('Failed!' + res.msg)
                                return
                            }
                        })
                    } else {
                        currentAlarmService.alarmConfirm($scope.AlarmLogId.toString(), '4').success(function() {
                            if (res.code == 200) {
                                // alert('Successful clearance!');
                                messageAlertService.successFun('success');
                                $scope.close();
                            } else {
                                // alert('Scavenging failure' + res.msg)
                                messageAlertService.successFun('failed');
                            }
                        })
                    }


                } else {
                    alert('check err')
                }
            })
        } else {
            alert('The current alarm status cannot be cleared！')
        }
    };


    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };

}