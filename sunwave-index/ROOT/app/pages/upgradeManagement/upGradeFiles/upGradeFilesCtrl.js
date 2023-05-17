(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.upGradeFiles', [])
        .controller('upGradeFilesCtrl', upGradeFilesCtrl);

    function upGradeFilesCtrl($rootScope, $scope, upGradeFilesService, $uibModal, $log, ftpConfigService, messageAlertService) {

        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            keyword: "",
            name: ""
        };
        $scope.xx = {
            select_all: ""
        };

        $scope.clearAll = function() {
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.xx.select_all = false;
        };

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $rootScope.loading = true;

            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            // //console.log("$scope.query.Name"+$scope.query.Name);
            $scope.clearAll();
            upGradeFilesService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.paginationConf.totalPages = response.data.totalPages;
                    $scope.items = response.data.content;
                    $rootScope.loading = false;
                })
                .error(function(err) {
                    console.info(err);
                    $rootScope.loading = false;

                });
        };
        $scope.reset = function() {
            $scope.query.name = '';
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
                    $scope.checked.push(i.id);
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
                var index = $scope.checked.indexOf(i.id);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.id);
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

        $scope.openAddDialog = function(page, size, items) {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/upgradeManagement/upGradeFiles/addModal.html',
                controller: 'addModalAddCtrl',
                size: 'md',
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    upGradeFilesService: function() {
                        return upGradeFilesService;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/upgradeManagement/upGradeFiles/addModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.search();
                // // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);
                $scope.search();
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**添加**/
        $scope.toAddItem = function() {
            $scope.transmitModalItems = null;
            $scope.isAdd = "Add";
            $scope.openAddDialog();

        };
        /* 完全删除，从数据库删除 */
        $scope.deleteItem = function() {
            if ($scope.checked.length == 0) {
                // alert('Please select one!')
                messageAlertService.alertFun('must');
            } else {
                ftpConfigService.checkModify($scope.checked.toString()).success(function(res) {
                    if (res.data == true) {
                        var result = messageAlertService.confirmFun('sure');
                        if (result) {
                            upGradeFilesService.deleteItems($scope.checked.toString()).success(function(response) {
                                if (response.data == true && response.error == null) {
                                    // alert('Success.');
                                    messageAlertService.successFun('success');
                                    $scope.removeAllSelectItemFromArray();
                                    $scope.search();
                                } else {
                                    // alert('Failed.');
                                    messageAlertService.successFun('failed', response.msg);
                                }
                            });
                        }
                    } else {
                        // alert('In use, cannot be deleted');
                        messageAlertService.inuseFun('');
                        return
                    }
                })
            }

        };
        $scope.removeAllSelectItemFromArray = function() {
            angular.forEach($scope.checked, function(checkId) {
                var keepGoing = true;
                angular.forEach($scope.items, function(item, index, array) {
                    if (keepGoing) {
                        if (item.id == checkId) {
                            $scope.items.splice(index, 1);
                            keepGoing = false;
                        }
                    }

                });
            });
            $scope.checked = [];
            $scope.checkedItems = [];
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

                ftpConfigService.checkModify($scope.checked).success(function(res) {
                    if (res.data == true) {
                        $scope.transmitModalItems = $scope.checkedItems[0];
                        $scope.isAdd = 'Modify';
                        $scope.openAddDialog();
                    } else {
                        // alert('In use, cannot be modify');
                        messageAlertService.inuseFun('');
                        return
                    }
                })


            }

        };
        /**查看**/
        $scope.toShowItem = function(page, size) {
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
                $scope.openAddDialog(page, size);

            }

        };

    }
})();