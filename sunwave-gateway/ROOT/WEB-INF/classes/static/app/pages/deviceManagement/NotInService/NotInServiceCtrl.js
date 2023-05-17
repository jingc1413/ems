(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.NotInService', ['SunWave.pages.deviceManagement.deviceList'])
        .controller('NotInServiceCtrl', NotInServiceCtrl);

    function NotInServiceCtrl($scope, NotInServiceService, deviceListService, $uibModal, $http) {


        $scope.area = {
            selectArea: ""
        };
        $scope.xx = {
            select_all: ""
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 10
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

        $scope.switchSearchCondition = function() {

            switch ($scope.searchCondition) {
                case "0":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    $scope.query.neRepeaterid = $scope.conditionValue;
                    break;
                case "1":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    $scope.query.neName = $scope.conditionValue;
                    break;
                case "2":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = true;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neCompanyid = $scope.device.coCompanyid;
                    break;
                case "3":
                    $scope.deviceTypeShow = true;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neDevicetypeid = $scope.device.neDevicetypeid;
                    break;
                case "4":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = true;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neDevicestatusid = $scope.device.neDevicestatusid;
                    break;
                case "5":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = true;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neSitelevelid = $scope.device.neSitelevelid;
                    break;
                case "6":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = true;
                    $scope.query.neVer = $scope.conditionValue;
                    break;
                case "7":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = false;
                    $scope.deviceTypeAllShow = true;
                    $scope.query.deviceTypeclassifyId = $scope.device.neDevicetypeAllid;
                    break;
                default:
                    $scope.query.keyword = "";
            }
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

            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            NotInServiceService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.paginationConf.totalPages = response.data.totalPages;
                    $scope.items = response.data.content;
                })
                .error(function(err) {
                    console.info(err);
                });

        };

        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };
        //type all
        $scope.searchDeviceTypeAll = function() {
            deviceListService.searchDeviceTypeAll().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.devTypeAlls = res.data;
            })
        };
        //level
        $scope.searchDeviceLevel = function() {
            deviceListService.searchDeviceLevel().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceLevels = res.data;
            })
        };
        //status
        $scope.deviceStatuss = function() {
            deviceListService.deviceStatuss().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.devStatuss = res.data;
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


        // var getCityAndCounty = function() {
        //     NotInServiceService.getCityAndCounty()
        //         .success(function(response) {
        //             $scope.cities = response.cities;
        //             $scope.counties = response.counties;
        //         })
        //         .error(function(err) {
        //             console.info(err);
        //         });
        // }
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
                // console.log(`已选择的area是${selectArea.name}`);
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
            console.log($scope.checked);
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
            console.log($scope.checkedItems);
        };


        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 200,
            pagesLength: 200,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        $scope.reset = function() {
            $scope.conditionValue = '';
            $scope.device.coCompanyid = '';
            $scope.device.neSitelevelid = '';
            $scope.device.neDevicetypeid = '';
            $scope.device.neDevicestatusid = '';
            $scope.device.neDevicetypeAllid = '';
            $scope.area.selectArea = '';
            $scope.query = {
                "pageIndex": 0,
                "pageSize": 10

            };
        };

        //modify
        $scope.editItem = function() {
            if ($scope.checked.length == 0) {
                alert("Must Select One");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only Select One");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.isAdd = 'Modify';
                $scope.deviceAddModal();
            }

        };
        //view
        $scope.viewItem = function() {
            if ($scope.checked.length == 0) {
                alert("Must Select One");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only Select One");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.isAdd = 'View';
                $scope.deviceAddModal();
            }

        };

        //checkStatus
        var checkStatus = function(items) {
            $scope.checkStatusFlag = true;
            for (let i = 0; i < items.length; i++) {
                if (items[0].neDevicestatus.dsId != items[i].neDevicestatus.dsId) {
                    alert('The selected state is inconsistent');
                    $scope.checkStatusFlag = false;
                    return

                } else {
                    // $scope.checkStatusFlag = true;
                };
            };

            return $scope.checkStatusFlag;
        };

        //query device
        $scope.queryDevice = function() {
            $scope.openQueryDeviceModal();
        };

        //in Operation
        $scope.Operation = function() {
            if ($scope.checked.length == 0) {
                alert("Must Select One");
                return;
            } else {
                var flagNum = 0; //devicelist = 1
                var neIDS = [];
                var toFlag = 1;

                checkStatus($scope.checkedItems);
                if ($scope.checkStatusFlag) {
                    for (let j = 0; j < $scope.checkedItems.length; j++) {
                        neIDS.push($scope.checkedItems[j].neNeid);
                        $scope.statusId = $scope.checkedItems[j].neDevicestatus.dsId;
                    };
                    //检验是否存在告警
                    deviceListService.checkAlmMaskByNeIds(flagNum, neIDS.toString()).success(function(res) {
                        if (res.data == true) {
                            if (confirm('The device with alarm,are you sure to continue?')) {
                                //转到deviceList之前的检验
                                NotInServiceService.checkElementIntegrity(neIDS.toString()).success(function(res) {
                                    if (res.data.result == 'success') {
                                        //状态转移
                                        deviceListService.updateStatus($scope.statusId, neIDS.toString(), toFlag).success(function(res) {
                                            if (res.data == true) {
                                                alert('Success!');
                                                //清除原
                                                $scope.checkedItems = [];
                                                $scope.checked = [];
                                                $scope.search();
                                            } else {
                                                alert(`Failed`);
                                            }
                                        });
                                    } else {
                                        alert('Transfer not allowed');
                                        return
                                    }
                                })
                            } else {
                                alert('cancel')
                            }
                        } else if (res.data == false) {
                            if (confirm(`The device with alarm,are you sure to continue?`)) {
                                deviceListService.updateStatus($scope.statusId, neIDS.toString(), toFlag).success(function(res) {
                                    if (res.data == true) {
                                        alert('Success!');
                                        $scope.checkedItems = [];
                                        $scope.checked = [];
                                        $scope.search();
                                    } else {
                                        alert(`Failed+${res.msg}`);
                                    }
                                });
                            } else {

                            }
                        }
                    });
                } else {
                    return
                };
            }
        };

        //delete
        $scope.deleteItem = function() {
            if ($scope.checked.length == 0) {
                alert("You must select one.");
                return;
            } else {
                if (confirm("Are you sure to delete?")) {
                    console.log($scope.checkedItems);

                    NotInServiceService.deleteItem($scope.checked.toString()).success(function(response) {
                        if (response.data == true) {
                            alert("Delete successful!");
                            // $scope.search();
                        } else {
                            alert(response.msg);
                        };
                        $scope.checkedItems = [];
                        $scope.checked = [];
                        $scope.search();
                    });

                }
            }
        };
        //batchModify
        $scope.batchModify = function() {
            if ($scope.checkedItems.length == 0) {
                alert('Must Select One!')
            } else {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/deviceManagement/NotInService/batchModifyModal.html',
                    controller: 'batchModifyModalCtrl',
                    size: "lg",
                    resolve: {
                        checkedItems: function() {
                            return $scope.checkedItems;
                        },
                        NotInServiceService: function() {
                            return NotInServiceService;
                        },
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'app/pages/deviceManagement/NotInService/batchModifyModalCtrl.js',
                                ]);
                            }
                        ]
                    }
                });

                modalInstance.result.then(function(newItems) {
                    console.log(newItems);
                    $scope.apply();
                }, function(newItems) {
                    console.log(newItems);
                });
            }
        };

        $scope.detailDeviceName = function(item, $event) {
            // console.log(`当前item是${item},event是${$event}`);
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
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
                console.log(newItems);
            }, function(newItems) {
                console.log(newItems);

            });
        };

        $scope.deviceAddModal = function(item) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
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

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // // $scope.items.push(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.search();
            }, function(newItems) {
                console.log(newItems);

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
                console.log(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                console.log(newItems);

            });
        };

        //导出
        $scope.exportList = function(item) { 
            return $http({    
                url: Url + '/sunwave-device-management/device/neElement/exportMonitor',
                    method: "POST",
                    headers: {      
                    'Content-type': 'application/json',
                    'Authorization': window.localStorage.myToken    
                },
                    data: $scope.query,
                    responseType: 'arraybuffer'  
            }).success(function(data) {   //     var blob = new Blob([data], {type:
                // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                   // 使用{type:
                // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                  
                var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                //         var time=$scope.CurentTime();
                    
                var filename = 'NotInService.xlsx';  
                if (window.navigator.msSaveOrOpenBlob) { // For IE:
                           navigator.msSaveBlob(blob, filename);     } else { // For other browsers:
                        
                    var objectUrl = URL.createObjectURL(blob);    
                    var a = document.createElement('a');    
                    document.body.appendChild(a);     // var filename =
                    // data.headers('Content-Disposition').split(';')[1].trim().substr('filename='.length); 
                    //       
                        
                    console.log("filename:" + filename);    
                    a.setAttribute('style', 'display:none');    
                    a.setAttribute('href', objectUrl);    
                    a.setAttribute('download', filename);    
                    a.click();    
                    URL.revokeObjectURL(objectUrl);  
                }  
            });
        };

    }
})();