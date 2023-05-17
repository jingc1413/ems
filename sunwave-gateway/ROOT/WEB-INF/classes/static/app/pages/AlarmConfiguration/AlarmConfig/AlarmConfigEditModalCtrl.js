/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmConfiguration.AlarmConfig', [
        'SunWave.pages.AlarmConfiguration.AlarmLevel',
        'SunWave.pages.AlarmConfiguration.AlarmKind'
    ])
    .controller('AlarmConfigEditModalCtrl', AlarmConfigEditModalCtrl);

function AlarmConfigEditModalCtrl($scope, AlarmConfigService, AlarmLevelService, AlarmKindService, isAdd, transmitModalItems, $uibModalInstance) {

    console.log('transmitModalItems:' + transmitModalItems);


    $scope.modifyItem = false;

    $scope.modal = {
        almName: "",
        almLevelid: "", //
        almKindid: "", //
        almSound: "",
        alarmKind: {
            name: "",
            id: "",
            memo: ""
        },
        almAlarmlevel: {
            alvAlarmlevelid: "",
            alvColor: "",
            alvMemo: "",
            alvName: "",
            alvSound: ""
        },
        almDealidea: ""
    };

    //level
    $scope.getAlarmLevels = function() {
        AlarmLevelService.findAll().success(function(res) {
            $scope.levels = res.data;
            // for (let i = 0; i < $scope.levels.length; i++) {
            //     const element = $scope.levels[i];
            //     if (element.almLevelid == $scope.modal.almLevelid) {
            //         $scope.
            //     }

            // }
        })
    };

    $scope.getAlarmLevels();

    //kind
    $scope.getAlarmKinds = function() {
        AlarmKindService.findAll().success(function(res) {
            $scope.kinds = res.data;
        })
    };

    $scope.getAlarmKinds();

    //选中
    // $scope.modal.almLevelid = transmitModalItems.almAlarmlevel.alvAlarmlevelid;
    // $scope.modal.almKindid = transmitModalItems.alarmKind.id;
    // $scope.levels = [{
    //     "id": 2,
    //     "name": "Warning"
    // }, {
    //     "id": 3,
    //     "name": "Minor"
    // }, {
    //     "id": 4,
    //     "name": "Major"
    // }, {
    //     "id": 5,
    //     "name": "Critical"
    // }, {
    //     "id": 6,
    //     "name": "Warning2"
    // }];
    // $scope.kinds = [{
    //     "id": 1,
    //     "name": "device alarm"
    // }, {
    //     "id": 2,
    //     "name": "event alarm"
    // }];



    $scope.isAdd = isAdd;
    $scope.isSave = false;;

    if ($scope.isAdd == 'Add') {
        $scope.title = 'Add';
        $scope.isSave = true;

    } else if ($scope.isAdd == 'Modify') {
        $scope.title = "Modify";
        $scope.modifyItem = true;

        $scope.modal = transmitModalItems;
        $scope.isSave = true;
    } else {
        $scope.title = "View";
        $scope.modal = transmitModalItems;
        $scope.isSave = false;
    };

    $scope.pjFun = function() {
        for (let i = 0; i < $scope.kinds.length; i++) {
            const element = $scope.kinds[i];
            if ($scope.modal.alarmKind.id == element.id) {
                $scope.kindObj = element;
            }
        }

        return $scope.kindObj;
    };
    $scope.pjLevelFun = function() {
        for (let i = 0; i < $scope.levels.length; i++) {
            const element = $scope.levels[i];
            if ($scope.modal.almAlarmlevel.alvAlarmlevelid == element.alvAlarmlevelid) {
                $scope.levelObj = element;
            }
        }

        return $scope.levelObj;
    };

    $scope.save = function() {
        var newItems = {};
        newItems = $scope.modal;
        newItems.almAlarmlevel = $scope.pjLevelFun();
        newItems.alarmKind = $scope.pjFun();

        AlarmConfigService.editContent(newItems)
            .success(function(response) {
                if (response.data == true) {
                    alert('Success!');
                    $scope.close();
                } else {
                    alert('Failed!' + response.data.msg);
                };

            })
            .error(function(err) {
                console.info(err);
            });

    };



    $scope.close = function() {
        $uibModalInstance.close();
    };

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    // });
}
// });