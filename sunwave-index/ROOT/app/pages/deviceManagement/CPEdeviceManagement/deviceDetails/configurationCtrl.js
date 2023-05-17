(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
        .controller('configurationCtrl', configurationCtrl);

    function configurationCtrl($scope, $log, $uibModal, $state, $stateParams, deviceDetailsService) {
        // $scope.search = {
        //     searchValue: "",
        //     searchValue1: "",
        // }
        $scope.Id = $stateParams.Id;
        $scope.modelName = $stateParams.modelName
            //console.log("configurationCtrl")
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
            teName: ""
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        //查询ip
        var searchDeviceIP = function() {
            var id = null;
            if ($scope.Id != null) {
                id = $scope.Id;
            } else {
                if (window.localStorage) {
                    var storage = window.localStorage;
                    id = storage.getItem("deviceId");
                }

            }
            deviceDetailsService.searchDeviceIP(id)
                .success(function(response) {
                    //console.log(response);
                    $scope.task = response.data;
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        searchDeviceIP();

        //保存修改IP
        $scope.saveDeviceIP = function() {
            //console.log($scope.task);
            var id = null;
            if ($scope.Id != null) {
                id = $scope.Id;
            } else {
                if (window.localStorage) {
                    var storage = window.localStorage;
                    id = storage.getItem("deviceId");
                };
            };
            deviceDetailsService.modifyDeviceIP(id, $scope.task)
                .success(function(response) {
                    if (response.code == 200) {
                        // alert("Success !");
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                    };

                })
                .error(function(err) {
                    console.info(err);
                });
        }

        //查询config
        var searchForm = function() {
            $scope.query.modelName = $scope.modelName;
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            deviceDetailsService.searchConfig($scope.query)
                .success(function(response) {
                    //console.log(response);
                    $scope.items = response.content;
                    $scope.paginationConf.totalItems = response.totalElements;
                })
                .error(function(err) {
                    console.info(err);
                });

        };
        // searchForm();

        $scope.search = function() {
            searchForm();
        };

        //应用配置
        $scope.save = function(item) {
            // var deviceids = [];
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
                    var domain = 'device'
                        // deviceids.push($scope.deviceId);
                    deviceDetailsService.deviceConfig(item.id, $scope.Id, domain, $scope.modelName)
                        .success(function(response) {
                            if (response.code == 200) {
                                // alert("Success !");
                                swal({
                                    title: "Tips:",
                                    text: "Success !",
                                    icon: "success",
                                    timer: 4000,
                                });
                            } else {
                                // alert(response.msg);
                                swal({
                                    title: "Tips:",
                                    text: response.msg,
                                    icon: "success",
                                    timer: 4000,
                                });
                            };
                        })
                        .error(function(err) {
                            console.info(err);
                        });
                }
            })
        };

        //查看配置详情
        $scope.view = function(item) {
            $scope.isAdd = "view";
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
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/pages/sysManagement/CPEconfigManagement/tempalteEditCtrl.js',
                                    'app/pages/sysManagement/CPEconfigManagement/configManagementService.js',
                                ]
                            });
                        }
                    ]
                }
            });
        };
        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);




    };


    //文本超出过滤器
    // angular.module('SunWave.pages.AlarmConfiguration.AlarmForward')
    //     .filter('cut', function() {
    //         return function(value, wordwise, max, tail) {
    //             if (!value) return '';

    //             max = parseInt(max, 10);
    //             if (!max) return value;
    //             if (value.length <= max) return value;

    //             value = value.substr(0, max);
    //             if (wordwise) {
    //                 var lastspace = value.lastIndexOf(' ');
    //                 if (lastspace != -1) {
    //                     value = value.substr(0, lastspace);
    //                 }
    //             }

    //             return value + (tail || ' …');
    //         };
    //     });
})();