angular.module('SunWave.pages.AlarmConfiguration.AlarmForward', [])
    .controller('conditionCtrl', conditionCtrl);

function conditionCtrl($scope, isFlag, isAdd, $uibModalInstance, AlarmForwardService, selects, $uibModal) {


    $scope.isFlag = isFlag;
    $scope.isAdd = isAdd;
    $scope.saveShow = true;
    $scope.selects = selects.split(',');

    $scope.xx = {
        select_all: ""
    };

    if ($scope.isFlag == 'condition') {
        $scope.isCondition = true;
    } else if ($scope.isFlag == 'level') {
        $scope.isLevel = true;
    } else {
        $scope.isVendor = true;
    };


    //condition
    // $scope.conditions = [{
    //     id: "1",
    //     name: "PowerInterruption Alarm"
    // }, {
    //     id: "2",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "3",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "4",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "5",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "6",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "7",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "8",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "9",
    //     name: "Battery Failure Alarm"
    // }, {
    //     id: "10",
    //     name: "Battery Failure Alarm"
    // }];

    //选中
    var getSelectsFun = function(selects) {
        if ($scope.isFlag == 'condition') {
            for (let j = 0; j < selects.length; j++) {
                const select_id = selects[j];
                for (let i = 0; i < $scope.rows.length; i++) {
                    const row = $scope.rows[i];
                    if (row.almAlarmid == select_id) {
                        row.checked = true;
                        $scope.checkedItems.push(row);
                    }
                }
            }
        } else if ($scope.isFlag == 'level') {
            for (let j = 0; j < selects.length; j++) {
                const select_id = selects[j];
                for (let i = 0; i < $scope.rows.length; i++) {
                    const row = $scope.rows[i];
                    if (row.slvSitelevelid == select_id) {
                        row.checked = true;
                        $scope.checkedItems.push(row);
                    }
                }
            }
        } else {
            for (let j = 0; j < selects.length; j++) {
                const select_id = selects[j];
                for (let i = 0; i < $scope.rows.length; i++) {
                    const row = $scope.rows[i];
                    if (row.coCompanyid == select_id) {
                        row.checked = true;
                        $scope.checkedItems.push(row);
                    }
                }
            }
        }
    };

    $scope.getContent = function() {
        if ($scope.isFlag == 'condition') {
            AlarmForwardService.getConditions().success(function(res) {
                if ($scope.isAdd == 'modify' || $scope.isAdd == 'view') {
                    $scope.rows = res.data;
                    getSelectsFun($scope.selects);
                } else {
                    $scope.rows = res.data;
                }
            })

        } else if ($scope.isFlag == 'level') {
            AlarmForwardService.searchDeviceLevel().success(function(res) {
                if ($scope.isAdd == 'modify' || $scope.isAdd == 'view') {
                    $scope.rows = res.data;
                    getSelectsFun($scope.selects);
                } else {
                    $scope.rows = res.data;
                }
            })
        } else {
            AlarmForwardService.findAll().success(function(res) {
                if ($scope.isAdd == 'modify' || $scope.isAdd == 'view') {
                    $scope.rows = res.data;
                    getSelectsFun($scope.selects);
                } else {
                    $scope.rows = res.data;
                }
            })
        }
    };



    //判断状态
    if (isAdd == 'add') {
        $scope.getContent();
        $scope.saveShow = true;

    } else if (isAdd == 'modify') {
        //选中的
        $scope.getContent();
        $scope.saveShow = true;

    } else {
        //选中的
        $scope.getContent();
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
                $scope.checked.push(i.almAlarmid);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.rows, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        //console.log($scope.checked);
    };
    $scope.selectOne = function() {
        angular.forEach($scope.rows, function(i) {
            var index = $scope.checked.indexOf(i.almAlarmid);
            if (i.checked && index == -1) {
                $scope.checked.push(i.almAlarmid);
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
        //console.log($scope.checkedItems);
    };

    $scope.selectAll_level = function() {
        if ($scope.xx.select_all) {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                i.checked = true;
                $scope.checked.push(i.slvSitelevelid);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.rows, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        //console.log($scope.checked);
    };
    $scope.selectOne_level = function() {
        angular.forEach($scope.rows, function(i) {
            var index = $scope.checked.indexOf(i.slvSitelevelid);
            if (i.checked && index == -1) {
                $scope.checked.push(i.slvSitelevelid);
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
        //console.log($scope.checkedItems);
    };

    $scope.selectAll_vendor = function() {
        if ($scope.xx.select_all) {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                i.checked = true;
                $scope.checked.push(i.coCompanyid);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.rows, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        //console.log($scope.checked);
    };
    $scope.selectOne_vendor = function() {
        angular.forEach($scope.rows, function(i) {
            var index = $scope.checked.indexOf(i.coCompanyid);
            if (i.checked && index == -1) {
                $scope.checked.push(i.coCompanyid);
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
        //console.log($scope.checkedItems);
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