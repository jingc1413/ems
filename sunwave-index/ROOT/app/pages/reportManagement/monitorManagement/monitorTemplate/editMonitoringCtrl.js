(function() {
    'use strict';
    angular.module('SunWave.pages.reportManagement.CPEmonitorManagement.monitorTemplate', [])
        .controller('editMonitoringCtrl', editMonitoringCtrl);

    function editMonitoringCtrl($scope, $log, $uibModal, monitorTemplateService, $state, $stateParams) {
        $scope.nameEdit = false;
        $scope.groupIds = [];
        $scope.checkgroup = 1;
        $scope.task = {};
        $scope.isView = true;

        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 15,
            userName: "",
            mobile: ""
        };
        $scope.groups = [];
        $scope.AllgroupId = [];

        var searchDetails = function(id) {
            monitorTemplateService.getMonitoringDetails(id)
                .success(function(response) {
                    $scope.task = response;
                    $scope.taskItems = $scope.task.items;
                    $scope.taskGroup = $scope.task.items;
                    // $scope.title = $scope.task.name;
                    // for (let index = 0; index < $scope.task.group.length; index++) {
                    //     $scope.groupIds.push($scope.task.group[index]);
                    // };
                    $scope.groupIds = $scope.task.group;
                    searchGroup();
                    getMonitoringTypes()
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        $scope.monitoringTypes = [];
        var getMonitoringTypes = function() {
            monitorTemplateService.getMonitoringTypes()
                .success(function(res) {
                    if ($scope.taskItemId != null) {
                        var items = [];
                        for (let index = 0; index < res.length; index++) {
                            const element = res[index].id;
                            if (element == $scope.task.monitoringTypeId) {
                                items.push(res[index]);
                                $scope.title = res[index].typeName;
                            };
                        };
                        $scope.monitoringTypes = items;

                        // $scope.$apply(function() {
                        //     $scope.monitoringTypes = items;
                        // });
                    } else {
                        $scope.monitoringTypes = res;
                        $scope.title = $scope.monitoringTypes[0].typeName;

                    };
                    $scope.source($scope.monitoringTypes[0]);
                })

        };

        var searchGroup = function() {
            monitorTemplateService.searchGroup($scope.groupIds)
                .success(function(response) {
                    $scope.groups = response.data;
                })
                .error(function(err) {
                    console.info(err);
                });
        };

        var init = function() {
            $scope.taskItemId = $stateParams.taskId;
            $scope.isAdd = $stateParams.isAdd;
            if ($scope.taskItemId != null) {
                //console.log($scope.taskItemId);
                searchDetails($scope.taskItemId);
            } else {
                getMonitoringTypes();
            };

            if ($scope.isAdd == "view") {
                $scope.isView = true;
                $scope.nameEdit = true;
            } else if ($scope.isAdd == "edit") {
                $scope.isView = false;
                $scope.nameEdit = true;
            } else {
                $scope.isView = false;
                $scope.nameEdit = false;
            };

        };
        init();

        // $scope.receivedName = $stateParams.args.NAME;

        // $scope.receivedNumber = $stateParams.args.NUMBER;
        $scope.modal = {
            name: "",
            id: "",
            description: "",
            level: "",
            exection: "",
            domain: "",
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

        $scope.reset = function() {
            $scope.query.userName = '';
            $scope.query.mobile = '';
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

        $scope.source = function(item) {
            $scope.title = item.typeName;
            if ($scope.taskItemId != null) {
                for (let index = 0; index < $scope.task.items.length; index++) {
                    const element = $scope.task.items[index];
                    if (element.infoExecutionCondition == null) {
                        $scope.task.items[index].infoExecutionCondition = "not used";
                    };
                    if (element.warnExecutionCondition == null) {
                        $scope.task.items[index].warnExecutionCondition = "not used";
                    };
                    if (element.errorExecutionCondition == null) {
                        $scope.task.items[index].errorExecutionCondition = "not used";
                    };
                };

            } else {
                $scope.task.monitoringTypeId = item.id;
                monitorTemplateService.getMonitoringItems(item.id)
                    .success(function(res) {
                        for (let i = 0; i < res.length; i++) {
                            res[i].infoExecutionCondition = "not used";
                            res[i].infoThreshhold = undefined;
                            res[i].warnExecutionCondition = "not used";
                            res[i].warnThreshhold = undefined;
                            res[i].errorExecutionCondition = "not used";
                            res[i].errorThreshhold = undefined;
                        }
                        $scope.task.items = res;
                    })
            }

        };

        $scope.selectGroup = function() {
            var title = "Choose Group"
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/addToGroup.html',
                controller: 'addToGroupCtrl',
                size: 'md',
                resolve: {
                    items: function() {
                        return null;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    title: function() {
                        return title;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/addToGroupCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                            ]);
                        }
                    ]
                }
            });

            //点击保存后执行
            // $scope.items = [];
            modalInstance.result.then(function(newItems) {
                if ($scope.taskItemId != null) {
                    //console.log($scope.groups);
                    var items = newItems.groupItems;
                    // $scope.AllgroupId = newItems.AllgroupId;
                    for (let index = 0; index < $scope.groups.length; index++) {
                        for (let index1 = 0; index1 < items.length; index1++) {
                            if ($scope.groups[index].id == items[index1].id) {
                                items.splice(index1, 1);
                                break;
                            };

                        }

                    };
                    //console.log(items);
                    for (let index = 0; index < items.length; index++) {
                        $scope.groups.push(items[index])

                    };
                } else {
                    $scope.groups = newItems.groupItems;
                    // $scope.AllgroupId = newItems.AllgroupId;
                };
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.searchAllGroup = function() {
            monitorTemplateService.searchAllGroup()
                .success(function(response) {
                    angular.forEach(response.data, function(i) {
                        $scope.AllgroupId.push(i.id);
                    });

                })
                .error(function(err) {
                    console.info(err);
                });
        };
        $scope.searchAllGroup();

        $scope.save = function() {
            var checkgroupId = [];
            // var truthBeTold = window.confirm("Are you sure  ?");
            swal({
                title: "Waring",
                text: "Are you sure  ?",
                icon: "warning",
                buttons: {
                    cancel: true,
                    confirm: true,
                },
            }).then(function(isOk) {
                if (isOk) {
                    if ($scope.checkgroup == 1) {
                        angular.forEach($scope.groups, function(i) {
                            checkgroupId.push(i.id);
                        });
                        $scope.task.group = checkgroupId;
                        if ($scope.taskItemId != null) {
                            monitorTemplateService.modifyMonitoringTask($scope.task)
                                .success(function(response) {
                                    if (response.code == 200) {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "success",
                                            timer: 4000,
                                        });
                                        $state.go("CPEmonitorManagement.monitorTemplate");
                                    } else {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "error",
                                            timer: 4000,
                                        });
                                    };

                                })
                                .error(function(err) {
                                    console.info(err);
                                });
                        } else {
                            monitorTemplateService.addMonitoringTask($scope.task)
                                .success(function(response) {
                                    if (response.code == 200) {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "success",
                                            timer: 4000,
                                        });
                                        $state.go("CPEmonitorManagement.monitorTemplate");
                                    } else {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "error",
                                            timer: 4000,
                                        });
                                    };

                                })
                                .error(function(err) {
                                    console.info(err);
                                });
                        };
                    } else {
                        // checkgroupId = $scope.AllgroupId;
                        $scope.task.group = $scope.AllgroupId;
                        if ($scope.taskItemId != null) {
                            monitorTemplateService.modifyMonitoringTask($scope.task)
                                .success(function(response) {
                                    if (response.code == 200) {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "success",
                                            timer: 4000,
                                        });
                                        $state.go("CPEmonitorManagement.monitorTemplate");
                                    } else {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "error",
                                            timer: 4000,
                                        });
                                    };
                                })
                                .error(function(err) {
                                    console.info(err);
                                });
                        } else {
                            monitorTemplateService.addMonitoringTask($scope.task)
                                .success(function(response) {
                                    if (response.code == 200) {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "success",
                                            timer: 4000,
                                        });
                                        $state.go("CPEmonitorManagement.monitorTemplate");
                                    } else {
                                        // alert(response.msg);
                                        swal({
                                            title: "Tips:",
                                            text: response.msg,
                                            icon: "error",
                                            timer: 4000,
                                        });
                                    };
                                })
                                .error(function(err) {
                                    console.info(err);
                                });
                        };

                    };
                }
            })
        };

        //
        $scope.deleteItem = function(item) {
            for (let index = 0; index < $scope.groups.length; index++) {
                if (item.id == $scope.groups[index].id) {
                    $scope.groups.splice(index, 1);
                }


            }

        }

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
        // $scope.$watch(
        //     'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);



    };
})();