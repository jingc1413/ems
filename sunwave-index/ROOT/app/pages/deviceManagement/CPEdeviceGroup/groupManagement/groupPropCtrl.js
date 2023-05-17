angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagment', [])
    .controller('groupPropCtrl', groupPropCtrl);

function groupPropCtrl($rootScope, $scope, $filter, $uibModal, $log, groupManagementService, $state, $stateParams) {
    //console.log("groupPropCtrl");
    $scope.isAdd = false;
    $scope.groupId = $stateParams.groupId;

    $scope.value = {
        value: "",
        name: ""
    };

    $scope.items = [];

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组
    $scope.checkbox = {
        select_all: false
    };
    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 15,
        name: "",
        keyword: ""
    };
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    var searchForm = function() {
        groupManagementService.searchConfig($scope.query)
            .success(function(response) {
                $scope.paginationConf.totalItems = response.totalElements
                $scope.items = response.content;
            })
            .error(function(err) {
                console.info(err);
            });
    };
    $scope.searchBy = function() {
        searchForm();
    };

    //全选
    $scope.selectAll = function() {
        if ($scope.checkbox.select_all == true) {
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
    //单选
    $scope.selectOne = function() {
        $scope.checked = [];
        $scope.checkedItems = [];
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
        };
        //console.log($scope.checkedItems);
    };

    $scope.clearAll = function() {
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
    };

    $scope.openEditDialog = function(item) {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/sysManagement/CPEconfigManagement/tempalteEdit.html',
            controller: 'tempalteEditCtrl',
            size: 'md',
            resolve: {
                item: function() {
                    return item;
                },
                isAdd: function() {
                    return $scope.title;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/sysManagement/CPEconfigManagement/tempalteEditCtrl.js',
                            'app/pages/sysManagement/CPEconfigManagement/configManagementService.js'
                        ]);
                    }
                ]
            }
        });
        modalInstance.result.then(function(newItems) {
            // $scope.checked = []; //选中的ID
            // $scope.checkedItems = []; //选中的对象数组
            // $scope.checkbox.select_all = false;
            searchForm();
            // alert(newItems);
            // // $scope.items.push(newItems);
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toAddItem = function() {
        $scope.isAdd = "add";
        $scope.openEditDialog();
    };

    $scope.toView = function(item) {
        $scope.title = "view";
        $scope.openEditDialog(item);
    }

    $scope.save = function(item) {
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
                var domain = 'group';
                // grouds.push($scope.groupId);
                groupManagementService.groupConfig($scope.groupId, item.id, domain)
                    .success(function(response) {
                        //console.log(response);
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            }
        })
    };

    $scope.toConfiguration = function() {
        $state.go("sysManagement.CPEconfigManagement");
    }

    //分页查询
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

}