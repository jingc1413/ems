/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.deviceManagement.NotInService', ['SunWave.pages.deviceManagement.deviceList'])
    .controller('detailDeviceNameModalCtrl', detailDeviceNameModalCtrl);

function detailDeviceNameModalCtrl($scope, deviceListService, checkedItems) {

    $scope.checkedItems = checkedItems;

    $scope.xx = {
        select_allQ: "",
        select_allQS: "",
        al_select_all: "",
        ra_select_allQS: "",
        ra_select_allQ: "",
    };

    $scope.row = {
        setValue: "",
        isEnable: "",
        isInpu: false,
        isSelec: false
    };
    var noClickFun = () => {
        let noClick_typeid = $scope.checkedItems.neDevicetype.dtpDevicetypeid;
        if (noClick_typeid == 240 || noClick_typeid == 225 || noClick_typeid == 230) {
            $scope.noClick = true;
        }
    };
    noClickFun();

    // (function emit_noClickFun() {
    //     $scope.$on('noClickFun', noClickFun());
    // })();

    //base
    var searchForm = function() {
        var typeQ = 'base';
        var typeQS = 'omc';
        deviceListService.obtainBasicInfo(checkedItems.neNeid, typeQ)
            .success(function(response) {
                $scope.rowsQ = response.data.base;
            })
            .error(function(err) {
                console.info(err);
            });

        deviceListService.obtainBasicInfo(checkedItems.neNeid, typeQS)
            .success(function(response) {
                $scope.rowsQS = response.data.omc;
                // for (let i = 0; i < $scope.rowsQS.length; i++) {
                //     if ($scope.rowsQS[i].objValueSet.length != 0) {
                //         $scope.rowsQS[i].isSelec = true;
                //     }

                // }
            })
            .error(function(err) {
                console.info(err);
            });
    };
    searchForm();

    //alarm
    var searchAlarm = function() {
        $scope.neAlarmenabledobjlist = checkedItems.neAlarmenabledobjlist;
        deviceListService.obtainAlarmInfo(checkedItems.neNeid)
            .success(function(response) {
                $scope.al_rows = response.data.alarm;
                for (let i = 0; i < $scope.al_rows.length; i++) {
                    if ($scope.al_rows[i].objValueSet.length != 0) {
                        $scope.al_rows[i].isSelec = true;
                    }
                }
            })
            .error(function(err) {
                console.info(err);
            });
    };
    searchAlarm();

    //radio
    var searchRadio = function() {
        var typeQS = 'radio';
        var typeQ = 'realtime';
        // checkedItems.neNeid = 7510;
        deviceListService.obtainRadioInfo(checkedItems.neNeid, typeQS)
            .success(function(response) {
                $scope.ra_rowsQS = response.data.radio;
                // for (let i = 0; i < $scope.ra_rowsQS.length; i++) {
                //     if ($scope.ra_rowsQS[i].objValueSet.length != 0) {
                //         $scope.ra_rowsQS[i].isSelec = true;
                //     }
                // }
            })
            .error(function(err) {
                console.info(err);
            });
        deviceListService.obtainRadioInfo(checkedItems.neNeid, typeQ)
            .success(function(response) {
                $scope.ra_rowsQ = response.data.realtime;
            })
            .error(function(err) {
                console.info(err);
            });
    };
    searchRadio();

    //setValue/alarmEnable  的点击事件(input or select)
    $scope.clickInput = function(rowQS, e) {

        if (rowQS.objValueSet.length != 0) {
            rowQS.isSelec = true;
            // for (var i = 0; i < $scope.tkdSetparam.length; i++) {
            //     for (var j = 0; j < $scope.tkdSetvalue.length; j++) {
            //         if (rowQS.objId == $scope.tkdSetparam[i]) {
            //             rowQS.objSetValueKey = $scope.tkdSetvalue[i];
            //         }
            //     }
            // }
        } else {
            rowQS.isInpu = true;
            // for (var i = 0; i < $scope.tkdSetparam.length; i++) {
            //     for (var j = 0; j < $scope.tkdSetvalue.length; j++) {
            //         if (row.objId == $scope.tkdSetparam[i]) {
            //             row.setValue = $scope.tkdSetvalue[i];
            //         }
            //     }
            // }
        }

    };


    //////////////////////////////////////-----------base query---------------///////////////////////////////////////////

    $scope.m = [];
    $scope.checkedQ = []; //选中的ID
    $scope.checkedItemsQ = []; //选中的对象数组

    $scope.selectAllQ = function() {
        if ($scope.xx.select_allQ) {
            $scope.checkedQ = [];
            $scope.checkedItemsQ = [];
            angular.forEach($scope.rowsQ, function(i) {
                i.checked = true;
                $scope.checkedQ.push(i.id);
                $scope.checkedItemsQ.push(i);
            });
        } else {
            angular.forEach($scope.rowsQ, function(i) {
                i.checked = false;
                $scope.checkedQ = [];
                $scope.checkedItemsQ = [];
            });
        }
        console.log($scope.checkedQ);
    };
    $scope.selectOneQ = function() {
        angular.forEach($scope.rowsQ, function(i) {
            var index = $scope.checkedQ.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.checkedQ.push(i.id);
                $scope.checkedItemsQ.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checkedQ.splice(index, 1);
                $scope.checkedItemsQ.splice(index, 1);
            };
        });


        if ($scope.rowsQ.length == $scope.checkedQ.length) {
            $scope.xx.select_allQ = true;
        } else {
            $scope.xx.select_allQ = false;
        }
        console.log($scope.checkedItemsQ);
    };



    //////////////////////////////////////-----------base query and set---------------///////////////////////////////////////////

    $scope.m = [];
    $scope.checkedQS = []; //选中的ID
    $scope.checkedItemsQS = []; //选中的对象数组

    $scope.selectAllQS = function() {
        if ($scope.xx.select_allQS) {
            $scope.checkedQS = [];
            $scope.checkedItemsQS = [];
            angular.forEach($scope.rowsQS, function(i) {
                i.checked = true;
                $scope.checkedQS.push(i.id);
                $scope.checkedItemsQS.push(i);
            });
        } else {
            angular.forEach($scope.rowsQS, function(i) {
                i.checked = false;
                $scope.checkedQS = [];
                $scope.checkedItemsQS = [];
            });
        }
        console.log($scope.checkedQS);
    };
    $scope.selectOneQS = function() {
        angular.forEach($scope.rowsQS, function(i) {
            var index = $scope.checkedQS.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.checkedQS.push(i.id);
                $scope.checkedItemsQS.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checkedQS.splice(index, 1);
                $scope.checkedItemsQS.splice(index, 1);
            };
        });


        if ($scope.rowsQS.length == $scope.checkedQS.length) {
            $scope.xx.select_allQS = true;
        } else {
            $scope.xx.select_allQS = false;
        }
        console.log($scope.checkedItemsQS);
    };

    //////////////////////////////////////-----------alarm---------------///////////////////////////////////////////

    $scope.m = [];
    $scope.al_checked = []; //选中的ID
    $scope.al_checkedItems = []; //选中的对象数组

    $scope.al_selectAll = function() {
        if ($scope.xx.al_select_all) {
            $scope.al_checked = [];
            $scope.al_checkedItems = [];
            angular.forEach($scope.al_rows, function(i) {
                i.checked = true;
                $scope.al_checked.push(i.id);
                $scope.al_checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.al_rows, function(i) {
                i.checked = false;
                $scope.al_checked = [];
                $scope.al_checkedItems = [];
            });
        }
        console.log($scope.al_checked);
    };
    $scope.al_selectOne = function() {
        angular.forEach($scope.al_rows, function(i) {
            var index = $scope.al_checked.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.al_checked.push(i.id);
                $scope.al_checkedItems.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.al_checked.splice(index, 1);
                $scope.al_checkedItems.splice(index, 1);
            };
        });


        if ($scope.al_rows.length == $scope.al_checked.length) {
            $scope.xx.al_select_all = true;
        } else {
            $scope.xx.al_select_all = false;
        }
        console.log($scope.al_checkedItems);
    };

    //////////////////////////////////////-----------radio query and set---------------///////////////////////////////////////////

    $scope.m = [];
    $scope.ra_checkedQS = []; //选中的ID
    $scope.ra_checkedItemsQS = []; //选中的对象数组

    $scope.ra_selectAllQS = function() {
        if ($scope.xx.ra_select_allQS) {
            $scope.ra_checkedQS = [];
            $scope.ra_checkedItemsQS = [];
            angular.forEach($scope.ra_rowsQS, function(i) {
                i.checked = true;
                $scope.ra_checkedQS.push(i.id);
                $scope.ra_checkedItemsQS.push(i);
            });
        } else {
            angular.forEach($scope.ra_rowsQS, function(i) {
                i.checked = false;
                $scope.ra_checkedQS = [];
                $scope.ra_checkedItemsQS = [];
            });
        }
        console.log($scope.ra_checkedQS);
    };
    $scope.ra_selectOneQS = function() {
        angular.forEach($scope.ra_rowsQS, function(i) {
            var index = $scope.ra_checkedQS.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.ra_checkedQS.push(i.id);
                $scope.ra_checkedItemsQS.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.ra_checkedQS.splice(index, 1);
                $scope.ra_checkedItemsQS.splice(index, 1);
            };
        });


        if ($scope.ra_rowsQ.length == $scope.ra_checkedQS.length) {
            $scope.xx.ra_select_allQS = true;
        } else {
            $scope.xx.ra_select_allQS = false;
        }
        console.log($scope.ra_checkedItemsQS);
    };

    //////////////////////////////////////-----------radio---------------///////////////////////////////////////////

    $scope.m = [];
    $scope.ra_checkedQ = []; //选中的ID
    $scope.ra_checkedItemsQ = []; //选中的对象数组

    $scope.ra_selectAllQ = function() {
        if ($scope.xx.ra_select_allQ) {
            $scope.ra_checkedQ = [];
            $scope.ra_checkedItemsQ = [];
            angular.forEach($scope.ra_rowsQ, function(i) {
                i.checked = true;
                $scope.ra_checkedQ.push(i.id);
                $scope.ra_checkedItemsQ.push(i);
            });
        } else {
            angular.forEach($scope.ra_rowsQ, function(i) {
                i.checked = false;
                $scope.ra_checkedQ = [];
                $scope.ra_checkedItemsQ = [];
            });
        }
        console.log($scope.ra_checkedQ);
    };
    $scope.ra_selectOneQ = function() {
        angular.forEach($scope.ra_rowsQ, function(i) {
            var index = $scope.ra_checkedQ.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.ra_checkedQ.push(i.id);
                $scope.ra_checkedItemsQ.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.ra_checkedQ.splice(index, 1);
                $scope.ra_checkedItemsQ.splice(index, 1);
            };
        });


        if ($scope.ra_rowsQ.length == $scope.ra_checkedQ.length) {
            $scope.xx.ra_select_allQ = true;
        } else {
            $scope.xx.ra_select_allQ = false;
        }
        console.log($scope.ra_checkedItemsQ);
    };

    ///////////////////////////////---------------end------------------------/////////////////////////////////////////////////////////////


    $scope.clearBase = function() {
        $scope.checkedItemsQ = [];
        $scope.checkedItemsQS = [];
        searchForm();
    };
    $scope.clearAlarm = function() {
        $scope.al_checkedItems = [];
        searchAlarm();
    };
    $scope.clearRadio = function() {
        $scope.ra_checkedItemsQS = [];
        $scope.ra_checkedItemsQ = [];
        searchRadio();
    };
    //queryBase
    $scope.queryBase = function(flag) {
        $scope.neId = $scope.checkedItems.neNeid;
        if (flag == 'base') {
            $scope.windowId = 'queryBase';
            var objIdsArrQ = [];
            var objIdsArrQS = [];
            for (let i = 0; i < $scope.checkedItemsQ.length; i++) {
                objIdsArrQ.push($scope.checkedItemsQ[i].id);

            };
            for (let j = 0; j < $scope.checkedItemsQS.length; j++) {
                objIdsArrQS.push($scope.checkedItemsQS[j].id);

            };
            if (objIdsArrQ.length == 0 && objIdsArrQS.length == 0) {
                alert('please select one!')
            } else {
                objIdsArrQ.push(...objIdsArrQS);
                $scope.objids = objIdsArrQ.toString();
                deviceListService.queryBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
                    if (res.data == 'sent') {
                        alert('Query Success!');
                        $scope.clearBase();
                    } else {
                        alert('Query Failed!' + res.msg);
                        $scope.clearBase();
                    }
                })
            };
        } else if (flag == 'alarm') {

            $scope.windowId = 'queryAlarm';
            var al_objIdsArr = [];
            for (let i = 0; i < $scope.al_checkedItems.length; i++) {
                al_objIdsArr.push($scope.al_checkedItems[i].id);

            };
            if (al_objIdsArr.length == 0) {
                alert('please select one!')
            } else {
                $scope.objids = al_objIdsArr.toString();
                deviceListService.queryBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
                    if (res.data == 'sent') {
                        alert('Query Success!');
                        $scope.clearAlarm();
                    } else {
                        alert('Query Failed!' + res.msg);
                        $scope.clearAlarm();
                    }
                })
            };

        } else {
            $scope.windowId = 'queryRadio';
            var ra_objIdsArrQ = [];
            var ra_objIdsArrQS = [];
            for (let i = 0; i < $scope.ra_checkedItemsQ.length; i++) {
                ra_objIdsArrQ.push($scope.ra_checkedItemsQ[i].id);

            };
            for (let j = 0; j < $scope.ra_checkedItemsQS.length; j++) {
                ra_objIdsArrQS.push($scope.ra_checkedItemsQS[j].id);

            };
            if (ra_objIdsArrQ.length == 0 && ra_objIdsArrQS.length == 0) {
                alert('please select one!')
            } else {
                ra_objIdsArrQ.push(...ra_objIdsArrQS);
                $scope.objids = ra_objIdsArrQ.toString();
                deviceListService.queryBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
                    if (res.data == 'sent') {
                        alert('Query Success!');
                        $scope.clearRadio();


                    } else {
                        alert('Query Failed!' + res.msg);
                        $scope.clearRadio();

                    }
                })
            };
        }
    };
    //set
    $scope.setBase = function(flag) {
        $scope.neId = $scope.checkedItems.neNeid;
        if (flag == 'base') {
            $scope.windowId = 'aassss';
            $scope.qryNumber = '1';

            var setValueArr = [];
            var objIdsArrQS = [];
            for (let j = 0; j < $scope.checkedItemsQS.length; j++) {
                objIdsArrQS.push($scope.checkedItemsQS[j].id);
                setValueArr.push($scope.checkedItemsQS[j].setValue);
            };
            if (objIdsArrQS.length == 0) {
                alert('please select one!')
            } else {
                if (setValueArr.length == 0) {
                    alert('please set value!')
                } else {
                    $scope.objids = objIdsArrQS.toString();
                    $scope.objValues = setValueArr.toString();
                    deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                        if (res.data == true) {
                            alert('Set Success!');
                            $scope.clearBase();
                        } else {
                            alert('Set Failed!' + res.msg);
                            $scope.clearBase();
                        }
                    })
                };
            };
        } else if (flag == 'alarm') {
            $scope.windowId = 'aassss2';
            $scope.qryNumber = '2';

            var setValueArr = [];
            var al_objIdsArrQS = [];
            for (let j = 0; j < $scope.al_checkedItems.length; j++) {
                al_objIdsArrQS.push($scope.al_checkedItems[j].id);
                if ($scope.al_checkedItems[j].isInpu == true) {
                    setValueArr.push($scope.al_checkedItems[j].setValue);
                } else if ($scope.al_checkedItems[j].isSelec == true) {
                    setValueArr.push($scope.al_checkedItems[j].isEnable);
                }
            };
            if (al_objIdsArrQS.length == 0) {
                alert('please select one!')
            } else {
                if (setValueArr.length == 0) {
                    alert('please select value!')
                } else {
                    $scope.objids = al_objIdsArrQS.toString();
                    $scope.objValues = setValueArr.toString();
                    deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                        if (res.data == 'send') {
                            alert('Set Success!');
                            $scope.clearAlarm();

                        } else {
                            alert('Set Failed!' + res.msg);
                            $scope.clearAlarm();

                        }
                    })
                };
            };
        } else {
            $scope.windowId = 'aassss3';
            $scope.qryNumber = '3';

            var setValueArr = [];
            var ra_objIdsArrQS = [];
            for (let j = 0; j < $scope.ra_checkedItemsQS.length; j++) {
                ra_objIdsArrQS.push($scope.ra_checkedItemsQS[j].id);
                if ($scope.ra_checkedItemsQS[j].isInpu == true) {
                    setValueArr.push($scope.ra_checkedItemsQS[j].setValue);
                } else if ($scope.ra_checkedItemsQS[j].isSelec == true) {
                    setValueArr.push($scope.ra_checkedItemsQS[j].isEnable);
                }
            };
            if (ra_objIdsArrQS.length == 0) {
                alert('please select one!')
            } else {
                if (setValueArr.length == 0) {
                    alert('please select value!')
                } else {
                    $scope.objids = ra_objIdsArrQS.toString();
                    $scope.objValues = setValueArr.toString();
                    deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                        if (res.data == 'send') {
                            alert('Set Success!');
                            $scope.clearRadio();

                        } else {
                            alert('Set Failed!' + res.msg);
                            $scope.clearRadio();

                        }
                    })
                };
            };
        }
    };

    //monitorBaseQuery
    $scope.monitorBase = function() {
        $scope.neId = $scope.checkedItems.neNeid;
        $scope.windowId = 1;
        $scope.objids = '0009';

        deviceListService.monitorBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
            if (res.data == 'sent') {
                alert('Success!');
                $scope.clearBase();
                $scope.clearAlarm();
                $scope.clearRadio();

            } else {
                alert('Failed!' + res.msg);
                $scope.clearBase();
                $scope.clearAlarm();
                $scope.clearRadio();
            }
        })

    };

    //queryDeviceBase
    $scope.queryDeviceBase = function() {
        $scope.neId = $scope.checkedItems.neNeid;
        $scope.neDeviceIP = '';
        $scope.neDevicePort = '';
        $scope.neQryCommtypeId = '';
        $scope.neQryRepeaterId = '';
        $scope.comWindowId = 'queryDeviceBtnWindowId';

        deviceListService.queryDevice($scope.comWindowId, $scope.neDeviceIP, $scope.neDevicePort, $scope.neId, $scope.neQryCommtypeId, $scope.neQryRepeaterId).success(function(res) {
            if (res.data == true) {
                alert('Success!');
                $scope.clearBase();
                $scope.clearAlarm();
                $scope.clearRadio();
            } else {
                alert('Failed!' + res.msg);
                $scope.clearBase();
                $scope.clearAlarm();
                $scope.clearRadio();
            }
        })

    };

    //resetBase
    $scope.resetBase = function() {
        $scope.neId = $scope.checkedItems.neNeid;
        $scope.windowId = 'resetBtnWindowId';
        $scope.qryNumber = '1';
        $scope.dtcDevicetypeclassifyid = $scope.checkedItems.neDevicetype.neDevicetypeclassify.dtcDevicetypeclassifyid;

        if ($scope.dtcDevicetypeclassifyid == '8' || $scope.dtcDevicetypeclassifyid == '9') {
            $scope.objids = '0022';
            $scope.objValues = 1;
            deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                if (res.data == 'send') {
                    alert('Success!');
                    $scope.clearBase();
                    $scope.clearAlarm();
                    $scope.clearRadio();
                } else {
                    alert('Failed!' + res.msg);
                    $scope.clearBase();
                    $scope.clearAlarm();
                    $scope.clearRadio();
                }
            })
        } else {
            alert('Only AU Can Reset!')
        }

    };


    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}
// });