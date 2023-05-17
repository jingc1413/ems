angular.module('SunWave.pages.AlarmConfiguration.AlarmForward', [])
    .controller('addMessageCtrl', addMessageCtrl);

function addMessageCtrl($scope, AlarmForward, isAdd, $uibModalInstance, AlarmForwardService, $uibModal, $log) {
    $scope.AlarmForward = {
        useUserid: "",
        useName: "",
        useMobile: "",
        useMobileturn: 0,
        responseTime: "",
        useAlarmturncondition: "",
        useEmailturn: 0,
        useUserlevelid: 0,
        useArea: "",
        useCompany: "",
        useSitelevel: "",
        useAlarmlevel: "",
        useEmail: "",
        useResponsetime: ""
    };


    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组
    $scope.isShow = true;
    $scope.read = false;

    // 在这里处理要进行的操作
    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'add') {
        $scope.title = 'Add';
    } else if ($scope.isAdd == 'modify') {
        $scope.title = "Modify";
        $scope.AlarmForward = AlarmForward;
    } else {
        $scope.title = "View";
        $scope.AlarmForward = AlarmForward;
        $scope.isShow = false;
        $scope.read = true;
    };

    //vendor
    $scope.getVendorName = function() {
        AlarmForwardService.findAll().success(function(res) {
            $scope.vNames = res.data;
            console.log($scope.vNames);
            angular.forEach($scope.vNames, function(vName) {
                if ($scope.modal.neCompanyid == vName.coCompanyid) {
                    $scope.modal.neCompanyName = vName.coAddress;

                }
            })
        })
    };
    // $scope.getVendorName();
    $scope.vNames = [{
            coCompanyid: "14",
            coName: "SUNWAVE"
        }, {
            coCompanyid: "84",
            coName: "Sunwave2"
        },
        {
            coCompanyid: "86",
            coName: "1"
        }
    ];
    //User Level
    $scope.useLevels = [{
            id: "1",
            name: "Level1"
        }, {
            id: "2",
            name: "Level2"
        },
        {
            id: "3",
            name: "Level3"
        },
        {
            id: "4",
            name: "Level4"
        },
        {
            id: "5",
            name: "Level5"
        }
    ];

    $scope.clearAll = function() {
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
    };

    // $scope.setArea = function(a) {
    //     $scope.AlarmForward.useArea = a.useArea;
    //     console.log($scope.AlarmForward.useArea);
    // };


    //Area树
    $scope.areaTree = function() {
        $scope.openEditDialog();
    };


    //getVendor
    $scope.getVendor = function() {
        $scope.isFlag = 'vendor';
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/AlarmConfiguration/AlarmForward/conditionModal.html',
            controller: 'conditionCtrl',
            size: 'md',
            resolve: {
                isFlag: function() {
                    return $scope.isFlag;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                vendorIds: function() {
                    return $scope.AlarmForward.useCompany;
                },

                deviceLevelIds: function() {
                    return $scope.AlarmForward.useSitelevel;
                },

                conditionIds: function() {
                    return $scope.AlarmForward.useAlarmturncondition;
                },
                AlarmForwardService: function() {
                    return AlarmForwardService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmForward/conditionCtrl.js']);
                    }
                ]
            }
        });

        //点击保存后执行
        // $scope.items = [];
        modalInstance.result.then(function(selectIds) {

            $scope.AlarmForward.useCompany = selectIds.toString();
            // $scope.checked = []; //选中的ID
            // $scope.checkedItems = []; //选中的对象数组
            // // alert(newItems);
            // // // $scope.items.push(newItems);
            // $scope.search();
        }, function(newItems) {
            console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //getCondition
    $scope.getCondition = function() {
        $scope.isFlag = 'condition';
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/AlarmConfiguration/AlarmForward/conditionModal.html',
            controller: 'conditionCtrl',
            size: 'md',
            resolve: {
                isFlag: function() {
                    return $scope.isFlag;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                vendorIds: function() {
                    return $scope.AlarmForward.useCompany;
                },

                deviceLevelIds: function() {
                    return $scope.AlarmForward.useSitelevel;
                },

                conditionIds: function() {
                    return $scope.AlarmForward.useAlarmturncondition;
                },
                AlarmForwardService: function() {
                    return AlarmForwardService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmForward/conditionCtrl.js']);
                    }
                ]
            }
        });

        //点击保存后执行
        modalInstance.result.then(function(selectIds) {

            $scope.AlarmForward.useAlarmturncondition = selectIds.toString();
            // $scope.checked = []; //选中的ID
            // $scope.checkedItems = []; //选中的对象数组
            // $scope.search();
        }, function(newItems) {
            console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    //getDeviceLevel
    $scope.getDeviceLevel = function() {
        $scope.isFlag = 'level';
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/AlarmConfiguration/AlarmForward/conditionModal.html',
            controller: 'conditionCtrl',
            size: 'md',
            resolve: {
                isFlag: function() {
                    return $scope.isFlag;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                vendorIds: function() {
                    return $scope.AlarmForward.useCompany;
                },

                deviceLevelIds: function() {
                    return $scope.AlarmForward.useSitelevel;
                },

                conditionIds: function() {
                    return $scope.AlarmForward.useAlarmturncondition;
                },
                AlarmForwardService: function() {
                    return AlarmForwardService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmForward/conditionCtrl.js']);
                    }
                ]
            }
        });

        //点击保存后执行
        modalInstance.result.then(function(selectIds) {

            $scope.AlarmForward.useAlarmlevel = selectIds.toString();
            // $scope.checked = []; //选中的ID
            // $scope.checkedItems = []; //选中的对象数组
            // $scope.search();
        }, function(newItems) {
            console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //area
    $scope.openEditDialog = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/AlarmConfiguration/AlarmForward/areaTree.html',
            controller: 'areaTreeCtrl',
            size: 'md',
            resolve: {

                selectTreeNode: function() {
                    return $scope.AlarmForward.useArea;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                AlarmForwardService: function() {
                    return AlarmForwardService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmForward/areaTreeCtrl.js']);
                    }
                ]
            }
        });
        modalInstance.result.then(function(newItems) {
            console.log(newItems);
            var areaArr = [];

            for (let i = 0; i < newItems.length; i++) {
                const element = newItems[i];
                areaArr.push(element.name)
            }
            // $scope.areaTree();
            $scope.AlarmForward.useArea = areaArr.toString();
        }, function(newItems) {
            console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.ok = function() {

        if ($scope.isAdd == 'add') {
            var newItems = {};
            newItems = $scope.AlarmForward;
            AlarmForwardService.addContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        alert("Success")
                        $scope.close();
                    } else {
                        alert("Failed")
                        $scope.close();
                    }

                })
                .error(function(err) {
                    console.info(err);
                    alert('system err!')
                });

        } else {
            AlarmForwardService.editContent($scope.AlarmForward)
                .success(function(response) {
                    alert("Success");
                    $scope.close();
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