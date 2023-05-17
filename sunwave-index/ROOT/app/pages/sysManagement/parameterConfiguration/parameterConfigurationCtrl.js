(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.sysParameter', [
            'SunWave.pages.deviceManagement.deviceList'
        ])
        .controller('parameterConfigurationCtrl', parameterConfigurationCtrl);

    function parameterConfigurationCtrl($rootScope, $scope, parameterConfigurationService, $uibModal, $log, messageAlertService, deviceListService) {

        $scope.query = {
            // configType: "",
            alarmName: "",
            // deviceTypeId: "",
            pageIndex: 0,
            pageSize: 10
        };
        $scope.xx = {
            select_all: ""
        }

        $scope.clearAll = function() {
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.xx.select_all = false;
        };

        $scope.search = function() {
            searchForm();
            $rootScope.loading = true;
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            parameterConfigurationService.searchContent($scope.query)
                .success(function(response) {
                    $rootScope.loading = false;
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;

                })
                .error(function(err) {
                    console.info(err);
                });
        };

        // for (let i = 0; i < $scope.items.length; i++) {
        //     $scope.items[i].afficheInvalidate = $scope.items[i].afficheInvalidate.substring(0, 10);
        //     $scope.items[i].inputTime = $scope.items[i].inputTime.substring(0, 10);
        // }

        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };
        $scope.searchDeviceType();


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
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            //console.log($scope.checkedItems);
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        $scope.reset = function() {
            $scope.query.alarmName = '';
        };
        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        $scope.openAddDialog = function() {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/sysManagement/parameterConfiguration/addModal.html',
                controller: 'addModalCtrl',
                size: 'md',
                resolve: {
                    transmitModalItems: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/sysManagement/parameterConfiguration/addModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.xx.select_all = false;
                // // $scope.items.push(newItems);
                $scope.search();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.aaa = "search();"

        /**添加**/
        $scope.toAddItem = function() {
            $scope.transmitModalItems = null;
            $scope.isAdd = 'Add';
            $scope.openAddDialog();

        };


        /* 完全删除，从数据库删除 */
        $scope.deleteItem = function() {
            if ($scope.checked == undefined || $scope.checked.length == 0) {
                // alert('Must Select One!')
                messageAlertService.alertFun('must');
            } else {
                var result = messageAlertService.confirmFun('sure');
                if (result) {
                    parameterConfigurationService.deleteItems($scope.checked).success(function(response) {
                        if (response.code == 200) {
                            // alert('Delete Success!');
                            messageAlertService.successFun('success');
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            // $scope.removeAllSelectItemFromArray();
                            $scope.search();

                        } else {
                            alert(response.msg);
                            // messageAlertService.successFun('failed');
                        }
                    });
                }
            }
        };
        $scope.removeAllSelectItemFromArray = function() {
            angular.forEach($scope.checked, function(checkId) {
                var keepGoing = true;
                angular.forEach($scope.items, function(item, index, array) {
                    if (keepGoing) {
                        if (item.id == checkId) {
                            $scope.items.splice(index, 1);
                            keepGoing = false;
                        }
                    }

                });
            });
            $scope.checked = [];
            $scope.checkedItems = [];
        };

        /**修改**/
        $scope.toModify = function() {

            if ($scope.checked.length == 0) {
                // alert("Must Select One!");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only Select One!");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'Modify';
                $scope.openAddDialog();

            }

        };
        /**查看**/
        $scope.toShowItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must Select One!");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only Select One!");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'View';
                $scope.openAddDialog();

            }

        };

    }
})();