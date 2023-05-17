(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.upGradeFiles', ['SunWave.pages.deviceManagement.deviceList',
            'SunWave.pages.upgradeManagement.ftpConfig'
        ])
        .controller('ftpModalCtrl', ftpModalCtrl);

    function ftpModalCtrl($rootScope, $scope, transmitModalItems, ftpConfigService, $uibModalInstance) {
        $scope.transmitModalItems = transmitModalItems;

        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            ftpName: ""
        };

        var searchFtp = function() {
            $rootScope.loading = true;
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            // //console.log("$scope.query.Name"+$scope.query.Name);
            ftpConfigService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                    $rootScope.loading = false;

                })
                .error(function(err) {
                    console.info(err);
                    $rootScope.loading = false;

                });
        };
        //查询
        $scope.searchFtpS = function() {
            searchFtp();
        };

        $scope.reset = function() {
            $scope.query.ftpName = '';
        };

        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
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
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
            //console.log($scope.checkedItems);
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 10,
            perPageOptions: [5, 10, 20, 30, 40, 50]

        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchFtp);

        $scope.save = function() {
            if ($scope.checked.length == 0) {
                alert('Must Select One!')
            } else if ($scope.checked.length > 1) {
                alert('Only Select One!')
            } else {
                $uibModalInstance.close($scope.checkedItems[0]);
            }

        };
        $scope.close = function() {
            $uibModalInstance.close();
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

    }

})();