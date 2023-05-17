angular.module('SunWave.pages.deviceManagement.deviceList', [])
    .controller('NotInServiceModalCtrl', NotInServiceModalCtrl);

function NotInServiceModalCtrl($scope, checkedItems, deviceListService, $uibModalInstance) {

    $scope.checkedItems = checkedItems;

    $scope.modal = {
        collectValue: null
    };

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 10,
    };

    //status search
    var statusSearch = function() {
        deviceListService.getStatus().success(function(res) {
            if (res.msg == '操作成功') {
                let datas = [];
                angular.forEach(res.data, function(i) {
                    if (i.dsId >= 10) {
                        datas.push(i);
                    } else {
                        return
                    }
                });
                $scope.collections = datas;
            }
        });
    };
    statusSearch();

    $scope.save = function() {

        //设备状态转移 devicestatus neIds toFlag
        var devicestatus = $scope.modal.collectValue;
        // var neIdsArr = $scope.checkedItems.neNeid;
        var neIds = [];

        for (let i = 0; i < $scope.checkedItems.length; i++) {
            neIds.push($scope.checkedItems[i].neNeid);
        };
        var toFlag = 2;
        var flagNum = 1;

        //check是否有告警
        //检验是否存在告警
        deviceListService.checkAlmMaskByNeIds(flagNum, neIds.toString()).success(function(res) {
            if (res.data == false) {
                if (confirm('The device with alarm,are you sure to continue?')) {
                    deviceListService.updateStatus(devicestatus, neIds.toString(), toFlag).success(function(res) {
                        if (res.data == true) {
                            // deviceListService.deleteDeviceLogic(neIds).success(function(res) {
                            //     if (res.data == true) {
                            //         $scope.checkedItems = [];
                            //         alert('Success!');
                            //         $uibModalInstance.close($scope.checkedItems);
                            //     } else {
                            //         alert('Faled!' + res.msg);
                            //     }
                            // })
                            alert('Success!');
                            $uibModalInstance.close();

                        } else {
                            alert('Faled!' + res.msg);
                        };

                    });
                } else {
                    alert('cancel')
                }
            } else if (res.data == true) {
                deviceListService.updateStatus(devicestatus, neIds.toString(), toFlag).success(function(res) {
                    if (res.data == true) {
                        // deviceListService.deleteDeviceLogic(neIds).success(function(res) {
                        //     if (res.data == true) {
                        //         $scope.checkedItems = [];
                        //         alert('Success!');
                        //         $uibModalInstance.close($scope.checkedItems);
                        //     } else {
                        //         alert('Faled!' + res.msg);
                        //     }
                        // })
                        alert('Success!');
                        $uibModalInstance.close();

                    } else {
                        alert('Faled!' + res.msg);
                    };

                });
            } else {
                return
            }
        })
    };
    $scope.close = function(checkedItems) {
        $uibModalInstance.close(checkedItems);
    };
}