(function() {
    'use strict';

    angular.module('SunWave.pages.groupManagement.deviceModel', [])
        .controller('deviceModelCtrl', deviceModelCtrl);

    function deviceModelCtrl($scope, $log, groupManagementService, $uibModal, $state) {
        $scope.isAdvance = "Advance";
        $scope.items = null;

        // $scope.search = {
        //     searchValue: "",
        //     searchValue1: "",
        // }

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 3,
            pagesLength: 3,
            perPageOptions: [1, 3] //[15, 20, 30, 50, 100, 200]

        };

        $scope.isLoading = false;
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
            pageSize: 6,
            name: "",
            keyword: "",
            searchValue: null,
            searchValue1: null
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            //console.log($scope.query);
            groupManagementService.searchDevice($scope.query)
                .success(function(response) {
                    //console.log("22222222222" + response.content);
                    $scope.paginationConf.totalItems = response.totalElements;
                    //console.log("33" + $scope.paginationConf.totalItems)
                    $scope.items = response.content;
                    //console.log($scope.items + "111");
                })
                .error(function(err) {
                    console.info(err);
                });

        };

        //重置查询条件
        $scope.reset = function() {
            $scope.search.searchValue = "";
            $scope.search.searchValue1 = "";
            $scope.search.searchValue2 = "";

        };

        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
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

        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "add";
            $scope.openEditDialog();
        };
        //单选
        $scope.selectOne = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
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
                templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/addDevice.html',
                controller: 'addDeviceCtrl',
                size: 'md',
                resolve: {

                    AlarmForward: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/addDeviceCtrl.js']);
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
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //查看/修改组
        $scope.addToGroup = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/addToGroup.html',
                controller: 'addToGroupCtrl',
                size: 'md',
                resolve: {

                    groupManagementService: function() {
                        return groupManagementService;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/addToGroupCtrl.js']);
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
                // $scope.search();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //变更device's domain
        $scope.changeDomain = function() {
            if ($scope.checkedItems.length > 1) {
                alert("Only one item can be selected !");
            } else if ($scope.checkedItems.length == 0) {
                alert("Please selected one !");
            } else {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/domainModal.html',
                    controller: 'domainModalCtrl',
                    size: 'md',
                    resolve: {
                        items: function() {
                            return $scope.checkedItems[0].manufacturer;
                        },

                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/domainModalCtrl.js']);
                            }
                        ]
                    }
                });
                modalInstance.result.then(function(newItems) {
                    //console.log(newItems);
                    $scope.checkedItems[0].manufacturer = newItems;
                    // // $scope.items.push(newItems);
                }, function(newItems) {
                    //console.log(newItems);
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }

        }

        $scope.advanceExportCSV = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/advanceExportCSV.html',
                controller: 'advanceExportCSVCtrl',
                size: 'md',
                resolve: {

                    AlarmForward: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/advanceExportCSVCtrl.js']);
                        }
                    ]
                }
            });
        }

        $scope.deviceCount = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/deviceCount.html',
                controller: 'deviceCountCtrl',
                size: 'lg',
                resolve: {

                    AlarmForward: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/deviceCountCtrl.js']);
                        }
                    ]
                }
            });
        }

        //重启设备
        $scope.reboot = function() {
            if ($scope.checkedItems.length == 0) {
                alert("Please select one !")
            } else if ($scope.checkedItems.length > 1) {

            } else {
                alert("Are you sure reboot " + $scope.checkedItems[0].identify + " device ?")
                    //console.log($scope.checkedItems[0].neNeid);
                var e = $scope.checkedItems[0].neNeid
                groupManagementService.reboot(e)
                    .success(function(response) {
                        if (response == 200) {
                            alert("Success");
                        }
                    })
                    .error(function(err) {
                        console.info(err);
                    });

            }

        }

        //恢复出厂设置
        $scope.recovery = function() {
            if ($scope.checkedItems.length == 0) {
                alert("Please select one !")
            } else if ($scope.checkedItems.length > 1) {
                alert("Are you sure Restore factory settings those device ?")
            } else {
                alert("Are you sure Restore factory settings this device ?")
                var e = $scope.checkedItems[0].neNeid
                groupManagementService.recovery(e)
                    .success(function(response) {
                        if (response == 200) {
                            alert("Success");
                        }

                        // //console.log("22222222222" + response);
                        // $scope.paginationConf.totalItems = 200;
                        // $scope.items = response;
                        // //console.log($scope.items)
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            }

        }

        $scope.toAdvanceSearch = function() {
            if ($scope.isAdvance == "Advance") {
                $scope.isAdvance = "Basic"
            } else {
                $scope.isAdvance = "Advance"
            }
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/advanceSearch.html',
                controller: 'advanceSearchCtrl',
                size: 'md',
                resolve: {

                    AlarmForward: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/advanceSearchCtrl.js']);
                        }
                    ]
                }
            });
        }

        //查看设备详情
        $scope.toSummary = function(sum) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/toSummary.html',
                controller: 'toSummaryCtrl',
                size: 'md',
                resolve: {
                    Summary: function() {
                        return sum;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    groupManagementService: function() {
                        return groupManagementService;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/toSummaryCtrl.js']);
                        }
                    ]
                }
            });
        }

        $scope.toDetails = function() {

            //console.log("toDetails")
            $state.go('CPEdeviceManagement.CPEdeviceDetails', {
                args: {

                    NAME: "CPEdeviceManagement.CPEdeviceDetails",

                    NUMBER: "number"

                }
            });
            //console.log("toDetails Success !")
        }

        //查看数据模型树
        $scope.toSearchTree = function(element) {
            //console.log(element);
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/modalTree.html',
                controller: 'modalTreeCtrl',
                size: 'lg',
                resolve: {
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    groupManagementService: function() {
                        return groupManagementService;
                    },
                    element: function() {
                        return element;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/modalTreeCtrl.js']);
                        }
                    ]
                }
            });
        }

        //上传升级文件
        $scope.toUpgrade = function() {
            // if ($scope.checkedItems.length == 0) {
            //     alert("Please select one !")
            // } else if ($scope.checkedItems.length > 1) {} else {
            //     alert("Are you sure reboot this device ?")
            //     //console.log($scope.checkedItems[0].neNeid);
            //     var e = $scope.checkedItems[0].neNeid
            // groupManagementService.reboot(e)
            // .success(function (response) {
            //     //console.log("22222222222" + response);
            //     // $scope.paginationConf.totalItems = 200;
            //     // $scope.items = response;
            //     // //console.log($scope.items)
            // })
            // .error(function (err) {
            //     console.info(err);
            // });
            if ($scope.checkedItems.length == 1) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/CPEdeviceManagement/deviceModel/uploadFile.html',
                    controller: 'uploadFileCtrl',
                    size: 'md',
                    resolve: {
                        neId: function() {
                            return $scope.checkedItems[0].neNeid;
                        },
                        groupManagementService: function() {
                            return groupManagementService;
                        },
                        element: function() {
                            return $scope.checked;
                        },
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/pages/CPEdeviceManagement/deviceModel/uploadFileCtrl.js']);
                            }
                        ]
                    }
                });
            } else {
                alert("Please selete one !")
            }


            // }
        }

        //模糊查询
        $scope.searchBy = function() {
            //console.log($scope.search);
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            groupManagementService.searchDevice($scope.query)
                .success(function(response) {
                    //console.log("22222222222" + response.content);
                    $scope.paginationConf.totalItems = response.totalElements;
                    //console.log("33" + $scope.paginationConf.totalItems)
                    $scope.items = response.content;
                    //console.log($scope.items + "111");
                })
                .error(function(err) {
                    console.info(err);
                });

        }

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

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);



    };


    //文本超出过滤器
    // angular.module('SunWave.pages.AlarmConfiguration.AlarmForward')
    //     .filter('cut', function() {
    //         return function(value, wordwise, max, tail) {
    //             if (!value) return '';

    //             max = parseInt(max, 10);
    //             if (!max) return value;
    //             if (value.length <= max) return value;

    //             value = value.substr(0, max);
    //             if (wordwise) {
    //                 var lastspace = value.lastIndexOf(' ');
    //                 if (lastspace != -1) {
    //                     value = value.substr(0, lastspace);
    //                 }
    //             }

    //             return value + (tail || ' …');
    //         };
    //     });
})();