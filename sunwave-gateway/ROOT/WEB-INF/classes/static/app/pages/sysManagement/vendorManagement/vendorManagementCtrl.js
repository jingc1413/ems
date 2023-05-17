(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.vendorManagement', [])
        .controller('vendorManagementCtrl', vendorManagementCtrl);

    function vendorManagementCtrl($scope, $uibModal, vendorManagementService, $log) {

        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            coName: "",
            isSortAsc: "",
            keyword: "",
            sortField: ""
        };

        $scope.xx = {
            select_all: ""
        }

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            vendorManagementService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        $scope.reset = function() {
            $scope.query.coName = '';
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
                    $scope.checked.push(i.coCompanyid);
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
                var index = $scope.checked.indexOf(i.coCompanyid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.coCompanyid);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.items.length == $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
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

        $scope.openAddDialog = function(page, size, items) {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/sysManagement/vendorManagement/vendorModalAdd.html',
                controller: 'vendorModalAddCtrl',
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
                            return $ocLazyLoad.load(['app/pages/sysManagement/vendorManagement/vendorModalAddCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.search();
            }, function(newItems) {
                console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /**添加**/
        $scope.toAddItem = function(page, size) {
            $scope.transmitModalItems = null;
            $scope.isAdd = 'add';
            $scope.openAddDialog(page, size);

        };
        /* 完全删除，从数据库删除 */
        $scope.deleteItem = function() {
            if ($scope.checked == undefined || $scope.checked.length == 0) {
                alert('Must Select One!')
            } else {
                var result = confirm('Are U Sure?');
                if (result) {
                    vendorManagementService.deleteItems($scope.checked).success(function(response) {
                        if (response.data == true) {
                            alert('Delete Success!.');
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            $scope.search();
                        } else {
                            alert('Delete Failed!' + response.msg);
                        }
                    });
                }
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
        $scope.toModifyItem = function(page, size) {
            if ($scope.checked.length == 0) {
                alert("Must Select One");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only Select One");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'modify';
                $scope.openAddDialog(page, size);

            }

        };
        /**查看**/
        $scope.toShowItem = function(page, size) {
            if ($scope.checked.length == 0) {
                alert("Must Select One");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only Select One");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'view';
                $scope.openAddDialog();

            }

        };

    }
})();