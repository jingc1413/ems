/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.PollingManagement.PollingTask', [
        'SunWave.pages.deviceManagement.deviceList',
        'SunWave.pages.Authority.area'
    ])
    .controller('PollingTaskModalCtrl', PollingTaskModalCtrl);

function PollingTaskModalCtrl($rootScope, $scope, PollingTaskService, deviceListService,
    isAdd, transmitModalItems, modifyData, $uibModalInstance, $uibModal, areaService, $log) {

    $scope.transmitModalItems = transmitModalItems;
    $scope.modifyData = modifyData;

    $scope.isSave = true;
    $scope.area = {
        selectArea: ""
    };

    $scope.isView = false;
    $scope.isExtime = true;

    $scope.modal = {
        tskTaskname: "",
        state: 0,
        tskNexttime: "",
        tskFailtimes: "",
        // RetryTimes: 1,
        cycleValue: "",
        tskStyle: 1,
        weekSelect: 1,
        cycle: "",
    };
    var areaFlag;

    $scope.rows2 = [];
    $scope.orignRows2 = [];


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
    $scope.vendorShow = false;

    //定义query和design需要传的参数
    $scope.objectIdAlarm = "";
    $scope.objectIdAlarmEn = "";
    $scope.objectIdBase = "";
    $scope.objectIdRadio = "";
    $scope.setParamsId = [];
    $scope.setValue = [];
    $scope.objSetValueKey = [];


    $scope.devices = '2';

    $scope.paramsBtn = false;

    $scope.count2 = 0;

    //校验
    $scope.checkData = {
        "nameCheck": "",
        // "RetryTimesCheck": "",
        "tskNexttimeCheck": "",
        "tskFailtimesCheck": "",
        "CycleCheck": ""
    };

    //校验tskTaskname
    $scope.checkTskTaskname = false;
    $scope.checkName = function() {
        if ($scope.modal.tskTaskname) {
            if ($scope.modal.tskTaskname.length > 0 && $scope.modal.tskTaskname.length <= 50) {
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

    $scope.types = [
        { typeId: 1, typeLabel: "General Polling" },
        { typeId: 2, typeLabel: "Fast Polling" },
        { typeId: 213, typeLabel: "Batch Query Task" },
        { typeId: 214, typeLabel: "Batch Design Task" }
    ];
    $scope.statuses = [
        { statusId: 0, statusLabel: "Enable" },
        { statusId: 1, statusLabel: "Disable" }
    ];
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
            // var reg = /^([01]\d|2[0-3]):([0-5]\d)$/; //时分正则表达式
            var reg = /^([0-1]{1}[0-9]{1}|[2][0-3]):[0-5]{1}[0-9]{1}/;
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
            var reg = /^(([1-9]|([1-9]\d)|([1-9]\d\d)|([1-9]\d\d\d)|([1-7]\d\d\d\d)|(8([0-5]\d\d\d|6([0-3]\d\d|4[0][0])))))$/; //1-86400正则表达式
            if (reg.test($scope.modal.tskFailtimes)) {
                $scope.checkData.tskFailtimesCheck = "r";
                return $scope.checkTskFailTimes1 = true;
            } else {
                $scope.checkData.tskFailtimesCheck = "e";
                return $scope.checkTskFailTimes1 = false;
            };
            // switch ($scope.modal.cycleValue) {
            //     case "0":

            //         break;

            //     default:
            //         break;
            // }
        } else {
            $scope.checkData.tskFailtimesCheck = "m";
            return $scope.checkTskFailTimes1 = false;
        }



    };

    //校验Cycle
    $scope.isCycle = false;
    $scope.checkCycle = function() {
        switch ($scope.modal.cycleValue) {
            //hour
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
                //day
            case "1":
                if ($scope.modal.cycle) {
                    // var reg = /^(([1-9])|([1-9]\d)|(100))$/; //day 1-100
                    var reg = /^(0?[1-9]|[1-2]\d|3[0-1])$/; //day 1-31
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
                //week
                // case "2":
                //     if ($scope.modal.cycle) {
                //         if ($scope.modal.weekSelect) {
                //             $scope.checkData.CycleCheck = "r";
                //             $scope.isCycle = true;
                //         } else {
                //             $scope.checkData.CycleCheck = "m";
                //             $scope.isCycle = false;
                //         }
                //     } else {
                //         $scope.checkData.CycleCheck = "m";
                //         $scope.isCycle = false;
                //     }
                //     break;
                //month
            case "3":
                if ($scope.modal.cycle) {
                    // var reg = /^(([1-9])|([1-2]\d)|(3[0-1]))$/; //month 1-31
                    var reg = /^([1-9]|1[012])$/; //month 1-12
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
                // case "9":
                //     if ($scope.modal.cycle) {
                //         var reg = /^([1-9]|([1-9]\d{1,10}))$/; //最大11位数字
                //         if (reg.test($scope.modal.cycle)) {
                //             $scope.checkData.CycleCheck = "r";
                //             $scope.isCycle = true;
                //         } else {
                //             $scope.checkData.CycleCheck = "e9";
                //             $scope.isCycle = false;
                //         }
                //     } else {
                //         $scope.checkData.CycleCheck = "m";
                //         $scope.isCycle = false;
                //     }
                //     break;
            default:
                $scope.checkData.CycleCheck = "m";
                $scope.isCycle = false;
        }
    };

    $scope.checkWeekFun = function() {
        switch ($scope.modal.cycleValue) {
            case "2":
                // if ($scope.modal.cycle) {
                if ($scope.modal.weekSelect) {
                    $scope.checkData.CycleCheck = "r";
                    $scope.isCycle = true;
                } else {
                    $scope.checkData.CycleCheck = "m";
                    $scope.isCycle = false;
                }
                // } else {
                //     $scope.checkData.CycleCheck = "m";
                //     $scope.isCycle = false;
                // }
                break;
        }
    };

    //所有校验通过才允许点击保存按钮
    $scope.isCheckAll = true;
    $scope.checkAll = function() {
        if ($scope.modal.cycleValue == '9') {
            if ($scope.checkTskTaskname && $scope.modal.cycle && $scope.checkTskFailTimes1) {

                $scope.isCheckAll = false;
            } else {

                $scope.isCheckAll = true;
            }
        } else if ($scope.modal.cycleValue == '2') {
            if ($scope.checkTskTaskname && $scope.modal.weekSelect && $scope.checkTskFailTimes1 && $scope.checkTskNexttime1) {
                $scope.isCheckAll = false;
            } else {
                $scope.isCheckAll = true;
            }
        } else {
            if ($scope.checkTskTaskname && $scope.isCycle && $scope.checkTskFailTimes1 && $scope.checkTskNexttime1 && $scope.isCycle) {

                $scope.isCheckAll = false;
            } else {
                $scope.isCheckAll = true;
            }
        }

    };


    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
        $scope.paramsDesignFlag = 'add';
        $scope.paramsQueryFlag = 'add';
    } else if ($scope.isAdd == 'Modify') {
        var firstSearchRightFlag = true;

        if ($scope.transmitModalItems.tskFilter == null || $scope.transmitModalItems.tskFilter == '') {
            $scope.devices = '1';
        };
        if ($rootScope.language == 'chinese') {
            $scope.title = '编辑'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        // $scope.modal.tskNexttime = $scope.modifyData.tskNexttime.substring(11,16);

        $scope.ids = $scope.modifyData.selectedNeIds;
        $scope.modal = $scope.modifyData;

        //state=tskIsuse
        $scope.modal.state = $scope.modal.tskIsuse;

        //params modal参数---selectedManTaskdetail
        $scope.selectedManTaskdetail = $scope.modifyData.selectedManTaskdetail;
        $scope.objectIdRadio = $scope.selectedManTaskdetail.tkdRadio;
        $scope.objectIdBase = $scope.selectedManTaskdetail.tkdBase;
        $scope.objectIdAlarmEn = $scope.selectedManTaskdetail.tkdAlarmen;
        $scope.objectIdAlarm = $scope.selectedManTaskdetail.tkdAlarm;
        $scope.setParamsId = $scope.selectedManTaskdetail.tkdSetparam;
        $scope.setValue = $scope.selectedManTaskdetail.tkdSetvalue;
        $scope.objSetValueKey = $scope.selectedManTaskdetail.tkdSetvalueKey;

        $scope.paramsDesignFlag = 'modify';
        $scope.paramsQueryFlag = 'modify';
        // $scope.modal.RetryTimes = 1;
        var str = $scope.modal.tskNexttime;
        if (str == '' || str == null) {
            $scope.modal.tskNexttime = '';
            $scope.isExtime = false;
        } else {
            $scope.isExtime = true;
            $scope.modal.tskNexttime = str.substring(11, 16);
        };

    } else {
        var firstSearchRightFlag = true;

        if ($scope.transmitModalItems.tskFilter == null || $scope.transmitModalItems.tskFilter == '') {
            $scope.devices = '1';
        };
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        };
        $scope.isSave = false;
        $scope.isView = true;
        var str = $scope.modal.tskNexttime;
        if (str == '' || str == null) {
            $scope.modal.tskNexttime = '';
            $scope.isExtime = false;
        } else {
            $scope.modal.tskNexttime = str.substring(11, 16);
        };

        // $scope.modal.tskNexttime = $scope.modifyData.tskNexttime.substring(11,16);

        $scope.ids = $scope.modifyData.selectedNeIds;
        $scope.modal = $scope.modifyData;

        //state=tskIsuse
        $scope.modal.state = $scope.modal.tskIsuse;
        //params modal参数---selectedManTaskdetail
        $scope.selectedManTaskdetail = $scope.modifyData.selectedManTaskdetail;
        $scope.objectIdRadio = $scope.selectedManTaskdetail.tkdRadio;
        $scope.objectIdBase = $scope.selectedManTaskdetail.tkdBase;
        $scope.objectIdAlarmEn = $scope.selectedManTaskdetail.tkdAlarmen;
        $scope.objectIdAlarm = $scope.selectedManTaskdetail.tkdAlarm;
        $scope.setParamsId = $scope.selectedManTaskdetail.tkdSetparam;
        $scope.setValue = $scope.selectedManTaskdetail.tkdSetvalue;
        $scope.objSetValueKey = $scope.selectedManTaskdetail.tkdSetvalueKey;

        $scope.paramsDesignFlag = 'modify';
        $scope.paramsQueryFlag = 'modify';
        // $scope.modal.RetryTimes = 1;
        $scope.checkName();
        // $scope.checkRetryTimes();
        $scope.checkTskNexttime();
        $scope.checkTskFailTimes();
        $scope.checkCycle();
    };


    //查询条件置空
    var setQueryFun = function() {
        $scope.query = {
            neCompanyid: "",
            neSitelevelid: "",
            neDevicestatusid: "",
            neDevicetypeid: "",
            neName: "",
            neRepeaterid: "",
            rightElementIds: ""
        };
    }

    //判断查询条件
    $scope.switchSearchCondition = function() {

        switch ($scope.searchCondition) {
            //0 type
            case "0":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = true;
                $scope.devNameAndId = false;
                $scope.vendorShow = false;
                // $scope.query.dtpDevicetypeid = $scope.modal.neDevicetypeid;
                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neName = "";
                $scope.query.neRepeaterid = "";
                $scope.query.rightElementIds = "";
                $scope.query.neDevicetypeid = $scope.modal.neDevicetypeid;
                // $scope.searchDeviceType();
                break;
                //1 status
            case "1":
                $scope.deviceStatusShow = true;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = false;
                $scope.vendorShow = false;
                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicetypeid = "";
                $scope.query.neName = "";
                $scope.query.neRepeaterid = "";
                $scope.query.rightElementIds = "";
                $scope.query.neDevicestatusid = $scope.modal.neDevicestatusid;
                // $scope.deviceStatuss();
                break;
            case "2":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = true;
                $scope.vendorShow = false;
                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neName = "";
                $scope.query.neDevicetypeid = "";
                $scope.query.rightElementIds = "";
                // $scope.query.neRepeaterid16 = $scope.conditionValue;
                $scope.query.neRepeaterid = $scope.conditionValue;
                break;
            case "3":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = true;
                $scope.vendorShow = false;
                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neDevicetypeid = "";
                $scope.query.neRepeaterid = "";
                $scope.query.rightElementIds = "";
                $scope.query.neName = $scope.conditionValue;
                break;
            case "4":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = false;
                $scope.vendorShow = true;
                $scope.query.neDevicetypeid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neName = "";
                $scope.query.neRepeaterid = "";
                $scope.query.rightElementIds = "";
                $scope.query.neCompanyid = $scope.modal.coCompanyid;
                break;
            default:
                $scope.query.keyword = "";
        }
    };

    $scope.search = function() {
        $scope.switchSearchCondition();
        searchForm();

    };

    var resetFlag = false;

    var searchForm = function() { //查询
        clearArrays();
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        // $scope.rows2 = [];
        if ($scope.isAdd == 'Add') {
            // $scope.query.rightElementIds = "";
            // $scope.switchSearchCondition();
            // PollingTaskService.searchForPolling($scope.query).success(function(response) {
            //     $scope.paginationConf.totalItems = response.data.totalElements;
            //     // $scope.totals = response.data.totalElements;
            //     $scope.paginationConf.totalPages = response.data.totalPages;
            //     $scope.rows = response.data.content;
            //     for (let i = 0; i < $scope.rows.length; i++) {
            //         var row1 = $scope.rows[i];
            //         for (let j = 0; j < $scope.rows2.length; j++) {
            //             var row2 = $scope.rows2[j];
            //             if (row1.neNeid == row2.neNeid) {
            //                 $scope.rows.splice(i, 1);
            //                 i--;
            //                 // $scope.paginationConf.totalItems--;
            //             }
            //         }
            //     }
            //     //         $scope.query = {
            //     //     neCompanyid: "",
            //     //     neSitelevelid: "",
            //     //     neDevicestatusid: "",
            //     //     neDevicetypeid: "",
            //     //     neName: "",
            //     //     neRepeaterid: "",
            //     //     rightElementIds: ""
            //     // };
            //     // $scope.paginationConf.totalItems = ($scope.totals - $scope.rows2.length);

            //     // if ($scope.query.neCompanyid == '' && $scope.query.neSitelevelid == '' && $scope.query.neDevicestatusid == '' && (($scope.query.neDevicetypeid == '') || (!$scope.query.neDevicetypeid)) && $scope.query.neName == '' && $scope.query.areaIds == '') {
            //     //     $scope.paginationConf.totalItems = ($scope.totals - $scope.rows2.length);
            //     // } else {

            //     // }
            // })
            $scope.searchLeft();
        } else {
            if ($scope.ids) {
                $scope.idss = $scope.ids.split(',');
                $scope.query.rightElementIds = $scope.ids;

                if (firstSearchRightFlag == true) {

                    if ($scope.devices == '2') {
                        //查右边
                        if ($scope.idss == '' || $scope.idss == undefined) {
                            $scope.rows2 = [];
                        } else {
                            PollingTaskService.findByIds($scope.idss).success(function(response) {


                                $scope.rows2 = response.data;
                                $scope.orignRows2 = $scope.rows2;
                                //拷贝
                                $scope.count2 = $scope.rows2.length;
                                $scope.searchLeft();
                            });
                        }
                    }

                    //时间拼接回显
                    var tskPeriods = $scope.modifyData.tskPeriod.split(',');
                    $scope.modal.cycleValue = tskPeriods[0];
                    $scope.modal.tskNexttime = tskPeriods[2];
                    if (tskPeriods[0] == '2') {
                        $scope.isInput = false;
                        $scope.isWeek = true;
                        $scope.modal.weekSelect = tskPeriods[1];
                    } else {
                        $scope.isInput = true;
                        $scope.isWeek = false;
                        $scope.modal.cycle = tskPeriods[1];
                    };

                    firstSearchRightFlag = false;

                } else {
                    $scope.searchLeft();
                };


                $scope.checkName();
                // $scope.checkRetryTimes();
                $scope.checkTskNexttime();
                $scope.checkTskFailTimes();
                $scope.checkCycle();
            } else {
                //时间拼接回显
                var tskPeriods = $scope.modifyData.tskPeriod.split(',');
                $scope.modal.cycleValue = tskPeriods[0];
                $scope.modal.tskNexttime = tskPeriods[2];
                if (tskPeriods[0] == '2') {
                    $scope.isInput = false;
                    $scope.isWeek = true;
                    $scope.modal.weekSelect = tskPeriods[1];
                } else {
                    $scope.isInput = true;
                    $scope.isWeek = false;
                    $scope.modal.cycle = tskPeriods[1];
                };

                $scope.searchLeft();
                $scope.rows2 = [];
                $scope.checkName();
                // $scope.checkRetryTimes();
                $scope.checkTskNexttime();
                $scope.checkTskFailTimes();
                $scope.checkCycle();
            }


        }

    };

    // 配置分页基本参数
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 50,
        pagesLength: 50,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    //type
    $scope.searchDeviceType = function() {
        deviceListService.searchDeviceType().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.deviceTypes = res.data;
        })
    };
    $scope.searchDeviceType();

    //areaTree
    $scope.searchAreaTree = function(size) {
        $scope.isArea = 'Area';
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/Authority/safe/areaTreeModal.html',
            controller: 'areaTreeModalCtrl',
            size: 'md',
            resolve: {
                isArea: function() {
                    return $scope.isArea;
                },
                areaService: function() {
                    return areaService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmManagement/historyAlarm/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(changedNodes) {
            // //console.log(`已选择的area是${selectArea.name}`);
            $scope.areaIdsArr = [];
            $scope.areaNamesArr = [];
            for (let i = 0; i < changedNodes.length; i++) {
                $scope.areaIdsArr.push(changedNodes[i].id);
                $scope.areaNamesArr.push(changedNodes[i].name);
            };
            $scope.area.selectArea = $scope.areaNamesArr.toString();
            $scope.query.areaIds = $scope.areaIdsArr.toString();
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //vendor
    $scope.getVendorName = function() {
        deviceListService.findAll().success(function(res) {
            $scope.vNames = res.data;
            $scope.vNames2 = res.data;
        })
    };
    $scope.getVendorName();

    //status
    $scope.deviceStatuss = function() {
        deviceListService.deviceStatuss().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.devStatuss = res.data;
        })
    };
    $scope.deviceStatuss();

    //查左
    $scope.searchLeft = function() {
        var idsArr = [];
        $scope.query.rightElementIds = "";
        if ($scope.orignRows2.length == 0) {} else {
            for (let k = 0; k < $scope.orignRows2.length; k++) {
                idsArr.push($scope.orignRows2[k].neNeid);
            }
            $scope.query.rightElementIds = idsArr.toString();
        }

        PollingTaskService.searchForPolling($scope.query).success(function(response) {
            // $scope.totals = response.data.totalElements;
            $scope.paginationConf.totalPages = response.data.totalPages;
            $scope.paginationConf.totalItems = response.data.totalElements;
            $scope.rows = response.data.content;
        })
    };

    $scope.handlePartial = function() {
        if ($scope.devices == '2') {
            searchForm();
        }
    }

    var clearArrays = function() {
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        $scope.xx.select_all = false;
    }

    var clearArrays2 = function() {
        $scope.checked2 = []; //选中的ID
        $scope.checkedItems2 = []; //选中的对象数组
        // $scope.xx.select_all2 = false;
    }





    //----------------------------------前台条件查询-------------------------------------//

    //areaTree
    $scope.searchAreaTree2 = function(size) {
        $scope.isArea = 'Area';
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/Authority/safe/areaTreeModal.html',
            controller: 'areaTreeModalCtrl',
            size: 'md',
            resolve: {
                isArea: function() {
                    return $scope.isArea;
                },
                areaService: function() {
                    return areaService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmManagement/historyAlarm/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(changedNodes) {
            // //console.log(`已选择的area是${selectArea.name}`);
            $scope.areaIdsArr2 = [];
            $scope.areaNamesArr2 = [];
            areaFlag = true;

            for (let i = 0; i < changedNodes.length; i++) {
                $scope.areaIdsArr2.push(changedNodes[i].id);
                $scope.areaNamesArr2.push(changedNodes[i].name);
            };
            $scope.query2.area = $scope.areaNamesArr2.toString();
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //前台查询条件
    $scope.query2 = {
        neDevicetypeid: "",
        neDevicestatusid: "",
        neRepeaterid16: "",
        neName: "",
        area: ""
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
                $scope.vendorShow2 = false;
                $scope.query2Param = 'neDevicetypeid';
                //console.log($scope.query2.neDevicetypeid);
                // $scope.searchDeviceType();
                break;
                //1 status
            case "1":
                $scope.deviceStatusShow2 = true;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = false;
                $scope.vendorShow2 = false;
                $scope.query2Param = 'neDevicestatusid';
                break;
            case "2":
                $scope.deviceStatusShow2 = false;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = true;
                $scope.vendorShow2 = false;
                $scope.query2Param = 'neRepeaterid16';
                $scope.query2.neRepeaterid16 = $scope.conditionValue2;
                break;
            case "3":
                $scope.deviceStatusShow2 = false;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = true;
                $scope.query2Param = 'neName';
                $scope.vendorShow2 = false;
                $scope.query2.neName = $scope.conditionValue2;
                break;
            case "4":
                $scope.deviceStatusShow2 = false;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = false;
                $scope.vendorShow2 = true;
                $scope.query2Param = 'coCompanyid';
                break;
            default:
                $scope.query2.keyword = "";
        }
        return $scope.query2Param;
    };


    $scope.search2 = function() {
        // $scope.rows2 = [];
        // $scope.new_rows2 = JSON.parse(JSON.stringify($scope.rows2));
        for (let i = 0; i < $scope.rows2.length; i++) {
            const row = $scope.rows2[i];
            if (row.checked == true) {
                row.checked = false;
            }
        }
        $scope.searchParam = $scope.switchSearchCondition2();

        //前台条件查询  原数组new_rows2
        $scope.searchForm2($scope.searchParam);

    };

    // $scope.searchForm2 = function(query2Params) {
    //     $scope.rows2_new = [];
    //     for (let i = 0; i < $scope.orignRows2.length; i++) {
    //         switch (query2Params) {
    //             case 'neDevicetypeid':
    //                 if ($scope.orignRows2[i].neDevicetype.dtpDevicetypeid == $scope.query2.neDevicetypeid) {
    //                     $scope.rows2_new.push($scope.orignRows2[i]);
    //                 }
    //                 break;
    //             case 'neRepeaterid16':
    //                 if ($scope.orignRows2[i].neRepeaterid16 == $scope.query2.neRepeaterid16) {
    //                     $scope.rows2_new.push($scope.orignRows2[i]);
    //                 }
    //                 break;
    //             case 'coCompanyid':
    //                 if ($scope.orignRows2[i].neCompany.coCompanyid == $scope.query2.coCompanyid) {
    //                     $scope.rows2_new.push($scope.orignRows2[i]);
    //                 }
    //                 break;
    //             case 'neName':
    //                 if ($scope.orignRows2[i].neName == $scope.query2.neName) {
    //                     $scope.rows2_new.push($scope.orignRows2[i]);
    //                 }
    //                 break;
    //             case 'neDevicestatusid':
    //                 if ($scope.orignRows2[i].neDevicestatus.dsId == $scope.query2.neDevicestatusid) {
    //                     $scope.rows2_new.push($scope.orignRows2[i]);
    //                 }
    //                 break;
    //             case 'area':
    //                 if ($scope.orignRows2[i].areaName == $scope.query2.area) {
    //                     $scope.rows2_new.push($scope.orignRows2[i]);
    //                 }
    //                 break;

    //             default:
    //                 break;
    //         };

    //         if ($scope.orignRows2[i].areaName == $scope.query2.area) {
    //             $scope.rows2_new.push($scope.orignRows2[i]);
    //         }
    //     };

    //     $scope.rows2 = $scope.rows2_new;
    // };

    $scope.searchForm2 = function(query2Params) {
        clearArrays2();
        if (resetFlag == true) {
            $scope.rows2 = $scope.orignRows2;
            $scope.count2 = $scope.rows2.length;
            resetFlag = false;
            return
        } else {
            $scope.rows2_new = [];
            $scope.rows3_new = [];
            var swArr = [];

            if (areaFlag == true) {
                for (let index = 0; index < $scope.orignRows2.length; index++) {
                    const el = $scope.orignRows2[index];
                    for (let j = 0; j < $scope.areaNamesArr2.length; j++) {
                        const areaN = $scope.areaNamesArr2[j];
                        if (el.areaName == areaN) {
                            $scope.rows2_new.push(el);
                        }
                    }
                };
                $scope.rows3_new = $scope.rows2_new;
            } else {
                $scope.rows3_new = $scope.orignRows2;
            };

            for (let i = 0; i < $scope.rows3_new.length; i++) {
                switch (query2Params) {
                    case 'neDevicetypeid':
                        if ($scope.rows3_new[i].neDevicetype.dtpDevicetypeid == $scope.query2.neDevicetypeid) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.neDevicetypeid == '' || $scope.query2.neDevicetypeid == null) {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        }
                        break;
                    case 'coCompanyid':
                        if ($scope.rows3_new[i].neCompany.coCompanyid == $scope.query2.coCompanyid) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.coCompanyid == null || $scope.query2.coCompanyid == '') {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        }
                        break;
                    case 'neRepeaterid16':
                        if ($scope.rows3_new[i].neRepeaterid16.indexOf($scope.query2.neRepeaterid16.toLocaleUpperCase()) != -1) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.neRepeaterid16 == '') {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        }
                        break;
                    case 'neName':
                        if (($scope.rows3_new[i].neName.indexOf($scope.query2.neName) != -1) && ($scope.query2.neName != '')) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.neName == '') {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        } else {
                            if ($scope.query2.neName == null) {
                                swArr.push($scope.rows3_new[i]);
                            }
                        }
                        break;
                    case 'neDevicestatusid':
                        if ($scope.query2.neDevicestatusid == null || ((typeof $scope.query2.neDevicestatusid == 'string') && $scope.query2.neDevicestatusid == '')) {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        } else if ($scope.rows3_new[i].neDevicestatus.dsId === $scope.query2.neDevicestatusid) {
                            swArr.push($scope.rows3_new[i]);
                        }
                        break;

                    default:
                        break;
                };
            }
            resetFlag = false;
            if ($scope.query2.area == '') {
                areaFlag = false;
            };

            $scope.rows2 = swArr;
            $scope.count2 = $scope.rows2.length;
        }
    };


    //右边恢复
    // $scope.recovery = function() {
    //     if ($scope.orignRows2 == undefined || $scope.orignRows2.length == 0) {
    //         alert('Please select item first!')
    //         return
    //     }
    //     $scope.query2 = {
    //         neDevicetypeid: "",
    //         neDevicestatusid: "",
    //         neRepeaterid16: "",
    //         neName: "",
    //         area: "",
    //         coCompanyid: ""
    //     };
    //     $scope.searchParam = "";
    //     $scope.searchCondition2 = '0';
    //     $scope.conditionValue2 = "";
    //     $scope.modal.coCompanyid = "";
    //     $scope.rows2 = $scope.orignRows2;
    // };
    $scope.recovery = function() {
        if ($scope.orignRows2 == undefined || $scope.orignRows2.length == 0) {
            alert('Please select item first!')
            return
        }
        $scope.query2 = {
            neDevicetypeid: "",
            neDevicestatusid: "",
            neRepeaterid16: "",
            neName: "",
            area: "",
            coCompanyid: ""
        };
        $scope.deviceStatusShow2 = false;
        $scope.deviceTypeShow2 = true;
        $scope.devNameAndId2 = false;
        $scope.vendorShow2 = false;
        $scope.query2Param = 'neDevicetypeid';

        $scope.searchParam = "";
        $scope.searchCondition2 = '0';
        $scope.conditionValue2 = "";
        $scope.modal.coCompanyid = "";
        $scope.rows2 = $scope.orignRows2;
        if ($scope.rows2 == undefined && $scope.rows2 == null) {
            $scope.rows2 = [];
        } else {
            resetFlag = true;
            areaFlag = false;
            $scope.searchForm2();
            // $scope.rows2 = $scope.orignRows2;
            // $scope.searchForm2($scope.searchParam, true);
        }
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
        $scope.area.selectArea = '';
        $scope.deviceTypeShow = true;
        $scope.devNameAndId = false;
        $scope.vendorShow = false;
        $scope.deviceStatusShow = false;
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
        if ($scope.rows2 == undefined) {
            $scope.rows2 = [];
        };
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
        //移到右边时保存原数组做恢复
        // $scope.orignRows2 = $scope.rows2;
        for (let k = 0; k < $scope.rows2.length; k++) {
            const row2 = $scope.rows2[k];
            if ($scope.orignRows2.indexOf(row2) > -1) {

            } else {
                $scope.orignRows2.push(row2);
            }
        }
        $scope.searchLeft();

    };
    $scope.doubleSelectToLeft = function() {


        if ($scope.checked2.length !== 0) {


            var cnt = $scope.rows2.length;
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

            for (let k = 0; k < $scope.orignRows2.length;) {

                var index2 = $scope.checked2.indexOf($scope.orignRows2[k].neNeid);
                if (index2 > -1) {
                    $scope.orignRows2.splice(k, 1);

                } else {
                    k++;
                }
            }

            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            $scope.xx.select_all2 = false;
            $scope.count2 = $scope.rows2.length;
            $scope.searchLeft();

        }
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
    //选择type-->set params
    $scope.pollingTypeSelect = function() {
        if ($scope.modal.tskStyle == 214) {
            $scope.paramsBtn = true;
            $scope.setOradd = 'set Params';
        } else if ($scope.modal.tskStyle == 213) {
            $scope.paramsBtn = true;
            $scope.setOradd = 'add Params';
        } else {
            $scope.paramsBtn = false;
        }

    };
    $scope.pollingTypeSelect();


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

    $scope.checkIdsArrTo = [];


    $scope.filtparamsFun = function(checkitems) {

        var objIdArr = [];
        var objIdArrAlarm = [];
        var objIdArrAlarmEn = [];
        var objIdArrBase = [];
        var objIdArrRadio = [];
        $scope.objectIdAlarm = [];
        $scope.objectIdAlarmEn = [];
        $scope.objectIdBase = [];
        $scope.objectIdRadio = [];

        for (let i = 0; i < checkitems.length; i++) {
            let objType = checkitems[i].objActivetype;
            if (objType == "Alarm Name") {

                objIdArrAlarm.push(checkitems[i].objObjid);

            } else if (objType == "Alarm Enable") {

                objIdArrAlarmEn.push(checkitems[i].objObjid);

            } else if (objType == "Device Information" || objType == "Network Management") {

                objIdArrBase.push(checkitems[i].objObjid);

                // } else if (objType == "radio" || objType == "realtime") {
            } else if (objType == "Set Parameter" || objType == "Sampling data") {
                objIdArrRadio.push(checkitems[i].objObjid);
            };
            objIdArr.push(checkitems[i]);
        };

        $scope.objectIdAlarm = objIdArrAlarm.toString();
        $scope.objectIdAlarmEn = objIdArrAlarmEn.toString();
        $scope.objectIdBase = objIdArrBase.toString();
        $scope.objectIdRadio = objIdArrRadio.toString();

        $scope.checkIdsArrTo = objIdArr;
    };

    //query params
    $scope.paramsAddModal = function() {
        // var checkIdsArr_transf;
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/PollingManagement/PollingTask/paramsAddModal.html',
            controller: 'paramsAddModalCtrl',
            size: "lg",
            resolve: {
                transmitModalItems: function() {
                    return $scope.transmitModalItems;
                },
                paramsQueryFlag: function() {
                    return $scope.paramsQueryFlag;
                },
                PollingTaskService: function() {
                    return PollingTaskService;
                },
                selectedManTaskdetail: function() {
                    return $scope.selectedManTaskdetail;
                },
                isTask: function() {
                    return $scope.isTask;
                },
                checkIdsArr_transf: function() {
                    return $scope.checkIdsArrTo;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/PollingManagement/PollingTask/paramsAddModalCtrl.js',
                            // 'assets/js/bootstrap-table/bootstrap-table.min.css',
                            // 'assets/js/bootstrap-table/bootstrap-table.min.js',
                        ]);
                    }
                ]
            }
        });

        modalInstance.result.then(function(checkitems) {
            //console.log(checkitems);
            if (checkitems) {
                $scope.checkitems = checkitems;
                $scope.filtparamsFun($scope.checkitems);
            } else {
                // checkIdsArrTo = $scope.checkitems;
            }
        }, function(checkitems) {
            //console.log(checkitems);
            // alert('000');
        });
    };

    //design params
    $scope.paramsModal = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/PollingManagement/PollingTask/paramsModal.html',
            controller: 'paramsModalCtrl',
            size: "md",
            resolve: {
                paramsDesignFlag: function() {
                    return $scope.paramsDesignFlag;
                },
                selectedManTaskdetail: function() {
                    return $scope.selectedManTaskdetail;
                },
                transmitModalItems: function() {
                    return $scope.transmitModalItems;
                },
                PollingTaskService: function() {
                    return PollingTaskService;
                },
                isTask: function() {
                    return $scope.isTask;
                },
                params_transf: function() {
                    return $scope.checkitemsDesign;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/PollingManagement/PollingTask/paramsModalCtrl.js'
                        ]);
                    }
                ]
            }
        });

        modalInstance.result.then(function(checkitemsDesign) {
            //console.log(checkitemsDesign);
            $scope.checkitemsDesign = checkitemsDesign;
            //batch design里的value ，setValue
            $scope.setParamsId = [];
            $scope.setValue = [];
            for (let i = 0; i < checkitemsDesign.length; i++) {
                if ($scope.setParamsId.indexOf(checkitemsDesign[i].objId) == -1) {
                    $scope.setParamsId.push(checkitemsDesign[i].objId);
                    if (checkitemsDesign[i].setValue != null) {
                        $scope.setValue.push(checkitemsDesign[i].setValue);
                    } else if (checkitemsDesign[i].objSetValueKey != null) {
                        $scope.setValue.push(checkitemsDesign[i].objSetValueKey);
                    } else {
                        return false
                    };
                };
            };
            return $scope.setParamsId, $scope.setValue, $scope.objSetValueKey
        }, function(checkitems) {
            //console.log(checkitems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.selectPeriod = function() {
        var peroid = $scope.modal.cycleValue;
        $scope.checkCycle();
        if (peroid == '2') {
            $scope.isWeek = true;
            $scope.modal.weekSelect = '1';
            $scope.isInput = false;
            $scope.isExtime = true;
        } else if ($scope.modal.cycleValue == '9') {
            $scope.isWeek = false;
            $scope.isInput = true;
            $scope.modal.cycle = '0';
            $scope.isExtime = false;
        } else {
            $scope.isWeek = false;
            $scope.isInput = true;
            $scope.isExtime = true;
        }
    };
    $scope.save = function() {
        // $scope.checkCycle();
        $scope.checkAll();
        var peroid = $scope.modal.cycleValue;
        var peroidData = '';
        var peroids = '';
        //onetime
        if (peroid == 9) {
            peroids = '9,0,00:00';
            $scope.modal.tskNexttime = '';
        } else {
            var executeTime = $scope.modal.tskNexttime;
            if (peroid == '2') {
                peroidData = $scope.modal.weekSelect;
            } else {
                peroidData = $scope.modal.cycle;
            }
            peroids = peroid + ',' + peroidData + ',' + executeTime;
        }
        //拼接好的时间 Cycle+ExecutionTime
        peroids = peroids + '';

        var neIds = [];
        var fileId = "";
        var tskFilter = "on";
        if ($scope.devices == '1') {
            tskFilter = "";
        };

        var tskIsuse = $scope.modal.state;
        var tskNexttime = $scope.modal.tskNexttime;
        var tskTaskname = $scope.modal.tskTaskname;

        //取neIds
        if ($scope.devices == '1') {} else {
            if ($scope.rows2 == undefined || $scope.orignRows2.length == 0) {
                alert('Please select device!');
                return
            } else {
                for (let i = 0; i < $scope.orignRows2.length; i++) {
                    neIds.push($scope.orignRows2[i].neNeid);
                };
            };
        };
        //console.log($scope.setParamsId, $scope.setValue, $scope.objSetValueKey);
        // 'fileId': fileId,
        // 'neIds': neIds,
        // 'objSetParam': objSetParam,
        // 'objSetParamValue': objSetParamValue,
        // 'objSetValueKey': objSetValueKey,
        // 'objectIdAlarm': objectIdAlarm,
        // 'objectIdAlarmEn': objectIdAlarmEn,
        // 'objectIdBase': objectIdBase,
        // 'objectIdRadio': objectIdRadio,
        // 'tskFilter':tskFilter,
        // 'tskIsuse':tskIsuse,
        // 'tskNexttime':tskNexttime,
        // 'tskPeriod':tskPeriod,
        // 'tskStyle': tskStyle,
        // 'tskTaskname': tskTaskname,
        //
        if ($scope.isCheckAll == true) {
            alert('Please check the completed items again！');
            return
        }
        if ($scope.isAdd == 'Add') {
            var data = {}; //duration, fileId, neIds, objSetParam, objSetParamValue, objectIdAlarm, objectIdAlarmEn, objectIdBase, objectIdRadio, tskFilter, tskIsuse, tskNexttime, tskPeriod, tskStyle, tskTaskname
            data.duration = $scope.modal.tskFailtimes;
            data.fileId = fileId;
            data.neIds = neIds.toString();
            data.objSetParam = $scope.setParamsId.toString();
            data.objSetParamValue = $scope.setValue.toString();
            data.objectIdAlarm = $scope.objectIdAlarm;
            data.objectIdAlarmEn = $scope.objectIdAlarmEn;
            data.objectIdBase = $scope.objectIdBase;
            data.objectIdRadio = $scope.objectIdRadio;
            data.tskFilter = tskFilter;
            data.tskIsuse = tskIsuse;
            data.tskNexttime = tskNexttime;
            data.tskPeriod = peroids;
            data.tskStyle = $scope.modal.tskStyle;
            data.tskTaskname = tskTaskname;
            // PollingTaskService.savePollTaskElements($scope.modal.tskFailtimes, fileId, neIds.toString(),
            //         $scope.setParamsId.toString(), $scope.setValue.toString(), $scope.objectIdAlarm,
            //         $scope.objectIdAlarmEn, $scope.objectIdBase, $scope.objectIdRadio,
            //         tskFilter, tskIsuse, tskNexttime, peroids, $scope.modal.tskStyle, tskTaskname)
            PollingTaskService.savePollTaskElements(data)
                .success(function(response) {
                    if (response.code == 200) {
                        alert('Success!');
                        $scope.close();
                    } else {
                        alert('Failed!' + response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });
        } else {
            var data = {};
            data.duration = $scope.modal.tskFailtimes;
            data.fileId = fileId;
            data.neIds = neIds.toString();
            if ($scope.setParamsId == '') {
                data.objSetParam = $scope.selectedManTaskdetail.tkdSetparam;
                data.objSetParamValue = $scope.selectedManTaskdetail.tkdSetvalue;
            } else {
                data.objSetParam = $scope.setParamsId.toString();
                data.objSetParamValue = $scope.setValue.toString();
            };
            data.objectIdAlarm = $scope.objectIdAlarm;
            data.objectIdAlarmEn = $scope.objectIdAlarmEn;
            data.objectIdBase = $scope.objectIdBase;
            data.objectIdRadio = $scope.objectIdRadio;
            data.tskFilter = tskFilter;
            data.tskIsuse = tskIsuse;
            data.tskNexttime = tskNexttime;
            data.tskPeriod = peroids;
            data.tskStyle = $scope.modal.tskStyle;
            data.tskTaskid = $scope.modifyData.tskTaskid;
            data.tskTaskname = tskTaskname;
            PollingTaskService.modifyPollTaskElements(data)
                .success(function(response) {
                    if (response.code == 200) {
                        alert('Success!');
                        $scope.close();
                    } else {
                        alert('Failed!' + response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });
        }

    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };


}