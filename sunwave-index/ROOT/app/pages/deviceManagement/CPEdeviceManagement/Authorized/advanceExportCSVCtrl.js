    /*天线创建modal controller*/
    // (function() {
    //     'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [

        ])
        .controller('advanceExportCSVCtrl', advanceExportCSVCtrl);

    function advanceExportCSVCtrl($scope,
        isAdd, $uibModalInstance, $uibModal) {

        $scope.transmitModalItems = 200;
        $scope.modifyData = null;

        $scope.isSave = true;

        $scope.modal = {
            tskTaskname: "",
            state: "0",
            tskNexttime: "",
            tskFailtimes: "",
            RetryTimes: 1,
            cycleValue: "",
            tskStyle: 1,
            weekSelect: 1,
            cycle: "",
        };

        //左边查询条件

        $scope.query = { //查询设备
            pageIndex: 0,
            pageSize: 10,
            keyword: "",
            areaIds: "",
            neCompanyid: "",
            neSitelevelid: "",
            neDevicestatusid: "",
            neDevicetypeid: "",
            neName: "",
            neRepeaterid: "",
            rightElementIds: ""
        };


        $scope.xx = {
            select_all: "",
            select_all2: ""
        };
        //下拉框 and Input的初始化
        $scope.isWeek = false;
        $scope.isInput = true;
        $scope.deviceTypeShow = true;
        $scope.deviceStatusShow = false;
        $scope.devNameAndId = false;


        $scope.devices = "2";

        $scope.paramsBtn = false;

        $scope.count2 = 0;

        //校验
        $scope.checkData = {
            "nameCheck": "",
            "RetryTimesCheck": "",
            "tskNexttimeCheck": "",
            "tskFailtimesCheck": "",
            "CycleCheck": ""
        };

        //校验tskTaskname
        $scope.checkTskTaskname = false;
        $scope.checkName = function() {
            if ($scope.modal.tskTaskname) {
                if ($scope.modal.tskTaskname.length > 0 && $scope.modal.tskTaskname.length < 50) {
                    $scope.checkData.nameCheck = "r";
                    return $scope.checkTskTaskname = true;
                } else {
                    $scope.checkData.nameCheck = "e";
                    return $scope.checkTskTaskname = false;
                }
            } else {
                $scope.checkData.nameCheck = "m";
                return $scope.checkTskTaskname = false;
            }
        };

        //校验RetryTimes
        // $scope.checkRetryTimes1 = false;
        // $scope.checkRetryTimes = function () {

        //     if ($scope.modal.RetryTimes) {
        //         var reg = /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))$/;//1-255正则表达式
        //         if (reg.test($scope.modal.RetryTimes)) {
        //             $scope.checkData.RetryTimesCheck = "r";
        //             return $scope.checkRetryTimes1 =true;
        //         } else {
        //             $scope.checkData.RetryTimesCheck = "e";
        //             return $scope.checkRetryTimes1 =false;
        //         }
        //     } else {
        //         $scope.checkData.RetryTimesCheck = "m";
        //         return $scope.checkRetryTimes1 =false;
        //     }
        // };

        //校验tskNexttime
        $scope.checkTskNexttime1 = false;
        $scope.checkTskNexttime = function() {
            if ($scope.modal.tskNexttime) {
                var reg = /^([01]\d|2[0-3]):([0-5]\d)$/; //时分正则表达式
                if (reg.test($scope.modal.tskNexttime)) {
                    $scope.checkData.tskNexttimeCheck = "r";
                    return $scope.checkTskNexttime1 = true;
                } else {
                    $scope.checkData.tskNexttimeCheck = "e";
                    return $scope.checkTskNexttime1 = false;
                }
            } else {
                $scope.checkData.tskNexttimeCheck = "m";
                return $scope.checkTskNexttime1 = false;
            }
        };

        //校验tskFailtimes
        $scope.checkTskFailTimes1 = false;
        $scope.checkTskFailTimes = function() {
            if ($scope.modal.tskFailtimes) {
                var reg = /^(([0-9]|([1-9]\d)|([1-9]\d\d)|([1-9]\d\d\d)|([1-7]\d\d\d\d)|(8([0-5]\d\d\d|6([0-3]\d\d|4[0][0])))))$/; //1-86400正则表达式
                if (reg.test($scope.modal.tskFailtimes)) {
                    $scope.checkData.tskFailtimesCheck = "r";
                    return $scope.checkTskFailTimes1 = true;
                } else {
                    $scope.checkData.tskFailtimesCheck = "e";
                    return $scope.checkTskFailTimes1 = false;
                }
            } else {
                $scope.checkData.tskFailtimesCheck = "m";
                return $scope.checkTskFailTimes1 = false;
            }
        };

        //校验Cycle
        $scope.isCycle = false;
        $scope.checkCycle = function() {
            switch ($scope.modal.cycleValue) {
                case "0":
                    if ($scope.modal.cycle) {
                        var reg = /^(([1-9])|(1\d)|(2[0-4]))$/; //hour 1-24
                        if (reg.test($scope.modal.cycle)) {
                            $scope.checkData.CycleCheck = "r";
                            $scope.isCycle = true;
                        } else {
                            $scope.checkData.CycleCheck = "e0";
                            $scope.isCycle = false;
                        }
                    } else {
                        $scope.checkData.CycleCheck = "m";
                        $scope.isCycle = false;
                    }
                    break;
                case "1":
                    if ($scope.modal.cycle) {
                        var reg = /^(([1-9])|([1-9]\d)|(100))$/; //day 1-100
                        if (reg.test($scope.modal.cycle)) {
                            $scope.checkData.CycleCheck = "r";
                            $scope.isCycle = true;
                        } else {
                            $scope.checkData.CycleCheck = "e1";
                            $scope.isCycle = false;
                        }
                    } else {
                        $scope.checkData.CycleCheck = "m";
                        $scope.isCycle = false;
                    }
                    break;
                case "2":
                    if ($scope.modal.cycle) {
                        if ($scope.modal.weekSelect) {
                            $scope.checkData.CycleCheck = "r";
                            $scope.isCycle = true;
                        } else {
                            $scope.checkData.CycleCheck = "m";
                            $scope.isCycle = false;
                        }
                    } else {
                        $scope.checkData.CycleCheck = "m";
                        $scope.isCycle = false;
                    }
                    break;
                case "3":
                    if ($scope.modal.cycle) {
                        var reg = /^(([1-9])|([1-2]\d)|(3[0-1]))$/; //month 1-31
                        if (reg.test($scope.modal.cycle)) {
                            $scope.checkData.CycleCheck = "r";
                            $scope.isCycle = true;
                        } else {
                            $scope.checkData.CycleCheck = "e3";
                            $scope.isCycle = false;
                        }
                    } else {
                        $scope.checkData.CycleCheck = "m";
                        $scope.isCycle = false;
                    }
                    break;
                case "9":
                    if ($scope.modal.cycle) {
                        var reg = /^([1-9]|([1-9]\d{1,10}))$/; //最大11位数字
                        if (reg.test($scope.modal.cycle)) {
                            $scope.checkData.CycleCheck = "r";
                            $scope.isCycle = true;
                        } else {
                            $scope.checkData.CycleCheck = "e9";
                            $scope.isCycle = false;
                        }
                    } else {
                        $scope.checkData.CycleCheck = "m";
                        $scope.isCycle = false;
                    }
                    break;
                default:
                    $scope.checkData.CycleCheck = "m";
            }
        };

        //所有校验通过才允许点击保存按钮
        $scope.isCheckAll = true;
        $scope.checkAll = function() {
            if ($scope.checkTskTaskname && $scope.checkCycle && $scope.checkTskFailTimes1 && $scope.checkTskNexttime1) {

                return $scope.isCheckAll = false;
            } else {

                return $scope.isCheckAll = true;
            }
        }


        $scope.isAdd = isAdd;
        if ($scope.isAdd == 'Add') {
            $scope.title = 'Add';
            $scope.paramsDesignFlag = 'add';
            $scope.paramsQueryFlag = 'add';
        } else if ($scope.isAdd == 'Modify') {
            $scope.title = "Modify";
            // $scope.modal.tskNexttime = $scope.modifyData.tskNexttime.substring(11,16);
            // $scope.modifyData.selectedNeIds='2';
            $scope.ids = 2;
            $scope.modal = $scope.modifyData;

            //params modal参数---selectedManTaskdetail
            $scope.selectedManTaskdetail = $scope.modifyData.selectedManTaskdetail;
            $scope.paramsDesignFlag = 'modify';
            $scope.paramsQueryFlag = 'modify';
            $scope.modal.RetryTimes = 1;
            var str = $scope.modal.tskNexttime;
            $scope.modal.tskNexttime = str.substring(11, 16);
            $scope.checkName();
            // $scope.checkRetryTimes();
            $scope.checkTskNexttime();
            $scope.checkTskFailTimes();
            $scope.checkCycle();


        } else {
            $scope.title = "View";
            $scope.isSave = false;
            // $scope.modal.tskNexttime = $scope.modifyData.tskNexttime.substring(11,16);
            // $scope.modifyData.selectedNeIds='2';
            $scope.ids = 2;
            $scope.modal = $scope.modifyData;

            //params modal参数---selectedManTaskdetail
            $scope.selectedManTaskdetail = null;
            $scope.paramsDesignFlag = 'modify';
            $scope.paramsQueryFlag = 'modify';

        };

        //判断查询条件
        $scope.switchSearchCondition = function() {

            switch ($scope.searchCondition) {
                //0 type
                case "0":
                    $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = true;
                    $scope.devNameAndId = false;
                    // $scope.query.dtpDevicetypeid = $scope.modal.neDevicetypeid;
                    $scope.query.neDevicetypeid = $scope.modal.neDevicetypeid;
                    // $scope.searchDeviceType();
                    break;
                    //1 status
                case "1":
                    $scope.deviceStatusShow = true;
                    $scope.deviceTypeShow = false;
                    $scope.devNameAndId = false;
                    $scope.query.neDevicestatusid = $scope.modal.neDevicestatusid;
                    // $scope.deviceStatuss();
                    break;
                case "2":
                    $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.devNameAndId = true;
                    // $scope.query.neRepeaterid16 = $scope.conditionValue;
                    $scope.query.neRepeaterid = $scope.conditionValue;
                    break;
                case "3":
                    $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.devNameAndId = true;
                    $scope.query.neName = $scope.conditionValue;
                    break;
                default:
                    $scope.query.keyword = "";
            }
        };

        // $scope.search = function() {
        //     $scope.switchSearchCondition();
        //     searchForm();

        // };

        // var searchForm = function() { //查询
        //     $scope.query.pageIndex = $scope.paginationConf.currentPage;
        //     $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        //     $scope.rows2 = [];
        //     if ($scope.isAdd == 'Add') {
        //         $scope.query.rightElementIds = "";
        //         // $scope.switchSearchCondition();
        //         PollingTaskService.searchForPolling($scope.query).success(function(response) {
        //             $scope.paginationConf.totalItems = response.data.totalElements;
        //             $scope.paginationConf.totalPages = response.data.totalPages;

        //             $scope.rows = response.data.content;

        //         })
        //     } else {
        //         $scope.idss = $scope.ids.split(',');
        //         $scope.query.rightElementIds = $scope.ids;

        //         $scope.searchLeft();
        //         //查右边
        //         PollingTaskService.findByIds($scope.idss).success(function(response) {


        //             $scope.rows2 = response.data;
        //             //拷贝
        //             $scope.new_rows2 = JSON.parse(JSON.stringify($scope.rows2));
        //             $scope.count2 = $scope.rows2.length;
        //         });

        //         //时间拼接回显
        //         var tskPeriods = $scope.modifyData.tskPeriod.split(',');
        //         $scope.modal.cycleValue = tskPeriods[0];
        //         $scope.modal.tskNexttime = tskPeriods[2];
        //         if (tskPeriods[0] == '2') {
        //             $scope.isInput = false;
        //             $scope.isWeek = true;
        //             $scope.model.weekSelect = tskPeriods[1];
        //         } else {
        //             $scope.isInput = true;
        //             $scope.isWeek = false;
        //             $scope.modal.cycle = tskPeriods[1];
        //         };
        //     }

        // };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 20,
            pagesLength: 50,
            perPageOptions: [5, 10, 20, 30, 40, 50]

        };

        // //type
        // $scope.searchDeviceType = function() {
        //     deviceListService.searchDeviceType().success(function(res) {
        //         // //console.log(`查的DeviceType是：${res.data}`);
        //         $scope.deviceTypes = res.data;
        //     })
        // };
        // $scope.searchDeviceType();



        //status
        // $scope.deviceStatuss = function() {
        //     deviceListService.deviceStatuss().success(function(res) {
        //         // //console.log(`查的DeviceType是：${res.data}`);
        //         $scope.devStatuss = res.data;
        //     })
        // };
        // $scope.deviceStatuss();

        //查左
        $scope.searchLeft = function() {
            // PollingTaskService.searchForPolling($scope.query).success(function(response) {
            //     $scope.paginationConf.totalItems = response.data.totalElements;
            //     $scope.paginationConf.totalPages = response.data.totalPages;

            //     $scope.rows = response.data.content;
            // })
        };



        //----------------------------------前台条件查询-------------------------------------//

        //前台查询条件
        $scope.query2 = {
            neDevicetypeid: "",
            neDevicestatusid: "",
            neRepeaterid16: "",
            neName: ""
        };

        $scope.deviceTypeShow2 = true;


        //前台判断查询条件
        $scope.switchSearchCondition2 = function() {

            switch ($scope.searchCondition2) {
                //0 type
                case "0":
                    $scope.deviceStatusShow2 = false;
                    $scope.deviceTypeShow2 = true;
                    $scope.devNameAndId2 = false;

                    $scope.query2Param = 'neDevicetypeid';
                    //console.log($scope.query2.neDevicetypeid);
                    // $scope.searchDeviceType();
                    break;
                    //1 status
                case "1":
                    $scope.deviceStatusShow2 = true;
                    $scope.deviceTypeShow2 = false;
                    $scope.devNameAndId2 = false;
                    $scope.query2Param = 'neDevicestatusid';
                    break;
                case "2":
                    $scope.deviceStatusShow2 = false;
                    $scope.deviceTypeShow2 = false;
                    $scope.devNameAndId2 = true;
                    $scope.query2Param = 'neRepeaterid16';

                    $scope.query2.neRepeaterid16 = $scope.conditionValue2;
                    break;
                case "3":
                    $scope.deviceStatusShow2 = false;
                    $scope.deviceTypeShow2 = false;
                    $scope.devNameAndId2 = true;
                    $scope.query2Param = 'neName';

                    $scope.query2.neName = $scope.conditionValue2;
                    break;
                default:
                    $scope.query2.keyword = "";
            }
            return $scope.query2Param;
        };


        $scope.search2 = function() {
            // $scope.rows2 = [];
            $scope.new_rows2 = JSON.parse(JSON.stringify($scope.rows2));

            $scope.searchParam = $scope.switchSearchCondition2();

            //前台条件查询  原数组new_rows2
            $scope.searchForm2($scope.searchParam);

        };

        $scope.searchForm2 = function(query2Params) {
            $scope.rows2_new = [];
            for (let i = 0; i < $scope.rows2.length; i++) {
                switch (query2Params) {
                    case 'neDevicetypeid':
                        if ($scope.rows2[i].neDevicetype.dtpDevicetypeid == $scope.query2.neDevicetypeid) {
                            $scope.rows2_new.push($scope.rows2[i]);
                        }
                        break;
                    case 'neRepeaterid16':
                        if ($scope.rows2[i].neRepeaterid16 == $scope.query2.neRepeaterid16) {
                            $scope.rows2_new.push($scope.rows2[i]);
                        }
                        break;
                    case 'neName':
                        if ($scope.rows2[i].neName == $scope.query2.neName) {
                            $scope.rows2_new.push($scope.rows2[i]);
                        }
                        break;
                    case 'neDevicestatusid':
                        if ($scope.rows2[i].neDevicestatus.dsId == $scope.query2.neDevicestatusid) {
                            $scope.rows2_new.push($scope.rows2[i]);
                        }
                        break;

                    default:
                        break;
                }
            }

            $scope.rows2 = $scope.rows2_new;
        };


        //右边恢复
        $scope.recovery = function() {
            $scope.query2 = {
                neDevicetypeid: "",
                neDevicestatusid: "",
                neRepeaterid16: "",
                neName: ""
            };
            $scope.searchParam = "";
            $scope.searchCondition2 = 0;
            $scope.conditionValue2 = "";
            $scope.rows2 = $scope.new_rows2;
        };
        //左边恢复
        $scope.recoveryLeft = function() {
            $scope.query = { //查询设备
                pageIndex: 0,
                pageSize: 10,
                keyword: "",
                areaIds: "",
                neCompanyid: "",
                neSitelevelid: "",
                neDevicestatusid: "",
                neDevicetypeid: "",
                neName: "",
                neRepeaterid: "",
                rightElementIds: ""
            };
            $scope.modal.neDevicetypeid = "";
            $scope.modal.neDevicestatusid = "";
            $scope.query.rightElementIds = $scope.ids;
            $scope.conditionValue = "";
            $scope.searchCondition = "0";
            $scope.searchLeft();
        };

        //----------------------------------前台条件查询 end-------------------------------------//




        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search);

        //物理排序
        $scope.oldOrder = "";
        $scope.orderFun = function(v) {
            if ($scope.oldOrder == "" || $scope.oldOrder == undefined) {
                $scope.oldOrder = v;
            }
            if ($scope.oldOrder == v) {
                $scope.oldOrder = "-" + v;
            } else {
                $scope.oldOrder = v;
            }
            $scope.order = $scope.oldOrder;
        };


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.neNeid);
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
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                var index = $scope.checked.indexOf(i.neNeid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.neNeid);
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


        // -----------------------------第二个-------------------------------------

        $scope.m = [];
        $scope.checked2 = []; //选中的ID
        $scope.checkedItems2 = []; //选中的对象数组

        $scope.selectAll2 = function() {
            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            if ($scope.xx.select_all2) {
                $scope.checked2 = [];
                $scope.checkedItems2 = [];
                angular.forEach($scope.rows2, function(i) {
                    i.checked = true;
                    $scope.checked2.push(i.neNeid);
                    $scope.checkedItems2.push(i);
                });
            } else {
                angular.forEach($scope.rows2, function(i) {
                    i.checked = false;
                    $scope.checked2 = [];
                    $scope.checkedItems2 = [];
                });
            }
            //console.log($scope.checked2);
        };
        $scope.selectOne2 = function() {
            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            angular.forEach($scope.rows2, function(i) {
                var index = $scope.checked2.indexOf(i.neNeid);
                if (i.checked && index == -1) {
                    $scope.checked2.push(i.neNeid);
                    $scope.checkedItems2.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked2.splice(index, 1);
                    $scope.checkedItems2.splice(index, 1);
                };
            });


            if ($scope.rows2.length == $scope.checked2.length) {
                $scope.xx.select_all2 = true;
            } else {
                $scope.xx.select_all2 = false;
            }
            //console.log($scope.checkedItems2);
        };

        //   --------------------------------第二个end------------------------------
        $scope.doubleSelectToRight = function() {
            cnt = $scope.rows.length;
            for (let i = 0; i < cnt; i++) {
                if ($scope.rows[i].checked == true) {
                    //console.log($scope.rows2);
                    $scope.rows2.push($scope.rows[i]);
                    //console.log($scope.rows2);
                }
            };
            for (let j = 0; j < $scope.rows.length;) {
                var index = $scope.checked.indexOf($scope.rows[j].neNeid);
                if (index > -1) {
                    $scope.rows.splice(j, 1);
                    $scope.checkedItems[index].checked = false;
                } else {
                    j++;
                }
            }
            $scope.checked = [];
            $scope.checkedItems = [];
            $scope.xx.select_all = false;
            $scope.count2 = $scope.rows2.length;
        };
        $scope.doubleSelectToLeft = function() {

            cnt = $scope.rows2.length;
            for (let i = 0; i < cnt; i++) {
                if ($scope.rows2[i].checked == true) {
                    $scope.rows.push($scope.rows2[i]);
                }
            };
            for (let j = 0; j < $scope.rows2.length;) {
                var index = $scope.checked2.indexOf($scope.rows2[j].neNeid);
                if (index > -1) {
                    $scope.rows2.splice(j, 1);
                    $scope.checkedItems2[index].checked = false;
                } else {
                    j++;
                }
            }

            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            $scope.xx.select_all2 = false;
            $scope.count2 = $scope.rows2.length;

        };
        // //编辑事件
        // $scope.zdTableEdit = function(item, $event) {
        //     //console.log(item);
        //     $event.stopPropagation(); //阻止冒泡
        // };
        // //删除事件
        // $scope.zdTableRemove = function(item, $event) {
        //     //console.log(item);
        //     $event.stopPropagation(); //阻止冒泡
        // };
        // //选择type-->set params
        // $scope.pollingTypeSelect = function() {
        //     if ($scope.modal.tskStyle == 214) {
        //         $scope.paramsBtn = true;
        //         $scope.setOradd = 'set Params';
        //     } else if ($scope.modal.tskStyle == 213) {
        //         $scope.paramsBtn = true;
        //         $scope.setOradd = 'add Params';
        //     }

        // };
        // $scope.pollingTypeSelect();


        //定义query和design需要传的参数
        $scope.objectIdAlarm = "";
        $scope.objectIdAlarmEn = "";
        $scope.objectIdBase = "";
        $scope.objectIdRadio = "";
        $scope.setParamsId = [];
        $scope.setValue = [];
        $scope.objSetValueKey = [];

        //params btn点击事件

        $scope.paramsClick = function() {
            if ($scope.setOradd == 'set Params') {
                $scope.isTask = 'Design';
                $scope.paramsModal();
            } else if ($scope.setOradd == 'add Params') {
                $scope.isTask = 'Query';
                $scope.paramsAddModal();
            }
        };

        //query params
        // $scope.paramsAddModal = function() {

        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         backdrop: "static",
        //         templateUrl: 'app/pages/PollingManagement/PollingTask/paramsAddModal.html',
        //         controller: 'paramsAddModalCtrl',
        //         size: "lg",
        //         resolve: {
        //             transmitModalItems: function() {
        //                 return $scope.transmitModalItems;
        //             },
        //             paramsQueryFlag: function() {
        //                 return $scope.paramsQueryFlag;
        //             },
        //             PollingTaskService: function() {
        //                 return PollingTaskService;
        //             },
        //             selectedManTaskdetail: function() {
        //                 return $scope.selectedManTaskdetail;
        //             },
        //             isTask: function() {
        //                 return $scope.isTask;
        //             },
        //             deps: ['$ocLazyLoad',
        //                 function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                         'app/pages/PollingManagement/PollingTask/paramsAddModalCtrl.js',
        //                         // 'assets/js/bootstrap-table/bootstrap-table.min.css',
        //                         // 'assets/js/bootstrap-table/bootstrap-table.min.js',
        //                     ]);
        //                 }
        //             ]
        //         }
        //     });

        //     modalInstance.result.then(function(checkitems) {
        //         //console.log(checkitems);
        //         $scope.checkitems = checkitems;


        //         for (let i = 0; i < checkitems.length; i++) {
        //             // var objId = checkitems.objObjid;
        //             var objType = checkitems[i].objActivetype;
        //             if (objType == "Alarm Name") {
        //                 if ($scope.objectIdAlarm == '') {
        //                     $scope.objectIdAlarm += checkitems[i].objObjid;
        //                 } else {
        //                     $scope.objectIdAlarm += "," + checkitems[i].objObjid;
        //                 }
        //             } else if (objType == "Alarm Enable") {
        //                 if ($scope.objectIdAlarmEn == '') {
        //                     $scope.objectIdAlarmEn += checkitems[i].objObjid;
        //                 } else {
        //                     $scope.objectIdAlarmEn += "," + checkitems[i].objObjid;
        //                 }

        //             } else if (objType == "Device Information" || objType == "Network Management") {
        //                 if ($scope.objectIdBase == '') {
        //                     $scope.objectIdBase += checkitems[i].objObjid;
        //                 } else {
        //                     $scope.objectIdBase += "," + checkitems[i].objObjid;
        //                 }

        //                 // } else if (objType == "radio" || objType == "realtime") {
        //             } else if (objType == "Set Parameter" || objType == "Sampling data") {
        //                 if ($scope.objectIdRadio == '') {
        //                     $scope.objectIdRadio += checkitems[i].objObjid;
        //                 } else {
        //                     $scope.objectIdRadio += "," + checkitems[i].objObjid;
        //                 }

        //             };
        //         };
        //     });
        // };

        //design params
        // $scope.paramsModal = function() {

        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         backdrop: "static",
        //         templateUrl: 'app/pages/PollingManagement/PollingTask/paramsModal.html',
        //         controller: 'paramsModalCtrl',
        //         size: "md",
        //         resolve: {
        //             paramsDesignFlag: function() {
        //                 return $scope.paramsDesignFlag;
        //             },
        //             selectedManTaskdetail: function() {
        //                 return $scope.selectedManTaskdetail;
        //             },
        //             transmitModalItems: function() {
        //                 return $scope.transmitModalItems;
        //             },
        //             PollingTaskService: function() {
        //                 return PollingTaskService;
        //             },
        //             isTask: function() {
        //                 return $scope.isTask;
        //             },
        //             deps: ['$ocLazyLoad',
        //                 function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                         'app/pages/PollingManagement/PollingTask/paramsModalCtrl.js'
        //                     ]);
        //                 }
        //             ]
        //         }
        //     });

        //     modalInstance.result.then(function(checkitemsDesign) {
        //         //console.log(checkitemsDesign);
        //         $scope.checkitemsDesign = checkitemsDesign;
        //         //batch design里的value ，setValue
        //         for (let i = 0; i < checkitemsDesign.length; i++) {
        //             $scope.setParamsId.push(checkitemsDesign[i].objId);

        //             if (checkitemsDesign[i].setValue != null) {
        //                 $scope.setValue.push(checkitemsDesign[i].setValue);
        //             } else if (checkitemsDesign[i].objSetValueKey != null) {
        //                 $scope.setValue.push(checkitemsDesign[i].objSetValueKey);
        //             } else {
        //                 return false
        //             };
        //         };
        //         return $scope.setParamsId, $scope.setValue, $scope.objSetValueKey
        //     }, function(checkitems) {
        //         //console.log(checkitems);
        //         $log.info('Modal dismissed at: ' + new Date());
        //     });
        // };


        $scope.selectPeriod = function() {
            var peroid = $scope.modal.cycleValue;
            $scope.checkCycle();
            if (peroid == '2') {
                $scope.isWeek = true;
                $scope.isInput = false;
            } else {
                $scope.isWeek = false;
                $scope.isInput = true;
            }
        };
        // $scope.save = function() {
        //     var peroid = $scope.modal.cycleValue;
        //     var peroidData = '';
        //     var peroids = '';
        //     if (peroid == 9) {
        //         peroids = '9,0,00:00';
        //     } else {
        //         var executeTime = $scope.modal.tskNexttime;
        //         if (peroid == '2') {
        //             peroidData = $scope.modal.weekSelect;
        //         } else {
        //             peroidData = $scope.modal.cycle;
        //         }
        //         peroids = peroid + ',' + peroidData + ',' + executeTime;
        //     }
        //     //拼接好的时间 Cycle+ExecutionTime
        //     peroids = peroids + '';

        //     var neIds = [];
        //     var fileId = "";
        //     var tskFilter = "on";
        //     if ($scope.devices == '1') {
        //         tskFilter = "";
        //     };

        //     var tskIsuse = $scope.modal.state;
        //     var tskNexttime = $scope.modal.tskNexttime;
        //     var tskTaskname = $scope.modal.tskTaskname;

        //     //取neIds
        //     if ($scope.rows2.length == 0) {
        //         alert('Please select device!')
        //     } else {
        //         for (let i = 0; i < $scope.rows2.length; i++) {
        //             neIds.push($scope.rows2[i].neNeid);
        //         };
        //     };


        //     //console.log($scope.setParamsId, $scope.setValue, $scope.objSetValueKey);
        //     // 'fileId': fileId,
        //     // 'neIds': neIds,
        //     // 'objSetParam': objSetParam,
        //     // 'objSetParamValue': objSetParamValue,
        //     // 'objSetValueKey': objSetValueKey,
        //     // 'objectIdAlarm': objectIdAlarm,
        //     // 'objectIdAlarmEn': objectIdAlarmEn,
        //     // 'objectIdBase': objectIdBase,
        //     // 'objectIdRadio': objectIdRadio,
        //     // 'tskFilter':tskFilter,
        //     // 'tskIsuse':tskIsuse,
        //     // 'tskNexttime':tskNexttime,
        //     // 'tskPeriod':tskPeriod,
        //     // 'tskStyle': tskStyle,
        //     // 'tskTaskname': tskTaskname,
        //     //
        //     if ($scope.isAdd == 'Add') {
        //         PollingTaskService.savePollTaskElements($scope.modal.tskFailtimes, fileId, neIds.toString(),
        //                 $scope.setParamsId.toString(), $scope.setValue.toString(), $scope.objectIdAlarm,
        //                 $scope.objectIdAlarmEn, $scope.objectIdBase, $scope.objectIdRadio,
        //                 tskFilter, tskIsuse, tskNexttime, peroids, $scope.modal.tskStyle, tskTaskname)
        //             .success(function(response) {
        //                 if (response.data == true) {
        //                     alert('Success!');
        //                     $scope.close();
        //                 } else {
        //                     alert('Failed!----' + response.msg)
        //                 }

        //             })
        //             .error(function(err) {
        //                 console.info(err);
        //             });
        //     } else {
        //         PollingTaskService.modifyPollTaskElements($scope.modal.tskFailtimes, fileId, neIds.toString(),
        //                 $scope.setParamsId.toString(), $scope.setValue.toString(), $scope.objectIdAlarm,
        //                 $scope.objectIdAlarmEn, $scope.objectIdBase, $scope.objectIdRadio,
        //                 tskFilter, tskIsuse, tskNexttime, peroids, $scope.modal.tskStyle, $scope.transmitModalItems.tskTaskid, tskTaskname)
        //             .success(function(response) {
        //                 if (response.data == true) {
        //                     alert('Success!');
        //                     $scope.close();
        //                 } else {
        //                     alert('Failed!----' + response.msg)
        //                 }

        //             })
        //             .error(function(err) {
        //                 console.info(err);
        //             });
        //     }

        // };

        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };


    }