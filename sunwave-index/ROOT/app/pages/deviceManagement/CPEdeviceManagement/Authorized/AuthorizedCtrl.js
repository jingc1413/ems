(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
        .controller('AuthorizedCtrl', AuthorizedCtrl);

    function AuthorizedCtrl($scope, $log, AuthorizedService, $uibModal, $state, $stateParams, $rootScope, $translate) {
        $scope.isAdvance = "Advance";
        $scope.items = null;

        $scope.query = { //查询信息
            id: null,
            pageIndex: 0,
            pageSize: 6,
            name: "",
            keyword: "",
            serialNumber: null,
            manufacturer: null,
            onlineStatus: null
        };

        $scope.query1 = { //查询信息
            manufacturer: null,
        };


        $scope.groupId = $stateParams.groupId;
        if ($stateParams.Status == 1) {
            $scope.query.onlineStatus = "1";
        } else if ($stateParams.Status == 0) {
            $scope.query.onlineStatus = "0";
        } else {
            $scope.query.onlineStatus = null;
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [15, 20, 30, 50, 100, 200]

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



        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        var searchManufacturer = function() {
            $scope.ManufacturerItems = ['All'];
            AuthorizedService.searchManufacturer()
                .success(function(response) {
                    // $scope.$apply(function() {
                    var items = [];
                    items = response.data;
                    for (let index = 0; index < items.length; index++) {
                        const element = items[index];
                        $scope.ManufacturerItems.push(element);
                    }
                    // $scope.ManufacturerItems = response.data;
                    $scope.query1.manufacturer = $scope.ManufacturerItems[0];
                    // });
                })
                .error(function(err) {
                    console.info(err);
                });
        }

        //查询
        var searchForm = function() {
            // $scope.query.onlineStatus = $scope.Status;
            //翻页查询时，将勾选对象清空
            $scope.checkbox.select_all = false;
            $scope.checked = [];
            $scope.checkedItems = [];

            $scope.query.id = $scope.groupId;
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            if ($scope.query1.manufacturer == 'All') {
                $scope.query.manufacturer = null;
            } else {
                $scope.query.manufacturer = $scope.query1.manufacturer;
            };
            AuthorizedService.searchDevice($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.totalElements;
                    $scope.items = response.content;
                    searchManufacturer();
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        // searchForm();

        //重置查询条件
        $scope.reset = function() {
            $scope.query.deviceIp = "";
            $scope.query.manufacturer = "";
            $scope.query.onlineStatus = null;
        };

        //全选（取消全选
        $scope.selectAll = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
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
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/addDevice.html',
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
                            return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/addDeviceCtrl.js']);
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
            var title = "Choose Group"
            if ($scope.checked.length >= 1) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/addToGroup.html',
                    controller: 'addToGroupCtrl',
                    size: 'md',
                    resolve: {
                        AuthorizedService: function() {
                            return AuthorizedService;
                        },
                        items: function() {
                            return $scope.checked;
                        },
                        title: function() {
                            return title;
                        },
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/addToGroupCtrl.js']);
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
                    searchForm();
                    // alert(newItems);
                    // // $scope.items.push(newItems);
                    // $scope.search();
                }, function(newItems) {
                    //console.log(newItems);
                    $log.info('Modal dismissed at: ' + new Date());
                });
            } else {
                var stringFromService = $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Group.alert_Select');
                // alert(stringFromService.toString());
                swal({
                    title: "Tips:",
                    text: stringFromService,
                    icon: "info",
                    timer: 4000,
                });
                // alert("Please select one !")
            }

        };

        //将设备移出组
        $scope.removeDeviceFromGroup = function() {
            if ($scope.checkedItems.length > 0) {
                // var truthBeTold = window.confirm("Are you sure ?");
                swal({
                    title: "Waring",
                    text: "Are you sure ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        AuthorizedService.removeDeviceFromGroup($scope.groupId, $scope.checked)
                            .success(function(response) {
                                if (response.code == 200) {
                                    // alert("Success !");
                                    swal({
                                        title: "Tips:",
                                        text: "Success ",
                                        icon: "success",
                                        timer: 4000,
                                    });
                                    searchForm();
                                    $scope.checked = []; //选中的ID
                                    $scope.checkedItems = []; //选中的对象数组
                                    $scope.checkbox.select_all = false;
                                } else {
                                    // alert(response.msg)
                                    swal({
                                        title: "Tips:",
                                        text: response.msg,
                                        icon: "info",
                                        timer: 4000,
                                    });
                                };
                            })
                            .error(function(err) {
                                console.info(err);
                            });
                    }
                })
            } else {
                // alert("Please select one !");
                swal({
                    title: "Tips:",
                    text: "Please select one !",
                    icon: "info",
                    timer: 4000,
                });
            }


        };

        //变更device's domain
        $scope.changeDomain = function() {
            if ($scope.checkedItems.length > 1) {
                // alert("Only one item can be selected !");
                swal({
                    title: "Tips:",
                    text: "Only one item can be selected !",
                    icon: "info",
                    timer: 4000,
                });
            } else if ($scope.checkedItems.length == 0) {
                // alert("Please selected one !");
                swal({
                    title: "Tips:",
                    text: "Please selected one !",
                    icon: "info",
                    timer: 4000,
                });
            } else {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/domainModal.html',
                    controller: 'domainModalCtrl',
                    size: 'md',
                    resolve: {
                        items: function() {
                            return $scope.checkedItems[0].manufacturer;
                        },

                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/domainModalCtrl.js']);
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
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/advanceExportCSV.html',
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
                            return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/advanceExportCSVCtrl.js']);
                        }
                    ]
                }
            });
        }

        $scope.deviceCount = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/deviceCount.html',
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
                            return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/deviceCountCtrl.js']);
                        }
                    ]
                }
            });
        }

        //重启设备
        $scope.reboot = function() {
            var deviceStatus = true;
            if ($scope.checkedItems.length == 0) {
                var stringFromService = $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Reboot.alert_Select');
                // alert(stringFromService.toString());
                swal({
                    title: "Tips:",
                    text: stringFromService,
                    icon: "info",
                    timer: 4000,
                });
                // alert("Please select one !")
            } else {
                // var alert_Confirm = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_Confirm');
                // var truthBeTold = window.confirm(alert_Confirm);
                swal({
                    title: "Waring",
                    text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Reboot.alert_Confirm'),
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        for (let index = 0; index < $scope.checkedItems.length; index++) {
                            var element = $scope.checkedItems[index].onlineStatus;
                            if (element == null) {
                                element = 0;
                            };
                            if (element == 0) {
                                deviceStatus = false;
                                if ($scope.checkedItems.length == 1) {
                                    // var alert_OffLine = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_OffLine');
                                    swal({
                                        title: "Tips:",
                                        text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Reboot.alert_OffLine'),
                                        icon: "info",
                                        timer: 4000,
                                    });
                                    // alert(alert_OffLine);
                                    // alert("This Device is OffLine, can not reboot !");
                                } else {
                                    // var alert_OffLines = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_OffLines');
                                    // alert(alert_OffLines);
                                    swal({
                                        title: "Tips:",
                                        text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Reboot.alert_OffLines'),
                                        icon: "info",
                                        timer: 4000,
                                    });
                                    // alert("A device is offline, please select again !");
                                };

                                break;
                            } else if (element == 2) {
                                deviceStatus = false;
                                if ($scope.checkedItems.length == 1) {
                                    // var alert_Reboot = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_Reboot');
                                    // alert(alert_Reboot);
                                    swal({
                                        title: "Tips:",
                                        text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Reboot.alert_Reboot'),
                                        icon: "info",
                                        timer: 4000,
                                    });
                                    // alert("This Device is rebooting, can not reboot !");
                                } else {
                                    // var alert_Reboots = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_Reboots');
                                    // alert(alert_Reboots);
                                    swal({
                                        title: "Tips:",
                                        text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Reboot.alert_Reboots'),
                                        icon: "info",
                                        timer: 4000,
                                    });
                                    // alert("A device is rebooting, please select again !");
                                };
                                break;
                            };

                        };
                        if (deviceStatus) {
                            //console.log($scope.checked);
                            var e = $scope.checked
                            AuthorizedService.reboot(e)
                                .success(function(response) {
                                    if (response == 200) {
                                        // var alert_Request_Success = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_Request_Success');
                                        // alert(alert_Request_Success);
                                        // alert("Request successful");
                                        swal({
                                            title: "Tips:",
                                            text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Reboot.alert_Request_Success'),
                                            icon: "success",
                                            timer: 4000,
                                        });

                                    }
                                })
                                .error(function(err) {
                                    console.info(err);
                                });
                        };
                    }
                })

            };

        };

        //恢复出厂设置
        $scope.recovery = function() {
            var deviceStatus = true;
            if ($scope.checkedItems.length == 0) {
                // alert("Please select one !");
                swal({
                    title: "Tips:",
                    text: "Please select one !",
                    icon: "info",
                    timer: 4000,
                });
            } else if ($scope.checkedItems.length > 1) {
                // var truthBeTold = window.confirm("Are you sure Restore factory settings those device ?");
                swal({
                    title: "Waring",
                    text: "Are you sure Restore factory settings those device ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        for (let index = 0; index < $scope.checkedItems.length; index++) {
                            const element = $scope.checkedItems[index].onlineStatus;
                            if (element == null) {
                                element = 0;
                            };
                            if (element == 0) {
                                deviceStatus = false;
                                // alert("A device is offline, please select again !");
                                swal({
                                    title: "Tips:",
                                    text: "A device is offline, please select again !",
                                    icon: "info",
                                    timer: 4000,
                                });
                                $scope.checked = []; //选中的ID
                                $scope.checkedItems = []; //选中的对象数组
                                break;
                            } else if (element == 2) {
                                deviceStatus = false;
                                // alert("A device is rebooting, please select again !");
                                swal({
                                    title: "Tips:",
                                    text: "A device is rebooting, please select again !",
                                    icon: "info",
                                    timer: 4000,
                                });
                                $scope.checked = []; //选中的ID
                                $scope.checkedItems = []; //选中的对象数组
                                break;
                            };

                        };
                        if (deviceStatus) {
                            AuthorizedService.recovery($scope.checked)
                                .success(function(response) {
                                    if (response == 200) {
                                        // alert("Loding");
                                        swal({
                                            title: "Tips:",
                                            text: "Restoring factory settings",
                                            icon: "success",
                                            timer: 4000,
                                        });
                                        searchForm();
                                    };
                                })
                                .error(function(err) {
                                    console.info(err);
                                });
                        };
                    }
                });
            } else {
                // var truthBeTold = window.confirm("Are you sure Restore factory settings this device ?");
                swal({
                    title: "Waring",
                    text: "Are you sure Restore factory settings this device ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        if ($scope.checkedItems[0].onlineStatus == 1) {
                            var e = $scope.checkedItems[0].neNeid;
                            var es = [];
                            es.push(e);
                            AuthorizedService.recovery(es)
                                .success(function(response) {
                                    if (response == 200) {
                                        // alert("Loding");
                                        swal({
                                            title: "Tips:",
                                            text: "Restoring factory settings",
                                            icon: "success",
                                            timer: 4000,
                                        });
                                        searchForm();
                                    };
                                })
                                .error(function(err) {
                                    console.info(err);
                                });
                        } else if ($scope.checkedItems[0].onlineStatus == 0 || $scope.checkedItems[0].onlineStatus == null) {
                            // alert("This Device is OffLine, can not restore factory settings !");
                            swal({
                                title: "Tips:",
                                text: "This Device is OffLine, can not restore factory settings !",
                                icon: "info",
                                timer: 4000,
                            });
                        } else if ($scope.checkedItems[0].onlineStatus == 2) {
                            // alert("This Device is rebooting, can not restore factory settings !");
                            swal({
                                title: "Tips:",
                                text: "This Device is rebooting, can not restore factory settings !",
                                icon: "info",
                                timer: 4000,
                            });
                        };
                    };
                })

            };

        };

        $scope.toAdvanceSearch = function() {
            if ($scope.isAdvance == "Advance") {
                $scope.isAdvance = "Basic"
            } else {
                $scope.isAdvance = "Advance"
            }
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/advanceSearch.html',
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
                            return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/advanceSearchCtrl.js']);
                        }
                    ]
                }
            });
        };

        //查看设备详情
        $scope.toSummary = function(sum) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/toSummary.html',
                controller: 'toSummaryCtrl',
                size: 'md',
                resolve: {
                    Summary: function() {
                        return sum;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    AuthorizedService: function() {
                        return AuthorizedService;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/toSummaryCtrl.js']);
                        }
                    ]
                }
            });
            modalInstance.result.then(function(newItems) {
                // $scope.checked = []; //选中的ID
                // $scope.checkedItems = []; //选中的对象数组
                // $scope.checkbox.select_all = false;
                searchForm();
                // alert(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //查看数据模型树
        $scope.toSearchTree = function(element) {
            //console.log(element);
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/modalTree.html',
                controller: 'modalTreeCtrl',
                size: 'md',
                resolve: {
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    AuthorizedService: function() {
                        return AuthorizedService;
                    },
                    element: function() {
                        return element;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/modalTreeCtrl.js']);
                        }
                    ]
                }
            });
        };

        //选择升级文件
        $scope.toUpgrade = function() {
            var cont = true;
            if ($scope.checkedItems.length >= 1) {
                var defaultfileName = $scope.checkedItems[0].manufacturer
                angular.forEach($scope.checkedItems, function(i) {
                    if (defaultfileName != i.manufacturer) {
                        // var alert_Manufacturers = $translate.instant('CPEdeviceManagement.CPEdevice.Upgrade.alert_Manufacturers');
                        // alert(alert_Manufacturers);
                        // alert("Manufacturers are not unique!");
                        swal({
                            title: "Tips:",
                            text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Upgrade.alert_Manufacturers'),
                            icon: "info",
                            timer: 4000,
                        });
                        cont = false;
                    }
                });
            } else {
                // var alert_Select = $translate.instant('CPEdeviceManagement.CPEdevice.Upgrade.alert_Select');
                // alert(alert_Select);
                // alert("Please select one !");
                swal({
                    title: "Tips:",
                    text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Upgrade.alert_Select'),
                    icon: "info",
                    timer: 4000,
                });
                cont = false;
            };
            if (cont) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/uploadFile.html',
                    controller: 'uploadFileCtrl',
                    size: 'md',
                    resolve: {
                        item: function() {
                            return $scope.checkedItems[0].manufacturer;
                        },
                        itemsId: function() {
                            return $scope.checked;
                        },
                        AuthorizedService: function() {
                            return AuthorizedService;
                        },
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/uploadFileCtrl.js']);
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
                    searchForm();
                }, function(newItems) {
                    //console.log(newItems);
                    $log.info('Modal dismissed at: ' + new Date());
                });
            } else {

            }

            // } else {
            //     alert("Please selete one !")
            // }


            // }
        };

        //模糊查询
        $scope.searchBy = function() {
            searchForm();
            $scope.clearAll();
        };

        //设备详情
        $scope.toDetails = function(item) {
            $state.go('deviceManagement.CPEdeviceManagement.CPEdeviceDetails', {
                args: {
                    NAME: item,
                },
            });
        };

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

        $rootScope.websocket2.onmessage = function(event) {
            var e = JSON.parse(event.data);
            $scope.$apply(function() {
                $rootScope.messageItem = $rootScope.messageItem.reverse();
                $rootScope.messageCount = $rootScope.messageCount + 1;
                e.messageTime = new Date();
                $rootScope.messageItem.push(e);
                $rootScope.messageItem = $rootScope.messageItem.reverse();
            });
            //console.log(e);
            if (e.notifyType == "rebooting") {
                // var alert_Rebooting = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_Rebooting');
                // alert(alert_Rebooting);
                // alert(e.msg);
                for (let index = 0; index < $scope.items.length; index++) {
                    const element = $scope.items[index];
                    if (e.device == element.serialNumber) {
                        $scope.$apply(function() {
                            $scope.items[index].onlineStatus = 2;
                        });
                    };
                };
            } else if (e.notifyType == "rebooted") {
                // var alert_Rebooted = $translate.instant('CPEdeviceManagement.CPEdevice.Reboot.alert_Rebooted');
                // alert(alert_Rebooted);
                // alert(e.msg);
                for (let index = 0; index < $scope.items.length; index++) {
                    const element = $scope.items[index];
                    if (e.device == element.serialNumber) {
                        $scope.$apply(function() {
                            $scope.items[index].onlineStatus = 1;
                        });
                    }
                };

            }
            // else if (e.notifyType == "factoryReset") {
            //     alert(e.msg);
            // };


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