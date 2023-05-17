(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.performanceReport', [])
        .controller('datchTaskModalCtrl', datchTaskModalCtrl);

    function datchTaskModalCtrl($rootScope, $scope, transmitModalItems, performanceReportService, $uibModalInstance, messageAlertService) {


        $scope.transmitModalItems = transmitModalItems;
        $scope.xx = {
            select_all: "",
            select_all2: ""
        };

        // $scope.title = "Performance Parameter";
        if ($rootScope.language == 'chinese') {
            $scope.title = '性能参数'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Performance Parameter';
        } else {
            $scope.title = 'Performance Parameter';
        };


        $scope.query = { //查询信息
            objId: "",
            objName: "",
            pageIndex: 0,
            pageSize: 10
        };
        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 10,
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
                //过滤并选中
                var o = 0;
                if ($scope.checkedItems) {
                    for (let index = 0; index < $scope.rows.length; index++) {
                        for (let i = 0; i < $scope.checkedItems.length; i++) {
                            if ($scope.checkedItems[i].objId == $scope.rows[index].objId) {
                                $scope.rows[index].checked = true;
                                o++;
                            }

                        }

                    }
                    if ($scope.rows.length == o) {
                        $scope.xx.select_all = true;

                    } else {
                        $scope.xx.select_all = false;

                    }

                }
            });

        };


        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchDatchtask);


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            // if ($scope.xx.select_all) {
            //     $scope.checked = [];
            //     $scope.checkedItems = [];
            //     angular.forEach($scope.rows, function(i) {
            //         i.checked = true;
            //         $scope.checked.push(i.objId);
            //         $scope.checkedItems.push(i);
            //     });
            // } else {
            //     angular.forEach($scope.rows, function(i) {
            //         i.checked = false;
            //         $scope.checked = [];
            //         $scope.checkedItems = [];
            //     });
            // }

            angular.forEach($scope.rows, function(i) {
                var index = $scope.checked.indexOf(i.objId);
                if ($scope.xx.select_all == true) {

                    if (index == -1) {
                        i.checked = true;
                        $scope.checked.push(i.objId);
                        $scope.checkedItems.push(i);
                    }
                } else {
                    if (index !== -1) {
                        i.checked = false;
                        $scope.checked.splice(index, 1);
                        $scope.checkedItems.splice(index, 1);
                    }
                }

            });
        };
        $scope.selectOne = function() {
            // angular.forEach($scope.rows, function(i) {
            //     var index = $scope.checked.indexOf(i.objId);
            //     if (i.checked && index == -1) {
            //         $scope.checked.push(i.objId);
            //         $scope.checkedItems.push(i);
            //     } else if (!i.checked && index !== -1) {
            //         $scope.checked.splice(index, 1);
            //         $scope.checkedItems.splice(index, 1);
            //     };
            // });


            // if ($scope.rows.length == $scope.checked.length) {
            //     $scope.xx.select_all = true;
            // } else {
            //     $scope.xx.select_all = false;
            // }


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
            var k = 0;
            for (let i = 0; i < $scope.rows.length; i++) {
                if ($scope.rows[i].checked == true) {
                    k++;
                }
                if (k == $scope.rows.length) {
                    $scope.xx.select_all = true;
                } else {
                    $scope.xx.select_all = false;
                }
            };
        };

        $scope.save = function() {
            var selectParams = $scope.checkedItems;
            if (selectParams.length == 0) {
                messageAlertService.alertFun('must');
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