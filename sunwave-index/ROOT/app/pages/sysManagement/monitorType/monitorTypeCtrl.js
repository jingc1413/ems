(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.monitorType')
        .controller('monitorTypeCtrl', monitorTypeCtrl);

    /** @ngInject */
    function monitorTypeCtrl($scope, $state, monitorTypeService, $filter, $uibModal) {
        $scope.checkbox = {
            select_all: false,
        }

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 15,
            name: "",
            keyword: ""
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            monitorTypeService.getMonitoringTypes($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.totalElements
                        //console.log("33" + $scope.paginationConf.totalItems)
                    $scope.items = response.content;
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        //search by taskName
        $scope.search = function() {
            searchForm();
        }

        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
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

        $scope.reset = function() {
            $scope.query.userName = '';
            $scope.query.mobile = '';

        };


        //add
        $scope.toAddItem = function(item) {
            $scope.isAdd = "add";
            $scope.openEditDialog(item);
        };

        //Modify
        $scope.toModifyItem = function() {
            if ($scope.checkedItems.length == 1) {
                $scope.isAdd = "modify";
                var item = $scope.checkedItems[0];
                $scope.openEditDialog(item);
            } else {
                // alert("Please select one !");
                swal({
                    title: "Tips:",
                    text: "Please select one !",
                    icon: "info",
                    timer: 4000,
                });
            }



        };

        //View
        $scope.toViewItem = function(item) {
            $scope.isAdd = "view";
            $scope.openEditDialog(item);
        };

        //delete
        $scope.deleteItem = function() {
            if ($scope.checked.length > 0) {
                // var truthBeTold = window.confirm("Are you sure ?");
                swal({
                    title: "Waring",
                    text: "Are you sure ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        var items = $scope.checked;
                        monitorTypeService.deleteMonitoringTypes(items)
                            .success(function(response) {
                                // alert("Success !");
                                swal({
                                    title: "Tips:",
                                    text: "Success !",
                                    icon: "success",
                                    timer: 4000,
                                });
                                searchForm();
                            })
                            .error(function(err) {
                                console.info(err);
                            });
                    }
                })
            } else {
                // alert("Please select !")
                swal({
                    title: "Tips:",
                    text: "Please select !",
                    icon: "info",
                    timer: 4000,
                });
            }
        }

        //单选
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
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
        };

        $scope.openEditDialog = function(item) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/sysManagement/monitorType/tempalteEdit.html',
                controller: 'tempalteEditCtrl',
                size: 'md',
                resolve: {
                    monitorType: function() {
                        return item;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    monitorTypeService: function() {
                        return monitorTypeService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/sysManagement/monitorType/tempalteEditCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行
            // $scope.items = [];
            modalInstance.result.then(function(newItems) {
                $scope.checked = []; //选中的ID
                $scope.checkedItems = []; //选中的对象数组
                $scope.checkbox.select_all = false;
                searchForm();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


    }

})();