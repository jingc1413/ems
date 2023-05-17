angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagement')
    .controller('groupManagementCtrl', groupManagementCtrl);

function groupManagementCtrl($rootScope, $state, $scope, $filter, $uibModal, $log, groupManagementService) {
    //console.log("groupManagementCtrl")
    // $scope.isGroup = false;
    $scope.noData = true;
    $scope.contentShow = false;
    $scope.showInfo = {

    }
    $scope.treeName = "";
    $scope.treeQuery = {
        elementName: "",
        treeId: "",
        neId: ""
    };
    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 5,
        name: "",
        keyword: "",
        groupName: ""
    };
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 5,
        pagesLength: 5,
        perPageOptions: [5, 10, 15, 20, 30, 50, 100, 200]

    };

    $scope.items = []
    $scope.defalutGroupItem = null;
    var searchGroup = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        groupManagementService.searchGroup($scope.query)
            .success(function(response) {
                $scope.items = response.content
                if ($scope.items.length > 0) {
                    $scope.paginationConf.totalItems = response.totalElements;
                    $scope.showInfo.id = $scope.items[0].id;
                    $scope.showInfo.groupName = $scope.items[0].groupName;
                    $scope.device();
                } else {

                };
                if ($scope.items.length == 0) {
                    $scope.noData = true;
                } else {
                    $scope.noData = false;
                };
            })
            .error(function(err) {
                console.info(err);
                $scope.noData = true;
            });
    };

    $scope.modalValue = function(e) {
        //console.log(e);
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/souceManagement/SouceMana/modalValue.html',
            controller: 'modalValueCtrl',
            size: 'sm',
            resolve: {
                dValue: function() {
                    return e;
                },
                SouceManagementService: function() {
                    return SouceManagementService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/souceManagement/SouceMana/modalValueCtrl.js']);
                    }
                ]
            }
        });

    };

    $scope.child = false
    $scope.toshow = function() {
        if ($scope.child == false) {
            $scope.child = true
        } else {
            $scope.child = false
        }
    };

    $scope.selectItem = function(item) {
        $scope.showInfo = item;
        // $scope.isGroup = true
        //console.log("选择的组为" + $scope.showInfo.id);
        $scope.device();

    };

    $scope.addToGroup = function() {
        $scope.title = "view";
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/addToGroup.html',
            controller: 'addToGroupCtrl',
            size: 'md',
            resolve: {

                // AuthorizedService: function() {
                //     return AuthorizedService;
                // },
                title: function() {
                    return $scope.title;
                },
                items: function() {
                    return null;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/deviceManagement/CPEdeviceManagement/Authorized/addToGroupCtrl.js',
                            'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js',
                        ]);

                    }
                ]
            }
        });
        //点击保存后执行
        // $scope.items = [];
        modalInstance.result.then(function(newItems) {
            searchGroup();
            // alert(newItems);
            // // $scope.items.push(newItems);
            // $scope.search();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    // $scope.groupId= 0;
    $scope.device = function() {
        if ($scope.showInfo.id == undefined) {
            $state.go("deviceManagement.CPEdeviceGroup.groupManagement.devices", { 'groupId': $scope.defalutGroupItem });
        } else {
            //console.log("选择的组为" + $scope.showInfo.id)
            $scope.groupId = $scope.showInfo.id;
            $scope.contentShow = true;
            $state.go("deviceManagement.CPEdeviceGroup.groupManagement.devices", { 'groupId': $scope.groupId });
        }

    };

    $scope.proper = function() {
        if ($scope.showInfo.id == undefined) {
            // alert("Please select group!")
            swal({
                title: "Tips:",
                text: "Please select group !",
                icon: "info",
                timer: 4000,
            });
        } else {
            //console.log("选择的组为" + $scope.showInfo.id)
            $scope.groupId = $scope.showInfo.id;
            $scope.contentShow = true;
            $state.go("deviceManagement.CPEdeviceGroup.groupManagement.properties", { 'groupId': $scope.groupId });
        };
    };

    $scope.FirmwaveUpdate = function() {
        if ($scope.showInfo.id == undefined) {
            // alert("Please select group!")
            swal({
                title: "Tips:",
                text: "Please select group !",
                icon: "info",
                timer: 4000,
            });
        } else {
            $scope.groupId = $scope.showInfo.id;
            $scope.contentShow = true;
            $state.go("deviceManagement.CPEdeviceGroup.groupManagement.Firmwave", { 'groupId': $scope.groupId });
        };
    };

    $scope.restore = function() {
        if ($scope.showInfo.id == undefined) {
            // alert("Please select group!")
            swal({
                title: "Tips:",
                text: "Please select group !",
                icon: "info",
                timer: 4000,
            });
        } else {
            //console.log("选择的组为" + $scope.showInfo.id)
            $scope.groupId = $scope.showInfo.id;
            $scope.contentShow = true;
            $state.go("deviceManagement.CPEdeviceGroup.groupManagement.restore", { 'groupId': $scope.groupId });
        };
    };

    $scope.minitoring = function() {
        if ($scope.showInfo.id == undefined) {
            // alert("Please select group!")
            swal({
                title: "Tips:",
                text: "Please select group !",
                icon: "info",
                timer: 4000,
            });
        } else {
            //console.log("选择的组为" + $scope.showInfo.id)
            $scope.groupId = $scope.showInfo.id;
            $scope.contentShow = true;
            $state.go("deviceManagement.CPEdeviceGroup.groupManagement.minitoring", { 'groupId': $scope.groupId });
        };
    };

    $scope.searchLog = function() {
        if ($scope.showInfo.id == undefined) {
            // alert("Please select group!")
            swal({
                title: "Tips:",
                text: "Please select group !",
                icon: "info",
                timer: 4000,
            });
        } else {
            //console.log("选择的组为" + $scope.showInfo.id)
            $scope.groupId = $scope.showInfo.id;
            $scope.contentShow = true;
            $state.go("deviceManagement.CPEdeviceGroup.groupManagement.log", { 'groupId': $scope.groupId });
        };
    }

    //重启组设备
    $scope.reboot = function() {
        if ($scope.showInfo.id == undefined) {
            // alert("Please select group!")
            swal({
                title: "Tips:",
                text: "Please select group !",
                icon: "info",
                timer: 4000,
            });
        } else {
            //console.log($scope.groupId);
            $scope.contentShow = true;
            // var truthBeTold = window.confirm("To restart all devices in the group ?");
            swal({
                title: "Waring",
                text: "To restart all devices in the group ?",
                icon: "warning",
                buttons: {
                    cancel: true,
                    confirm: true,
                },
            }).then(function(isOk) {
                if (isOk) {
                    groupManagementService.reboot($scope.showInfo.id)
                        .success(function(response) {
                            // alert("rebooting !");
                            if (response.code == 200) {
                                swal({
                                    title: "Tips:",
                                    text: "rebooting !",
                                    icon: "success",
                                    timer: 4000,
                                });
                                $scope.device();
                            } else {
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
                            $scope.noData = true;
                        });
                };
            });
        };



    };

    //恢复出厂设置
    $scope.recovery = function() {
        if ($scope.showInfo.id == undefined) {
            // alert("Please select group!");
            swal({
                title: "Tips:",
                text: "Please select group!",
                icon: "info",
                timer: 4000,
            });
        } else {
            $scope.contentShow = true;
            // var truthBeTold = window.confirm("To recovery all devices in the group  ?");
            swal({
                    title: "Waring",
                    text: "To recovery all devices in the group  ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        groupManagementService.recovery($scope.showInfo.id)
                            .success(function(response) {
                                if (response.code == 200) {
                                    // alert("recovering !");
                                    swal({
                                        title: "Tips:",
                                        text: "recovering !",
                                        icon: "success",
                                        timer: 4000,
                                    });
                                    $scope.device();
                                } else {

                                }

                            })
                            .error(function(err) {
                                console.info(err);
                                $scope.noData = true;
                            });
                    }
                })
                // if (truthBeTold) {

            // }
        }


    };

    // 接收到消息的回调方法
    // $rootScope.websocket.onmessage = function(event) {
    //     //deviceDetailNameModal里的接收消息
    //     alert("接收到消息：" + event.data);
    //     $rootScope.webSocketDeviceParamsData = JSON.parse(event.data);
    //     //console.log($rootScope.webSocketDeviceParamsData);

    // };

    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchGroup);



};