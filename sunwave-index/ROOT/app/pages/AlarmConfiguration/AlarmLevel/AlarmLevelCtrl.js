(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmLevel', [])
        .controller('AlarmLevelCtrl', AlarmLevelCtrl);

    function AlarmLevelCtrl($scope, AlarmLevelService, $uibModal, $log, messageAlertService) {

        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            levelId: "",
            levelName: "",
            orderName: "",
            orderDesc: ""
        };
        $scope.xx = {
            select_all: ""
        }


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.xx.select_all = false;
        };

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.alvAlarmlevelid);
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
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                var index = $scope.checked.indexOf(i.alvAlarmlevelid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.alvAlarmlevelid);
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
            //console.log($scope.checkedItems);
        };

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            AlarmLevelService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                })
                .error(function(err) {
                    console.info(err);
                });

        };

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
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        $scope.reset = function() {
            $scope.query.levelName = '';
            $scope.query.levelId = '';
        };

        //排序
        $scope.faDown = false;
        $scope.faUp = true;
        $scope.orderFun = function(v) {
            $scope.faDown = !$scope.faDown;
            $scope.faUp = !$scope.faUp;
            if ($scope.faDown == true) {
                $scope.query.orderDesc = 'desc';
                $scope.query.orderName = v;
                $scope.search();
            } else if ($scope.faUp == true) {
                $scope.query.orderDesc = 'asc';
                $scope.query.orderName = v;
                $scope.search();
            }

        };

        //modify
        $scope.toModifyItem = function() {
            if ($scope.checked.length != 1) {
                // alert("Must Select One.");
                messageAlertService.alertFun('must');
            } else {
                $scope.isAdd = 'Modify';
                $scope.openEditDialog();
            };
        };
        //view
        $scope.toViewItem = function() {
            if ($scope.checked.length != 1) {
                // alert("Must Select One.");
                messageAlertService.alertFun('must');
            } else {
                $scope.isAdd = 'View';
                $scope.openEditDialog();
            };
        };
        //修改modal
        $scope.openEditDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/AlarmConfiguration/AlarmLevel/modifyModal.html',
                controller: 'modifyModalCtrl',
                size: 'md',
                resolve: {
                    checkedItems: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    AlarmLevelService: function() {
                        return AlarmLevelService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmLevel/modifyModalCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行

            modalInstance.result.then(function(newItems) {
                // alert(newItems);
                // // $scope.items.push(newItems);
                $scope.search();
            }, function(newItems) {
                $scope.search();
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();