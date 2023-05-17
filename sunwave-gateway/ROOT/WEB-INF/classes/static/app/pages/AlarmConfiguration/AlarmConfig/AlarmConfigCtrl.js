(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmConfig', [
            'SunWave.pages.AlarmConfiguration.AlarmLevel',
            'SunWave.pages.AlarmConfiguration.AlarmKind'
        ])
        .controller('AlarmConfigCtrl', AlarmConfigCtrl);

    function AlarmConfigCtrl($scope, AlarmConfigService, AlarmLevelService, AlarmKindService, $uibModal, $log) {

        $scope.query = { //Search条件
            pageIndex: 0,
            pageSize: 10,
            almName: "",
            almLevelid: "",
            almSound: "",
            almKindid: ""
        };
        $scope.xx = {
            select_all: ""
        };

        // $scope.levels = [{
        //     "id": 2,
        //     "name": "Warning"
        // }, {
        //     "id": 3,
        //     "name": "Minor"
        // }, {
        //     "id": 4,
        //     "name": "Major"
        // }, {
        //     "id": 5,
        //     "name": "Critical"
        // }, {
        //     "id": 6,
        //     "name": "Warning2"
        // }];
        $scope.kinds = [{
            "id": 1,
            "name": "device alarm"
        }, {
            "id": 2,
            "name": "event alarm"
        }];

        $scope.search = function() {
            searchForm();
        };
        //Search
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            AlarmConfigService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                    console.log(response);
                })
                .error(function(err) {
                    console.info(err);
                });

        };

        //level
        $scope.getAlarmLevels = function() {
            AlarmLevelService.findAll().success(function(res) {
                $scope.levels = res.data;
            })
        };

        $scope.getAlarmLevels();

        //kind
        $scope.getAlarmKinds = function() {
            AlarmKindService.findAll().success(function(res) {
                $scope.kinds = res.data;
            })
        };

        $scope.getAlarmKinds();


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.almAlarmid);
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
                var index = $scope.checked.indexOf(i.almAlarmid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.almAlarmid);
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

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 200,
            pagesLength: 200,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };


        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        $scope.reset = function() {
            $scope.query = { //Search条件
                pageIndex: 0,
                pageSize: 10,
                almName: "",
                almLevelid: "",
                almSound: "",
                almKindid: ""
            };
        };

        /**add**/
        $scope.toAddItem = function(page, size) {

            $scope.isAdd = 'Add';
            $scope.openAddDialog(page, size);

        };

        /**修改**/
        $scope.toModifyItem = function(page, size) {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'Modify';
                $scope.openAddDialog(page, size);

            }

        };
        /**查看**/
        $scope.toViewItem = function(page, size) {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'View';
                $scope.openAddDialog(page, size);

            }

        };

        $scope.openAddDialog = function(page, size, items) {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/AlarmConfiguration/AlarmConfig/AlarmConfigEditModal.html',
                controller: 'AlarmConfigEditModalCtrl',
                size: size,
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmConfig/AlarmConfigEditModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function() {
                $scope.checked = [];
                $scope.checkedItems = [];
                // // $scope.items.push(newItems);
                $scope.search();
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
                $scope.checked = [];
                $scope.checkedItems = [];
                // // $scope.items.push(newItems);
                $scope.search();
            });
        };


    }
})();