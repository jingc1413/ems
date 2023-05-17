(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.batchUpgrade', [
            'SunWave.pages.deviceManagement.deviceList',
            'SunWave.pages.PollingManagement.PollingTask',
            'SunWave.pages.Authority.area'
        ])
        .controller('addModalCtrl', addModalCtrl);

    function addModalCtrl($scope, batchUpgradeService, transmitModalItems, modifyData,
        deviceListService, PollingTaskService, isAdd, $uibModal, $uibModalInstance, areaService, $filter) {


        $scope.modifyData = modifyData;
        $scope.notView = true;
        $scope.readOnly = false;
        $scope.time_error = false;


        $scope.modal = {
            tskTaskname: "",
            tskNexttime: "",
            // ftpserver: "",
            // fileId: "",
            tskFilter: "on"
                // tskFilter:Devices是ALL还是Partial,All传空，Partial传on
        };

        var areaFlag;

        $scope.transmitModalItems = transmitModalItems;

        $scope.fileName = "";
        $scope.devices = '2';
        $scope.count2 = 0;

        $scope.xx = {
            select_all: "",
            select_all2: ""
        };

        $scope.area = {
            selectArea: ""
        };
        $scope.area2 = {
            selectArea: ""
        };


        $scope.isAdd = isAdd;
        if ($scope.isAdd == 'Add') {
            $scope.title = 'Add';
            $scope.isModify = false;
        } else if ($scope.isAdd == 'Modify') {
            $scope.title = "Modify";

            //file id
            $scope.fileId = modifyData.tmpUpgradeFileId;
            $scope.isModify = true;
            $scope.ids = modifyData.selectedNeIds;
            $scope.modal = modifyData;
            $scope.fileName = $scope.transmitModalItems.upgradeFileName;
            $scope.ftpServer = $scope.transmitModalItems.serverSftpName;

        } else {
            $scope.title = "View";
            //save按钮
            $scope.notView = false;
            //file id
            $scope.readOnly = true;
            $scope.fileId = modifyData.tmpUpgradeFileId;
            $scope.isModify = false;
            $scope.ids = modifyData.selectedNeIds;
            $scope.modal = modifyData;
            $scope.fileName = $scope.transmitModalItems.upgradeFileName;
            $scope.ftpServer = $scope.transmitModalItems.serverSftpName;
        };

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
        //下拉框 and Input的初始化
        $scope.isWeek = false;
        $scope.isInput = true;
        $scope.deviceTypeShow = true;
        $scope.deviceStatusShow = false;
        $scope.devNameAndId = false;
        $scope.vendorShow = false;

        $scope.rows2 = [];


        //判断查询条件
        $scope.switchSearchCondition = function() {

            switch ($scope.searchCondition) {
                //0 type
                case "0":
                    $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = true;
                    $scope.devNameAndId = false;
                    $scope.vendorShow = false;
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
                    $scope.query.neDevicestatusid = $scope.modal.neDevicestatusid;
                    // $scope.deviceStatuss();
                    break;
                case "2":
                    $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.devNameAndId = true;
                    $scope.vendorShow = false;
                    $scope.query.neRepeaterid = $scope.conditionValue;
                    break;
                case "3":
                    $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.devNameAndId = true;
                    $scope.vendorShow = false;
                    $scope.query.neName = $scope.conditionValue;
                    break;
                case "4":
                    $scope.deviceStatusShow = false;
                    $scope.deviceTypeShow = false;
                    $scope.devNameAndId = false;
                    $scope.vendorShow = true;
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

        $scope.exectiontimeChange = () => {
            var cur_date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm')
            if ($scope.modal.tskNexttime < cur_date) {
                alert('Cannot select time before current!');
                $scope.modal.tskNexttime = '';
            }
        };

        var searchForm = function() { //查询
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            if ($scope.isAdd == 'Add') {
                $scope.query.rightElementIds = "";
                // $scope.switchSearchCondition();
                PollingTaskService.searchForPolling($scope.query).success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.paginationConf.totalPages = response.data.totalPages;

                    $scope.rows = response.data.content;
                })
            } else {
                $scope.idss = $scope.ids.split(',');
                $scope.query.rightElementIds = $scope.ids;
                $scope.searchLeft();
                //查右边
                if ($scope.idss == '' || $scope.idss == undefined) {
                    $scope.rows2 = [];
                } else {
                    PollingTaskService.findByIds($scope.idss).success(function(response) {
                        $scope.rows2 = response.data;
                        //拷贝
                        $scope.orignRows2 = $scope.rows2;
                        $scope.count2 = $scope.rows2.length;
                    });
                }
            }
        };

        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };
        $scope.searchDeviceType();

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
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.devStatuss = res.data;
            })
        };
        $scope.deviceStatuss();

        //查左
        $scope.searchLeft = function() {
            PollingTaskService.searchForPolling($scope.query).success(function(response) {
                $scope.paginationConf.totalItems = response.data.totalElements;
                $scope.paginationConf.totalPages = response.data.totalPages;

                $scope.rows = response.data.content;
            })
        };

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
                // console.log(`已选择的area是${selectArea.name}`);
                $scope.areaIdsArr = [];
                $scope.areaNamesArr = [];
                areaFlag = true;
                for (let i = 0; i < changedNodes.length; i++) {
                    $scope.areaIdsArr.push(changedNodes[i].id);
                    $scope.areaNamesArr.push(changedNodes[i].name);
                };
                $scope.area2.selectArea = $scope.areaNamesArr.toString();
                $scope.query2.areaNames = $scope.areaNamesArr.toString();
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
            coCompanyid: "",
            areaNames: ""
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
                    break;
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
                    $scope.query2Param = 'neRepeaterid16';
                    $scope.vendorShow2 = false;
                    $scope.query2.neRepeaterid16 = $scope.conditionValue2;
                    break;
                case "3":
                    $scope.deviceStatusShow2 = false;
                    $scope.deviceTypeShow2 = false;
                    $scope.devNameAndId2 = true;
                    $scope.vendorShow2 = false;
                    $scope.query2Param = 'neName';
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
            $scope.new_rows2 = JSON.parse(JSON.stringify($scope.rows2));

            $scope.searchParam = $scope.switchSearchCondition2();

            //前台条件查询
            $scope.searchForm2($scope.searchParam);

        };

        $scope.searchForm2 = function(query2Params) {
            $scope.rows2_new = [];
            for (let i = 0; i < $scope.orignRows2.length; i++) {
                switch (query2Params) {
                    case 'neDevicetypeid':
                        if ($scope.orignRows2[i].neDevicetype.dtpDevicetypeid == $scope.query2.neDevicetypeid) {
                            $scope.rows2_new.push($scope.orignRows2[i]);
                        }
                        break;
                    case 'coCompanyid':
                        if ($scope.orignRows2[i].neCompany.coCompanyid == $scope.query2.coCompanyid) {
                            $scope.rows2_new.push($scope.orignRows2[i]);
                        }
                        break;
                    case 'neRepeaterid16':
                        if ($scope.orignRows2[i].neRepeaterid16 == $scope.query2.neRepeaterid16) {
                            $scope.rows2_new.push($scope.orignRows2[i]);
                        }
                        break;
                    case 'neName':
                        if ($scope.orignRows2[i].neName == $scope.query2.neName) {
                            $scope.rows2_new.push($scope.orignRows2[i]);
                        }
                        break;
                    case 'neDevicestatusid':
                        if ($scope.orignRows2[i].neDevicestatus.dsId == $scope.query2.neDevicestatusid) {
                            $scope.rows2_new.push($scope.orignRows2[i]);
                        }
                        break;

                    default:
                        break;
                };
                if (areaFlag == true) {
                    for (let j = 0; j < $scope.areaNamesArr.length; j++) {
                        const areaN = $scope.areaNamesArr[j];
                        if ($scope.orignRows2[i].areaName == areaN) {
                            $scope.rows2_new.push($scope.orignRows2[i]);
                        }
                    }
                } else {

                }
            }

            $scope.rows2 = $scope.rows2_new;
        };


        //右边恢复
        $scope.recovery = function() {
            $scope.query2 = {
                neDevicetypeid: "",
                neDevicestatusid: "",
                neRepeaterid16: "",
                neName: "",
                coCompanyid: "",
                areaNames: ""
            };
            $scope.searchParam = "";
            $scope.searchCondition2 = '0';
            $scope.conditionValue2 = "";
            $scope.area2.selectArea = '';
            if ($scope.rows2 == undefined && $scope.rows2 == null) {
                $scope.rows2 = [];
            } else {
                $scope.rows2 = $scope.orignRows2;
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
            $scope.modal.coCompanyid = "";
            $scope.query.rightElementIds = $scope.ids;
            $scope.conditionValue = "";
            $scope.searchCondition = "0";
            $scope.area.selectArea = '';
            $scope.searchLeft();
        };

        //----------------------------------前台条件查询 end-------------------------------------//

        //获取upgaradeFiles
        $scope.getUpgradeFile = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/upgradeManagement/batchUpgrade/upgradeFilesModal.html',
                controller: 'upgradeFilesModalCtrl',
                size: 'md',
                resolve: {
                    fileId: function() {
                        return $scope.fileId;
                    },
                    isModify: function() {
                        return $scope.isModify;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/upgradeManagement/batchUpgrade/upgradeFilesModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(checkedFiles) {
                // console.log(checkedFiles);
                $scope.checkedFiles = checkedFiles;
                var fileIdArr = [];
                var fileNameArr = [];
                var ftpServerName = [];
                for (let i = 0; i < checkedFiles.length; i++) {
                    fileIdArr.push(checkedFiles[i].id);
                    fileNameArr.push(checkedFiles[i].name);
                    ftpServerName.push(checkedFiles[i].upFtpServerConfig.name);
                };

                $scope.fileId = fileIdArr.toString();
                $scope.fileName = fileNameArr.toString();
                $scope.ftpServer = ftpServerName.toString();

                // $scope.fileName = $scope.fileName;
                // $scope.modal.fileId = $scope.fileId;

                return $scope.fileId;
            }, function(newItems) {
                console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        console.log($scope.fileId);


        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 10,
            perPageOptions: [5, 10, 20, 30, 40, 50]

        };

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
            console.log($scope.checked);
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
            console.log($scope.checkedItems);
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
            console.log($scope.checked2);
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
            console.log($scope.checkedItems2);
        };

        //   --------------------------------第二个end------------------------------
        $scope.doubleSelectToRight = function() {
            var cnt = $scope.rows.length;
            for (let i = 0; i < cnt; i++) {
                if ($scope.rows[i].checked == true) {
                    console.log($scope.rows2);
                    $scope.rows2.push($scope.rows[i]);
                    console.log($scope.rows2);
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
            $scope.orignRows2 = $scope.rows2;
            $scope.count2 = $scope.rows2.length;
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

            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            $scope.xx.select_all2 = false;
            $scope.count2 = $scope.rows2.length;

        };



        $scope.save = function() {
            var cur_date = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm')

            if ($scope.modal.tskNexttime < cur_date) {
                alert('Cannot select time before current!');
                // $scope.time_error = true;
            } else {
                var neIds = [];
                //tskFilter all-"" per-"on"
                if ($scope.devices == '1') {
                    $scope.modal.tskFilter = "";
                };
                //取neIds
                if ($scope.rows2.length == 0) {
                    alert('Please select device!')
                    return
                } else {
                    for (let i = 0; i < $scope.rows2.length; i++) {
                        neIds.push($scope.rows2[i].neNeid);
                    };
                };

                //其他参数
                $scope.duration = 1;
                $scope.setParamsId = "";
                $scope.setValue = "";
                $scope.objectIdAlarm = "";
                $scope.objectIdAlarmEn = "";
                $scope.objectIdBase = "";
                $scope.objectIdRadio = "";
                $scope.tskIsuse = 0;
                $scope.peroids = "";
                $scope.tskStyle = 200;


                if ($scope.isAdd == 'Add') {
                    PollingTaskService.savePollTaskElements($scope.duration, $scope.fileId,
                            neIds.toString(), $scope.setParamsId, $scope.setValue, $scope.objectIdAlarm,
                            $scope.objectIdAlarmEn, $scope.objectIdBase, $scope.objectIdRadio,
                            $scope.modal.tskFilter, $scope.tskIsuse, $scope.modal.tskNexttime, $scope.peroids,
                            $scope.tskStyle, $scope.modal.tskTaskname)
                        .success(function(response) {
                            if (response.data == true) {
                                alert('Success');
                                $scope.close();
                            } else {
                                alert('Failed!----' + response.msg)
                            }

                        })
                        .error(function(err) {
                            console.info(err);
                        });
                } else {
                    batchUpgradeService.modifyPollTask($scope.duration, $scope.fileId,
                            neIds.toString(), $scope.setParamsId, $scope.setValue, $scope.objectIdAlarm,
                            $scope.objectIdAlarmEn, $scope.objectIdBase, $scope.objectIdRadio,
                            $scope.modal.tskFilter, $scope.tskIsuse, $scope.modal.tskNexttime, $scope.peroids, $scope.tskStyle, $scope.modal.tskTaskid, $scope.modal.tskTaskname)
                        .success(function(response) {
                            if (response.data == true) {
                                alert('Success');
                                $scope.close();
                            } else {
                                alert('Failed!----' + response.msg)
                            }

                        })
                        .error(function(err) {
                            console.info(err);
                        });
                }

            }

        };

        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();