(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.sysParameter', [])
        .controller('queryParamsModalCtrl', queryParamsModalCtrl);

    function queryParamsModalCtrl($rootScope, $scope, deviceType, devName, isAdd, type, targetArr, transmitModalItems, parameterConfigurationService, $uibModalInstance, messageAlertService) {


        $scope.query = {
            configId: "",
            deviceTypeId: "",
            paramType: "",
            type: ""
        };


        $scope.isReport = true;
        var firstCheck = true;

        $scope.query.deviceTypeId = deviceType;
        if (deviceType === '') {
            $scope.query.deviceTypeStr = 'All'
        } else {
            $scope.query.deviceTypeStr = devName;
        };

        $scope.query.type = type;
        if ($scope.query.type == 'Alarm_Report') {
            $scope.isReport = false;
        };
        $scope.transmitModalItems = transmitModalItems;
        $scope.targetArr = targetArr;
        if ($scope.targetArr.length === 0 || $scope.targetArr == undefined) {
            $scope.targetArr = {
                alarm: "",
                alarmen: "",
                base: "",
                omc: "",
                radio: "",
                realtime: ""
            }
        }

        $scope.isAdd = isAdd;
        $scope.view = true;
        $scope.selectedNum = 0;

        if ($scope.isAdd == 'Add') {
            // $scope.title = 'Add';
            if ($rootScope.language == 'chinese') {
                $scope.title = '新增'
            } else if ($rootScope.language == 'english') {
                // $scope.title = 'Add';
                $scope.title = "Add";
            } else {
                // $scope.title = 'Add';
                $scope.title = "Add";
            };

        } else if ($scope.isAdd == 'Modify') {
            // $scope.title = "Modify";
            if ($rootScope.language == 'chinese') {
                $scope.title = '编辑'
            } else if ($rootScope.language == 'english') {
                // $scope.title = 'Add';
                $scope.title = "Modify";
            } else {
                // $scope.title = 'Add';
                $scope.title = "Modify";
            };


        } else {
            // $scope.title = "View";
            if ($rootScope.language == 'chinese') {
                $scope.title = '查看'
            } else if ($rootScope.language == 'english') {
                // $scope.title = 'Add';
                $scope.title = "View";
            } else {
                // $scope.title = 'Add';
                $scope.title = "View";
            };
            $scope.view = false;
        };

        var selectAllForSearch = function(cols1, parms) {
            var checkArray = [];
            if (cols1) {
                for (let i = 0; i < cols1.length; i++) {
                    const col1 = cols1[i];
                    if (col1.columnChecked === true) {
                        checkArray.push(col1);
                    }
                }
                if (cols1.length == checkArray.length) {
                    switch (parms) {
                        case 'alarm':
                            $scope.columnCheckedAll_alarm = true;
                            break;
                        case 'alarmen':
                            $scope.columnCheckedAll_alarmen = true;
                            break;
                        case 'base':
                            $scope.columnCheckedAll_base = true;
                            break;
                        case 'omc':
                            $scope.columnCheckedAll_omc = true;
                            break;
                        case 'radio':
                            $scope.columnCheckedAll_radio = true;
                            break;
                        case 'realtime':
                            $scope.columnCheckedAll_realtime = true;
                            break;

                        default:
                            break;
                    }
                }
            }

        };

        var selectColsForSearch = function() {
            $scope.query.configId = $scope.transmitModalItems.id;
            // $scope.query.type = $scope.type_;
            parameterConfigurationService.searchCol($scope.query).success(function(res) {
                if (res) {
                    $scope.checks_alarm = res.data.alarm;
                    $scope.checks_alarmen = res.data.alarmen;
                    $scope.checks_base = res.data.base;
                    $scope.checks_omc = res.data.omc;
                    $scope.checks_radio = res.data.radio;
                    $scope.checks_realtime = res.data.realtime;
                    selectAllForSearch($scope.checks_alarm, 'alarm');
                    selectAllForSearch($scope.checks_alarmen, 'alarmen');
                    selectAllForSearch($scope.checks_base, 'base');
                    selectAllForSearch($scope.checks_omc, 'omc');
                    selectAllForSearch($scope.checks_radio, 'radio');
                    selectAllForSearch($scope.checks_realtime, 'realtime');
                    // $rootScope.loading = false;
                }
            })
        };

        $scope.searchCol = function() {
            // $rootScope.loading = true;
            if ($scope.isAdd == 'Modify' || $scope.isAdd == 'View') {

                selectColsForSearch();
                // $scope.selectCols('alarm');
                // $scope.selectCols('alarmen');
                // $scope.selectCols('base');
                // $scope.selectCols('omc');
                // $scope.selectCols('radio');
                // $scope.selectCols('realtime');
            } else {
                parameterConfigurationService.searchCol($scope.query).success(function(res) {
                    $scope.checks_alarm = res.data.alarm;
                    $scope.checks_alarmen = res.data.alarmen;
                    $scope.checks_base = res.data.base;
                    $scope.checks_omc = res.data.omc;
                    $scope.checks_radio = res.data.radio;
                    $scope.checks_realtime = res.data.realtime;
                    // $rootScope.loading = false;

                });
            }
        };
        $scope.searchCol();

        //判断transmit里有没有数据
        var determineFun = function(str1, str2) {
            if (str1 == '') {
                let tranArr = str2.split(',');
                let EndingArr = tranArr;

                return EndingArr;
            } else {
                let tarArr = str1.split(',');
                let tranArr = str2.split(',');
                let arrEnd = tarArr.concat(tranArr);
                let arrNew = new Set(arrEnd);
                let EndingArr = Array.from(arrNew);

                return EndingArr;
            }
        };

        $scope.checkColFun = function(cols, cols_modal) {
            for (let i = 0; i < cols.length; i++) {
                let col = cols[i];
                for (let j = 0; j < cols_modal.length; j++) {
                    const col_modal = cols_modal[j];
                    if (col == col_modal.columnId) {
                        col_modal.columnChecked = true;
                        // //$scope.selectedNum++;
                    }
                }
            }
            if (cols.length == cols_modal.length) {
                return true;
            }
        };
        //modify选中col
        $scope.selectCols = function(str) {
            switch (str) {
                case 'alarm':

                    let EndingArrFromdet = determineFun($scope.targetArr.alarm, $scope.transmitModalItems.alarm);
                    var isAll = $scope.checkColFun(EndingArrFromdet, $scope.checks_alarm);
                    $scope.checkOne('check_alarm');
                    if (isAll == true) {
                        $scope.columnCheckedAll_alarm = true;
                        $scope.checkAll('check_alarm');
                    }
                    break;
                case 'alarmen':
                    let EndingArrFromdet2 = determineFun($scope.targetArr.alarmen, $scope.transmitModalItems.alarmen);
                    var isAll = $scope.checkColFun(EndingArrFromdet2, $scope.checks_alarmen);
                    if (isAll == true) {
                        $scope.columnCheckedAll_alarm = true;
                        $scope.checkAll('check_alarmen');
                    }
                    break;
                case 'base':
                    let EndingArrFromdet3 = determineFun($scope.targetArr.base, $scope.transmitModalItems.base);
                    var isAll = $scope.checkColFun(EndingArrFromdet3, $scope.checks_base);
                    if (isAll == true) {
                        $scope.columnCheckedAll_alarm = true;
                        $scope.checkAll('check_base');
                    }
                    break;
                case 'omc':
                    let EndingArrFromdet4 = determineFun($scope.targetArr.omc, $scope.transmitModalItems.omc);
                    var isAll = $scope.checkColFun(EndingArrFromdet4, $scope.checks_omc);
                    if (isAll == true) {
                        $scope.columnCheckedAll_alarm = true;
                        $scope.checkAll('check_omc');
                    }
                    break;
                case 'radio':
                    let EndingArrFromdet5 = determineFun($scope.targetArr.radio, $scope.transmitModalItems.radio);
                    var isAll = $scope.checkColFun(EndingArrFromdet5, $scope.checks_radio);
                    if (isAll == true) {
                        $scope.columnCheckedAll_alarm = true;
                        $scope.checkAll('check_radio');
                    }
                    break;
                case 'realtime':
                    let EndingArrFromdet6 = determineFun($scope.targetArr.realtime, $scope.transmitModalItems.realtime);
                    var isAll = $scope.checkColFun(EndingArrFromdet6, $scope.checks_realtime);
                    if (isAll == true) {
                        $scope.columnCheckedAll_alarm = true;
                        $scope.checkAll('check_realtime');
                    }
                    break;

                default:
                    break;
            }
        };
        // $scope.selectCols();

        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        $scope.checkedOther = []; //选中的ID
        $scope.checkedItemsOther = []; //选中的对象数组
        $scope.checkedEnable = []; //选中的ID
        $scope.checkedItemsEnable = []; //选中的对象数组
        $scope.checkedSamply = []; //选中的ID
        $scope.checkedItemsSamply = []; //选中的对象数组
        $scope.checkedStatus = []; //选中的ID
        $scope.checkedItemsStatus = []; //选中的对象数组
        $scope.checkedParams = []; //选中的ID
        $scope.checkedItemsParams = []; //选中的对象数组


        $scope.checkAll = function(params) {
            switch (params) {
                case 'check_alarm':
                    if ($scope.columnCheckedAll_alarm) {
                        var index = $scope.checked.length;

                        if (index == 0) {
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            angular.forEach($scope.checks_alarm, function(i) {
                                i.columnChecked = true;
                                $scope.checked.push(i.columnId);
                                $scope.checkedItems.push(i);
                                // //$scope.selectedNum++;
                            });
                        } else if (index != 0) {
                            angular.forEach($scope.checks_alarm, function(i) {
                                if (i.columnChecked == true) {
                                    //console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checked.push(i.columnId);
                                    $scope.checkedItems.push(i);
                                    // //$scope.selectedNum++;
                                }

                            });
                        };

                    } else {
                        $scope.checked = [];
                        $scope.checkedItems = [];
                        angular.forEach($scope.checks_alarm, function(i) {
                            i.columnChecked = false;
                            $scope.selectedNum--;
                        });
                    }
                    //console.log(`base全选取消${$scope.checkedItems}`);
                    break;

                case 'check_alarmen':
                    if ($scope.columnCheckedAll_alarmen) {

                        var index2 = $scope.checkedOther.length;

                        if (index2 == 0) {
                            $scope.checkedOther = [];
                            $scope.checkedItemsOther = [];
                            angular.forEach($scope.checks_alarmen, function(i) {
                                i.columnChecked = true;
                                $scope.checkedOther.push(i.columnId);
                                $scope.checkedItemsOther.push(i);
                                // //$scope.selectedNum++;
                            });
                        } else if (index2 != 0) {
                            angular.forEach($scope.checks_alarmen, function(i) {
                                if (i.columnChecked == true) {
                                    //console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedOther.push(i.columnId);
                                    $scope.checkedItemsOther.push(i);
                                    //$scope.selectedNum++;
                                }

                            });
                        };

                    } else {
                        $scope.checkedOther = [];
                        $scope.checkedItemsOther = [];
                        angular.forEach($scope.checks_alarmen, function(i) {
                            i.columnChecked = false;
                            $scope.selectedNum--;
                        });

                    }
                    //console.log($scope.checkedItemsOther);
                    break;

                case 'check_base':
                    if ($scope.columnCheckedAll_base) {
                        var index3 = $scope.checkedEnable.length;
                        if (index3 == 0) {
                            $scope.checkedEnable = [];
                            $scope.checkedItemsEnable = [];
                            angular.forEach($scope.checks_base, function(i) {
                                i.columnChecked = true;
                                $scope.checkedEnable.push(i.columnId);
                                $scope.checkedItemsEnable.push(i);
                                //$scope.selectedNum++;
                            });
                        } else if (index3 != 0) {
                            angular.forEach($scope.checks_base, function(i) {
                                if (i.columnChecked == true) {
                                    //console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedEnable.push(i.columnId);
                                    $scope.checkedItemsEnable.push(i);
                                    //$scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        $scope.checkedEnable = [];
                        $scope.checkedItemsEnable = [];
                        angular.forEach($scope.checks_base, function(i) {
                            i.columnChecked = false;
                            $scope.selectedNum--;
                        });
                    }
                    //console.log($scope.checkedItemsEnable);
                    break;

                case 'check_omc':
                    if ($scope.columnCheckedAll_omc) {

                        var index4 = $scope.checkedStatus.length;

                        if (index4 == 0) {
                            $scope.checkedStatus = [];
                            $scope.checkedItemsStatus = [];
                            angular.forEach($scope.checks_omc, function(i) {
                                i.columnChecked = true;
                                $scope.checkedStatus.push(i.columnId);
                                $scope.checkedItemsStatus.push(i);
                                //$scope.selectedNum++;
                            });
                        } else if (index4 != 0) {
                            angular.forEach($scope.checks_omc, function(i) {
                                if (i.columnChecked == true) {
                                    //console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedStatus.push(i.columnId);
                                    $scope.checkedItemsStatus.push(i);
                                    //$scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        angular.forEach($scope.checks_omc, function(i) {
                            i.columnChecked = false;
                            $scope.checkedStatus = [];
                            $scope.checkedItemsStatus = [];
                            $scope.selectedNum--;
                        });
                    }
                    //console.log($scope.checkedItemsStatus);
                    break;

                case 'check_radio':
                    if ($scope.columnCheckedAll_radio) {
                        var index5 = $scope.checkedSamply.length;

                        if (index5 == 0) {
                            $scope.checkedSamply = [];
                            $scope.checkedItemsSamply = [];
                            angular.forEach($scope.checks_radio, function(i) {
                                i.columnChecked = true;
                                $scope.checkedSamply.push(i.columnId);
                                $scope.checkedItemsSamply.push(i);
                                //$scope.selectedNum++;
                            });
                        } else if (index5 != 0) {
                            angular.forEach($scope.checks_radio, function(i) {
                                if (i.columnChecked == true) {
                                    //console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedSamply.push(i.columnId);
                                    $scope.checkedItemsSamply.push(i);
                                    //$scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        angular.forEach($scope.checks_radio, function(i) {
                            i.columnChecked = false;
                            $scope.checkedSamply = [];
                            $scope.checkedItemsSamply = [];
                            $scope.selectedNum--;
                        });
                    }
                    //console.log($scope.checkedItemsSamply);
                    break;

                case 'check_realtime':
                    if ($scope.columnCheckedAll_realtime) {
                        var index6 = $scope.checkedParams.length;
                        if (index6 == 0) {
                            $scope.checkedParams = [];
                            $scope.checkedItemsParams = [];
                            angular.forEach($scope.checks_realtime, function(i) {
                                i.columnChecked = true;
                                $scope.checkedParams.push(i.columnId);
                                $scope.checkedItemsParams.push(i);
                                //$scope.selectedNum++;
                            });
                        } else if (index6 != 0) {
                            angular.forEach($scope.checks_realtime, function(i) {
                                if (i.columnChecked == true) {
                                    //console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedParams.push(i.columnId);
                                    $scope.checkedItemsParams.push(i);
                                    //$scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        angular.forEach($scope.checks_realtime, function(i) {
                            i.columnChecked = false;
                            $scope.checkedParams = [];
                            $scope.checkedItemsParams = [];
                            $scope.selectedNum--;
                        });
                    }
                    //console.log($scope.checkedItemsParams);
                    break;


                default:
                    break;
            }

        };
        $scope.checkOne = function(params) {
            switch (params) {
                case 'check_alarm':
                    if (firstCheck == true) {
                        angular.forEach($scope.checks_alarm, function(i) {
                            // if (i.columnChecked == true) {
                            //     $scope.checked.push(i.columnId);
                            //     $scope.checkedItems.push(i);
                            //     //$scope.selectedNum++;
                            //     // firstCheck = false;
                            // };
                            var index = $scope.checked.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                //$scope.selectedNum++;
                                $scope.checked.push(i.columnId);
                                $scope.checkedItems.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checked.splice(index, 1);
                                $scope.checkedItems.splice(index, 1);
                            } else {
                                return
                            };
                        });
                    } else {
                        angular.forEach($scope.checks_alarm, function(i) {
                            var index = $scope.checked.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                //$scope.selectedNum++;
                                $scope.checked.push(i.columnId);
                                $scope.checkedItems.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checked.splice(index, 1);
                                $scope.checkedItems.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checks_alarm.length == $scope.checked.length) {
                        $scope.columnCheckedAll_alarm = true;
                    } else {
                        $scope.columnCheckedAll_alarm = false;
                    };
                    //console.log($scope.checkedItems);
                    break;

                case 'check_alarmen':
                    if (firstCheck == true) {
                        // angular.forEach($scope.checks_alarmen, function(i) {
                        //     var index = $scope.checkedOther.indexOf(i.columnId);
                        //     if (i.columnChecked && index == -1) {
                        //         $scope.checkedOther.push(i.columnId);
                        //         $scope.checkedItemsOther.push(i);
                        //         //$scope.selectedNum++;
                        //         // firstCheck = false;
                        //     };
                        // });
                        angular.forEach($scope.checks_alarmen, function(i) {
                            var index = $scope.checkedOther.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.checkedOther.push(i.columnId);
                                $scope.checkedItemsOther.push(i);
                                // firstCheck = false;
                                //$scope.selectedNum++;
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedOther.splice(index, 1);
                                $scope.checkedItemsOther.splice(index, 1);
                            } else {
                                return
                            };
                        });
                    } else {
                        angular.forEach($scope.checks_alarmen, function(i) {
                            var index = $scope.checkedOther.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                //$scope.selectedNum++;
                                $scope.checkedOther.push(i.columnId);
                                $scope.checkedItemsOther.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedOther.splice(index, 1);
                                $scope.checkedItemsOther.splice(index, 1);
                            } else {
                                return
                            };
                        })

                    };
                    if ($scope.checks_alarmen.length == $scope.checkedOther.length) {
                        $scope.columnCheckedAll_alarmen = true;
                    } else {
                        $scope.columnCheckedAll_alarmen = false;
                    };
                    //console.log($scope.checkedItemsOther);
                    break;

                case 'check_base':
                    if (firstCheck == true) {
                        angular.forEach($scope.checks_base, function(i) {
                            var index = $scope.checkedEnable.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.checkedEnable.push(i.columnId);
                                $scope.checkedItemsEnable.push(i);
                                // firstCheck = false;
                                //$scope.selectedNum++;
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedEnable.splice(index, 1);
                                $scope.checkedItemsEnable.splice(index, 1);
                            } else {
                                return
                            };
                        });

                    } else {
                        angular.forEach($scope.checks_base, function(i) {
                            var index = $scope.checkedEnable.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                //$scope.selectedNum++;
                                $scope.checkedEnable.push(i.columnId);
                                $scope.checkedItemsEnable.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedEnable.splice(index, 1);
                                $scope.checkedItemsEnable.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };


                    if ($scope.checks_base.length == $scope.checkedEnable.length) {
                        $scope.columnCheckedAll_base = true;
                    } else {
                        $scope.columnCheckedAll_base = false;
                    };
                    //console.log($scope.checkedItemsEnable);
                    break;

                case 'check_omc':
                    if (firstCheck == true) {
                        // angular.forEach($scope.checks_omc, function(i) {
                        //     var index = $scope.checkedStatus.indexOf(i.columnId);
                        //     if (i.columnChecked && index == -1) {
                        //         $scope.checkedStatus.push(i.columnId);
                        //         $scope.checkedItemsStatus.push(i);
                        //         //$scope.selectedNum++;
                        //         // firstCheck = false;
                        //     };
                        // });

                        angular.forEach($scope.checks_omc, function(i) {
                            var index = $scope.checkedStatus.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.checkedStatus.push(i.columnId);
                                $scope.checkedItemsStatus.push(i);
                                // firstCheck = false;
                                //$scope.selectedNum++;
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedStatus.splice(index, 1);
                                $scope.checkedItemsStatus.splice(index, 1);
                            } else {
                                return
                            };
                        });


                    } else {
                        angular.forEach($scope.checks_omc, function(i) {
                            var index = $scope.checkedStatus.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                //$scope.selectedNum++;
                                $scope.checkedStatus.push(i.columnId);
                                $scope.checkedItemsStatus.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedStatus.splice(index, 1);
                                $scope.checkedItemsStatus.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checks_omc.length == $scope.checkedStatus.length) {
                        $scope.columnCheckedAll_omc = true;
                    } else {
                        $scope.columnCheckedAll_omc = false;
                    };
                    //console.log($scope.checkedItemsStatus);
                    break;

                case 'check_radio':
                    if (firstCheck == true) {
                        // angular.forEach($scope.checks_radio, function(i) {
                        //     var index = $scope.checkedSamply.indexOf(i.columnId);
                        //     if (i.columnChecked && index == -1) {
                        //         $scope.checkedSamply.push(i.columnId);
                        //         $scope.checkedItemsSamply.push(i);
                        //         //$scope.selectedNum++;
                        //         // firstCheck = false;
                        //     };
                        // });
                        angular.forEach($scope.checks_radio, function(i) {
                            var index = $scope.checkedSamply.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.checkedSamply.push(i.columnId);
                                $scope.checkedItemsSamply.push(i);
                                // firstCheck = false;
                                //$scope.selectedNum++;
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedSamply.splice(index, 1);
                                $scope.checkedItemsSamply.splice(index, 1);
                            } else {
                                return
                            };
                        });
                    } else {
                        angular.forEach($scope.checks_radio, function(i) {
                            // var index = $scope.checkedSamply.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                //$scope.selectedNum++;
                                $scope.checkedSamply.push(i.columnId);
                                $scope.checkedItemsSamply.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedSamply.splice(index, 1);
                                $scope.checkedItemsSamply.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checks_radio.length == $scope.checkedSamply.length) {
                        $scope.columnCheckedAll_radio = true;
                    } else {
                        $scope.columnCheckedAll_radio = false;
                    };
                    //console.log($scope.checkedItemsSamply);
                    break;

                case 'check_realtime':
                    if (firstCheck == true) {
                        // angular.forEach($scope.checks_realtime, function(i) {
                        //     var index = $scope.checkedParams.indexOf(i.columnId);
                        //     if (i.columnChecked && index == -1) {
                        //         $scope.checkedParams.push(i.columnId);
                        //         $scope.checkedItemsParams.push(i);
                        //         //$scope.selectedNum++;
                        //         // firstCheck = false;
                        //     };
                        // });
                        angular.forEach($scope.checks_realtime, function(i) {
                            var index = $scope.checkedParams.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.checkedParams.push(i.columnId);
                                $scope.checkedItemsParams.push(i);
                                // firstCheck = false;
                                //$scope.selectedNum++;
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedParams.splice(index, 1);
                                $scope.checkedItemsParams.splice(index, 1);
                            } else {
                                return
                            };
                        });
                    } else {
                        angular.forEach($scope.checks_realtime, function(i) {
                            var index = $scope.checkedParams.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                //$scope.selectedNum++;
                                $scope.checkedParams.push(i.columnId);
                                $scope.checkedItemsParams.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedParams.splice(index, 1);
                                $scope.checkedItemsParams.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checks_realtime.length == $scope.checkedParams.length) {
                        $scope.columnCheckedAll_realtime = true;
                    } else {
                        $scope.columnCheckedAll_realtime = false;
                    };
                    //console.log($scope.checkedItemsParams);
                    break;

                default:
                    break;
            }


        };

        $scope.getCheckedCols = function(params) {
            switch (params) {
                case 'check_alarm':
                    angular.forEach($scope.checks_alarm, function(i) {
                        var index = $scope.checked.indexOf(i.columnId);
                        if (i.columnChecked && index == -1) {
                            //$scope.selectedNum++;
                            $scope.checked.push(i.columnId);
                            $scope.checkedItems.push(i);
                        } else {
                            return
                        };
                    });

                    if ($scope.checks_alarm.length == $scope.checked.length) {
                        $scope.columnCheckedAll_alarm = true;
                    } else {
                        $scope.columnCheckedAll_alarm = false;
                    };
                    break;

                case 'check_alarmen':
                    angular.forEach($scope.checks_alarmen, function(i) {
                        var index = $scope.checkedOther.indexOf(i.columnId);
                        if (i.columnChecked && index == -1) {
                            $scope.checkedOther.push(i.columnId);
                            $scope.checkedItemsOther.push(i);
                            //$scope.selectedNum++;
                        };
                    });
                    if ($scope.checks_alarmen) {
                        if ($scope.checks_alarmen.length == $scope.checkedOther.length) {
                            $scope.columnCheckedAll_alarmen = true;
                        } else {
                            $scope.columnCheckedAll_alarmen = false;
                        };
                        //console.log($scope.checkedItemsOther);
                    } else {}

                    break;

                case 'check_base':

                    angular.forEach($scope.checks_base, function(i) {
                        var index = $scope.checkedEnable.indexOf(i.columnId);
                        if (i.columnChecked && index == -1) {
                            $scope.checkedEnable.push(i.columnId);
                            $scope.checkedItemsEnable.push(i);
                            // firstCheck = false;
                            //$scope.selectedNum++;
                        };
                    });
                    if ($scope.checks_base) {
                        if ($scope.checks_base.length == $scope.checkedEnable.length) {
                            $scope.columnCheckedAll_base = true;
                        } else {
                            $scope.columnCheckedAll_base = false;
                        };
                    }
                    break;

                case 'check_omc':

                    angular.forEach($scope.checks_omc, function(i) {
                        var index = $scope.checkedStatus.indexOf(i.columnId);
                        if (i.columnChecked && index == -1) {
                            $scope.checkedStatus.push(i.columnId);
                            $scope.checkedItemsStatus.push(i);
                            //$scope.selectedNum++;
                            // firstCheck = false;
                        };
                    });
                    if ($scope.checks_omc) {
                        if ($scope.checks_omc.length == $scope.checkedStatus.length) {
                            $scope.columnCheckedAll_omc = true;
                        } else {
                            $scope.columnCheckedAll_omc = false;
                        };
                    }

                    break;

                case 'check_radio':

                    angular.forEach($scope.checks_radio, function(i) {
                        var index = $scope.checkedSamply.indexOf(i.columnId);
                        if (i.columnChecked && index == -1) {
                            $scope.checkedSamply.push(i.columnId);
                            $scope.checkedItemsSamply.push(i);
                            //$scope.selectedNum++;
                            // firstCheck = false;
                        };
                    });
                    if ($scope.checks_radio) {
                        if ($scope.checks_radio.length == $scope.checkedSamply.length) {
                            $scope.columnCheckedAll_radio = true;
                        } else {
                            $scope.columnCheckedAll_radio = false;
                        };
                    }
                    break;

                case 'check_realtime':

                    angular.forEach($scope.checks_realtime, function(i) {
                        var index = $scope.checkedParams.indexOf(i.columnId);
                        if (i.columnChecked && index == -1) {
                            $scope.checkedParams.push(i.columnId);
                            $scope.checkedItemsParams.push(i);
                            //$scope.selectedNum++;
                            // firstCheck = false;
                        };
                    });
                    if ($scope.checks_realtime.length == $scope.checkedParams.length) {
                        $scope.columnCheckedAll_realtime = true;
                    } else {
                        $scope.columnCheckedAll_realtime = false;
                    };
                    break;

                default:
                    break;
            }
        }

        $scope.save = function() {

            var newItems = {};
            $scope.getCheckedCols('check_alarm');
            $scope.getCheckedCols('check_alarmen');
            $scope.getCheckedCols('check_base');
            $scope.getCheckedCols('check_omc');
            $scope.getCheckedCols('check_radio');
            $scope.getCheckedCols('check_realtime');

            newItems.alarm = $scope.checked;
            newItems.alarmen = $scope.checkedOther;
            newItems.base = $scope.checkedEnable;
            newItems.omc = $scope.checkedStatus;
            newItems.radio = $scope.checkedSamply;
            newItems.realtime = $scope.checkedParams;
            // messageAlertService.alertFun('must');

            // newItems.columnChecked = true;
            if ($scope.isAdd == 'Add') {
                if (newItems) {
                    $uibModalInstance.close(newItems);
                } else {
                    alert('No data')
                }

            } else if ($scope.isAdd == 'Modify') {
                if (newItems) {
                    $uibModalInstance.close(newItems);
                } else {
                    alert('No data')
                }
            };
        };


        $scope.close = function() {
            // $uibModalInstance.cancel();
            $uibModalInstance.dismiss('cancel')
        };

    }
})();