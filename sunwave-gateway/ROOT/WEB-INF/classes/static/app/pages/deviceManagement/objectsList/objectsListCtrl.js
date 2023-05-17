(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.objectsList')
        .controller('objectsListCtrl', objectsListCtrl);

    function objectsListCtrl($scope, objectsListService, $uibModal, $log) {

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
            objObjid: ""
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
                    $scope.checked.push(i.objObjid);
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

                var index = $scope.checked.indexOf(i.objObjid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.objObjid);
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
        var rows;
        var data = {};
        /*查询*/
        var getForm = function(rows) { //查询
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll(); //清空数组
            objectsListService.search($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    console.log(response);
                    $scope.items = response.data.content;

                    // rows = response.data.content;

                    // data.rows = rows;
                    // data.total = $scope.query.pageSize;
                    // // $(function() {
                    // var table = $("#table").bootstrapTable({
                    //     height: 300,
                    //     // data: $scope.items,
                    //     // striped: true,
                    //     pagination: true,

                    //     pageNumber: 1, //初始化加载第一页，默认第一页,并记录
                    //     //pageSize: data.total, //每页的记录行数（*）
                    //     pageSize: 10, //每页的记录行数（*）
                    //     pageList: [10, 25, 50, 100],
                    //     //queryParams: $scope.query,
                    //     columns: [{
                    //         checkbox: true
                    //     }, {
                    //         field: 'objObjid',
                    //         title: 'objObjid'
                    //     }, {
                    //         field: 'objObjname',
                    //         title: 'objObjname'
                    //     }, {
                    //         field: 'objDatatype',
                    //         title: 'objDatatype'
                    //     }, {
                    //         field: 'objObjtype',
                    //         title: 'objObjtype'
                    //     }, {
                    //         field: 'objEnname',
                    //         title: 'objEnname'
                    //     }, {
                    //         field: 'objOid',
                    //         title: 'objOid'
                    //     }, {
                    //         field: 'objSavetype',
                    //         title: 'objSavetype'
                    //     }, {
                    //         field: 'objSavetype',
                    //         title: 'objSavetype'
                    //     }, {
                    //         field: 'objSavetype',
                    //         title: 'objSavetype'
                    //     }]
                    // });
                    // // })
                    // $('#table').bootstrapTable('load', $scope.items);
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
                    //检验删除的参量是否被used
                    // var checkResult = $scope.checkNeObjectsIsUsed(result);
                    // if (checkResult == true) {
                    objectsListService.deleteItem(result).success(function(response) {
                        if (response.data == true) {
                            alert("Delete successful!");
                            $scope.search();
                        } else {
                            alert("Delete failed!" + response.msg);
                        }
                    });
                    // }else{
                    //   alert('The selected parameter is in use, please re select!');
                    // }
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

        //check used
        $scope.checkNeObjectsIsUsed = function(resul) {
            objectsListService.checkNeObjectsIsUsed(resul).success(function(res) {
                if (res == true) {
                    return true;
                } else {
                    return false;
                }
            })
        }

        //getAreaTree
        $scope.getAreaTree = function() {
            $scope.isArea = 'Area';
            $scope.openGetTreeModal();
        }


        //add and edit modal
        $scope.openEditDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/objectsList/editModal.html',
                controller: 'editModalCtrl',
                size: 'md',
                resolve: {
                    checkedItems: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    objectsListService: function() {
                        return objectsListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/objectsList/editModalCtrl.js']);
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
        $scope.openGetTreeModal = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/deviceManagement/objectsList/authorizeModal.html',
                controller: 'authorizeModalCtrl',
                size: 'md',
                resolve: {
                    item: function() {
                        return $scope.item;
                    },
                    objectsListService: function() {
                        return objectsListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/objectsList/authorizeModalCtrl.js']);
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