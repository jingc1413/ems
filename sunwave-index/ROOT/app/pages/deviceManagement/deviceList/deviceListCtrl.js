(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.deviceList')
        .controller('deviceListCtrl', deviceListCtrl);

    function deviceListCtrl($rootScope, $scope, deviceListService, $uibModal, $http, messageAlertService) {

        $scope.area = {
            selectArea: ""
        };

        $scope.xx = {
            select_all: ""
        };

        $scope.query = {
            "pageIndex": 0,
            "pageSize": 10

        };

        //查询条件 下拉框 and Input的初始化
        $scope.deviceTypeShow = false;
        $scope.deviceStatusShow = false;
        $scope.vendorShow = false;
        $scope.deviceLevelShow = false;
        $scope.deviceTypeAllShow = false;
        $scope.devNameIdVers = true;

        $scope.device = {
            coCompanyid: "",
            neDevicetypeid: "",
            neDevicestatusid: "",
            neSitelevelid: "",
            dtcDevicetypeclassifyid: ""
        };


        var setInit = function() {
            $scope.query.neRepeaterid = '';
            $scope.query.neName = '';
            $scope.query.neCompanyid = '';
            $scope.query.neDevicetypeid = '';
            $scope.query.neDevicestatusid = '';
            $scope.query.deviceTypeclassifyId = '';
            $scope.query.neSitelevelid = '';
            $scope.query.btsId = '';
            $scope.query.btsName = '';
            $scope.query.neVer = '';
        };

        $scope.switchSearchCondition = function() {

            switch ($scope.searchCondition) {
                case "0":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    setInit();
                    $scope.query.neRepeaterid = $scope.conditionValue;
                    break;
                case "1":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    setInit();
                    $scope.query.neName = $scope.conditionValue;
                    break;
                case "2":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = true;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    setInit();
                    $scope.query.neCompanyid = $scope.device.coCompanyid;
                    break;
                case "3":
                    $scope.deviceTypeShow = true;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = false;
                    setInit();
                    $scope.query.neDevicetypeid = $scope.device.neDevicetypeid;
                    break;
                case "4":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = true;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    setInit();
                    $scope.query.neDevicestatusid = $scope.device.neDevicestatusid;
                    break;
                case "5":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = true;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    setInit();
                    $scope.query.neSitelevelid = $scope.device.neSitelevelid;
                    break;
                case "6":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = true;
                    setInit();
                    $scope.query.neVer = $scope.conditionValue;
                    break;
                case "7":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = false;
                    $scope.deviceTypeAllShow = true;
                    setInit();
                    $scope.query.deviceTypeclassifyId = $scope.device.neDevicetypeAllid;
                    break;
                case "8":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    $scope.deviceTypeAllShow = false;
                    setInit();
                    $scope.query.btsName = $scope.conditionValue;
                    // $scope.query.deviceTypeclassifyId = $scope.device.neDevicetypeAllid;
                    break;
                case "9":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    $scope.deviceTypeAllShow = false;
                    setInit();
                    $scope.query.btsId = $scope.conditionValue;
                    // $scope.query.deviceTypeclassifyId = $scope.device.neDevicetypeAllid;
                    break;
                default:
                    $scope.query.keyword = "";
            }
        };


        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.xx.select_all = false;
        };

        $scope.search = function() {
            // $scope.query = { //查询信息置空
            //     pageIndex: 0,
            //     pageSize: 10
            // };
            $scope.switchSearchCondition();
            searchForm();
        };

        //查询
        var searchForm = function() {
            $rootScope.loading = true;
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            deviceListService.searchContent($scope.query)
                .success(function(response) {
                    //console.log(response);

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

        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };
        //type all
        $scope.searchDeviceTypeAll = function() {
            deviceListService.searchDeviceTypeAll().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.devTypeAlls = res.data;
            })
        };

        //status
        $scope.deviceStatuss = function() {
            deviceListService.deviceStatuss().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.devStatuss = res.data;
            })
        };
        //level
        $scope.searchDeviceLevel = function() {
            deviceListService.searchDeviceLevel().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceLevels = res.data;
            })
        };

        //vendor
        $scope.getVendorName = function() {
            deviceListService.findAll().success(function(res) {
                $scope.vNames = res.data;
            })
        };

        $scope.searchDeviceType();
        $scope.searchDeviceTypeAll();
        $scope.searchDeviceLevel();
        $scope.deviceStatuss();
        $scope.getVendorName();

        //导出
        $scope.exportList = function(item) { 
            $rootScope.loading = true;
            return $http({    
                url: Url + '/sunwave-device-management/device/neElement/export',
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
                    
                var filename = 'DeviceList.xlsx';  
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

                if (changedNodes) {
                    // //console.log(`已选择的area是${selectArea.name}`);
                    $scope.areaIdsArr = [];
                    $scope.areaNamesArr = [];
                    for (let i = 0; i < changedNodes.length; i++) {
                        $scope.areaIdsArr.push(changedNodes[i].id);
                        $scope.areaNamesArr.push(changedNodes[i].name);
                    };
                    $scope.area.selectArea = $scope.areaNamesArr.toString();
                    $scope.query.areaIds = $scope.areaIdsArr.toString();
                }

            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        // // 通过cityId查询county
        // $scope.getCountyByCityId = function() {
        //     //页面model绑定的就是selected的id
        //     deviceListService.getCountyByCityId($scope.City).success(function(data) {
        //         //赋值给页面
        //         $scope.counties = data.counties;

        //     })
        // };

        // //查city和county
        // var getCityAndCounty = function() {
        //     deviceListService.getCityAndCounty()
        //         .success(function(response) {
        //             $scope.cities = response.cities;
        //             $scope.counties = response.counties;
        //         })
        //         .error(function(err) {
        //             console.info(err);
        //         });
        // };
        // getCityAndCounty();

        //         $scope.exportList = function(){
        //             console.info($scope.query);
        //             if($scope.query.neName==null||$scope.query.neName==""){
        //                 $scope.query.neName = null;
        //             }
        // //				if(confirm('一次最多只能导出65533条数据.')){
        //                 window.location.href = "./API/alarmLog/exportAlarm/" + $scope.query.neName;
        // //				}
        //         }

        $scope.reset = function() {
            $scope.searchCondition = '0';
            $scope.conditionValue = '';
            $scope.device.coCompanyid = '';
            $scope.device.neDevicetypeid = '';
            $scope.device.neDevicestatusid = '';
            $scope.area.selectArea = '';
            $scope.device.neSitelevelid = '';
            $scope.device.neDevicetypeAllid = '';
            $scope.query = {
                "pageIndex": 0,
                "pageSize": 10
            };
            $scope.deviceTypeShow = false;
            $scope.deviceStatusShow = false;
            $scope.vendorShow = false;
            $scope.deviceLevelShow = false;
            $scope.devNameIdVers = true;
            $scope.deviceTypeAllShow = false;
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


        // //排序
        // $scope.faDown = true;
        // $scope.faUp = true;
        // $scope.orderFun = function(v) {
        //     $scope.faDown = !$scope.faDown;
        //     $scope.faUp = !$scope.faUp;
        //     if ($scope.faDown == true) {
        //         $scope.query.orderDesc = 'desc';
        //         $scope.query.orderName = v;
        //         $scope.search();
        //     } else if ($scope.faUp == true) {
        //         $scope.query.orderDesc = 'asc';
        //         $scope.query.orderName = v;
        //         $scope.search();
        //     }

        // };

        //Add
        $scope.addItem = function() {
            $scope.isAdd = 'Add';
            $scope.deviceAddModal();

        };
        //view
        $scope.viewItem = function() {
            if ($scope.checked.length == 0) {
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only Select One");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.isAdd = 'View';
                $scope.deviceAddModal();
            }

        };

        //modify
        $scope.editItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must Select One");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only Select One");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.isAdd = 'Modify';
                $scope.deviceAddModal();
            }

        };
        //NotInService
        $scope.NotInService = function() {
            if ($scope.checked.length == 0) {
                // alert("Must Select One");
                messageAlertService.alertFun('must');
                return;
                // } else if ($scope.checked.length > 1) {
                //     alert("Only Select One");
                //     return;
            } else if ($scope.checked.length >= 1) {
                if (messageAlertService.confirmFun('modify')) {
                    $scope.openNotInServiceModal();
                } else {
                    return false
                };
            };

        };


        //getLog
        $scope.getLog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/getLogModal.html',
                controller: 'getLogModalCtrl',
                size: "md",
                resolve: {
                    deviceListService: function() {
                        return deviceListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/getLogModalCtrl.js',
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


        //query device
        $scope.queryDevice = function() {
            $scope.openQueryDeviceModal();
        };

        $scope.detailName_base = function(item, $event) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/detailDeviceName_baseModal.html',
                controller: 'detailDeviceName_baseModalCtrl',
                size: "lg",
                resolve: {
                    checkedItems: function() {
                        return item;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/detailDeviceName_baseModalCtrl.js',
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
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        };

        $scope.detailDeviceName = function(item, $event) {
            // //console.log(`当前item是${item},event是${$event}`);
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static", //点击空白处不关闭对话框
                templateUrl: 'app/pages/deviceManagement/deviceList/detailDeviceNameModal.html',
                controller: 'detailDeviceNameModalCtrl',
                size: "lg",
                resolve: {
                    checkedItems: function() {
                        return item;
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
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        };

        $scope.deviceAddModal = function(item) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static", //点击空白处不关闭对话框
                templateUrl: 'app/pages/deviceManagement/deviceList/deviceAddModal.html',
                controller: 'deviceAddModalCtrl',
                size: "md",
                resolve: {
                    transmitModalItems: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deviceListService: function() {
                        return deviceListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/deviceAddModalCtrl.js',
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function() {
                //console.log();
                $scope.clearAll();
                // $scope.checked = [];
                // $scope.checkedItems = [];
                // // $scope.items.push(newItems);
                $scope.search();
            }, function() {

                $scope.search();

            });
        };

        $scope.openQueryDeviceModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/queryDeviceModal.html',
                controller: 'queryDeviceModalCtrl',
                size: "md",
                resolve: {
                    deviceListService: function() {
                        return deviceListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/queryDeviceModalCtrl.js',
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
        //not in service Modal
        $scope.openNotInServiceModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/NotInServiceModal.html',
                controller: 'NotInServiceModalCtrl',
                size: "md",
                resolve: {
                    deviceListService: function() {
                        return deviceListService;
                    },
                    checkedItems: function() {
                        return $scope.checkedItems;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/NotInServiceModalCtrl.js',
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(checkedItems) {
                $scope.checkedItems = [];
                $scope.checked = [];
                $scope.search();
            }, function(newItems) {
                //console.log(newItems);

            });
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
                    $scope.checked.push(i.neNeid);
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
                var index = $scope.checked.indexOf(i.neNeid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.neNeid);
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


    }
})();