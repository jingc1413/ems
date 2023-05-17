(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.performanceReport', [])
        .controller('datchTaskModalCtrl', datchTaskModalCtrl);

    function datchTaskModalCtrl($scope, transmitModalItems, performanceReportService, $uibModalInstance) {


        $scope.transmitModalItems = transmitModalItems;
        $scope.xx = {
            select_all: "",
            select_all2: ""
        };

        $scope.title = "Performance Parameter";


        $scope.query = { //查询信息
            objId: "",
            objName: "",
            pageIndex: 0,
            pageSize: 10
        };
        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 5,
            pagesLength: 5,
            perPageOptions: [5, 10, 20, 30, 40, 50]

        };

        $scope.search = function() {
            searchDatchtask();
        };

        $scope.searchReset = function() {
            $scope.query.objName = '';
        };


        //查询
        var searchDatchtask = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            performanceReportService.searchDatchtask($scope.query).success(function(response) {
                $scope.paginationConf.totalItems = response.data.totalElements;
                $scope.rows = response.data.content;
                return function() {
                    return $scope.rows;
                }
            });

        };


        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search());


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.objId);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.rows, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.rows, function(i) {
                var index = $scope.checked.indexOf(i.objId);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.objId);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.rows.length == $scope.checked.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            console.log($scope.checkedItems);
        };

        $scope.save = function() {
            var selectParams = $scope.checkedItems;
            if (selectParams.length == 0) {
                alert('please select one');
                return
            } else {
                $scope.close(selectParams);
            };

        };

        $scope.close = function(selectParams) {
            $uibModalInstance.close(selectParams);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };

    }
})();