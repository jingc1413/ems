angular.module('SunWave.pages.AlarmConfiguration.AlarmForward', [])
    .controller('conditionCtrl', conditionCtrl);

function conditionCtrl($scope, isFlag, isAdd, vendorIds, deviceLevelIds, conditionIds, $uibModalInstance, AlarmForwardService, $uibModal) {


    $scope.isFlag = isFlag;
    $scope.isAdd = isAdd;
    $scope.saveShow = true;

    $scope.xx = {
        select_all: ""
    };

    $scope.vNames = [{
            id: "14",
            name: "SUNWAVE"
        }, {
            id: "84",
            name: "Sunwave2"
        },
        {
            id: "86",
            name: "1"
        }
    ];

    //deviceLevel
    $scope.levels = [{
        id: "1",
        name: "Normal"
    }, {
        id: "2",
        name: "Vip"
    }];

    //condition
    $scope.conditions = [{
        id: "1",
        name: "PowerInterruption Alarm"
    }, {
        id: "2",
        name: "Battery Failure Alarm"
    }, {
        id: "3",
        name: "Battery Failure Alarm"
    }, {
        id: "4",
        name: "Battery Failure Alarm"
    }, {
        id: "5",
        name: "Battery Failure Alarm"
    }, {
        id: "6",
        name: "Battery Failure Alarm"
    }, {
        id: "7",
        name: "Battery Failure Alarm"
    }, {
        id: "8",
        name: "Battery Failure Alarm"
    }, {
        id: "9",
        name: "Battery Failure Alarm"
    }, {
        id: "10",
        name: "Battery Failure Alarm"
    }];


    $scope.getSelectIds = function(IdsArr) {
        for (let i = 0; i < $scope.rows.length; i++) {
            for (let j = 0; j < IdsArr.length; j++) {
                const element = $scope.rows[i];
                const elementJ = IdsArr[j];
                if (element.id == elementJ.id) {
                    element.checked = true;
                }
            }
        }
    };

    $scope.getContent = function() {
        if ($scope.isFlag == 'vendor') {
            $scope.rows = $scope.vNames;
        } else if ($scope.isFlag == 'level') {
            $scope.rows = $scope.levels;
        } else {
            $scope.rows = $scope.conditions;
        };
    };

    //判断状态
    if (isAdd == 'add') {
        $scope.getContent();
        $scope.saveShow = true;

    } else if (isAdd == 'modify') {
        //选中的
        $scope.deviceLevelIdsArr = deviceLevelIds.split(",");
        $scope.vendorIdsArr = vendorIds.split(",");
        $scope.conditionIdsArr = conditionIds.split(",");
        $scope.getContent();
        $scope.getSelectIds($scope.deviceLevelIdsArr);
        $scope.getSelectIds($scope.vendorIdsArr);
        $scope.getSelectIds($scope.conditionIdsArr);
        $scope.saveShow = true;

    } else {
        //选中的
        $scope.deviceLevelIds = deviceLevelIds;
        $scope.vendorIds = vendorIds;
        $scope.conditionIds = conditionIds;
        $scope.getContent();
        $scope.getSelectIds($scope.deviceLevelIdsArr);
        $scope.getSelectIds($scope.vendorIdsArr);
        $scope.getSelectIds($scope.conditionIdsArr);
        $scope.saveShow = false;

    };

    $scope.m = [];
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    $scope.selectAll = function() {
        if ($scope.xx.select_all) {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                i.checked = true;
                $scope.checked.push(i.id);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.rows, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        console.log($scope.checked);
    };
    $scope.selectOne = function() {
        angular.forEach($scope.rows, function(i) {
            var index = $scope.checked.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.checked.push(i.id);
                $scope.checkedItems.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checked.splice(index, 1);
                $scope.checkedItems.splice(index, 1);
            };
        });


        if ($scope.rows.length == $scope.checked.length) {
            $scope.xx.select_all = true;
        } else {
            $scope.xx.select_all = false;
        }
        console.log($scope.checkedItems);
    };




    $scope.save = function() {
        if ($scope.checkedItems.length == 0) {
            alert('Please Select One!')
        } else {
            $scope.close($scope.checked);
        }

    };
    $scope.close = function(selectIds) {
        $uibModalInstance.close(selectIds);
    };

}