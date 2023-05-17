(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.batchUpgrade', ['SunWave.pages.upgradeManagement.upGradeFiles'])
        .controller('upgradeFilesModalCtrl', upgradeFilesModalCtrl);

    function upgradeFilesModalCtrl($scope, fileId, isModify,
        upGradeFilesService, $uibModalInstance) {


        // $scope.transmitModalItems = transmitModalItems;
        $scope.xx = {
            select_all: ""
        };

        if (isModify) {
            $scope.fileId = fileId;
        } else {
            $scope.fileId = "";
        }

        $scope.title = "Upgrade File query";

        // $scope.isTask = isTask;

        $scope.query = { //查询信息
            name: "",
            pageIndex: 0,
            pageSize: 10
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50]

        };



        //查询upGradefiles列表
        $scope.getContent = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            upGradeFilesService.searchContent($scope.query).success(function(response) {
                $scope.paginationConf.totalItems = response.data.totalElements;
                $scope.paginationConf.totalPages = response.data.totalPages;
                $scope.rows = response.data.content;
                for (let i = 0; i < $scope.rows.length; i++) {
                    const row = $scope.rows[i];
                    if (row.id == $scope.fileId) {
                        row.checked = true;
                    }
                }
            });

        };

        /*******************************************************************
         * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ******************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage',
            $scope.getContent());

        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.id);
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
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                var index = $scope.checked.indexOf(i.id);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.id);
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


        //关闭保存事件
        $scope.save = function() {
            // $scope.conf;
            var checkedArr = [];
            for (let i = 0; i < $scope.rows.length; i++) {
                const row = $scope.rows[i];
                if (row.checked == true) {
                    checkedArr.push(row)
                }
            }
            if (checkedArr.length == 0) {
                alert('Must Check One!')
            } else if (checkedArr.length > 1) {
                alert('Only select One!')
            } else {
                $uibModalInstance.close(checkedArr);
            }
        };


        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();