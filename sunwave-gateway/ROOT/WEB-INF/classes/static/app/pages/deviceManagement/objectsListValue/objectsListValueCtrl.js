(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.objectsListValue', [])
        .controller('objectsListValueCtrl', objectsListValueCtrl);

    function objectsListValueCtrl($scope, objectsListValueService, $uibModal, $log) {

        $scope.checkbox = {
            select_all: "",
        }


        $scope.selectedItem = "";

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 10,
            valueKey: "",
            valueValue: ""
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
                    $scope.checked.push(i.valueId);
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

                var index = $scope.checked.indexOf(i.valueId);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.valueId);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });
            console.log($scope.checkedItems);


            if ($scope.items.length == $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
        };

        $scope.search = function() {
            getForm();
        };
        /*查询*/
        var getForm = function() { //查询
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll(); //清空数组
            objectsListValueService.search($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    console.log(response);
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
        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "add";
            $scope.openEditDialog();
        };
        //modify
        $scope.toModifyItem = function() {
            if ($scope.checkedItems.length != 1) {
                alert('Must Select And Only Select One!')
            } else {
                $scope.isAdd = "edit";
                $scope.openEditDialog();
            }
        };
        //delete
        $scope.deleteItem = function() {
            if ($scope.checked.length == 0) {
                alert("You must select one.");
                return;
            } else {
                if (confirm("Are you sure to delete?")) {
                    console.log($scope.checkedItems);
                    var result = $scope.toStr($scope.checked);
                    objectsListValueService.deleteItem(result).success(function(response) {
                        if (response.data == true) {
                            alert("Delete successful!");
                            $scope.search();
                        } else {
                            alert("Delete failed!" + response.msg);
                        }
                    });
                }
            }
        };

        //toString
        $scope.toStr = function(checkedIds) {
            var arr = [];
            if (checkedIds != null && checkedIds.length != 0) {
                for (let i = 0; i < checkedIds.length; i++) {
                    arr.push(checkedIds[i]);
                }
            }
            return arr.toString();
        }

        //getAuthorize
        $scope.getAuthorize = function() {
            $scope.Authorize = 'x';
            $scope.getAuthorizeModal();
        }

        //add and edit modal
        $scope.openEditDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/deviceManagement/objectsListValue/editModal.html',
                controller: 'editModalCtrl',
                size: 'md',
                resolve: {
                    checkedItems: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    objectsListValueService: function() {
                        return objectsListValueService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/objectsListValue/editModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newitem) {
                // console.log(newitem);
                $scope.search();
            }, function(newitem) {
                console.log(newitem);
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        //授权authorize
        $scope.getAuthorizeModal = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/objectsListValue/authorizeModal.html',
                controller: 'authorizeModalCtrl',
                size: 'md',
                resolve: {
                    item: function() {
                        return $scope.item;
                    },
                    objectsListValueService: function() {
                        return objectsListValueService;
                    },
                    isAuthorize: function() {
                        return $scope.isAuthorize;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/objectsListValue/authorizeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newitem) {
                console.log(newitem);
            }, function(newitem) {
                console.log(newitem);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //排序
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

        /*******************************************************************
         * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ******************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage',
            getForm);





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


    }
})();