angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('addToGroupCtrl', addToGroupCtrl);

function addToGroupCtrl($rootScope, $translate, $scope, AuthorizedService, $uibModalInstance, $uibModal, items, $log, title) {
    $scope.deviceItems = items;
    $scope.isAdd = true;
    $scope.add = function() {
        if ($scope.isAdd == true) {
            $scope.isAdd = false;
        } else {
            $scope.isAdd = true;
        }
    };

    $scope.isSave = true;
    $scope.isShow = true;
    $scope.title = title
    if ($scope.title == 'view') {
        $scope.isShow = false;
    } else {
        $scope.isShow = true;
    };

    // $scope.close = function(item) {
    //     $uibModalInstance.close(item);
    // };

    $scope.xx = {
        select_all: ""
    }

    $scope.param = {
        groupName: "",
        description: ""
    }

    $scope.checkGroupItem = {
        "AllgroupId": [],
        "groupItems": []
    }
    $scope.AllgroupId = [];

    $scope.items = [];

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 15,
        name: "",
        keyword: "",
        groupName: ""
    };
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };
    $scope.m = [];
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    var searchForm = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        AuthorizedService.searchGroups($scope.query)
            .success(function(response) {
                $scope.items = response.content;
                $scope.paginationConf.totalItems = response.totalElements;
                angular.forEach($scope.items, function(i) {
                    $scope.AllgroupId.push(i.id);
                });


            })
            .error(function(err) {
                console.info(err);
            });

    };

    $scope.search = function() {
        searchForm();
    };

    //全选
    $scope.selectAll = function() {
        if ($scope.xx.select_all) {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.items, function(i) {
                i.checked = true;
                $scope.checked.push(i.id);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.items, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        if ($scope.checked.length > 0) {
            $scope.isSave = false;
        } else {
            $scope.isSave = true;
        };
    };
    //单选
    $scope.selectOne = function() {
        angular.forEach($scope.items, function(i) {
            var index = $scope.checked.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.checked.push(i.id);
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
        };
        if ($scope.checked.length > 0) {
            $scope.isSave = false;
        } else {
            $scope.isSave = true;
        };
        //console.log($scope.checkedItems);
    };

    $scope.addGroup = function() {
        AuthorizedService.addGroups($scope.param)
            .success(function(response) {
                if (response.code == 200) {
                    // alert($translate.instant('deviceManagement.CPEdevice.Group.alert_AddGroup_Success'))
                    // alert("Success !")
                    swal({
                        title: "Tips:",
                        text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Group.alert_AddGroup_Success'),
                        icon: "success",
                        timer: 4000,
                    });
                    $scope.isAdd = true;
                    $scope.param = {
                        groupName: "",
                        description: ""
                    }
                    searchForm();
                } else if (response.code == 100) {
                    // alert($translate.instant('deviceManagement.CPEdevice.Group.alert_AddGroup_Fail'))
                    // alert(response.msg);
                    swal({
                        title: "Tips:",
                        text: $translate.instant('CPEdeviceManagement.CPEdevice.Group.alert_AddGroup_Fail'),
                        icon: "error",
                        timer: 4000,
                    });
                    $scope.isAdd = false;
                } else {
                    // alert(response.msg);
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
        if ($scope.checked.length > 0) {
            $scope.isSave = false;
        } else {
            $scope.isSave = true;
        };
    };

    $scope.deleteItem = function(item) {
        // var truthBeTold = window.confirm($translate.instant('deviceManagement.CPEdevice.Group.alert_DeleteGroup_Confirm'));
        swal({
            title: "Waring",
            text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Group.alert_DeleteGroup_Confirm'),
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then(function(isOk) {
            if (isOk) {
                AuthorizedService.deleteItem(item)
                    .success(function(res) {
                        if (res.code == 200) {
                            // alert($translate.instant('deviceManagement.CPEdevice.Group.alert_DeleteGroup_Success'));
                            swal({
                                title: "Tips:",
                                text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Group.alert_DeleteGroup_Success'),
                                icon: "success",
                                timer: 4000,
                            });
                            searchForm();
                        } else {
                            // alert(res.msg);
                            // alert($translate.instant('deviceManagement.CPEdevice.Group.alert_DeleteGroup_Fail'));
                            swal({
                                title: "Tips:",
                                text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Group.alert_DeleteGroup_Fail'),
                                icon: "error",
                                timer: 4000,
                            });
                        };
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            }
        })
        if ($scope.checked.length > 0) {
            $scope.isSave = false;
        } else {
            $scope.isSave = true;
        };

    };

    $scope.editGroup = function(item) {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/editGroup.html',
            controller: 'editGroupCtrl',
            size: 'md',
            resolve: {
                item: function() {
                    return item;
                },
                AuthorizedService: function() {
                    return AuthorizedService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/editGroupCtrl.js']);
                    }
                ]
            }
        });
        modalInstance.result.then(function(newItems) {
            searchForm();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.save = function() {
        $scope.checkGroupItem.AllgroupId = $scope.AllgroupId;
        $scope.checkGroupItem.groupItems = $scope.checkedItems;
        //console.log($scope.checkGroupItem);
        if ($scope.deviceItems != null && $scope.checkedItems.length > 0) {
            if ($scope.deviceItems.length > 0) {
                AuthorizedService.equipmentGrouping($scope.checked, $scope.deviceItems)
                    .success(function(response) {
                        //console.log(response);
                        $scope.isAdd = true;
                        $scope.param = {
                            groupName: "",
                            description: ""
                        };
                        // alert("Success !");
                        swal({
                            title: "Tips:",
                            text: "Success",
                            icon: "success",
                            timer: 4000,
                        });
                        $uibModalInstance.close();
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            }
        } else {
            $uibModalInstance.close($scope.checkGroupItem);
        }
    }

    $scope.close = function() {
        if ($scope.title == "view") {
            $uibModalInstance.close();
        } else {
            $scope.checkGroupItem.AllgroupId = $scope.AllgroupId;
            $scope.checkGroupItem.groupItems = $scope.checkedItems;
            if ($scope.checkedItems.length == 0 && $scope.param.groupName.length == 0 && $scope.param.description.length == 0) {
                $uibModalInstance.close($scope.checkGroupItem);
            } else {
                // var truthBeTold = window.confirm($translate.instant('deviceManagement.CPEdevice.Group.alert_Close_Confirm'));
                swal({
                    title: "Waring",
                    text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Group.alert_Close_Confirm'),
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        $uibModalInstance.close($scope.checkGroupItem);
                    }
                })
            };

        };
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    /***************************************************************
    当页码和页面记录数发生变化时监控后台查询
    如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
    ***************************************************************/
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


}