(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
        .controller('deviceDetailsCtrl', deviceDetailsCtrl);

    function deviceDetailsCtrl($scope, $log, $state, deviceDetailsService, $uibModal, $stateParams, $rootScope) {
        //console.log("deviceDetailsCtrl");
        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 15,
            userName: "",
            mobile: ""
        };
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };




        // $scope.over = false;
        $scope.info = {};
        $scope.overview = function() {
            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.overview", { 'Id': $scope.info.neNeid });
            // $scope.over = false;
            // searchForm();
        };

        $scope.reloadOverview = function() {
            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.overview", { 'Id': $scope.info.neNeid });
            //$state.go("CPEdeviceManagement.CPEdeviceDetails")
            // $scope.over = false;
            // searchForm();
        };
        var init = function() {
            if ($stateParams.args.NAME != null) {
                $scope.info = $stateParams.args.NAME;
                if (window.localStorage) {
                    var storage = window.localStorage;
                    storage.setItem("deviceId", $scope.info.neNeid);

                };
                // $scope.reloadOverview();
            } else {
                if (window.localStorage) {
                    var storage = window.localStorage;
                    $scope.info.neNeid = storage.getItem("deviceId");
                    deviceDetailsService.searchDeviceDetails($scope.info.neNeid)
                        .success(function(response) {
                            $scope.info = response.data;
                            // //console.log($scope.items.ip)
                        })
                        .error(function(err) {
                            console.info(err);
                        });

                };
                // $scope.reloadOverview();
            };
            $scope.overview();
        };
        init();

        $scope.child = false;
        $scope.toshow = function() {
            if ($scope.child == false) {
                $scope.child = true
            } else {
                $scope.child = false
            }
        };
        $scope.checkbox = {
            select_all: ""
        }

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 15,
            name: "",
            keyword: ""
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组



        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.useUserid);
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

        $scope.reset = function() {
            $scope.query.userName = '';
            $scope.query.mobile = '';

        };


        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "add";
            $scope.openEditDialog();
        };
        //单选
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {

                var index = $scope.checked.indexOf(i.useUserid);

                if (i.checked && index == -1) {
                    $scope.checked.push(i.useUserid);

                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });
            //console.log($scope.checkedItems);


            if ($scope.items.length == $scope.checked.length) {
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
        };


        //修改modal

        $scope.openEditDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/souceManagement/SouceMana/addDevice.html',
                controller: 'addDeviceCtrl',
                size: 'md',
                resolve: {

                    AlarmForward: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    SouceManagementService: function() {
                        return SouceManagementService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/souceManagement/SouceMana/addDeviceCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行
            // $scope.items = [];
            modalInstance.result.then(function(newItems) {
                $scope.checked = []; //选中的ID
                $scope.checkedItems = []; //选中的对象数组
                $scope.checkbox.select_all = false;

                // alert(newItems);
                // // $scope.items.push(newItems);
                $scope.search();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.addToGroup = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/souceManagement/SouceMana/addToGroup.html',
                controller: 'addToGroupCtrl',
                size: 'md',
                resolve: {

                    AlarmForward: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    SouceManagementService: function() {
                        return SouceManagementService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/souceManagement/SouceMana/addToGroupCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行
            // $scope.items = [];
            modalInstance.result.then(function(newItems) {
                $scope.checked = []; //选中的ID
                $scope.checkedItems = []; //选中的对象数组
                $scope.checkbox.select_all = false;

                // alert(newItems);
                // // $scope.items.push(newItems);
                $scope.search();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        //物理排序

        $scope.show = {
            isConfig: false,
            isTask: false,
            isMonitoring: false,
        };

        $scope.monitoring = function() {

            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.monitor", { 'Id': $scope.info.neNeid });
        };

        $scope.configuration = function() {

            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.config", {
                'Id': $scope.info.neNeid,
                'modelName': $scope.info.modelName
            });
        };

        $scope.maintenance = function() {

            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.mainte", { 'Id': $scope.info.neNeid });
        };

        $scope.dataModel = function() {

            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.dataModel", {
                'Id': $scope.info.neNeid,
                'OnlineStatus': $scope.info.onlineStatus
            });
        };

        $scope.deviceLog = function() {

            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.deviceLog", { 'Id': $scope.info.neNeid });
        };

        // deviceDetailsService.visitingReason($scope.info.neNeid).success(function(res){
        //     //console.log(res)
        // })
        //重启组设备
        $scope.rebootDevice = function() {
            // var truthBeTold = window.confirm("To restart this device ?");
            swal({
                title: "Waring",
                text: "To restart this device ?",
                icon: "warning",
                buttons: {
                    cancel: true,
                    confirm: true,
                },
            }).then(function(isOk) {
                if (isOk) {
                    var rebootList = [];
                    rebootList.push($scope.info.neNeid);
                    deviceDetailsService.reboot(rebootList)
                        .success(function(response) {
                            // alert("Request successful!");
                            if (response == 200) {
                                swal({
                                    title: "Tips:",
                                    text: "Request successful !",
                                    icon: "success",
                                    timer: 4000,
                                });
                            } else {
                                swal({
                                    title: "Tips:",
                                    text: response.msg,
                                    icon: "error",
                                    timer: 4000,
                                });
                            }

                        })
                        .error(function(err) {
                            console.info(err);
                            $scope.noData = true;
                        });
                }
            });
        };

        //恢复出厂设置
        $scope.FactoryReset = function() {
            // var truthBeTold = window.confirm("To recovery this device  ?");
            swal({
                title: "Waring",
                text: "To recovery this device  ?",
                icon: "warning",
                buttons: {
                    cancel: true,
                    confirm: true,
                },
            }).then(function(isOk) {
                if (isOk) {
                    var rebootList = [];
                    rebootList.push($scope.info.neNeid);
                    deviceDetailsService.recovery(rebootList)
                        .success(function(response) {
                            // alert("Success !");
                            if (response == 200) {
                                swal({
                                    title: "Tips:",
                                    text: "Success !",
                                    icon: "success",
                                    timer: 4000,
                                });
                            } else {
                                swal({
                                    title: "Tips:",
                                    text: response.msg,
                                    icon: "error",
                                    timer: 4000,
                                });
                            }
                        })
                        .error(function(err) {
                            console.info(err);
                            $scope.noData = true;
                        });
                }
            })
        };

        //选择文件升级
        $scope.uploadFile = function() {
            $state.go("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.uploadFile", { 'Id': $scope.info.neNeid });
        };

        $rootScope.websocket2.onmessage = function(event) {
            //deviceDetailNameModal里的接收消息
            var e = JSON.parse(event.data);
            $scope.$apply(function() {
                $rootScope.messageItem = $rootScope.messageItem.reverse();
                $rootScope.messageCount = $rootScope.messageCount + 1;
                e.messageTime = new Date();
                $rootScope.messageItem.push(e);
                $rootScope.messageItem = $rootScope.messageItem.reverse();
            });
            if (e.notifyType == "rebooting") {
                $scope.$apply(function() {
                    $scope.info.onlineStatus = 2;
                });
            } else if (e.notifyType == "rebooted") {
                // alert("reboot Success !");
                swal({
                    title: "Tips:",
                    text: "reboot Success  !",
                    icon: "info",
                    timer: 4000,
                });
                $scope.$apply(function() {
                    $scope.info.onlineStatus = 1;
                });

            } else if (e.notifyType == "factoryReset") {
                // alert(e.msg);
                swal({
                    title: "Tips:",
                    text: e.msg,
                    icon: "info",
                    timer: 4000,
                });
            };


        };

    };
})();