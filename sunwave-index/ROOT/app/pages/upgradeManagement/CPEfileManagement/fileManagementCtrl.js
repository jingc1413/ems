(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.CPEfileManagement')
        .controller('fileManagementCtrl', fileManagementCtrl);

    /** @ngInject */
    function fileManagementCtrl($scope, $uibModal, fileManagementService) {
        $scope.checkbox = {
            select_all: ""
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
            keyword: "",
            version: "",
            manufacturer: "",

        };

        $scope.query1 = { //查询信息
            manufacturer: null,
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
        var searchManufacturer = function() {
            $scope.ManufacturerItems = ['All'];
            fileManagementService.searchManufacturer()
                .success(function(response) {
                    // $scope.$apply(function() {
                    var items = [];
                    items = response.data;
                    for (let index = 0; index < items.length; index++) {
                        const element = items[index];
                        $scope.ManufacturerItems.push(element);
                    }
                    // $scope.ManufacturerItems = response.data;
                    $scope.query1.manufacturer = $scope.ManufacturerItems[0];
                    // });
                })
                .error(function(err) {
                    console.info(err);
                });
        }

        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            if ($scope.query1.manufacturer == 'All') {
                $scope.query.manufacturer = null;
            } else {
                $scope.query.manufacturer = $scope.query1.manufacturer;
            };
            fileManagementService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.totalElements
                    $scope.items = response.content;
                    searchManufacturer();
                })
                .error(function(err) {
                    console.info(err);
                });

        };

        $scope.search = function() {
            searchForm();
        };

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
            $scope.query.version = '';
            $scope.query1.manufacturer = 'All';
        };

        //modify
        $scope.toModifyItem = function() {
            $scope.isAdd = "modify";
            if ($scope.checkedItems.length == 1) {
                $scope.openEditDialog($scope.checkedItems[0]);
            } else {
                // alert("Please select one !")
                swal({
                    title: "Tips:",
                    text: "Please select one !",
                    icon: "info",
                    timer: 4000,
                });
            }

        };

        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "add";
            var e = null
            $scope.openEditDialog(e);
        };

        //delete
        $scope.deleteItem = function() {
            if ($scope.checkedItems.length > 0) { //选择的文件需大于等于1
                // var truthBeTold = window.confirm("Are you sure  ?")
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
                        fileManagementService.deleteItem($scope.checked)
                            .success(function(response) {
                                if (response.code == 200) {
                                    swal({
                                        title: "Tips:",
                                        text: "Success",
                                        icon: "success",
                                        timer: 4000,
                                    });
                                    $scope.checked = [];
                                    $scope.checkedItems = [];
                                    $scope.checkbox.select_all = false;
                                    searchForm();
                                } else {
                                    swal({
                                        title: "Tips:",
                                        text: response.msg,
                                        icon: "error",
                                        timer: 4000,
                                    });
                                };
                            })
                            .error(function(err) {
                                console.info(err);
                            });
                    }
                });
            } else {
                // alert("Please select one !")
                swal({
                    title: "Tips:",
                    text: "Please select one !",
                    icon: "info",
                    timer: 4000,
                });
            };
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
            //console.log($scope.checkedItems);
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
                templateUrl: 'app/pages/upgradeManagement/CPEfileManagement/uploadFile.html',
                controller: 'uploadFileCtrl',
                size: 'md',
                resolve: {
                    fileManagementService: function() {
                        return fileManagementService;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    item: function() {
                        return item;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/upgradeManagement/CPEfileManagement/uploadFileCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行
            // $scope.items = [];
            modalInstance.result.then(function(newItems) {
                $scope.checked = []; //选中的IDs
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