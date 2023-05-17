(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.historyAlarm', [
            'SunWave.pages.sysManagement.vendorManagement',
            'SunWave.pages.deviceManagement.deviceList',
            'SunWave.pages.AlarmConfiguration.AlarmLevel'
        ])
        .controller('historyAlarmCtrl', historyAlarmCtrl);

    function historyAlarmCtrl($rootScope, $scope, historyAlarmService, AlarmLevelService,
        deviceListService, messageAlertService, vendorManagementService, $uibModal, $filter, $log, $http) {

        $scope.query = { //查询条件
            startTime: $filter('date')(new Date().setDate(new Date().getDate() - 29), 'yyyy-MM-dd 00:00:00'),
            endTime: $filter('date')(new Date(), 'yyyy-MM-dd 23:59:59'),
            pageIndex: 0,
            pageSize: 10,
            keyword: "",
            alarmLevel: "",
            alarmName: "",
            areaIds: "",
            deviceLevel: "",
            deviceName: "",
            deviceType: "",
            vendorName: "",
            deviceTypeclassifyId: ""
        };
        $scope.xx = {
            select_all: ""
        };

        $scope.searchCondition = "0";


        $scope.area = {
            selectArea: ""
        };

        //$scope.condition初始化
        // $scope.condition = {
        //     neDevicetypeid: "",
        //     alvAlarmlevelid: ""
        // };
        $scope.condition = {
            neDevicetypeid: "",
            alvAlarmlevelid: "",
            neDevicetypeAllid: "",
            // neCompanyid: {
            coName: ""
                // }
        };

        //下拉框 and Input的初始化
        $scope.deviceStatusShow = false;
        $scope.alarmLevelShow = false;
        $scope.deviceTypeShow = false;
        $scope.deviceLevelShow = false;
        $scope.VendorShow = false;
        $scope.deviceTypeAllShow = false;
        $scope.devAlarmNameAndId = true;

        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };
        $scope.searchDeviceType();

        //type all
        $scope.searchDeviceTypeAll = function() {
            deviceListService.searchDeviceTypeAll().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.devTypeAlls = res.data;
            })
        };
        $scope.searchDeviceTypeAll();

        //alarm level
        $scope.searchAlarmLevel = function() {
            AlarmLevelService.findAll().success(function(res) {
                $scope.alarmLevels = res.data;
            })
        };
        $scope.searchAlarmLevel();

        //status
        $scope.deviceStatuss = function() {
            deviceListService.deviceStatuss().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.devStatuss = res.data;
            })
        };
        $scope.deviceStatuss();

        //vendor
        $scope.getVendorName = function() {
            deviceListService.findAll().success(function(res) {
                $scope.vNames = res.data;
            })
        };
        $scope.getVendorName();


        $scope.clearQuery = function() {
            $scope.query = { //查询条件
                startTime: "",
                endTime: "",
                pageIndex: 0,
                pageSize: 50
            };
        };

        //query查询条件清除
        $scope.clearQueryCondition = function() {
            $scope.query.neRepeaterid = "";
            $scope.query.alarmLevel = "";
            $scope.query.alarmName = "";
            $scope.query.vendorName = "";
            $scope.query.deviceName = "";
            $scope.query.neDeviceid = "";
            $scope.query.deviceType = "";
            $scope.query.deviceTypeclassifyId = "";
            $scope.query.btsId = "";
            $scope.query.btsName = "";
        };


        $scope.reset = function() {
            $scope.conditionValue = "";
            $scope.searchCondition = "0";
            $scope.condition = {
                neDevicetypeid: "",
                alvAlarmlevelid: "",
                neDevicetypeAllid: "",
                // neCompanyid: {
                coName: ""
                    // }
            };
            $scope.area.selectArea = "";
            $scope.clearQuery();
            $scope.deviceStatusShow = false;
            $scope.alarmLevelShow = false;
            $scope.deviceTypeShow = false;
            $scope.deviceLevelShow = false;
            $scope.deviceTypeAllShow = false;
            $scope.VendorShow = false;
            $scope.devAlarmNameAndId = true;
        };

        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.algAlarmlogid);
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
                var index = $scope.checked.indexOf(i.algAlarmlogid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.algAlarmlogid);
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


        //判断查询条件
        $scope.switchSearchCondition = function() {

            switch ($scope.searchCondition) {
                case "0":
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.alarmLevelShow = false;
                    $scope.devAlarmNameAndId = true;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.conditionValue = '';
                    break;
                case "1":
                    // $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.alarmLevelShow = false;
                    $scope.devAlarmNameAndId = true;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.query.deviceName = $scope.conditionValue;
                    break;
                case "2":
                    // $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.devAlarmNameAndId = true;
                    $scope.alarmLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.query.neRepeaterid = $scope.conditionValue;
                    break;
                    // case "2":
                    //     $scope.deviceStatusShow = false;
                    //     $scope.deviceTypeShow = false;
                    //     $scope.deviceLevelShow = true;
                    //     $scope.VendorShow = false;
                    //     $scope.devAlarmNameAndId = false;
                    //     $scope.query.neVer = $scope.alarm.conditionValue;
                    //     break;
                    //type
                case "3":
                    // $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = true;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.devAlarmNameAndId = false;
                    $scope.alarmLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.query.deviceType = $scope.condition.neDevicetypeid;
                    break;
                    //alrm name
                case "4":
                    // $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.devAlarmNameAndId = true;
                    $scope.alarmLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.query.alarmName = $scope.conditionValue;
                    break;
                    //alarm level
                case "5":
                    // $scope.deviceStatusShow = false;
                    $scope.alarmLevelShow = true;
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.devAlarmNameAndId = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.query.alarmLevel = $scope.condition.alvAlarmlevelid;
                    break;
                case "6":
                    // $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = true;
                    $scope.alarmLevelShow = false;
                    $scope.devAlarmNameAndId = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();

                    $scope.query.vendorName = $scope.condition.coName;
                    break;
                case "7":
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.alarmLevelShow = false;
                    $scope.devAlarmNameAndId = false;
                    $scope.deviceTypeAllShow = true;
                    $scope.clearQueryCondition();
                    $scope.query.deviceTypeclassifyId = $scope.condition.neDevicetypeAllid;
                    break;
                case "8":
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.alarmLevelShow = false;
                    $scope.devAlarmNameAndId = true;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.query.btsName = $scope.conditionValue;
                    break;
                case "9":
                    $scope.deviceTypeShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.VendorShow = false;
                    $scope.alarmLevelShow = false;
                    $scope.devAlarmNameAndId = true;
                    $scope.deviceTypeAllShow = false;
                    $scope.clearQueryCondition();
                    $scope.query.btsId = $scope.conditionValue;
                    break;
                default:
                    $scope.query.keyword = "";
            }
        };

        // $scope.ctAlarmDurations = function() {
        //     var nowDate = new Date();
        //     for (let i = 0; i < $scope.items.length; i++) {

        //         $scope.items[i].AlarmDurations = parseInt(((new Date($scope.items[i].algCleartime)) - (new Date($scope.items[i].algAlarmtime))) / 1000 / 60);
        //     }
        // };
        $scope.ctAlarmDurations = function() {
            var nowDate = new Date();
            for (let i = 0; i < $scope.items.length; i++) {
                $scope.alarmDuration = new Date($scope.items[i].algAlarmtime);
                if ($scope.items[i].algCleartime) {
                    $scope.algCleartime = new Date($scope.items[i].algCleartime);
                    $scope.items[i].AlarmDurations = parseInt(($scope.algCleartime.getTime() - $scope.alarmDuration.getTime()) / 1000 / 60);
                } else {
                    $scope.items[i].AlarmDurations = parseInt((nowDate.getTime() - $scope.alarmDuration.getTime()) / 1000 / 60);
                }
            }
        };

        $scope.search = function() {
            $scope.switchSearchCondition();
            searchForm();
        };

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.xx.select_all = false;
        };

        //查询
        var searchForm = function() {
            $rootScope.loading = true;
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            historyAlarmService.searchContent($scope.query)
                .success(function(response) {
                    // $rootScope.loading = false;
                    // $scope.paginationConf.totalItems = response.data.totalElements;
                    // $scope.items = response.data.content;
                    if (response.code == 200) {
                        $rootScope.loading = false;
                        $scope.paginationConf.totalItems = response.data.totalElements;
                        $scope.paginationConf.totalPages = response.data.totalPages;
                        $scope.items = response.data.content;
                    } else {
                        messageAlertService.successFun('failed', response.msg);
                        $rootScope.loading = false;
                    }
                })
                .error(function(err) {
                    console.info(err);
                    $rootScope.loading = false;
                });

        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };


        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        $scope.exportList = function(item) { 
            $rootScope.loading = true;
            return $http({    
                url: Url + '/sunwave-alarm-management/alarm/alarmlogHistory/export',
                    method: "POST",
                    headers: {      
                    'Content-type': 'application/json',
                    'Authorization': window.localStorage.myToken    
                },
                    data: $scope.query,
                    responseType: 'arraybuffer'  
            }).success(function(data) {   //     var blob = new Blob([data], {type:
                $rootScope.loading = false;
                // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                   // 使用{type:
                // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                  
                var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                //         var time=$scope.CurentTime();
                    
                var filename = 'History Alarm.xlsx';  
                if (window.navigator.msSaveOrOpenBlob) { // For IE:
                           navigator.msSaveBlob(blob, filename);     } else { // For other browsers:
                        
                    var objectUrl = URL.createObjectURL(blob);    
                    var a = document.createElement('a');    
                    document.body.appendChild(a);     // var filename =
                    // data.headers('Content-Disposition').split(';')[1].trim().substr('filename='.length); 
                    //       
                        
                    //console.log("filename:" + filename);    
                    a.setAttribute('style', 'display:none');    
                    a.setAttribute('href', objectUrl);    
                    a.setAttribute('download', filename);    
                    a.click();    
                    URL.revokeObjectURL(objectUrl);  
                }  
            });
        };

        $scope.detailDeviceName = function(item) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/detailDeviceNameModal.html',
                controller: 'detailDeviceNameModalCtrl',
                size: "lg",
                resolve: {
                    checkedItems: function() {
                        return item.neElement;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/detailDeviceNameModalCtrl.js',
                                // 'app/pages/AlarmManagement/currentAlarm/currentAlarmModalCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);

            });
        };
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
                    // deviceListService: function() {
                    //     return deviceListService;
                    // },
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

        $scope.detailAlarmName = function(item) {

            // historyAlarmService.getItem(item.id).success(function(response) {

            //     //console.log("#######" + $scope.transmitModalItems);
            // });
            $scope.openDetailModal(item);

        };

        $scope.openDetailModal = function(item) {
            $scope.currentFlag = 'history';
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/AlarmManagement/historyAlarm/detailAlarmNameModal.html',
                controller: 'detailAlarmNameModalCtrl',
                size: "md",
                resolve: {
                    transmitModalItems: function() {
                        return item;
                    },
                    currentFlag: function() {
                        return $scope.currentFlag;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/AlarmManagement/historyAlarm/detailAlarmNameModalCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                searchForm();
                // // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);

            });
        }

        /**添加**/
        $scope.toAddItem = function(page, size) {
            $scope.transmitModalItems = null;
            $scope.isAdd = true;
            $scope.openAddDialog(page, size);

        };
        /**修改**/
        $scope.toModifyItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must select one");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only select one");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = false;
                $scope.openAddDialog($scope.isAdd, $scope.transmitModalItems);

            }

        };

    }
})();