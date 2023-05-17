angular.module('SunWave.theme.components', [])
    .controller('detailAlarmNameModalCtrl', detailAlarmNameModalCtrl);

function detailAlarmNameModalCtrl($scope, transmitModalItems, $filter) {


    $scope.title = 'Alarm Details';
    $scope.acknowledged = false;
    $scope.reactAlarm = false;
    $scope.clearAlarm = false;

    $scope.modal = {
        almAlarm: {
            almName: ""
        },
        almAlarmlevel: {
            alvName: ""
        },
        alarmtimes: "",
        // algAlarmtime:$filter('date')(transmitModalItems.algAlarmtime, 'yyyy-MM-dd'),
        Durations: "",
        neElement: {
            neDeviceid: "",
            neRepeaterid16: "",
            neName: "",
            neDeviceLevel: "",
            neAreaid: "",
            neSitelevelid: "",
            neCompany: {
                coName: ""
            },
            neDevicestatus: {
                dsName: ""
            }
        },
        alarmStatus: {
            astAlarmStatusName: ""
        },
        alarmType: ""



    };
    $scope.neDevicestatusName = "";


    //赋值
    $scope.modal = transmitModalItems;
    $scope.modal.alarmtimes = "1";
    $scope.modal.algAlarmtime = $filter('date')(transmitModalItems.algAlarmtime, 'yyyy-MM-dd');
    $scope.neDevicestatusName = transmitModalItems.neElement.neDevicestatus.dsName;
    $scope.modal.algAlarmtime = $filter('date')(transmitModalItems.algAlarmtime, 'yyyy-MM-dd');
    $scope.neSitelevelid = transmitModalItems.neElement.neSitelevelid;
    if ($scope.neSitelevelid == '1') {
        $scope.modal.neElement.neSitelevelName = 'nomal';
    } else {
        $scope.modal.neElement.neSitelevelName = 'vip';
    };

    $scope.close = function(selectAlarmNameDetail) {
        $uibModalInstance.close(selectAlarmNameDetail);
    };

}