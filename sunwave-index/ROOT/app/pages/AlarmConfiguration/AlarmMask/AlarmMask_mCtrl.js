(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmMask', [
            'SunWave.pages.PollingManagement.PollingTask'
        ])
        .controller('AlarmMask_mCtrl', AlarmMask_mCtrl);

    function AlarmMask_mCtrl($scope, AlarmMaskService, $uibModal, messageAlertService, PollingTaskService, $log, $interval) {
        $scope.checkbox = {
            select_all: "",
        };

        var vm = this;
        vm.switches = {
            s2: true,
        };

        $scope.query = {
            altTaskname: "",
            pageIndex: 0,
            pageSize: 15
        };

        // var setType = (function(items) {
        //     for (let i = 0; i < items.length; i++) {
        //         const item = items[i];
        //         switch (item.tskStyle) {
        //             case 0:
        //                 item.tskStyle = '';
        //                 break;
        //             case 1:
        //                 item.tskStyle = 'General Polling';
        //                 break;
        //             case 2:
        //                 item.tskStyle = 'Fast Polling';
        //                 break;
        //             case 200:
        //                 item.tskStyle = 'Batch Upgrade';
        //                 break;
        //             case 213:
        //                 item.tskStyle = 'Batch Query Task';
        //                 break;
        //             case 214:
        //                 item.tskStyle = 'Batch Design Task';
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }

        // });

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.checkbox.select_all = false;
        };


        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {

            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            AlarmMaskService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                    $scope.checked = []; //选中的ID
                    $scope.checkedItems = []; //选中的对象数组
                    $scope.checkbox.select_all = false;
                    // setType($scope.items);
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        // searchForm();



        $scope.reset = function() {
            $scope.query.altTaskname = '';
        };



        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.altTaskid);
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
        //单选
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                // //console.log("111111111" + $scope.checked);
                var index = $scope.checked.indexOf(i.altTaskid);
                // //console.log("222222222" + index);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.altTaskid);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });
            //console.log($scope.checkedItems);


            if ($scope.items.length == $scope.checked.length) {
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
        };


        //定时
        // var stopEvent = $interval(function() {
        //     //每10s执行一次定时任务
        //     searchForm();
        // }, 60000);
        // $scope.$on("$destroy", function() {
        //     //离开controller时清除配置,不然scroll会重复请求
        //     $interval.cancel(stopEvent);
        // })


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

        $scope.openAddDialog = function() {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/AlarmConfiguration/AlarmMask/AlarmMask_mModal.html',
                controller: 'AlarmMask_mModalCtrl',
                size: "lg",
                resolve: {
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
                            return $ocLazyLoad.load([
                                'app/pages/AlarmConfiguration/AlarmMask/AlarmMask_mModalCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                // // $scope.items.push(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.checkbox.select_all = false;
                $scope.search();
            }, function(newItems) {
                $scope.search();
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**添加**/
        $scope.toAddItem = function() {
            $scope.transmitModalItems = null;
            $scope.isAdd = 'Add';
            $scope.openAddDialog();

        };
        /**修改**/
        $scope.toModifyItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must select one");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only select one");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'Modify';
                // PollingTaskService.findByTaskId($scope.checkedItems[0].altTaskid).success(function(res) {
                //     $scope.modifyData = res.data;
                //     $scope.openAddDialog($scope.isAdd, $scope.transmitModalItems, $scope.modifyData);
                // });
                $scope.modifyData = [];
                $scope.openAddDialog($scope.isAdd, $scope.transmitModalItems, $scope.modifyData);
            }

        };
        /**view**/
        $scope.toViewItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must select one");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only select one");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'View';
                // AlarmMaskService.findByTaskId($scope.checkedItems[0].tskTaskid).success(function(res) {
                //     $scope.modifyData = res.data;
                //     $scope.openAddDialog($scope.isAdd, $scope.transmitModalItems, $scope.modifyData);
                // });
                $scope.modifyData = [];
                $scope.openAddDialog($scope.isAdd, $scope.transmitModalItems, $scope.modifyData);
            }

        };

        //delete
        $scope.delete = function() {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else {
                if (confirm("Are you sure to delete?")) {

                    AlarmMaskService.deleteItem($scope.checked).success(function(response) {
                        if (response.code == 200) {
                            // alert("Success!");
                            messageAlertService.successFun('success');
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            $scope.search();
                        } else {
                            messageAlertService.successFun('failed');

                            // alert("Failed!");
                            $scope.checked = [];
                            $scope.checkedItems = [];
                        }
                    });
                }
            }
        };

    }
})();