angular.module('SunWave.pages.deviceManagement.deviceList', [])
    .controller('getLogModalCtrl', getLogModalCtrl);

function getLogModalCtrl($rootScope, $scope, $uibModalInstance, deviceListService) {

    $scope.modal = {
        communicationType: "6",
        deviceIp: "",
        deviceId: "",
        devicePort: 7777,
        logControl: "1",
        logFilePath: "/home/dasftp/log/",
        logFileType: "",
        sftpUsername: "dasftp",
        sftpPassword: "",
        sftpAddress: "",
        sftpPort: 22
    };


    //获取commtype
    $scope.getCommtype = function() {
        deviceListService.getCommtype().success(function(res) {
            $scope.commtypes = res.data;
        })
    };
    // $scope.getCommtype();


    //selectCommtype
    $scope.selectCommtype = function() {
        if ($scope.modal.ctpId == 6) { //udp
            $scope.modal.neDevicePort = '7777';
            $scope.isUDP = true;

        } else if ($scope.modal.ctpId == 7 || $scope.modal.ctpId == 8) {
            $scope.modal.neDevicePort = '161';
            $scope.isUDP = false;
        } else {
            $scope.modal.neDevicePort = 'please Input';
            $scope.isUDP = false;
        }
    };
    // $scope.selectCommtype();


    var selelogFileType = function() {
        switch ($scope.modal.logFileType) {
            case '1':
                $scope.modal.logFileType = 'Set.log';
                break;
            case '2':
                $scope.modal.logFileType = 'Alarm.log';
                break;
            default:
                break;
        };
        // switch ($scope.modal.logControl) {
        //     case '1':
        //         $scope.modal.logControl = 'Start UpLoad';
        //         break;
        //     default:
        //         break;
        // };
    };

    $scope.save = function() {
        // selelogFileType();
        deviceListService.setReportLogControl($scope.modal)
            .success(function(res) {
                if (res.code == 200) {
                    alert('Success!');
                    $uibModalInstance.close();
                } else {
                    alert(res.msg);
                    return
                }
            })
            .error(function(err) {
                alert(err)
            })

    };



    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}