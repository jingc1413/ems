(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.sysParameter', ['SunWave.pages.AlarmConfiguration.AlarmForward'])
        .controller('alarmTypeModalCtrl', alarmTypeModalCtrl);

    function alarmTypeModalCtrl($rootScope, $scope, isAdd, transmitModalItems, parameterConfigurationService, $uibModalInstance, messageAlertService, AlarmForwardService) {


        $scope.modal = {
            configId: "",
            deviceTypeId: ""
        };

        $scope.isAdd = isAdd;
        $scope.title = 'Alarm Types';
        $scope.transmitModalItems = transmitModalItems;

        $scope.view = true;


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        $scope.xx = {
            select_all: ""
        };

        $scope.search = function() {
            AlarmForwardService.getConditions().success(function(res) {

                for (let i = 0; i < res.data.length; i++) {
                    const el = res.data[i];
                    if (el.almObjid == 'F901') {
                        res.data.splice(i, 1)
                    }
                }
                $scope.items = res.data;
                if ($scope.isAdd == 'Add') {

                } else if ($scope.isAdd == 'Modify') {
                    for (let l = 0; l < $scope.items.length; l++) {
                        const item = $scope.items[l];
                        if ($scope.transmitModalItems.alarmObjid == item.almObjid) {
                            item.checked = true;
                            $scope.checkedItems.push(item);
                            $scope.checked.push(item.almObjid);
                        } else {

                        }
                    }
                } else {
                    $scope.view = false;
                    for (let l = 0; l < $scope.items.length; l++) {
                        const item = $scope.items[l];
                        if ($scope.transmitModalItems.alarmObjid == item.almObjid) {
                            item.checked = true;
                            $scope.checkedItems.push(item);
                            $scope.checked.push(item.almObjid);
                        } else {

                        }
                    }
                }
            })
        };
        $scope.search();


        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.almObjid);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.items, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            //console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                var index = $scope.checked.indexOf(i.almObjid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.almObjid);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.items.length == $scope.checked.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            //console.log($scope.checkedItems);
        };


        $scope.save = function() {
            if ($scope.checkedItems.length == 1) {
                $scope.close($scope.checkedItems);
            } else {
                alert('Must select one and only select one')
            }
        };


        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();