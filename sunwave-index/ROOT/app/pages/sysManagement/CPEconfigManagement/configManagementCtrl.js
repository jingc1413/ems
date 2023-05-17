angular.module('SunWave.pages.sysManagement.CPEconfigManagement', [])
    .controller('configManagementCtrl', configManagementCtrl);

function configManagementCtrl($rootScope, $scope, $filter, configManagementService, $uibModal, $log) {
    $scope.checkbox = {
        select_all: false
    };


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
        teName: ""
    };
    // 配置分页基本参数
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    //查询
    var searchForm = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        configManagementService.searchContent($scope.query)
            .success(function(response) {
                $scope.paginationConf.totalItems = response.totalElements;
                $scope.items = response.content;
            })
            .error(function(err) {
                console.info(err);
            });
    };

    $scope.rules = {
        name: "NAME"
    }

    $scope.search = function() {
        searchForm();

        // $scope.isMessage = true;
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
        $scope.query.userName = '';
        $scope.query.mobile = '';

    };

    //add
    $scope.toAddItem = function() {
        $scope.isAdd = "add";
        $scope.openEditDialog();
    };

    $scope.viewModel = function() {
        if ($scope.checkedItems.length == 0) {
            // alert("Please select one !");
            // $scope.rules.name = "Please select one !";
            // $scope.$broadcast("toMyAlert", $scope.rules);
            swal({
                title: "Tips:",
                text: "Please select one !",
                icon: "info",
                timer: 4000
            });
        } else if ($scope.checkedItems.length > 1) {
            // alert("Can only select one !")
            swal({
                title: "Tips:",
                text: "Can only select one !",
                icon: "info",
                timer: 4000
            });
        } else {
            $scope.isAdd = "view";
            $scope.openEditDialog();
        }

    };

    $scope.editModel = function() {
        if ($scope.checkedItems.length == 0) {
            // alert("Please select one !")
            // $scope.rules.name = "Please select one !";
            // $scope.$broadcast("toMyAlert", $scope.rules);
            swal({
                title: "Tips:",
                text: "Please select one !",
                icon: "info",
                timer: 4000
            });
        } else if ($scope.checkedItems.length > 1) {
            // alert("Can only select one !");
            swal({
                title: "Tips:",
                text: "Can only select one !",
                icon: "info",
                timer: 4000
            });
        } else {
            $scope.isAdd = "modify";
            $scope.openEditDialog();
        }
    }

    $scope.view = function(item) {
        $scope.isAdd = "view";
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/sysManagement/CPEconfigManagement/tempalteEdit.html',
            controller: 'tempalteEditCtrl',
            size: 'lg',
            resolve: {
                item: function() {
                    return item;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                configManagementService: function() {
                    return configManagementService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/sysManagement/CPEconfigManagement/tempalteEditCtrl.js']);
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

            // alert(newItems);
            // // $scope.items.push(newItems);
            searchForm();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
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

    $scope.deleteItem = function() {
        if ($scope.checkedItems.length < 1) {
            // alert("Please select at least one item !");
            swal({
                title: "Tips",
                text: "Please select at least one item !",
                icon: "info",
                timer: 4000
            });
        } else {
            // var truthBeTold = false;
            // window.confirm("Are you sure ?");
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
                    configManagementService.deleteItem($scope.checked)
                        .success(function(response) {
                            if (response.code == 200) {
                                swal({
                                    title: "Tips",
                                    text: response.msg,
                                    icon: "success",
                                    timer: 4000,
                                });
                                searchForm();
                                $scope.checked = [];
                                $scope.checkedItems = [];
                                $scope.checkbox.select_all = false;
                            } else {
                                // alert(response.msg);
                                swal({
                                    title: "Tips",
                                    text: response.msg,
                                    icon: "info",
                                    timer: 4000,
                                });

                            };

                        })
                        .error(function(err) {
                            console.info(err);
                        });
                } else {}
            });
            // if (truthBeTold) {

            // } else {

            // };


        }
    }

    //修改modal

    $scope.openEditDialog = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/sysManagement/CPEconfigManagement/tempalteEdit.html',
            controller: 'tempalteEditCtrl',
            size: 'lg',
            resolve: {
                item: function() {
                    return $scope.checkedItems[0];
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                configManagementService: function() {
                    return configManagementService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/sysManagement/CPEconfigManagement/tempalteEditCtrl.js']);
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

            // alert(newItems);
            // // $scope.items.push(newItems);
            searchForm();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    /***************************************************************
    当页码和页面记录数发生变化时监控后台查询
    如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
    ***************************************************************/
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


}