angular.module('SunWave.pages.AlarmConfiguration.AlarmForward', [])
    .controller('addMessageCtrl', addMessageCtrl);

function addMessageCtrl($rootScope, $scope, AlarmForward, isAdd, $uibModalInstance, AlarmForwardService, $uibModal, $log, messageAlertService) {
    $scope.AlarmForward = {
        useUserid: "",
        useName: "",
        useMobile: "",
        useMobileturn: 0,
        responseTime: "",
        useAlarmturncondition: "",
        useEmailturn: 0,
        useUserlevelid: '',
        useArea: "",
        useCompany: "",
        useSitelevel: "",
        useAlarmlevel: "2,3,4,5,",
        useEmail: "",
        useResponsetime: "",
        useAreaIds: "",
        useAreaName: ""
    };


    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组
    $scope.isShow = true;
    $scope.read = false;
    $scope.userIdNotModify = false;


    // 在这里处理要进行的操作
    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'add') {
        // $scope.title = 'Add';
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
    } else if ($scope.isAdd == 'modify') {
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '修改'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.AlarmForward = AlarmForward;
        $scope.userIdNotModify = true;
        $scope.AlarmForward.useAreaIds = AlarmForward.useArea;
    } else {
        // $scope.title = "View";
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        };
        $scope.AlarmForward = AlarmForward;
        $scope.AlarmForward.useAreaIds = AlarmForward.useArea;
        $scope.isShow = false;
        $scope.read = true;
    };

    //vendor
    $scope.getVendorName = function() {
        AlarmForwardService.findAll().success(function(res) {
            $scope.vNames = res.data;
            //console.log($scope.vNames);
            angular.forEach($scope.vNames, function(vName) {
                if ($scope.modal.neCompanyid == vName.coCompanyid) {
                    $scope.modal.neCompanyName = vName.coAddress;

                }
            })
        })
    };
    // $scope.getVendorName();
    // $scope.vNames = [{
    //         coCompanyid: "14",
    //         coName: "SUNWAVE"
    //     }, {
    //         coCompanyid: "84",
    //         coName: "Sunwave2"
    //     },
    //     {
    //         coCompanyid: "86",
    //         coName: "1"
    //     }
    // ];
    //User Level
    $scope.useLevels = [{
            id: 1,
            name: "Level1"
        }, {
            id: 2,
            name: "Level2"
        },
        {
            id: 3,
            name: "Level3"
        },
        {
            id: 4,
            name: "Level4"
        },
        {
            id: 5,
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
    //     //console.log($scope.AlarmForward.useArea);
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
                AlarmForwardService: function() {
                    return AlarmForwardService;
                },
                selects: function() {
                    return $scope.AlarmForward.useCompany;
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

            $scope.AlarmForward.useCompany = selectIds.toString() + ',';
            // $scope.checked = []; //选中的ID
            // $scope.checkedItems = []; //选中的对象数组
            // // alert(newItems);
            // // // $scope.items.push(newItems);
            // $scope.search();
        }, function(newItems) {
            //console.log(newItems);
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
                AlarmForwardService: function() {
                    return AlarmForwardService;
                },
                selects: function() {
                    return $scope.AlarmForward.useAlarmturncondition;
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

            $scope.AlarmForward.useAlarmturncondition = selectIds.toString() + ',';
            // $scope.checked = []; //选中的ID
            // $scope.checkedItems = []; //选中的对象数组
            // $scope.search();
        }, function(newItems) {
            //console.log(newItems);
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
                AlarmForwardService: function() {
                    return AlarmForwardService;
                },
                selects: function() {
                    return $scope.AlarmForward.useSitelevel;
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

            $scope.AlarmForward.useSitelevel = selectIds.toString() + ',';
            // $scope.checked = []; //选中的ID
            // $scope.checkedItems = []; //选中的对象数组
            // $scope.search();
        }, function(newItems) {
            //console.log(newItems);
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
            //console.log(newItems);
            var areaArr = [];
            var areaIDArr = [];

            for (let i = 0; i < newItems.length; i++) {
                const element = newItems[i];
                // areaArr.push(element.name);
                areaIDArr.push(element.id);

            }
            // $scope.areaTree();
            $scope.AlarmForward.useAreaName = areaArr.toString();
            $scope.AlarmForward.useAreaIds = areaIDArr.toString() + ',';
        }, function(newItems) {
            $scope.search();
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.ok = function() {

        if ($scope.isAdd == 'add') {
            var newItems = {};
            $scope.AlarmForward.useArea = $scope.AlarmForward.useAreaIds;
            // $scope.AlarmForward.useSitelevel = $scope.AlarmForward.useSitelevel + ",";
            newItems = $scope.AlarmForward;
            AlarmForwardService.addContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
                        // alert("Success")
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert("Failed")
                        messageAlertService.successFun('failed', response.msg);
                        $scope.close();
                    }

                })
                .error(function(err) {
                    console.info(err);
                    alert('system err!')
                });

        } else {
            var newItems = {};
            $scope.AlarmForward.useArea = $scope.AlarmForward.useAreaIds;
            // $scope.AlarmForward.useSitelevel = $scope.AlarmForward.useSitelevel + ",";
            newItems = $scope.AlarmForward;
            AlarmForwardService.editContent($scope.AlarmForward)
                .success(function(response) {
                    // alert("Success");
                    messageAlertService.successFun('success');
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