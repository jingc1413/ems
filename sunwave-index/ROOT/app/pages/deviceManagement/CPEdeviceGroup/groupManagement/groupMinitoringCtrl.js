angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagment', [])
    .controller('groupMinitoringCtrl', groupMinitoringCtrl);

function groupMinitoringCtrl($rootScope, $scope, groupManagementService, $stateParams, $log, $state) {
    //console.log("groupMinitoringCtrl");
    $scope.isAdd = false;
    $scope.groupId = $stateParams.groupId;
    $scope.isShow = false;
    $scope.value = {
        value: "",
        name: ""
    };

    $scope.items = []

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组
    $scope.checkbox = {
        select_all: false
    }
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
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        groupManagementService.searchMoniConfig($scope.query)
            .success(function(response) {
                $scope.paginationConf.totalItems = response.totalElements
                    //console.log("33" + $scope.paginationConf.totalItems)
                $scope.items = response.content;
                $scope.isShow = true;
            })
            .error(function(err) {
                console.info(err);
            });
    };

    $scope.searchBy = function() {
        searchForm();
    }

    $scope.selectAll = function() {
        if ($scope.checkbox.select_all == true) {
            angular.forEach($scope.items, function(i) {
                i.checked = true;
                $scope.checked.push(i.name);
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
        $scope.checked = [];
        $scope.checkedItems = [];
        angular.forEach($scope.items, function(i) {
            var index = $scope.checked.indexOf(i.name);
            if (i.checked && index == -1) {
                $scope.checked.push(i.name);
                $scope.checkedItems.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checked.splice(index, 1);
                $scope.checkedItems.splice(index, 1);
            };
        });
        //console.log($scope.checkedItems);
        //console.log($scope.checked.length);
        //console.log($scope.items.length)
        if ($scope.items.length == $scope.checked.length) {
            $scope.checkbox.select_all = true;
        } else {
            $scope.checkbox.select_all = false;
        }
    };

    $scope.clearAll = function() {
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
    };

    $scope.edit = function() {
        if ($scope.checkedItems.length == 1) {
            $scope.isAdd = true;
            $scope.value = $scope.checkedItems[0]
        } else {
            // alert("Please selete one !")
            swal({
                title: "Tips:",
                text: "Please selete one  !",
                icon: "info",
                timer: 4000,
            });
        }

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
                var grouds = [];
                grouds.push($scope.groupId);
                var task = {
                    group: grouds,
                    taskId: item.id
                }
                groupManagementService.groupMonitoring(task)
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
        });

    };

    $scope.toAddItem = function() {
        $state.go("reportManagement.CPEmonitorManagement.editMonitoring");
    };

    $scope.editItem = function(item) {
        $state.go("reportManagement.CPEmonitorManagement.editMonitoring", { 'taskId': item.id });
    };


    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


}