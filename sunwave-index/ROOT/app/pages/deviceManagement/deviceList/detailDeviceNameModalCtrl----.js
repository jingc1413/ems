/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.deviceManagement.deviceList', ['SunWave.pages.top'])
    .controller('detailDeviceNameModalCtrl', detailDeviceNameModalCtrl);

function detailDeviceNameModalCtrl($rootScope, $scope, deviceListService, topService, checkedItems, $uibModalInstance) {

    $scope.checkedItems = checkedItems;

    $scope.title = $scope.checkedItems.neName;
    //有拓扑图则不显示
    $scope.noTop = false;
    $scope.haveTop = true;

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

    $scope.noClick = true;

    //只有UDP才显示Monitory query
    $scope.isUDP = true;


    $scope.rowsCOM = [];
    $scope.al_COM_rows = [];
    $scope.ra_rowsCOM = [];


    // $scope.al_rows = {
    //     setValue: "",
    //     isEnable: "",
    //     isInpu: false,
    //     isSelec: true
    // };


    // $scope.isSelec = true;

    // $scope.objValueSet = [{
    //     "valueKey": 0,
    //     "valueValue": "Disable"
    // }, {
    //     "valueKey": 1,
    //     "valueValue": "Enable"
    // }, {
    //     "valueKey": 2,
    //     "valueValue": "Critical"
    // }, {
    //     "valueKey": 3,
    //     "valueValue": "Major"
    // }, {
    //     "valueKey": 4,
    //     "valueValue": "Minor"
    // }, {
    //     "valueKey": 5,
    //     "valueValue": "Warning"
    // }];

    //max
    $scope.max = true;
    $scope.min = false;

    $scope.InitInterface = function(e, ele) {
        if (window.screen) {
            var mymodal = document.getElementById('mymodal');
            $scope.wid = document.getElementById('mymodal').clientWidth;
            $scope.hei = document.getElementById('mymodal').clientHeight;

            $scope.myw = screen.availWidth;
            $scope.myh = screen.availHeight;
            window.moveTo(0, 0);
            mymodal.style.width = $scope.myw + "px";
            mymodal.style.height = $scope.myh + "px";
            //偏移
            mymodal.style.left = ($scope.wid - $scope.myw) / 2 + "px";
            $scope.max = false;
            $scope.min = true;
        }
    };
    $scope.InitInterface2 = function(e, ele) {
        if (window.screen) {
            var mymodal = document.getElementById('mymodal');

            $scope.myw = screen.availWidth;
            $scope.myh = screen.availHeight;
            // window.moveTo(0, 0);
            mymodal.style.width = $scope.wid + "px";
            mymodal.style.height = $scope.hei + "px";
            mymodal.style.left = "0px";
            $scope.min = false;
            $scope.max = true;
        }
    };

    var noClickFun = function() {
        let noClick_typeid = $scope.checkedItems.neDevicetype.dtpDevicetypeid;
        if (noClick_typeid == 240 || noClick_typeid == 225 || noClick_typeid == 230) {
            $scope.noClick = false;
        };
        let noClick_commtypeid = $scope.checkedItems.neCommtypeid;
        if (noClick_commtypeid == 6) {
            $scope.isUDP = false;
        };
    };
    noClickFun();

    (function emit_noClickFun() {
        $scope.$emit('noClickFun', noClickFun());
    })();


    //base
    $scope.searchForm = function() {
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
                for (var i = 0; i < $scope.rowsQS.length; i++) {
                    if ($scope.rowsQS[i].objValueSet.length != 0) {
                        $scope.objValueSetArr = $scope.rowsQS[i].objValueSet;
                        for (var j = 0; j < $scope.objValueSetArr.length; j++) {
                            if ($scope.objValueSetArr[j].valueKey == $scope.rowsQS[i].value) {
                                $scope.rowsQS[i].value = $scope.objValueSetArr[j].valueValue;
                            }
                        }
                    } else {};
                    if ($scope.rowsQS[i].name == 'Device ID') {
                        $scope.rowsQS[i].value = Number($scope.rowsQS[i].value);
                        $scope.rowsQS[i].value = ($scope.rowsQS[i].value).toString(16);
                        // alert($scope.rowsQS[i].value);
                    } else {

                        // return
                    }
                }
            })
            .error(function(err) {
                console.info(err);
            });
    };
    $scope.searchForm();

    //alarm
    $scope.searchAlarm = function() {
        $scope.neAlarmenabledobjlist = checkedItems.neAlarmenabledobjlist;
        deviceListService.obtainAlarmInfo(checkedItems.neNeid)
            .success(function(response) {
                // if (response.alarm) {
                $scope.al_rows = response.data.alarm;
                for (let i = 0; i < $scope.al_rows.length; i++) {
                    if ($scope.al_rows[i].objValueSet.length != null) {
                        $scope.al_isSelec = true;
                    } else {

                    }
                }

            })
            .error(function(err) {
                console.info(err);
            });
    };


    //radio
    $scope.searchRadio = function() {
        var typeQS = 'radio';
        var typeQ = 'realtime';
        // checkedItems.neNeid = 7510;
        deviceListService.obtainRadioInfo(checkedItems.neNeid, typeQS)
            .success(function(response) {
                $scope.ra_rowsQS = response.data.radio;
                for (let i = 0; i < $scope.ra_rowsQS.length; i++) {
                    if ($scope.ra_rowsQS[i].objValueSet.length != 0) {
                        // $scope.ra_rowsQS[i].isSelec = true;
                        $scope.objValueSetArr = $scope.ra_rowsQS[i].objValueSet;
                        for (let j = 0; j < $scope.objValueSetArr.length; j++) {
                            if ($scope.objValueSetArr[j].valueKey == $scope.ra_rowsQS[i].value) {
                                $scope.ra_rowsQS[i].value = $scope.objValueSetArr[j].valueValue;
                            }
                        }
                    }
                }
            })
            .error(function(err) {
                console.info(err);
            });
        deviceListService.obtainRadioInfo(checkedItems.neNeid, typeQ)
            .success(function(response) {
                $scope.ra_rowsQ = response.data.realtime;
                for (let i = 0; i < $scope.ra_rowsQ.length; i++) {
                    if ($scope.ra_rowsQ[i].objValueSet.length != 0) {
                        $scope.objValueSetArr = $scope.ra_rowsQ[i].objValueSet;
                        for (let j = 0; j < $scope.objValueSetArr.length; j++) {
                            if ($scope.objValueSetArr[j].valueKey == $scope.ra_rowsQ[i].value) {
                                $scope.ra_rowsQ[i].value = $scope.objValueSetArr[j].valueValue;
                            }
                        }
                    }
                }
            })
            .error(function(err) {
                console.info(err);
            });
    };
    $scope.searchRadio();
    $scope.searchAlarm();

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
        //console.log($scope.checkedQ);
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
        //console.log($scope.checkedItemsQ);
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
        //console.log($scope.checkedQS);
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
        //console.log($scope.checkedItemsQS);
    };

    //COM
    $scope.m = [];
    $scope.checkedCOM = []; //选中的ID
    $scope.checkedItemsCOM = []; //选中的对象数组

    $scope.selectAllCOM = function() {
        if ($scope.xx.select_allCOM) {
            $scope.checkedCOM = [];
            COM
            $scope.checkedItemsCOM = [];
            angular.forEach($scope.rowsCOM, function(i) {
                i.checked = true;
                $scope.checkedCOM.push(i.commid);
                $scope.checkedItemsCOM.push(i);
            });
        } else {
            angular.forEach($scope.rowsCOM, function(i) {
                i.checked = false;
                $scope.checkedCOM = [];
                $scope.checkedItemsCOM = [];
            });
        }
        //console.log($scope.checkedCOM);
    };
    $scope.selectOneCOM = function() {
        angular.forEach($scope.rowsCOM, function(i) {
            var index = $scope.checkedCOM.indexOf(i.commid);
            if (i.checked && index == -1) {
                $scope.checkedCOM.push(i.commid);
                $scope.checkedItemsCOM.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checkedCOM.splice(index, 1);
                $scope.checkedItemsCOM.splice(index, 1);
            };
        });


        if ($scope.rowsCOM.length == $scope.checkedCOM.length) {
            $scope.xx.select_allCOM = true;
        } else {
            $scope.xx.select_allCOM = false;
        }
        //console.log($scope.checkedItemsCOM);
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
        //console.log($scope.al_checked);
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
        //console.log($scope.al_checkedItems);
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
        //console.log($scope.ra_checkedQS);
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
        //console.log($scope.ra_checkedItemsQS);
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
        //console.log($scope.ra_checkedQ);
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
        //console.log($scope.ra_checkedItemsQ);
    };

    ///////////////////////////////---------------end------------------------/////////////////////////////////////////////////////////////

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


    $scope.clearBase = function() {
        $scope.checkedItemsQ = [];
        $scope.checkedQ = [];
        $scope.checkedItemsQS = [];
        $scope.checkedQS = [];
        $scope.xx.select_allQ = false;
        $scope.xx.select_allQS = false;
        // $scope.searchForm();
    };
    $scope.clearAlarm = function() {
        $scope.al_checked = []; //选中的ID
        $scope.al_checkedItems = [];
        $scope.xx.al_select_all = false;
        // $scope.searchAlarm();
    };
    $scope.clearRadio = function() {
        $scope.ra_checkedQ = [];
        $scope.ra_checkedQS = [];
        $scope.ra_checkedItemsQS = [];
        $scope.ra_checkedItemsQ = [];
        $scope.xx.ra_select_allQ = false;
        $scope.xx.ra_select_allQS = false;
        // $scope.searchRadio();
    };

    //物理排序
    $scope.oldOrder = "";
    $scope.faUp1 = true;
    $scope.faDown1 = false;
    $scope.faUp2 = true;
    $scope.faDown2 = false;
    $scope.faUp3 = true;
    $scope.faDown3 = false;
    $scope.faUp4 = true;
    $scope.faDown4 = false;
    $scope.faUp5 = true;
    $scope.faDown5 = false;
    $scope.faUp6 = true;
    $scope.faDown6 = false;
    $scope.faUp7 = true;
    $scope.faDown7 = false;
    $scope.faUp8 = true;
    $scope.faDown8 = false;
    $scope.orderFun = function(v, ord) {

        if ($scope.oldOrder == "" || $scope.oldOrder == undefined) {
            $scope.oldOrder = v;
        }
        if ($scope.oldOrder == v) {
            $scope.oldOrder = "-" + v;
        } else {
            $scope.oldOrder = v;
        };
        switch (ord) {
            case 'order1':
                $scope.order1 = $scope.oldOrder;
                $scope.faUp1 = !$scope.faUp1;
                $scope.faDown1 = !$scope.faDown1;
                break;
            case 'order2':
                $scope.order2 = $scope.oldOrder;
                $scope.faUp2 = !$scope.faUp2;
                $scope.faDown2 = !$scope.faDown2;
                break;
            case 'order3':
                $scope.order3 = $scope.oldOrder;
                $scope.faUp3 = !$scope.faUp3;
                $scope.faDown3 = !$scope.faDown3;
                break;
            case 'order4':
                $scope.order4 = $scope.oldOrder;
                $scope.faUp4 = !$scope.faUp4;
                $scope.faDown4 = !$scope.faDown4;
                break;
            case 'order5':
                $scope.order5 = $scope.oldOrder;
                $scope.faUp5 = !$scope.faUp5;
                $scope.faDown5 = !$scope.faDown5;
                break;
            case 'order6':
                $scope.order6 = $scope.oldOrder;
                $scope.faUp6 = !$scope.faUp6;
                $scope.faDown6 = !$scope.faDown6;
                break;
            case 'order7':
                $scope.order7 = $scope.oldOrder;
                $scope.faUp7 = !$scope.faUp7;
                $scope.faDown7 = !$scope.faDown7;
                break;
            case 'order8':
                $scope.order8 = $scope.oldOrder;
                $scope.faUp8 = !$scope.faUp8;
                $scope.faDown8 = !$scope.faDown8;
                break;

            default:
                break;
        }



    };

    //value清空
    $scope.clearValue = function(items1, items2) {

        for (let i = 0; i < items1.length; i++) {
            items1[i].value = '';
        };
        if (items2) {
            for (let i = 0; i < items2.length; i++) {
                items2[i].value = '';
            }
        } else {
            return
        }
    };


    //clearSelec
    $scope.clearSelect = function() {
        $scope.clearBase();
        $scope.clearAlarm();
        $scope.clearRadio();
    };

    //refresh
    $scope.refresh = function(searchFlag) {

        if (searchFlag == 'base') {
            $scope.searchForm();
        } else if (searchFlag == 'alarm') {
            $scope.searchAlarm();
        } else {
            $scope.searchRadio();
        }

    };

    // 接收到消息的回调方法

    // $scope.$watch(
    //     'rowsCOM', $scope.searchForm, true);

    var index = true;
    $scope.getWebSocketMsg = function(winId, winFlag, queryFlag) {
        $rootScope.websocket.onmessage = function(event) {
            //console.log(`收到的----------------${event.data}---+--${new Date()}`);
            $scope.websoketData = JSON.parse(event.data);


            //console.log('////////////');
            // //console.log(`返回的websocket+${$scope.websoketData}`);

            for (let i = 0; i < $scope.websoketData.length; i++) {
                //begintime
                $scope.d = new Date(Date.parse($scope.websoketData[i].begintime.replace(/-/g, "/")));

                // if ($scope.d >= $scope.curDate) {
                // //console.log(`时间过滤后的time----${$scope.d}`);
                // //console.log(`时间过滤后的date+${$scope.websoketData}`);

                $scope.commid = $scope.websoketData[i].commid;
                $scope.status = $scope.websoketData[i].status;
                $scope.endtime = $scope.websoketData[i].endtime;


                $scope.beforWinid = $scope.websoketData[i].winid;
                $scope.afterWinidArr = $scope.beforWinid.split("_");
                $scope.afterWinid = $scope.afterWinidArr[1];

                $scope.winIdArr = winId.split("_");
                $scope.winId = $scope.winIdArr[1];

                if (winFlag == 'base') {
                    //判断query或set，截取winId

                    if ($scope.afterWinid == $scope.winId) {
                        //websoket信息回显
                        // //console.log(`第${i}次获取到websocket+${$scope.websoketData[i]}`);
                        if ($scope.rowsCOM.length != 0) {
                            let checkFlag = 0;
                            for (let k = 0; k < $scope.rowsCOM.length; k++) {
                                if ($scope.commid == $scope.rowsCOM[k].commid) {
                                    $scope.rowsCOM[k].status = $scope.status;
                                    $scope.rowsCOM[k].endtime = $scope.endtime;

                                    checkFlag = 1;

                                    //清除选中的item
                                    // $scope.refresh();
                                    $scope.clearSelect();

                                    $scope.searchForm();
                                    // $scope.$apply();

                                } else {}
                            }
                            if (checkFlag == 0) {
                                $scope.rowsCOM.splice(0, 0, $scope.websoketData[i]);
                                // $rootScope.$apply();
                                //console.log('=================================');
                                //console.log($scope.rowsQ);

                                $rootScope.$apply();
                                //console.log('-----------------------');
                                //console.log($scope.rowsQ);
                            }
                        } else {
                            $scope.rowsCOM = $scope.websoketData;
                            //console.log(`第一次push的数据是：+${$scope.websoketData}`);

                            //console.log('999999999999999999999999');
                            //console.log($scope.rowsQ);
                            $rootScope.$apply();

                            //console.log('8888888888888888888');
                            //console.log($scope.rowsQ);
                        }


                    };
                } else if (winFlag == 'alarm') {
                    if ($scope.afterWinid == $scope.winId) {
                        if ($scope.al_COM_rows.length != 0) {
                            let checkFlag = 0;
                            for (let k = 0; k < $scope.al_COM_rows.length; k++) {

                                if ($scope.commid == $scope.al_COM_rows[k].commid) {
                                    $scope.al_COM_rows[k].status = $scope.status;
                                    $scope.al_COM_rows[k].endtime = $scope.endtime;

                                    checkFlag = 1;
                                    // $scope.refresh();
                                    $scope.clearSelect();
                                    $scope.searchAlarm();
                                } else {}
                            }
                            if (checkFlag == 0) {
                                // $scope.al_COM_rows.push($scope.websoketData[i]);
                                $scope.al_COM_rows.splice(0, 0, $scope.websoketData[i]);
                                $rootScope.$apply();
                            }
                        } else {
                            // $scope.al_COM_rows.push($scope.websoketData[i]);
                            $scope.al_COM_rows = $scope.websoketData;
                            $rootScope.$apply();
                            // $scope.refresh();
                        }


                    };
                } else {
                    if ($scope.afterWinid == $scope.winId) {
                        if ($scope.ra_rowsCOM.length != 0) {
                            let checkFlag = 0;
                            for (let k = 0; k < $scope.ra_rowsCOM.length; k++) {

                                if ($scope.commid == $scope.ra_rowsCOM[k].commid) {
                                    $scope.ra_rowsCOM[k].status = $scope.status;
                                    $scope.ra_rowsCOM[k].endtime = $scope.endtime;

                                    checkFlag = 1;
                                    // $scope.refresh();
                                    $scope.clearSelect();
                                    $scope.searchRadio();
                                } else {}
                            }
                            if (checkFlag == 0) {
                                $scope.ra_rowsCOM.splice(0, 0, $scope.websoketData[i]);
                                $rootScope.$apply();
                                // $scope.ra_rowsCOM.push($scope.websoketData[i]);
                            }
                        } else {
                            // $scope.ra_rowsCOM.push($scope.websoketData[i]);
                            $scope.ra_rowsCOM = $scope.websoketData;
                            $rootScope.$apply();
                        }

                        //清除选中的item 刷新
                        // $scope.refresh();
                    };

                }
                // }
            }
        };
    };


    var clearF = function() {
        for (let i = 0; i < $scope.rowsQ.length; i++) {
            if ($scope.rowsQ[i].checked) {
                $scope.rowsQ[i].value = ''
            }
        };

        for (let i = 0; i < $scope.rowsQS.length; i++) {
            if ($scope.rowsQS[i].checked) {
                $scope.rowsQS[i].value = ''
            }
        };
    };
    var clearS = function() {
        for (let i = 0; i < $scope.al_rows.length; i++) {
            if ($scope.al_rows[i].checked) {
                $scope.al_rows[i].value = ''
            }
        };
    };
    var clearT = function() {
        for (let i = 0; i < $scope.ra_rowsQS.length; i++) {
            if ($scope.ra_rowsQS[i].checked) {
                $scope.ra_rowsQS[i].value = ''
            }
        };

        for (let i = 0; i < $scope.ra_rowsQ.length; i++) {
            if ($scope.ra_rowsQ[i].checked) {
                $scope.ra_rowsQ[i].value = ''
            }
        };
    };


    //queryBase
    $scope.queryBase = function(flag) {
        $scope.neId = $scope.checkedItems.neNeid;
        $scope.queryFlag = 'query';
        if (flag == 'base') {
            // $scope.windowId = $rootScope.user.username + '_queryBase'.concat(uuid());
            $scope.windowId = $rootScope.user.username + '_queryBase';

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
                    // messageAlertService.alertFun('must');
            } else {
                for (let i = 0; i < objIdsArrQS.length; i++) {
                    objIdsArrQ.push(objIdsArrQS[i]);
                };
                // objIdsArrQ.push(...objIdsArrQS);
                $scope.objids = objIdsArrQ.toString();
                deviceListService.queryBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
                    if (res.data == 'sent') {
                        //清空值
                        alert('Query!');
                        // messageAlertService.detailQueryFun('query');
                        clearF();

                        // $scope.clearValue($scope.checkedItemsQ, $scope.checkedItemsQS);

                        $scope.curDate = new Date();
                        $scope.getWebSocketMsg($scope.windowId, flag, $scope.queryFlag);

                    } else {
                        alert('Query Failed!' + res.msg);
                        // messageAlertService.detailQueryFun('failed');
                        $scope.clearBase();
                    }
                })
            };
        } else if (flag == 'alarm') {

            // $scope.windowId = 'queryAlarm'.concat(uuid())
            $scope.windowId = $rootScope.user.username + '_queryAlarm';

            var al_objIdsArr = [];
            for (let i = 0; i < $scope.al_checkedItems.length; i++) {
                al_objIdsArr.push($scope.al_checkedItems[i].id);
                al_objIdsArr.push($scope.al_checkedItems[i].alarmEnableId);

            };
            if (al_objIdsArr.length == 0) {
                alert('please select one!')
                    // messageAlertService.alertFun('must');
            } else {
                $scope.objids = al_objIdsArr.toString();
                deviceListService.queryBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
                    if (res.data == 'sent') {
                        // $scope.clearValue($scope.al_checkedItems);
                        alert('Query!');
                        // messageAlertService.detailQueryFun('query');
                        clearS();
                        $scope.curDate = new Date();

                        $scope.getWebSocketMsg($scope.windowId, flag, $scope.queryFlag);
                    } else {
                        alert('Query Failed!' + res.msg);
                        // messageAlertService.detailQueryFun('failed');
                        $scope.clearAlarm();
                    }
                })
            };

        } else {
            // $scope.windowId = 'queryRadio'.concat(uuid());
            $scope.windowId = $rootScope.user.username + '_queryRadio';

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
                    // messageAlertService.alertFun('must');
            } else {
                for (let i = 0; i < ra_objIdsArrQS.length; i++) {
                    ra_objIdsArrQ.push(ra_objIdsArrQS[i]);
                };
                // ra_objIdsArrQ.push(...ra_objIdsArrQS);
                $scope.objids = ra_objIdsArrQ.toString();
                deviceListService.queryBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
                    if (res.data == 'sent') {
                        // $scope.clearValue($scope.ra_checkedItemsQ, $scope.ra_checkedItemsQS);
                        alert('Query!');
                        // messageAlertService.detailQueryFun('query');
                        clearT();
                        $scope.curDate = new Date();
                        $scope.getWebSocketMsg($scope.windowId, flag, $scope.queryFlag);

                    } else {
                        alert('Query Failed!' + res.msg);
                        // messageAlertService.detailQueryFun('failed');
                        $scope.clearRadio();

                    }
                })
            };
        }
    };
    //set
    $scope.setBase = function(flag) {
        $scope.neId = $scope.checkedItems.neNeid;
        $scope.queryFlag = 'set';
        if (flag == 'base') {
            // $scope.windowId = 'set'.concat(uuid());
            $scope.windowId = $rootScope.user.username + '_setBase';

            $scope.qryNumber = '1';

            var setValueArr = [];
            var objIdsArrQS = [];
            for (let j = 0; j < $scope.checkedItemsQS.length; j++) {
                objIdsArrQS.push($scope.checkedItemsQS[j].id);
                //下拉框id
                // if ($scope.checkedItemsQS[j].setSelecValue == null || $scope.checkedItemsQS[j].setSelecValue == undefined) {
                //     // alert('please set value')
                // } else {
                //     setValueArr.push($scope.checkedItemsQS[j].setSelecValue);
                // }
                if ($scope.checkedItemsQS[j].isInpu == true) {
                    setValueArr.push($scope.checkedItemsQS[j].setValue);
                } else if ($scope.checkedItemsQS[j].isSelec == true) {
                    setValueArr.push($scope.checkedItemsQS[j].setSelecValue);
                }
            };
            if (objIdsArrQS.length == 0) {
                alert('please select one!')
                    // messageAlertService.alertFun('must');
            } else {
                if (setValueArr.length == 0) {
                    alert('please set value!')
                        // messageAlertService.detailSetFun('setvalue');
                } else {
                    $scope.objids = objIdsArrQS.toString();
                    $scope.objValues = setValueArr.toString();
                    deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                        if (res.data == 'send') {
                            // $scope.setValue($scope.checkedItemsQS);
                            alert('Set!');
                            // messageAlertService.detailSetFun('set');
                            $scope.curDate = new Date();

                            $scope.getWebSocketMsg($scope.windowId, flag, $scope.queryFlag);
                        } else {
                            alert('Set Failed!' + res.msg);
                            // messageAlertService.detailSetFun('');
                            $scope.clearBase();
                        }
                    })
                };
            };
        } else if (flag == 'alarm') {
            // $scope.windowId = 'setAlarm'.concat(uuid());
            $scope.windowId = $rootScope.user.username + '_setAlarm';

            $scope.qryNumber = '2';

            var setValueArr = [];
            var al_objIdsArrQS = [];
            for (let j = 0; j < $scope.al_checkedItems.length; j++) {
                al_objIdsArrQS.push($scope.al_checkedItems[j].alarmEnableId);
                if ($scope.al_checkedItems[j].isInpu == true) {
                    setValueArr.push($scope.al_checkedItems[j].setValue);
                } else if ($scope.al_checkedItems[j].isSelec == true) {
                    setValueArr.push($scope.al_checkedItems[j].isEnable);
                }
            };
            if (al_objIdsArrQS.length == 0) {
                alert('please select one!')
                    // messageAlertService.alertFun('must');
            } else {
                if (setValueArr.length == 0) {
                    alert('please set value!')
                        // messageAlertService.detailSetFun('setvalue');

                } else {
                    $scope.objids = al_objIdsArrQS.toString();
                    $scope.objValues = setValueArr.toString();
                    deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                        if (res.data == 'send') {
                            alert('Set!');
                            // messageAlertService.detailSetFun('set');
                            $scope.curDate = new Date();

                            $scope.getWebSocketMsg($scope.windowId, flag, $scope.queryFlag);

                        } else {
                            alert('Set Failed!' + res.msg);
                            // messageAlertService.detailSetFun('');
                            $scope.clearAlarm();

                        }
                    })
                };
            };
        } else {
            // $scope.windowId = 'setRadio'.concat(uuid());
            $scope.windowId = $rootScope.user.username + '_setRadio';

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
                    // messageAlertService.alertFun('must');
            } else {
                if (setValueArr.length == 0) {
                    alert('please select value!')
                        // messageAlertService.alertFun('must');
                } else {
                    $scope.objids = ra_objIdsArrQS.toString();
                    $scope.objValues = setValueArr.toString();
                    deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                        if (res.data == 'send') {
                            alert('Set!');
                            // messageAlertService.detailSetFun('set');
                            $scope.curDate = new Date();

                            $scope.getWebSocketMsg($scope.windowId, flag, $scope.queryFlag);

                        } else {
                            alert('Set Failed!' + res.msg);
                            // messageAlertService.detailSetFun('');
                            $scope.clearRadio();

                        }
                    })
                };
            };
        }
    };

    //monitorBaseQuery
    $scope.monitorBase = function() {
        if (confirm('Query device parameter update, parameter value will be empty, are you sure')) {
            $scope.neId = $scope.checkedItems.neNeid;
            $scope.windowId = 'monitor'.concat(uuid());
            $scope.objids = '0009';

            deviceListService.monitorBase($scope.neId, $scope.objids, $scope.windowId).success(function(res) {
                if (res.data == 'sent') {
                    alert('Success!');
                    // messageAlertService.successFun('success');
                    $scope.clearBase();
                    $scope.clearAlarm();
                    $scope.clearRadio();

                } else {
                    alert('Failed!' + res.msg);
                    // messageAlertService.successFun('failed');
                    $scope.clearBase();
                    $scope.clearAlarm();
                    $scope.clearRadio();
                }
            })
        } else {
            alert('cancel')
                // messageAlertService.successFun('');
        }
    };

    //queryDeviceBase
    $scope.queryDeviceBase = function() {
        $scope.neId = $scope.checkedItems.neNeid;
        $scope.neDeviceIP = '';
        $scope.neDevicePort = '';
        $scope.neQryCommtypeId = '';
        $scope.neQryRepeaterId = '';
        // $scope.comWindowId = 'queryDeviceBtnWindowId'.concat(uuid());
        $scope.comWindowId = 'quDBtnWinId';
        $scope.devicetypeId = $scope.checkedItems.neDevicetype.dtpDevicetypeid;

        deviceListService.queryDevice($scope.comWindowId, $scope.devicetypeId, $scope.neDeviceIP, $scope.neDevicePort, $scope.neId, $scope.neQryCommtypeId, $scope.neQryRepeaterId).success(function(res) {
            if (res.data == true) {
                alert('Success!');
                // messageAlertService.successFun('success');
                // $scope.refresh();
                $scope.clearSelect();
            } else {
                alert('Failed!' + res.msg);
                // messageAlertService.successFun('failed');
                // $scope.refresh();
                $scope.clearSelect();
            }
        })

    };

    //resetBase
    $scope.resetBase = function() {
        $scope.neId = $scope.checkedItems.neNeid;
        $scope.windowId = 'resetBtnWindowId'.concat(uuid());
        $scope.qryNumber = '1';
        $scope.dtcDevicetypeclassifyid = $scope.checkedItems.neDevicetype.neDevicetypeclassify.dtcDevicetypeclassifyid;

        if ($scope.dtcDevicetypeclassifyid == '8' || $scope.dtcDevicetypeclassifyid == '9') {
            $scope.objids = '0022';
            $scope.objValues = 1;
            deviceListService.setBase($scope.neId, $scope.objValues, $scope.objids, $scope.qryNumber, $scope.windowId).success(function(res) {
                if (res.data == 'send') {
                    alert('Success!');
                    // messageAlertService.successFun('success');
                    // $scope.refresh();
                    $scope.clearSelect();
                } else {
                    alert('Failed!' + res.msg);
                    // messageAlertService.successFun('failed');
                    $scope.refresh();
                    $scope.clearSelect();
                }
            })
        } else {
            alert('Only AU Can Reset!')
                // messageAlertService.detailResetFun('AU');
        }

    };


    //topo图相关

    // var myChart = echarts.init(angular.element('topInDevice'));
    // var ele = angular.element("#topInDevice");
    $scope.searchTop = function(neid) {
        topService.gettopData(neid).success(function(res) {
                $scope.data = res.data;
                if ($scope.data == null || $scope.data == undefined) {
                    // alert('This node has no topology data!');
                    $scope.noTop = true;
                    $scope.haveTop = false;
                    return
                } else {
                    // myChart.showLoading();
                    echarts.util.each($scope.data.children, function(datum, index) {
                        if (index % 2 == 0) {
                            $scope.data.children[index].collapsed = true;
                        } else {
                            $scope.data.children[index].collapsed = false;
                        }
                        // index % 2 === 0 && (datum.collapsed = true);
                        // //console.log('************' + datum)
                    });

                    //console.log(res.data.children);


                    $scope.initGragh();
                }


                // myChart.setOption(option);
                // setStyle(res.data.neId, res.data.children);
            })
            .error(function(err) {
                // alert('This node has no topology data!')
                $scope.noTop = true;
                $scope.haveTop = false;
            });
    };
    $scope.searchTop($scope.checkedItems.neNeid);

    //top属性设置
    function setStyle(leafId, nodes, index, path) {
        // //console.log(path);
        if (nodes == null && leafId == null) {
            // alert('No topology data！');
            $scope.noTop = true;
            $scope.haveTop = false;
            return
        };

        $scope.index = index;


        //叶子结点
        if (nodes instanceof Array) {

            for (var i = 0; i < nodes.length; i++) {
                // var tmpPath = path.concat();
                // tmpPath.push(nodes[i].neId);
                $scope.leafId = leafId;
                // var hasChildren = false;

                // var collapsed = nodes[i].collapsed;

                if (nodes[i].neElement.neOnline >= 4) {
                    // $scope.collapsed = nodes[i].collapsed;
                    // if (nodes[i].neElement.neOnline >= 4) {
                    nodes[i].lineStyle = {
                        color: '#5f5f5f',
                        borderColor: '#5f5f5f'
                    };
                    if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                        nodes[i].symbol = 'image://assets/img/EU_OFFLINE_MAINTAINCE.png';
                    } else {
                        nodes[i].symbol = 'image://assets/img/AU_OFFLINE.png';
                    };
                    if (nodes[i].children != null && nodes[i].children.length > 0) {
                        // //console.log(nodes[i]);
                        if (nodes[i].collapsed == true) {
                            if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                nodes[i].symbol = 'image://assets/img/weihu_offline+.png';
                            } else {
                                nodes[i].symbol = 'image://assets/img/AU_OFFLINE+.png';
                            }
                        } else {
                            if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                nodes[i].symbol = 'image://assets/img/weihu_offline-.png';
                            } else {
                                nodes[i].symbol = 'image://assets/img/AU_OFFLINE-.png';
                            }
                            if ($scope.index >= 2) {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_offline+.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_OFFLINE+.png';
                                }
                            }
                        }
                        setStyle($scope.leafId, nodes[i].children, $scope.index + 1);
                    } else {}
                } else if (nodes[i].neElement.tpAlarmList.length != 0) {
                    // $scope.collapsed = nodes[i].collapsed;
                    nodes[i].lineStyle = {
                        color: '#ff0000',
                        borderColor: '#ff0000'
                    };
                    // //console.log(nodes[i].lineStyle);
                    if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                        nodes[i].symbol = 'image://assets/img/AU_ALARM_MAINTAINCE.png';
                    } else {
                        nodes[i].symbol = 'image://assets/img/AU_ALARM.png';
                    }
                    if (nodes[i].children != null && nodes[i].children.length > 0) {
                        // hasChildren = true;
                        if (nodes[i].collapsed == true) {

                            if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                nodes[i].symbol = 'image://assets/img/weihu_alarm+.png';
                            } else {
                                nodes[i].symbol = 'image://assets/img/AU_ALARM+.png';
                            }
                        } else {
                            if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                nodes[i].symbol = 'image://assets/img/weihu_alarm-.png';
                            } else {
                                nodes[i].symbol = 'image://assets/img/AU_ALARM-.png';
                            }
                            if (index >= 2) {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_alarm-.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_ALARM-.png';
                                }
                            }
                        }
                        setStyle($scope.leafId, nodes[i].children);
                    } else {}
                } else {
                    if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                        nodes[i].symbol = 'image://assets/img/AU_MAINTAINCE.png';
                    };
                    // $scope.collapsed = nodes[i].collapsed;
                    if (nodes[i].children != null && nodes[i].children.length > 0) {
                        if (nodes[i].collapsed == true) {
                            if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                nodes[i].symbol = 'image://assets/img/weihu+.png';
                            } else {
                                nodes[i].symbol = 'image://assets/img/AU_OK+.png';
                            }
                        } else {
                            if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                nodes[i].symbol = 'image://assets/img/weihu-.png';
                            } else {
                                nodes[i].symbol = 'image://assets/img/AU_OK-.png';
                            }
                        }
                        setStyle($scope.leafId, nodes[i].children);
                    } else {}
                }

            }
        } else {
            //根节点
            $scope.leafId = leafId;
            if (nodes.neElement == null) {
                $scope.noTop = true;
                return
            }
            if (nodes.neElement.tpAlarmList.length != 0) {
                nodes.lineStyle = {
                    color: '#ff0000',
                    borderColor: '#ff0000'
                };
                if (nodes.neElement.neDevicestatus.dsId > 10) {
                    nodes.symbol = 'image://assets/img/AU_ALARM_MAINTAINCE.png';
                } else {
                    nodes.symbol = 'image://assets/img/AU_ALARM.png';
                }
                if (nodes.children != null && nodes.children.length > 0) {
                    // hasChildren = true;
                    if (nodes.collapsed == true) {
                        if (nodes.neElement.neDevicestatus.dsId > 10) {
                            nodes.symbol = 'image://assets/img/weihu_alarm+.png';
                        } else {
                            nodes.symbol = 'image://assets/img/AU_ALARM+.png';
                        }
                    } else {
                        if (nodes.neElement.neDevicestatus.dsId > 10) {
                            nodes.symbol = 'image://assets/img/weihu_alarm-.png';
                        } else {
                            nodes.symbol = 'image://assets/img/AU_ALARM-.png';
                        }
                        // if (index == 1) {
                        //     nodes.symbol = 'image://assets/img/AU_ALARM-.png';
                        // }
                    }
                    setStyle($scope.leafId, nodes.children, $scope.index + 1);
                } else {}

                // return tmpPath;
            } else if (nodes.neElement.neOnline >= 4) {
                nodes.lineStyle = {
                    color: '#5f5f5f',
                    borderColor: '#5f5f5f'
                };
                if (nodes.neElement.neDevicestatus.dsId > 10) {
                    nodes.symbol = 'image://assets/img/EU_OFFLINE_MAINTAINCE.png';
                } else {
                    nodes.symbol = 'image://assets/img/AU_OFFLINE.png';
                }
                if (nodes.children != null && nodes.children.length > 0) {
                    // //console.log(nodes[i]);
                    if (nodes.collapsed == true) {
                        if (nodes.neElement.neDevicestatus.dsId > 10) {
                            nodes.symbol = 'image://assets/img/weihu_offline+.png';
                        } else {
                            nodes.symbol = 'image://assets/img/AU_OFFLINE+.png';
                        }
                    } else {
                        if (nodes.neElement.neDevicestatus.dsId > 10) {
                            nodes.symbol = 'image://assets/img/weihu_offline-.png';
                        } else {
                            nodes.symbol = 'image://assets/img/AU_OFFLINE-.png';
                        }
                        // if (index >= 2) {
                        //     nodes.symbol = 'image://assets/img/AU_OFFLINE+.png';
                        // }
                    }
                    setStyle($scope.leafId, nodes.children, $scope.index + 1);
                } else {

                }
            } else {
                if (nodes.children != null && nodes.children.length > 0) {
                    if (nodes.collapsed == true) {
                        if (nodes.neElement.neDevicestatus.dsId > 10) {
                            nodes.symbol = 'image://assets/img/weihu+.png';
                        } else {
                            nodes.symbol = 'image://assets/img/AU_OK+.png';
                        }

                    } else {
                        if (nodes.neElement.neDevicestatus.dsId > 10) {
                            nodes.symbol = 'image://assets/img/weihu-.png';
                        } else {
                            nodes.symbol = 'image://assets/img/AU_OK-.png';
                        }
                    }
                    setStyle($scope.leafId, nodes.children, $scope.index + 1);
                } else {}
            }
        }
    };
    //通过neId查top

    //top图初始化
    $scope.initGragh = function() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('topInDevice'));

        myChart.showLoading();
        setStyle($scope.data.neId, $scope.data, 1);

        var option = {
            legend: {
                top: '10%',
                // left: '23%',
                // orient: 'vertical',
                show: true,
                data: [{
                        name: 'alarm',
                        icon: 'image://assets/img/AU_OK.png'
                    },
                    {
                        name: 'base',
                        icon: 'image://assets/img/AU_OK.png'

                    }
                ],
                textStyle: {
                    fontSize: 22,
                    color: '#333',
                },

            },
            tooltip: {
                // trigger: 'item',
                // triggerOn: 'mousemove' //有mousemove和click两种
                formatter: function(params) {
                    // //console.log(params);//打印params
                    return `${params.name}<br />
                        ${params.data.neElement.neRepeaterid16},${params.data.neElement.neDeviceid}<br />
                        ${params.data.neElement.neRoute}<br />
                        ${params.data.neElement.neInstallplace}<br />
                        `;
                }
            },

            series: [{
                    type: 'tree',
                    name: ['alarm', 'base'],
                    data: [$scope.data],
                    roam: true,

                    top: '4%',
                    left: '10%',
                    bottom: '4%',
                    right: '20%',
                    // x: '15%', //靠左
                    // y: '15%', //距容器上方15%


                    symbol: 'image://assets/img/AU_OK.png',
                    symbolSize: [30, 20],

                    lineStyle: {
                        color: '#008811',
                        borderColor: '#008811'
                    },

                    label: {
                        normal: {
                            position: 'bottom',
                            verticalAlign: 'middle',
                            align: 'center',
                            fontSize: 10
                        }
                    },
                    // 当此节点下还有子节点时候，设置的节点样式，用于区别 没有子节点的节点的样式
                    itemStyle: {
                        normal: {
                            color: '#b22125'
                        },
                        emphasis: {
                            borderColor: '#ccc'
                        },
                        borderWidth: 5,
                        borderColor: '#c23531',
                        borderType: 'solid',
                        // 纹理填充
                        // color: {
                        //     image: img, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                        //     // repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                        // }
                    },

                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },
                    // animation: false,

                    expandAndCollapse: true,
                    initialTreeDepth: 2, //展示层级数,默认是2
                    animationDuration: 10, //渲染速度
                    animationDurationUpdate: 150
                },

            ]
        };
        myChart.setOption(option, true);

        myChart.hideLoading();

        //这里开始
        myChart.on('mousedown', function(e) {
            const route = e.data.route;
            if (route == '0.0.0.0') {
                myChart._chartsViews[0]._data.tree._nodes.forEach(function(item, index) {
                    //
                    // item.isExpand = false;

                });
            }
        });
        //这里结束
        //右键事件
        // myChart.on("contextmenu", clickFun);
        //左键L
        myChart.on("click", clickL);

        myChart.on('finished', function() {
            myChart.resize();
        });

        myChart.on('restore', function(params) {
            //console.log("restore");
        });

        //去除默认的鼠标事件
        document.oncontextmenu = function() {
            if (isContextClick == false) {
                $scope.showContextMen = false;
                $scope.showContextMen_Au = false;
                $scope.$apply();
            }
            isContextClick = false;
            return false;
        };
        document.onclick = function() {
            $scope.showContextMen = false;
            $scope.showContextMen_Au = false;
            $scope.$apply();
        };

    };

    function clickL(params) {
        $scope.params = params;
        if (typeof $scope.params.seriesIndex == 'undefined') {
            return;
        }
        if ($scope.params.type == 'click') {

            // if ($scope.params.data.route == '0.0.0.0') {
            //     $scope.params.event = null;
            // } else {
            var node = $scope.params.data;
            //console.log(node);
            if (node.children != null && node.children.length > 0) {
                var symbol = node.symbol;
                if (symbol.indexOf('+') > 0) {
                    node.symbol = node.symbol.replace('+', '-');
                } else {
                    node.symbol = node.symbol.replace('-', '+');
                }
                // myChart.resize();

            }

            // }
        }
    };

    $scope.refreshTop = function() {
        document.getElementById('topInDevice').removeAttribute('_echarts_instance_'); // 移除容器上的 _echarts_instance_ 属性
        $scope.searchTop($scope.checkedItems.neNeid);
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
        $scope.rowsCOM = [];
        $scope.al_COM_rows = [];
        $scope.ra_rowsCOM = [];
    };

}
// });