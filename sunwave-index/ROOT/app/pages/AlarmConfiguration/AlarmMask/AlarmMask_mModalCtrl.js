angular.module('SunWave.pages.AlarmConfiguration.AlarmMask', [
        'SunWave.pages.deviceManagement.deviceList',
        'SunWave.pages.Authority.area',
        'SunWave.pages.PollingManagement.PollingTask'
    ])
    .controller('AlarmMask_mModalCtrl', AlarmMask_mModalCtrl);

function AlarmMask_mModalCtrl($rootScope, $scope, deviceListService, AlarmMaskService, PollingTaskService, isAdd, transmitModalItems, modifyData, $uibModalInstance, $uibModal, areaService, $log, $window) {

    $scope.transmitModalItems = transmitModalItems;
    $scope.modifyData = modifyData;



    $scope.isSave = true;
    $scope.area = {
        selectArea: ""
    };

    $scope.isView = false;

    $scope.modal = {
        altTaskname: "",
        altState: 1,
        altEndtime: "",
        altMaskalarmid: "",
        altMaskalarmStr: "",
        altStarttime: "",
        altStateStr: ""
            // altTaskid: ""
    };

    $scope.rows2 = [];
    $scope.orignRows2 = [];

    $scope.devices = '2';

    $scope.count2 = 0;

    var areaFlag;


    //左边查询条件

    $scope.query = { //查询设备
        pageIndex: 0,
        pageSize: 10,
        keyword: "",
        areaIds: "",
        neCompanyid: "",
        neSitelevelid: "",
        neDevicestatusid: "",
        neDevicetypeid: "",
        neName: "",
        neRepeaterid: "",
        rightElementIds: ""
    };


    $scope.xx = {
        select_all: "",
        select_all2: ""
    };

    $scope.statuses = [
        { statusId: 1, statusLabel: "Enable" },
        { statusId: 0, statusLabel: "Disable" }
    ];


    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
            $scope.devices = '2';

        } else {
            $scope.title = 'Add';
            $scope.devices = '2';

        };

    } else if ($scope.isAdd == 'Modify') {

        var firstSearchRightFlag = true;
        if ($scope.transmitModalItems.altFilter == null || $scope.transmitModalItems.altFilter == '') {
            $scope.devices = '1';
        };
        if ($rootScope.language == 'chinese') {
            $scope.title = '编辑'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
            $scope.modal = $scope.transmitModalItems;
        } else {
            $scope.title = 'Modify';
        };

        // $scope.ids = $scope.modifyData.selectedNeIds;
        // $scope.modal = $scope.modifyData;
        $scope.ids = $scope.transmitModalItems.selectedNeIds;

    } else {
        var firstSearchRightFlag = true;
        if ($scope.transmitModalItems.altFilter == null || $scope.transmitModalItems.altFilter == '') {
            $scope.devices = '1';
        };
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
            $scope.modal = $scope.transmitModalItems;
            $scope.isSave = false;

        } else {
            $scope.modal = $scope.transmitModalItems;
            $scope.title = 'View';
            $scope.isSave = false;
        };
        $scope.ids = $scope.transmitModalItems.selectedNeIds;

    };


    //判断查询条件
    $scope.switchSearchCondition = function() {

        switch ($scope.searchCondition) {
            //0 type
            case "0":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = true;
                $scope.devNameAndId = false;
                $scope.vendorShow = false;

                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neName = "";
                $scope.query.neRepeaterid = "";
                $scope.query.rightElementIds = "";
                // $scope.query.dtpDevicetypeid = $scope.modal.neDevicetypeid;
                $scope.query.neDevicetypeid = $scope.modal.neDevicetypeid;
                // $scope.searchDeviceType();
                break;
                //1 status
            case "1":
                $scope.deviceStatusShow = true;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = false;
                $scope.vendorShow = false;

                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicetypeid = "";
                $scope.query.neName = "";
                $scope.query.neRepeaterid = "";
                $scope.query.rightElementIds = "";
                $scope.query.neDevicestatusid = $scope.modal.neDevicestatusid;
                // $scope.deviceStatuss();
                break;
            case "2":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = true;
                $scope.vendorShow = false;
                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neName = "";
                $scope.query.neDevicetypeid = "";
                $scope.query.rightElementIds = "";
                // $scope.query.neRepeaterid16 = $scope.conditionValue;
                $scope.query.neRepeaterid = $scope.conditionValue;
                break;
            case "3":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = true;
                $scope.vendorShow = false;
                $scope.query.neCompanyid = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neRepeaterid = "";
                $scope.query.neDevicetypeid = "";
                $scope.query.rightElementIds = "";
                $scope.query.neName = $scope.conditionValue;
                break;
            case "4":
                $scope.deviceStatusShow = false;
                $scope.deviceTypeShow = false;
                $scope.devNameAndId = false;
                $scope.vendorShow = true;
                $scope.query.neName = "";
                $scope.query.neSitelevelid = "";
                $scope.query.neDevicestatusid = "";
                $scope.query.neRepeaterid = "";
                $scope.query.neDevicetypeid = "";
                $scope.query.rightElementIds = "";
                $scope.query.neCompanyid = $scope.modal.coCompanyid;
                break;
            default:
                $scope.query.keyword = "";
        }
    };

    $scope.search = function() {
        $scope.switchSearchCondition();
        searchForm();

    };

    var searchForm = function() { //查询
        clearArrays();
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        // $scope.rows2 = [];
        if ($scope.isAdd == 'Add') {
            $scope.searchLeft();
            // $scope.query.rightElementIds = "";
            // $scope.switchSearchCondition();
            // AlarmMaskService.searchForPolling($scope.query).success(function(response) {
            //     $scope.paginationConf.totalItems = response.data.totalElements;
            //     $scope.paginationConf.totalPages = response.data.totalPages;

            //     $scope.rows = response.data.content;
            //     for (let i = 0; i < $scope.rows.length; i++) {
            //         const row = $scope.rows[i];
            //         for (let j = 0; j < $scope.rows2.length; j++) {
            //             const row2 = $scope.rows2[j];
            //             if (row2.neNeid == row.neNeid) {
            //                 $scope.rows.splice(row, 1);
            //             }
            //         }
            //     }
            // })
        } else {
            if ($scope.ids) {
                $scope.idss = $scope.ids.split(',');
                $scope.query.rightElementIds = $scope.ids;

                // $scope.searchLeft();
                if ($scope.devices == '2') {


                    if (firstSearchRightFlag == true) {
                        //查右边
                        PollingTaskService.findByIds($scope.idss).success(function(response) {
                            $scope.rows2 = response.data;
                            $scope.orignRows2 = $scope.rows2;
                            //拷贝
                            $scope.count2 = $scope.rows2.length;
                            firstSearchRightFlag = false;
                            $scope.searchLeft();

                        });
                    } else {
                        $scope.searchLeft();
                    }
                }
            } else {
                AlarmMaskService.findAlmMasktaskById($scope.transmitModalItems.altTaskid).success(function(res) {
                    $scope.idss = res.data.selectedNeIds;
                    if (firstSearchRightFlag == true) {
                        //查右边

                        if ($scope.idss) {
                            $scope.idss = $scope.idss.split(',');

                            PollingTaskService.findByIds($scope.idss).success(function(response) {
                                $scope.rows2 = response.data;
                                $scope.orignRows2 = $scope.rows2;
                                //拷贝
                                $scope.count2 = $scope.rows2.length;
                                firstSearchRightFlag = false;
                                $scope.searchLeft();

                            });
                        } else {
                            firstSearchRightFlag = false;
                            $scope.rows2 = [];
                            $scope.searchLeft();
                        }

                    } else {
                        $scope.searchLeft();
                    }
                });

            }

        }

    };

    // page in
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 50,
        pagesLength: 50,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    //type
    $scope.searchDeviceType = function() {
        deviceListService.searchDeviceType().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.deviceTypes = res.data;
        })
    };
    $scope.searchDeviceType();

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
                areaService: function() {
                    return areaService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmManagement/historyAlarm/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(changedNodes) {
            // //console.log(`已选择的area是${selectArea.name}`);
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

    //vendor
    $scope.getVendorName = function() {
        deviceListService.findAll().success(function(res) {
            $scope.vNames = res.data;
            $scope.vNames2 = res.data;
        })
    };
    $scope.getVendorName();

    //status
    $scope.deviceStatuss = function() {
        deviceListService.deviceStatuss().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.devStatuss = res.data;
        })
    };
    $scope.deviceStatuss();

    //查左
    $scope.searchLeft = function() {
        var idsArr = [];
        $scope.query.rightElementIds = "";
        if ($scope.orignRows2.length == 0) {} else {
            for (let k = 0; k < $scope.orignRows2.length; k++) {
                idsArr.push($scope.orignRows2[k].neNeid);
            }
            $scope.query.rightElementIds = idsArr.toString();
        }

        AlarmMaskService.searchForPolling($scope.query).success(function(response) {
            $scope.paginationConf.totalItems = response.data.totalElements;
            $scope.paginationConf.totalPages = response.data.totalPages;

            $scope.rows = response.data.content;
            // for (let i = 0; i < $scope.rows.length; i++) {
            //     const row = $scope.rows[i];
            //     for (let j = 0; j < $scope.rows2.length; j++) {
            //         const row2 = $scope.rows2[j];
            //         if (row2.neNeid == row.neNeid) {
            //             $scope.rows.splice(row, 1);
            //         }
            //     }
            // }
        })
    };


    $scope.handlePartial = function() {
        if ($scope.devices == '2') {
            searchForm();
        }
    }

    var clearArrays = function() {
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        $scope.xx.select_all = false;
    }

    var clearArrays2 = function() {
        $scope.checked2 = []; //选中的ID
        $scope.checkedItems2 = []; //选中的对象数组
        // $scope.xx.select_all2 = false;
    }



    //----------------------------------前台条件查询-------------------------------------//

    //areaTree
    $scope.searchAreaTree2 = function(size) {
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
                areaService: function() {
                    return areaService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/AlarmManagement/historyAlarm/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(changedNodes) {
            // //console.log(`已选择的area是${selectArea.name}`);
            $scope.areaIdsArr2 = [];
            $scope.areaNamesArr2 = [];
            areaFlag = true;

            for (let i = 0; i < changedNodes.length; i++) {
                $scope.areaIdsArr2.push(changedNodes[i].id);
                $scope.areaNamesArr2.push(changedNodes[i].name);
            };
            $scope.query2.area = $scope.areaNamesArr2.toString();
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //前台查询条件
    $scope.query2 = {
        neDevicetypeid: "",
        neDevicestatusid: "",
        neRepeaterid16: "",
        neName: "",
        area: ""
    };

    $scope.deviceTypeShow2 = true;


    //前台判断查询条件
    $scope.switchSearchCondition2 = function() {

        switch ($scope.searchCondition2) {
            //0 type
            case "0":
                $scope.deviceStatusShow2 = false;
                $scope.deviceTypeShow2 = true;
                $scope.devNameAndId2 = false;
                $scope.vendorShow2 = false;
                $scope.query2Param = 'neDevicetypeid';
                //console.log($scope.query2.neDevicetypeid);
                // $scope.searchDeviceType();
                break;
                //1 status
            case "1":
                $scope.deviceStatusShow2 = true;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = false;
                $scope.vendorShow2 = false;
                $scope.query2Param = 'neDevicestatusid';
                break;
            case "2":
                $scope.deviceStatusShow2 = false;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = true;
                $scope.vendorShow2 = false;
                $scope.query2Param = 'neRepeaterid16';
                $scope.query2.neRepeaterid16 = $scope.conditionValue2;
                break;
            case "3":
                $scope.deviceStatusShow2 = false;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = true;
                $scope.query2Param = 'neName';
                $scope.vendorShow2 = false;
                $scope.query2.neName = $scope.conditionValue2;
                break;
            case "4":
                $scope.deviceStatusShow2 = false;
                $scope.deviceTypeShow2 = false;
                $scope.devNameAndId2 = false;
                $scope.vendorShow2 = true;
                $scope.query2Param = 'coCompanyid';
                break;
            default:
                $scope.query2.keyword = "";
        }
        return $scope.query2Param;
    };


    $scope.search2 = function() {
        // $scope.rows2 = [];
        // $scope.new_rows2 = JSON.parse(JSON.stringify($scope.rows2));
        for (let i = 0; i < $scope.rows2.length; i++) {
            const row = $scope.rows2[i];
            if (row.checked == true) {
                row.checked = false;
            }
        }
        $scope.searchParam = $scope.switchSearchCondition2();

        //前台条件查询  原数组new_rows2
        $scope.searchForm2($scope.searchParam);

    };

    var resetFlag = false;

    // $scope.searchForm2 = function(query2Params) {
    //     if (resetFlag == true) {
    //         $scope.rows2 = $scope.orignRows2;
    //         $scope.count2 = $scope.rows2.length;
    //         resetFlag = false;
    //         return
    //     } else {
    //         $scope.rows2_new = [];
    //         for (let i = 0; i < $scope.orignRows2.length; i++) {
    //             switch (query2Params) {
    //                 case 'neDevicetypeid':
    //                     if ($scope.orignRows2[i].neDevicetype.dtpDevicetypeid == $scope.query2.neDevicetypeid) {
    //                         $scope.rows2_new.push($scope.orignRows2[i]);
    //                     } else if ($scope.query2.neDevicetypeid == '' || $scope.query2.neDevicetypeid == null) {
    //                         $scope.rows2_new = $scope.orignRows2;
    //                         if ($scope.rows2_new == $scope.orignRows2) {
    //                             $scope.rows2 = $scope.rows2_new;
    //                             $scope.count2 = $scope.rows2.length;
    //                             return
    //                         }
    //                     }
    //                     break;
    //                 case 'neRepeaterid16':
    //                     if ($scope.orignRows2[i].neRepeaterid16 == $scope.query2.neRepeaterid16) {
    //                         $scope.rows2_new.push($scope.orignRows2[i]);
    //                     } else if ($scope.query2.neRepeaterid16 == '') {
    //                         $scope.rows2_new = $scope.orignRows2;
    //                         if ($scope.rows2_new == $scope.orignRows2) {
    //                             $scope.rows2 = $scope.rows2_new;
    //                             $scope.count2 = $scope.rows2.length;
    //                             return
    //                         }
    //                     }
    //                     break;
    //                 case 'coCompanyid':
    //                     if ($scope.orignRows2[i].neCompany.coCompanyid == $scope.query2.coCompanyid) {
    //                         $scope.rows2_new.push($scope.orignRows2[i]);
    //                     } else if ($scope.query2.neDevicestatusid == null || $scope.query2.coCompanyid == '') {
    //                         $scope.rows2_new = $scope.orignRows2;
    //                         if ($scope.rows2_new == $scope.orignRows2) {
    //                             $scope.rows2 = $scope.rows2_new;
    //                             $scope.count2 = $scope.rows2.length;
    //                             return
    //                         }
    //                     }
    //                     break;
    //                 case 'neName':
    //                     if ($scope.orignRows2[i].neName == $scope.query2.neName) {
    //                         $scope.rows2_new.push($scope.orignRows2[i]);
    //                     } else if ($scope.query2.neName == '') {
    //                         $scope.rows2_new = $scope.orignRows2;
    //                         if ($scope.rows2_new == $scope.orignRows2) {
    //                             $scope.rows2 = $scope.rows2_new;
    //                             $scope.count2 = $scope.rows2.length;
    //                             return
    //                         }
    //                     }
    //                     break;
    //                 case 'neDevicestatusid':
    //                     if ($scope.query2.neDevicestatusid == null || ((typeof $scope.query2.neDevicestatusid == 'string') && $scope.query2.neDevicestatusid == '')) {
    //                         $scope.rows2_new = $scope.orignRows2;
    //                         if ($scope.rows2_new == $scope.orignRows2) {
    //                             $scope.rows2 = $scope.rows2_new;
    //                             $scope.count2 = $scope.rows2.length;
    //                             return
    //                         }
    //                     } else if ($scope.orignRows2[i].neDevicestatus.dsId == $scope.query2.neDevicestatusid) {
    //                         $scope.rows2_new.push($scope.orignRows2[i]);
    //                     }
    //                     break;
    //                 case 'area':
    //                     if ($scope.orignRows2[i].areaName == $scope.query2.area) {
    //                         $scope.rows2_new.push($scope.orignRows2[i]);
    //                     }
    //                     break;

    //                 default:
    //                     break;
    //             };

    //             if ($scope.orignRows2[i].areaName == $scope.query2.area) {
    //                 $scope.rows2_new.push($scope.orignRows2[i]);
    //             }
    //         };

    //         $scope.rows2 = $scope.rows2_new;
    //     }
    // };

    $scope.searchForm2 = function(query2Params) {
        clearArrays2();
        if (resetFlag == true) {
            $scope.rows2 = $scope.orignRows2;
            $scope.count2 = $scope.rows2.length;
            resetFlag = false;
            return
        } else {
            $scope.rows2_new = [];
            $scope.rows3_new = [];
            var swArr = [];

            if (areaFlag == true) {
                for (let index = 0; index < $scope.orignRows2.length; index++) {
                    const el = $scope.orignRows2[index];
                    for (let j = 0; j < $scope.areaNamesArr2.length; j++) {
                        const areaN = $scope.areaNamesArr2[j];
                        if (el.areaName == areaN) {
                            $scope.rows2_new.push(el);
                        }
                    }
                };
                $scope.rows3_new = $scope.rows2_new;
            } else {
                $scope.rows3_new = $scope.orignRows2;
            };

            for (let i = 0; i < $scope.rows3_new.length; i++) {
                switch (query2Params) {
                    case 'neDevicetypeid':
                        if ($scope.rows3_new[i].neDevicetype.dtpDevicetypeid == $scope.query2.neDevicetypeid) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.neDevicetypeid == '' || $scope.query2.neDevicetypeid == null) {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        }
                        break;
                    case 'coCompanyid':
                        if ($scope.rows3_new[i].neCompany.coCompanyid == $scope.query2.coCompanyid) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.coCompanyid == null || $scope.query2.coCompanyid == '') {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        }
                        break;
                    case 'neRepeaterid16':
                        if ($scope.rows3_new[i].neRepeaterid16.indexOf($scope.query2.neRepeaterid16.toLocaleUpperCase()) != -1) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.neRepeaterid16 == '') {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        }
                        break;
                    case 'neName':
                        if ($scope.rows3_new[i].neName.indexOf($scope.query2.neName) != -1) {
                            swArr.push($scope.rows3_new[i]);
                        } else if ($scope.query2.neName == '') {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        } else {
                            if ($scope.query2.neName == null) {
                                swArr.push($scope.rows3_new[i]);
                            }
                        }
                        break;
                    case 'neDevicestatusid':
                        if ($scope.query2.neDevicestatusid == null || ((typeof $scope.query2.neDevicestatusid == 'string') && $scope.query2.neDevicestatusid == '')) {
                            swArr = $scope.rows3_new;
                            if (swArr == $scope.rows3_new) {
                                $scope.rows2 = swArr;
                                $scope.count2 = $scope.rows2.length;
                                return
                            }
                        } else if ($scope.rows3_new[i].neDevicestatus.dsId === $scope.query2.neDevicestatusid) {
                            swArr.push($scope.rows3_new[i]);
                        }
                        break;

                    default:
                        break;
                };
            }
            resetFlag = false;
            if ($scope.query2.area == '') {
                areaFlag = false;
            };

            $scope.rows2 = swArr;
            $scope.count2 = $scope.rows2.length;
        }
    };


    //右边恢复
    $scope.recovery = function() {
        if ($scope.orignRows2 == undefined || $scope.orignRows2.length == 0) {
            alert('Please select item first!')
            return
        }
        $scope.query2 = {
            neDevicetypeid: "",
            neDevicestatusid: "",
            neRepeaterid16: "",
            neName: "",
            area: "",
            coCompanyid: ""
        };
        $scope.deviceStatusShow2 = false;
        $scope.deviceTypeShow2 = true;
        $scope.devNameAndId2 = false;
        $scope.vendorShow2 = false;
        $scope.query2Param = 'neDevicetypeid';

        $scope.searchParam = "";
        $scope.searchCondition2 = '0';
        $scope.conditionValue2 = "";
        $scope.modal.coCompanyid = "";
        $scope.rows2 = $scope.orignRows2;
        if ($scope.rows2 == undefined && $scope.rows2 == null) {
            $scope.rows2 = [];
        } else {
            resetFlag = true;
            areaFlag = false;
            $scope.searchForm2();
            // $scope.rows2 = $scope.orignRows2;
            // $scope.searchForm2($scope.searchParam, true);
        }
    };
    //左边恢复
    $scope.recoveryLeft = function() {
        $scope.query = { //查询设备
            pageIndex: 0,
            pageSize: 10,
            keyword: "",
            areaIds: "",
            neCompanyid: "",
            neSitelevelid: "",
            neDevicestatusid: "",
            neDevicetypeid: "",
            neName: "",
            neRepeaterid: "",
            rightElementIds: ""
        };
        $scope.modal.neDevicetypeid = "";
        $scope.modal.neDevicestatusid = "";
        $scope.query.rightElementIds = $scope.ids;
        $scope.conditionValue = "";
        $scope.searchCondition = "0";
        $scope.area.selectArea = '';
        $scope.deviceTypeShow = true;
        $scope.devNameAndId = false;
        $scope.vendorShow = false;
        $scope.deviceStatusShow = false;
        $scope.searchLeft();
    };

    //----------------------------------前台条件查询 end-------------------------------------//




    /***************************************************************
    当页码和页面记录数发生变化时监控后台查询
    如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
    ***************************************************************/
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search);

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


    $scope.m = [];
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    $scope.selectAll = function() {
        $scope.checked = [];
        $scope.checkedItems = [];
        if ($scope.xx.select_all) {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                i.checked = true;
                $scope.checked.push(i.neNeid);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.rows, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        //console.log($scope.checked);
    };
    $scope.selectOne = function() {
        $scope.checked = [];
        $scope.checkedItems = [];
        angular.forEach($scope.rows, function(i) {
            var index = $scope.checked.indexOf(i.neNeid);
            if (i.checked && index == -1) {
                $scope.checked.push(i.neNeid);
                $scope.checkedItems.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checked.splice(index, 1);
                $scope.checkedItems.splice(index, 1);
            };
        });


        if ($scope.rows.length == $scope.checked.length) {
            $scope.xx.select_all = true;
        } else {
            $scope.xx.select_all = false;
        }
        //console.log($scope.checkedItems);
    };


    // -----------------------------第二个-------------------------------------

    $scope.m = [];
    $scope.checked2 = []; //选中的ID
    $scope.checkedItems2 = []; //选中的对象数组

    $scope.selectAll2 = function() {
        $scope.checked2 = [];
        $scope.checkedItems2 = [];
        if ($scope.xx.select_all2) {
            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            angular.forEach($scope.rows2, function(i) {
                i.checked = true;
                $scope.checked2.push(i.neNeid);
                $scope.checkedItems2.push(i);
            });
        } else {
            angular.forEach($scope.rows2, function(i) {
                i.checked = false;
                $scope.checked2 = [];
                $scope.checkedItems2 = [];
            });
        }
        //console.log($scope.checked2);
    };
    $scope.selectOne2 = function() {
        $scope.checked2 = [];
        $scope.checkedItems2 = [];
        angular.forEach($scope.rows2, function(i) {
            var index = $scope.checked2.indexOf(i.neNeid);
            if (i.checked && index == -1) {
                $scope.checked2.push(i.neNeid);
                $scope.checkedItems2.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checked2.splice(index, 1);
                $scope.checkedItems2.splice(index, 1);
            };
        });


        if ($scope.rows2.length == $scope.checked2.length) {
            $scope.xx.select_all2 = true;
        } else {
            $scope.xx.select_all2 = false;
        }
        //console.log($scope.checkedItems2);
    };

    //   --------------------------------第二个end------------------------------
    $scope.doubleSelectToRight = function() {
        if ($scope.rows2 == undefined) {
            $scope.rows2 = [];
        };
        cnt = $scope.rows.length;
        for (let i = 0; i < cnt; i++) {
            if ($scope.rows[i].checked == true) {
                //console.log($scope.rows2);
                $scope.rows2.push($scope.rows[i]);
                //console.log($scope.rows2);
            }
        };
        for (let j = 0; j < $scope.rows.length;) {
            var index = $scope.checked.indexOf($scope.rows[j].neNeid);
            if (index > -1) {
                $scope.rows.splice(j, 1);
                $scope.checkedItems[index].checked = false;
            } else {
                j++;
            }
        }
        $scope.checked = [];
        $scope.checkedItems = [];
        $scope.xx.select_all = false;
        $scope.count2 = $scope.rows2.length;
        //移到右边时保存原数组做恢复
        // $scope.orignRows2 = $scope.rows2;
        for (let k = 0; k < $scope.rows2.length; k++) {
            const row2 = $scope.rows2[k];
            if ($scope.orignRows2.indexOf(row2) > -1) {

            } else {
                $scope.orignRows2.push(row2);
            }
        }
        $scope.searchLeft();

    };
    $scope.doubleSelectToLeft = function() {

        var cnt = $scope.rows2.length;
        for (let i = 0; i < cnt; i++) {
            if ($scope.rows2[i].checked == true) {
                $scope.rows.push($scope.rows2[i]);
            }
        };
        for (let j = 0; j < $scope.rows2.length;) {
            var index = $scope.checked2.indexOf($scope.rows2[j].neNeid);
            if (index > -1) {
                $scope.rows2.splice(j, 1);
                $scope.checkedItems2[index].checked = false;
            } else {
                j++;
            }
        }

        for (let k = 0; k < $scope.orignRows2.length;) {

            var index2 = $scope.checked2.indexOf($scope.orignRows2[k].neNeid);
            if (index2 > -1) {
                $scope.orignRows2.splice(k, 1);

            } else {
                k++;
            }
        }

        $scope.checked2 = [];
        $scope.checkedItems2 = [];
        $scope.xx.select_all2 = false;
        $scope.count2 = $scope.rows2.length;
        $scope.searchLeft();
    };

    $scope.getAlarm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/AlarmConfiguration/AlarmMask/alarmModal.html',
            controller: 'alarmModalCtrl',
            size: "md",
            resolve: {
                transmitModalItems: function() {
                    return $scope.transmitModalItems;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                AlarmMaskService: function() {
                    return AlarmMaskService;
                },
                params_transf: function() {
                    return $scope.params_transf;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/AlarmConfiguration/AlarmMask/alarmModalCtrl.js'
                        ]);
                    }
                ]
            }
        });

        modalInstance.result.then(function(als) {
            $scope.params_transf = als;
            var alarmStrArr = [];
            var alarmIdArr = [];

            // for (let index = 0; index < $scope.params_transf.length; index++) {
            //     const el = $scope.params_transf[index];
            //     alarmStrArr.push(el.almName);
            //     alarmIdArr.push(el.almObjid);
            // };
            // $scope.modal.altMaskalarmStr = alarmStrArr.toString();
            $scope.modal.altMaskalarmid = $scope.params_transf.toString();

        }, function(checkitems) {
            //console.log(checkitems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    }



    $scope.save = function() {
        var newItems = {};
        var neIds = [];
        newItems = $scope.modal;
        //取neIds
        if ($scope.devices == '1') {
            newItems.altFilter = '';
        } else {
            newItems.altFilter = 'on';
            if ($scope.rows2 == undefined || $scope.orignRows2.length == 0) {
                alert('Please select device!');
                return
            } else {
                for (let i = 0; i < $scope.orignRows2.length; i++) {
                    neIds.push($scope.orignRows2[i].neNeid);
                };
            };
        };

        newItems.selectedNeIds = neIds.toString();

        if ($scope.modal.altStarttime == '' || $scope.modal.altEndtime == '') {
            alert('please select time');
            return
        };

        if ($scope.isAdd == 'Add') {
            AlarmMaskService.addContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
                        alert('Success!');
                        $scope.close();
                    } else {
                        alert('Failed!----' + response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });
        } else {
            AlarmMaskService.modifyContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
                        alert('Success!');
                        $scope.close();
                    } else {
                        alert('Failed!----' + response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });
        }

    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
        $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked');
        $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked_modify');

    };


}