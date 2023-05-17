(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.batchUpgrade', [
            'SunWave.pages.PollingManagement.PollingTask'
        ])
        .controller('batchUpgradeCtrl', batchUpgradeCtrl);

    function batchUpgradeCtrl($scope, batchUpgradeService, PollingTaskService, areaService, $uibModal, $log) {

        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            tskTaskname: "",
            areaIds: ""
        };

        $scope.area = {
            selectArea: ""
        };

        $scope.xx = {
            select_all: ""
        };

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            batchUpgradeService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.paginationConf.totalPages = response.data.totalPages;
                    $scope.items = response.data.content;
                })
                .error(function(err) {
                    console.info(err);
                });
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 200,
            pagesLength: 200,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };
        $scope.reset = function() {
            $scope.query.tskTaskname = '';
            $scope.query.areaIds = '';
            $scope.area.selectArea = '';
        };
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.tskTaskid);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.items, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                var index = $scope.checked.indexOf(i.tskTaskid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.tskTaskid);
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
            }
            console.log($scope.checkedItems);
        };


        /**添加**/
        $scope.toAddItem = function() {
            $scope.transmitModalItems = null;
            $scope.isAdd = 'Add';
            $scope.openAddDialog();

        };

        /*******************************************************************
         * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ******************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage',
            searchForm);

        /**修改网元设备**/
        $scope.toModifyItem = function() {
            if ($scope.checked.length == 0) {
                alert("Please select one");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'Modify';
                PollingTaskService.findByTaskId($scope.checkedItems[0].tskTaskid).success(function(res) {
                    $scope.modifyData = res.data;
                    $scope.openAddDialog();
                });


            }

        };

        /**查**/
        $scope.toViewItem = function() {
            if ($scope.checked.length == 0) {
                alert("Please select one");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'View';
                // $scope.openAddDialog();
                PollingTaskService.findByTaskId($scope.checkedItems[0].tskTaskid).success(function(res) {
                    $scope.modifyData = res.data;
                    $scope.openAddDialog();
                });

            }

        };

        //delete
        $scope.delete = function() {
            if ($scope.checked.length == 0) {
                alert("Must Select one");
                return;
            } else {
                if (confirm("Are u sure?")) {
                    var state = [];
                    var tskTaskid = [];
                    for (var i = 0; i < $scope.checkedItems.length; i++) {
                        state.push($scope.checkedItems[i].tskState);
                        tskTaskid.push($scope.checkedItems[i].tskTaskid);
                    }
                    batchUpgradeService.deleteItem(2, tskTaskid.toString()).success(function(response) {
                        if (response.data == true) {
                            alert("Success!");
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            $scope.search();
                        } else {
                            alert("Failed!");
                            $scope.checked = [];
                            $scope.checkedItems = [];
                        }
                    });
                }
            }
        };


        $scope.openAddDialog = function() {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/upgradeManagement/batchUpgrade/addModal.html',
                controller: 'addModalCtrl',
                size: 'lg',
                resolve: {
                    batchUpgradeService: function() {
                        return batchUpgradeService;
                    },

                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    modifyData: function() {
                        return $scope.modifyData;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/upgradeManagement/batchUpgrade/addModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // // $scope.items.push(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.xx.select_all = false;
                $scope.search();
            }, function(newItems) {
                console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
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


    }
})();