(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.sysParameter', [
            'SunWave.pages.deviceManagement.deviceList'

        ])
        .controller('addModalCtrl', addModalCtrl);

    function addModalCtrl($rootScope, $scope, transmitModalItems, isAdd, parameterConfigurationService, deviceListService, $uibModalInstance, messageAlertService, $uibModal, $log) {

        $scope.title = 'Params Modal';
        var version = $rootScope.version;


        // $scope.deviceType = "";
        $scope.modal = {
            id: "",
            alarmName: "",
            // neDevicetype: {
            //     dtpdeviceTyp: ""
            // },
            deviceTypeId: "",
            alarmObjid: "",
            alarm: "",
            alarmen: "",
            base: "",
            omc: "",
            radio: "",
            realtime: "",
            packInfo: "",
            setparam: "",
            setvalue: "",
            type: "",
            setparam: ""
        };


        $scope.isAdd = isAdd;
        $scope.view = true;
        $scope.transmitModalItems = transmitModalItems;


        //modify view
        if ($scope.isAdd == 'View' || $scope.isAdd == 'Modify') {
            $scope.modal = $scope.transmitModalItems;
            $scope.NotModify = true;

            // $scope.modal.neDevicetype.dtpdeviceTyp = $scope.transmitModalItems.deviceType;
            $scope.modal.deviceTypeId = $scope.transmitModalItems.deviceTypeId;
            // if ($scope.transmitModalItems.deviceTypeId == '') {
            //     $scope.deviceType = "";
            // };
            $scope.modal.alarmName = $scope.transmitModalItems.alarmName;
        } else {
            $scope.modal.type = 'Alarm_Report';
            $scope.NotModify = true;
        }

        if ($scope.isAdd == 'View') {
            $scope.view = false;
        };


        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                $scope.deviceTypes = res.data;
                $scope.changeDeviceType();
            })
        };
        $scope.searchDeviceType();


        $scope.changeDeviceType = function() {
            if ($scope.modal.deviceTypeId == null || $scope.modal.deviceTypeId == undefined) {
                $scope.modal.deviceTypeId = '';
            }
            for (let index = 0; index < $scope.deviceTypes.length; index++) {
                const deviceType = $scope.deviceTypes[index];
                if ($scope.modal.deviceTypeId == deviceType.dtpDevicetypeid) {
                    $scope.devName = deviceType.dtpName;
                }
            }
        };

        var _type;
        $scope.getType = function() {
            _type = $scope.modal.type;
            return _type
        };


        $scope.changeType = function() {
            if ($scope.modal.type == 'PM' || $scope.modal.type == 'CM' || $scope.modal.type == 'CM_SysPara') {

                if (confirm('The type has been changed and the previously selected parameters will be cleared?')) {
                    $scope.modal.alarm = '';
                    $scope.modal.alarmen = '';
                    $scope.modal.base = '';
                    $scope.modal.omc = '';
                    $scope.modal.radio = '';
                    $scope.modal.realtime = '';
                    $scope.modal.alarmName = '';
                    $scope.modal.alarmObjid = '';
                } else {
                    $scope.modal.type = _type;
                }
            }
        };



        var getArrFun = function(aarr) {
            var arr = [];
            for (var i = 0; i < aarr.length; i++) {
                if (arr.indexOf(aarr[i]) == -1) {
                    arr.push(aarr[i]);
                }
            }
            return arr;
        };

        var targetArr = [];

        $scope.queryParams = function() {
            if ($scope.modal.deviceTypeId == null || $scope.modal.deviceTypeId == undefined) {
                $scope.modal.deviceTypeId = '';
                // alert('Please select device type!');
                // return
            };
            if ($scope.modal.type == '' || $scope.modal.type == null) {
                alert('Must select Type');
                return
            }
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/sysManagement/parameterConfiguration/queryParamsModal.html',
                controller: 'queryParamsModalCtrl',
                size: 'lg',
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    deviceType: function() {
                        return $scope.modal.deviceTypeId;
                    },
                    devName: function() {
                        return $scope.devName;
                    },
                    targetArr: function() {
                        return targetArr;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    type: function() {
                        return $scope.modal.type;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/sysManagement/parameterConfiguration/queryParamsModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems_param) {
                //console.log(newItems_param);
                targetArr = newItems_param;
                $scope.modal.alarm = newItems_param.alarm;
                $scope.modal.alarmen = newItems_param.alarmen;
                $scope.modal.base = newItems_param.base;
                $scope.modal.omc = newItems_param.omc;
                $scope.modal.radio = newItems_param.radio;
                $scope.modal.realtime = newItems_param.realtime;

            }, function(newItems_param) {
                //console.log(newItems_param);
                $log.info('Modal dismissed at: ' + new Date());
            });

        };

        $scope.alarmTypeModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/sysManagement/parameterConfiguration/alarmTypeModal.html',
                controller: 'alarmTypeModalCtrl',
                size: 'md',
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/sysManagement/parameterConfiguration/alarmTypeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                let alarmsArr = [];
                $scope.modal.alarmName = newItems[0].almName;
                // $scope.modal.type = newItems[0].almName;

                $scope.modal.alarmObjid = newItems[0].almObjid;
                // for (let i = 0; i < newItems.length; i++) {
                //     const element = array[i];

                // }
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.save = function() {
            var addItems = {};
            var sumData = [];
            addItems = $scope.modal;
            addItems.version = version;
            if ($scope.modal.type == 'Alarm_Report' && $scope.modal.alarmName == '' && $scope.modal.alarmObjid == '') {
                alert('Must select Alarm!');
                return
            };
            if (!$scope.modal.base && !$scope.modal.alarm && !$scope.modal.alarmen && !$scope.modal.omc && !$scope.modal.radio && !$scope.modal.realtime) {
                if (!$scope.modal.type || addItems.type == '') {
                    alert('Please check the missing items');
                    return
                } else {
                    if (addItems.queryparam) {
                        if ($scope.isAdd == 'Add') {
                            parameterConfigurationService.addContent(addItems).success(function(res) {
                                if (res.code == 200) {
                                    alert('Success!');
                                    $scope.close();
                                } else {
                                    alert(res.msg)
                                }
                            })
                        } else {
                            parameterConfigurationService.editContent(addItems).success(function(res) {
                                if (res.code == 200) {
                                    alert('Success!');
                                    $scope.close();
                                } else {
                                    alert(res.msg)
                                }
                            })
                        }
                    } else {
                        alert('please select params')
                    }
                }
            } else {
                if ($scope.modal.base == '' && $scope.modal.alarm == '' && $scope.modal.alarmen == '' && $scope.modal.omc == '' && $scope.modal.radio == '' && $scope.modal.realtime == '') {
                    alert('Must select Param!');
                    return
                } else {
                    sumData = sumData.concat($scope.modal.alarm).concat($scope.modal.alarmen).concat($scope.modal.omc).concat($scope.modal.radio).concat($scope.modal.realtime);
                    if ($scope.modal.base) {
                        $scope.modal.base = $scope.modal.base.toString();
                    } else {
                        $scope.modal.base = '';
                    };
                    $scope.modal.queryparam = sumData.toString();
                    if (!$scope.modal.type || addItems.type == '') {
                        alert('Please check the missing items');
                        return
                    } else {
                        if ($scope.isAdd == 'Add') {
                            parameterConfigurationService.addContent(addItems).success(function(res) {
                                if (res.code == 200) {
                                    alert('Success!');
                                    $scope.close();
                                } else {
                                    alert(res.msg)
                                }
                            })
                        } else {
                            parameterConfigurationService.editContent(addItems).success(function(res) {
                                if (res.code == 200) {
                                    alert('Success!');
                                    $scope.close();
                                } else {
                                    alert(res.msg)
                                }
                            })
                        }

                    }
                }
            }

        };


        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();