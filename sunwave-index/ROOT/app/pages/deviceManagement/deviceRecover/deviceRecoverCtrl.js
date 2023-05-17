(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.deviceRecover', [])
        .controller('deviceRecoverCtrl', deviceRecoverCtrl);

    function deviceRecoverCtrl($scope, deviceRecoverService, $uibModal, messageAlertService) {


        $scope.xx = {
            select_all: ""
        };

        $scope.areaInput = '';

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 10,
            areaIds: ""
        };

        $scope.readonlytrue = true;

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.xx.select_all = false;
        };


        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {

            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            deviceRecoverService.searchContent($scope.query)
                .success(function(response) {
                    // $scope.paginationConf.totalItems = response.data.totalElements;
                    // $scope.items = response.data.content;
                    if (response.code == 200) {
                        $scope.paginationConf.totalItems = response.data.totalElements;
                        $scope.paginationConf.totalPages = response.data.totalPages;
                        $scope.items = response.data.content;
                    } else {
                        messageAlertService.successFun('failed', response.msg);
                    }
                })
                .error(function(err) {
                    console.info(err);
                });

        };
        var getCityAndCounty = function() {
                deviceRecoverService.getCityAndCounty()
                    .success(function(response) {
                        $scope.cities = response.cities;
                        $scope.counties = response.counties;
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            }
            // getCityAndCounty();

        $scope.physicalDele = function() {
            if ($scope.checked.length != 0) {
                if (messageAlertService.confirmFun('sure')) {
                    deviceRecoverService.physicalDele($scope.checked.toString()).success(function(res) {
                        if (res.data == true) {
                            // alert('Success!');
                            messageAlertService.successFun('success')
                            $scope.checkedItems = [];
                            $scope.checked = [];
                            $scope.search();
                        }
                    })
                }
            } else {
                // alert('Must Select One!')
                messageAlertService.alertFun('must');
            }

        };

        $scope.startRecover = function() {
            var bConfirmed1;
            var bConfirmed2;
            if ($scope.checked.length != 0) {
                if (messageAlertService.startRecoverFun('confirm')) {
                    if (messageAlertService.startRecoverFun('')) {
                        bConfirmed1 = 1;
                    } else {
                        bConfirmed1 = 2;
                    };
                    if (messageAlertService.startRecoverFun('added')) {
                        bConfirmed2 = 1;
                    } else {
                        bConfirmed2 = 2;
                    };
                    deviceRecoverService.startRecover(bConfirmed1, bConfirmed2, $scope.checked.toString())
                        .success(function(res) {
                            var data_flag;
                            for (let i = 0; i < res.data.length; i++) {
                                const data = res.data[i];
                                if (data == 0) {
                                    data_flag = true;
                                } else {
                                    data_flag = false;;
                                }
                            }
                            if (data_flag == true) {
                                // alert('success!');
                                messageAlertService.successFun('success')
                                $scope.checkedItems = [];
                                $scope.checked = [];
                                $scope.search();
                            } else {
                                // alert('failed!');
                                messageAlertService.successFun('failed')
                            }

                        }).error(function(err) {
                            //console.log(err)
                        })
                } else {
                    // alert('cancel!');
                    messageAlertService.successFun('')
                };
            } else {
                // alert('Must Select One!')
                messageAlertService.alertFun('must');
            }

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
        $scope.selectOne = function() {
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

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        //导出
        $scope.exportList = function(item) { 
            return $http({    
                url: Url + '/sunwave-device-management/device/neElement/export',
                    method: "POST",
                    headers: {      
                    'Content-type': 'application/json',
                    'Authorization': window.localStorage.myToken    
                },
                    data: $scope.query,
                    responseType: 'arraybuffer'  
            }).success(function(data) {   //     var blob = new Blob([data], {type:
                // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                   // 使用{type:
                // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                  
                var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                //         var time=$scope.CurentTime();
                    
                var filename = 'DeviceList.xlsx';  
                if (window.navigator.msSaveOrOpenBlob) { // For IE:
                           navigator.msSaveBlob(blob, filename);     } else { // For other browsers:
                        
                    var objectUrl = URL.createObjectURL(blob);    
                    var a = document.createElement('a');    
                    document.body.appendChild(a);     // var filename =
                    // data.headers('Content-Disposition').split(';')[1].trim().substr('filename='.length); 
                    //       
                        
                    //console.log("filename:" + filename);    
                    a.setAttribute('style', 'display:none');    
                    a.setAttribute('href', objectUrl);    
                    a.setAttribute('download', filename);    
                    a.click();    
                    URL.revokeObjectURL(objectUrl);  
                }  
            });
        };


        $scope.reset = function() {
            $scope.areaInput = '';
            $scope.query.areaIds = '';
        };

        //getAreaTree
        $scope.getAreaTree = function() {
            $scope.isArea = 'Area';
            $scope.openGetTreeModal();
        };

        $scope.detailDeviceName = function(item) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/detailDeviceNameModal.html',
                controller: 'detailDeviceNameModalCtrl',
                size: "lg",
                resolve: {
                    ModalItems: function() {
                        return $scope.item;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/detailDeviceNameModalCtrl.js',
                                // 'app/pages/AlarmManagement/currentAlarm/currentAlarmModalCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);

            });
        };


        //tree
        $scope.openGetTreeModal = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/safe/areaTreeModal.html',
                controller: 'areaTreeModalCtrl',
                size: 'md',
                resolve: {
                    isArea: function() {
                        return $scope.isArea;
                    },
                    // safeService: function() {
                    //     return safeService;
                    // },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/deviceRecover/areaTreeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(treeNode) {
                // //console.log(treeNode);
                var areaIdArr = [];
                var areaNameArr = [];
                for (var i = 0; i < treeNode.length; i++) {
                    areaIdArr.push(treeNode[i].id);
                    areaNameArr.push(treeNode[i].name);
                }
                $scope.query.areaIds = areaIdArr.toString();
                $scope.areaInput = areaNameArr.toString();
                return $scope.query.areaIds;
            }, function(treeCheckedNode) {
                //console.log(treeCheckedNode);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }
})();