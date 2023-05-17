angular.module('SunWave.pages.deviceManagement.deviceList', [])
    .controller('queryDeviceModalCtrl', queryDeviceModalCtrl);

function queryDeviceModalCtrl($rootScope, $scope, $uibModalInstance, deviceListService) {

    $scope.modal = {
        neDevicePort: "",
        neId: "",
        // neQryCommtypeId: "6",
        ctpId: 6,
        neQryRepeaterId: "",
        neDeviceIP: "",
        comWindowId: "queryDevice",
        neDevicetype: {
            dtpDevicetypeid: ""
        }
    };

    $scope.isUDP = false;


    //获取commtype
    $scope.getCommtype = function() {
        deviceListService.getCommtype().success(function(res) {
            $scope.commtypes = res.data;
        })
    };
    $scope.getCommtype();

    //type
    $scope.searchDeviceType = function() {
        deviceListService.searchDeviceType().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.deviceTypes = res.data;
        })
    };
    $scope.searchDeviceType();


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
    $scope.selectCommtype();


    //windowid生成
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    };

    $scope.save = function() {

        if ($scope.modal.ctpId == 7 || $scope.modal.ctpId == 8) {
            if ($scope.modal.neDevicetype.dtpDevicetypeid == '' || $scope.modal.neDevicetype.dtpDevicetypeid == null) {
                alert('please check')
                return
            }
        }
        var queryDeviceItems = {};
        queryDeviceItems = $scope.modal;


        // var windowId = uuid();
        $scope.comWindowId = $rootScope.user.username + '_queryDevice';

        // $scope.comWindowId = $scope.modal.comWindowId.concat(windowId);
        $scope.neDeviceIP = $scope.modal.neDeviceIP;
        $scope.neDevicePort = $scope.modal.neDevicePort;
        $scope.neId = $scope.modal.neId;
        $scope.neQryCommtypeId = $scope.modal.ctpId;
        $scope.neQryRepeaterId = $scope.modal.neQryRepeaterId;


        if ($scope.modal.ctpId == 7 || $scope.modal.ctpId == 8) {
            deviceListService.queryDevice($scope.comWindowId, $scope.modal.neDevicetype.dtpDevicetypeid, $scope.neDeviceIP, $scope.neDevicePort, $scope.neId, $scope.neQryCommtypeId, $scope.neQryRepeaterId).success(function(res) {
                if (res.data == true) {
                    alert('Success!');
                    $uibModalInstance.close(queryDeviceItems);
                } else {
                    alert('Failed' + res.msg)
                }

            }).error(function(err) {
                alert('ERR!' + err)
            });
        } else {
            if ($scope.neQryRepeaterId == '' || $scope.neQryRepeaterId == null) {
                alert('Please Input Device ID!')
            } else {
                deviceListService.queryDevice($scope.comWindowId, $scope.modal.neDevicetype.dtpDevicetypeid, $scope.neDeviceIP, $scope.neDevicePort, $scope.neId, $scope.neQryCommtypeId, $scope.neQryRepeaterId).success(function(res) {
                    if (res.data == true) {
                        alert('Success!');
                        $uibModalInstance.close(queryDeviceItems);
                    } else {
                        alert('Failed' + res.msg)
                    }

                }).error(function(err) {
                    alert('ERR!' + err)
                });
            };
        }

    };



    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}