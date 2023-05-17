(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
        .controller('maintenanceCtrl', maintenanceCtrl);

    function maintenanceCtrl($scope, $log, $uibModal, $state, $stateParams, deviceDetailsService) {
        // $scope.search = {
        //     searchValue: "",
        //     searchValue1: "",
        // }
        //console.log("maintenanceCtrl");
        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 3,
            pagesLength: 3,
            perPageOptions: [1, 3] //[15, 20, 30, 50, 100, 200]

        };

        $scope.isLoading = false;
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
            pageSize: 6,
            name: "",
            keyword: "",
            searchValue: null,
            searchValue1: null
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        // //查询
        // var searchForm = function() {
        //     // $scope.query.pageIndex = $scope.paginationConf.currentPage;
        //     // $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        //     deviceDetailsService.searchMonitoringDetails()
        //         .success(function(response) {
        //             //console.log("22222222222" + response);
        //             $scope.paginationConf.totalItems = 200;
        //             $scope.items = response;
        //             //console.log($scope.items.ip)
        //         })
        //         .error(function(err) {
        //             console.info(err);
        //         });

        // };
        // searchForm();

        //重置查询条件
        $scope.reset = function() {
            $scope.search.searchValue = "";
            $scope.search.searchValue1 = "";
            $scope.search.searchValue2 = "";

        };

        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.neNeid);
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
                var index = $scope.checked.indexOf(i.neNeid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.neNeid);
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
    }
})();