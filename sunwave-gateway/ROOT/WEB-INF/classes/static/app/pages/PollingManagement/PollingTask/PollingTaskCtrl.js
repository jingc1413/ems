(function() {
    'use strict';

    angular.module('SunWave.pages.PollingManagement.PollingTask', [])
        .controller('PollingTaskCtrl', PollingTaskCtrl);

    function PollingTaskCtrl($scope, $log, $uibModal, PollingTaskService) {
        $scope.checkbox = {
            select_all: "",
        };

        var vm = this;
        vm.switches = {
            s2: true,
        };

        $scope.query = { //查询条件
            // areaIds: "",
            // tskTaskname: "",
            pageIndex: 0,
            pageSize: 10
        };


        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            PollingTaskService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        // searchForm();

        $scope.reset = function() {
            $scope.query.tskTaskname = '';
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
        //单选
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                // console.log("111111111" + $scope.checked);
                var index = $scope.checked.indexOf(i.tskTaskid);
                // console.log("222222222" + index);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.tskTaskid);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });
            console.log($scope.checkedItems);


            if ($scope.items.length == $scope.checked.length) {
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
        };

        //开始
        $scope.startPoll = function() {
            if ($scope.checkedItems.length == 0) {
                alert('Must Select One!')
            } else {

                for (let i = 0; i < $scope.checkedItems.length; i++) {
                    $scope.state = $scope.checkedItems[0].tskIsuse;
                    if ($scope.checkedItems[i].tskIsuse != $scope.state) {
                        alert('Inconsistent selection status');
                        return
                    }
                    // return
                };
                if ($scope.state == 1) {
                    $scope.taskIds = $scope.checked.toString();
                    if (confirm('Are you sure you want to change the state?')) {
                        PollingTaskService.stateChangeTaskById(0, $scope.taskIds).success(function(res) {
                            if (res.data == true) {
                                alert('Success!');
                                $scope.checked = [];
                                $scope.checkedItems = [];
                                $scope.checkbox.select_all = false;
                                $scope.search();
                            } else {
                                alert(res.msg)
                            }
                        })
                    } else {
                        alert('Cancel!')
                    }
                } else {
                    alert('Polling is turned on for the selected device！')
                }

            }
        };

        //结束
        $scope.endPoll = function() {
            if ($scope.checkedItems.length == 0) {
                alert('Must Select One!')
            } else {

                for (let i = 0; i < $scope.checkedItems.length; i++) {
                    $scope.state = $scope.checkedItems[0].tskIsuse;
                    if ($scope.checkedItems[i].tskIsuse != $scope.state) {
                        alert('Inconsistent selection status');
                        return
                    }
                    // return
                };
                if ($scope.state == 0) {
                    $scope.taskIds = $scope.checked.toString();
                    if (confirm('Are you sure you want to change the state?')) {
                        PollingTaskService.stateChangeTaskById(1, $scope.taskIds).success(function(res) {
                            if (res.data == true) {
                                alert('Success!');
                                $scope.checked = [];
                                $scope.checkedItems = [];
                                $scope.checkbox.select_all = false;
                                $scope.search();
                            } else {
                                alert(res.msg)
                            }
                        })
                    } else {
                        alert('Cancel!')
                    }
                } else {
                    alert('The selected device has ended polling！')
                }

            }
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

        $scope.openAddDialog = function() {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/PollingManagement/PollingTask/PollingTaskModal.html',
                controller: 'PollingTaskModalCtrl',
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
                                'app/pages/PollingManagement/PollingTask/PollingTaskModalCtrl.js',
                                // 'app/pages/PollingManagement/PollingTask/PollingTaskModalService.js'
                            ]);
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

        /**添加**/
        $scope.toAddItem = function(page, size) {
            $scope.transmitModalItems = null;
            $scope.isAdd = 'Add';
            $scope.openAddDialog(page, size);

        };
        /**修改**/
        $scope.toModifyItem = function() {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'Modify';
                PollingTaskService.findByTaskId($scope.checkedItems[0].tskTaskid).success(function(res) {
                    $scope.modifyData = res.data;
                    $scope.openAddDialog($scope.isAdd, $scope.transmitModalItems, $scope.modifyData);
                });

            }

        };
        /**view**/
        $scope.toViewItem = function() {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'View';
                PollingTaskService.findByTaskId($scope.checkedItems[0].tskTaskid).success(function(res) {
                    $scope.modifyData = res.data;
                    $scope.openAddDialog($scope.isAdd, $scope.transmitModalItems, $scope.modifyData);
                });

            }

        };

        //delete
        $scope.delete = function() {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else {
                if (confirm("Are you sure to delete?")) {
                    var state = [];
                    var tskTaskid = [];
                    for (var i = 0; i < $scope.checkedItems.length; i++) {
                        state.push($scope.checkedItems[i].tskState);
                        tskTaskid.push($scope.checkedItems[i].tskTaskid);
                    }
                    PollingTaskService.deleteItem(2, tskTaskid.toString()).success(function(response) {
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


    }
})();