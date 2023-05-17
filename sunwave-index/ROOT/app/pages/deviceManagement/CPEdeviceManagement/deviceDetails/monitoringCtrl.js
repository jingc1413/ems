(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
        .controller('monitoringCtrl', monitoringCtrl);

    function monitoringCtrl($scope, $log, $uibModal, $state, deviceDetailsService, $stateParams, $window) {

        if ($stateParams.Id != null) {
            $scope.info.neNeid = $stateParams.Id;
        } else {
            if (window.localStorage) {
                var storage = window.localStorage;
                $scope.info.neNeid = storage.getItem("deviceId");
            }
        }

        //console.log("monitoringCtrl");
        var dataA = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        var dataB = [
            [11, 33, 54, 86, 51, 97, 33],
            [64, 53, 24, 21, 56, 12, 90]
        ];
        $scope.data = dataA;
        $scope.onClick = function(points, evt) {
            $log.debug(points, evt);
        };

        //change data
        $scope.changeData = function() {
            if ($scope.data == dataA) {
                $scope.data = dataB;
            } else {
                $scope.data = dataA;
            }
            $log.debug('当前的数据更改为：', $scope.data);
        };

        // $scope.search = {
        //     searchValue: "",
        //     searchValue1: "",
        // }

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [15, 20, 30, 50, 100, 200]

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

        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            deviceDetailsService.searchMonitoringDetails($scope.info.neNeid, $scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.totalElements;
                    $scope.items = response.content;
                    // //console.log($scope.items.ip)
                })
                .error(function(err) {
                    console.info(err);
                });

        };
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


        $scope.toChart = function(params) {
                if (window.localStorage) {
                    var storage = window.localStorage;
                    storage.setItem("monitorItem", params);

                };
                $state.go("deviceManagement.CPEdeviceManagement.CPEMonitoringDetails", {
                    'item': params,
                    'neNeid': $scope.info.neNeid
                });
                //     var modalInstance = $uibModal.open({
                //         animation: true,
                //         backdrop: "static",
                //         templateUrl: 'app/pages/deviceManagement/deviceDetails/charModel.html',
                //         controller: 'charModelCtrl',
                //         size: 'md',
                //         resolve: {
                //             item: function() {
                //                 return params;
                //             },
                //             deviceDetailsService: function() {
                //                 return deviceDetailsService;
                //             },
                //             deps: ['$ocLazyLoad',
                //                 function($ocLazyLoad) {
                //                     return $ocLazyLoad.load(['app/pages/deviceManagement/deviceDetails/charModelCtrl.js',

                //                     ]);
                //                 }
                //             ]
                //         }
                //     });

            }
            // $scope.toAdvanceSearch = function() {
            //     if ($scope.isAdvance == "Advance") {
            //         $scope.isAdvance = "Basic"
            //     } else {
            //         $scope.isAdvance = "Advance"
            //     }
            //     var modalInstance = $uibModal.open({
            //         animation: true,
            //         backdrop: "static",
            //         templateUrl: 'app/pages/deviceManagement/Authorized/advanceSearch.html',
            //         controller: 'advanceSearchCtrl',
            //         size: 'md',
            //         resolve: {

        //             AlarmForward: function() {
        //                 return $scope.checkedItems[0];
        //             },
        //             isAdd: function() {
        //                 return $scope.isAdd;
        //             },

        //             deps: ['$ocLazyLoad',
        //                 function($ocLazyLoad) {
        //                     return $ocLazyLoad.load(['app/pages/deviceManagement/Authorized/advanceSearchCtrl.js']);
        //                 }
        //             ]
        //         }
        //     });
        // }

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        function beforeOnunload() {
            // $window.location.reload('CPEdeviceManagement.CPEdeviceDetails');
            $state.go('deviceManagement');
            // $window.location.reload('CPEdeviceManagement.CPEdeviceDetails.monitor');
            // //console.log("6666666666666666666666666")
            // $scope.logout();
        };


        // window.addEventListener('beforeunload', beforeUnloadHandler, true);

        // window.addEventListener('beforeunload', beforeUnloadHandler);
        window.addEventListener('beforeunload', beforeOnunload);

        // $scope.upload = function(){
        //     var form = new FormData();
        //     var file = document.getElementById("fileUpload").files[0];
        //     form.append('file', file);
        //     deviceDetailsService.uploadFile(form).success(function (data) {
        //       //console.log('upload success');
        //     }).error(function (data) {
        //        //console.log('upload fail');
        //     })
        //   }
        // $scope.$on('$stateChangeSuccess', function(params) {
        //     $state.reload('CPEdeviceManagement.CPEdeviceDetails');
        // });


    };
})();