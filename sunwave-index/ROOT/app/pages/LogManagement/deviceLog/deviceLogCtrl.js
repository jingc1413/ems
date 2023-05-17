(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.deviceLog', [])
        .controller('deviceLogCtrl', deviceLogCtrl);

    function deviceLogCtrl($rootScope, $scope, $log, $uibModal, deviceLogService, $http, $filter) {
        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            deviceId16: "",
            deviceId: "",
            deviceName: "",
            operationType: "",
            startTime: $filter('date')(new Date(), 'yyyy-MM-dd 00:00:00'),
            endTime: $filter('date')(new Date(), 'yyyy-MM-dd 23:59:59')
                // startTime: $filter('date')(new Date().setDate(new Date().getDate() - 29), 'yyyy-MM-dd 00:00:00'),
                // endTime: $filter('date')(new Date(), 'yyyy-MM-dd 23:59:59'),
        };

        $scope.EndTime = '';

        $scope.xx = {
            select_all: "",
        };

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
            if ($scope.query.startTime && $scope.query.endTime) {
                $rootScope.loading = true;
                $scope.query.pageIndex = $scope.paginationConf.currentPage;
                $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
                // $scope.query.operationType = Number($scope.query.operationType);
                $scope.query.deviceId = parseInt($scope.query.deviceId16, 16);
                $scope.query.deviceId.toString();
                $scope.clearAll();
                deviceLogService.searchContent($scope.query)
                    .success(function(response) {
                        // $rootScope.loading = false;
                        // $scope.paginationConf.totalItems = response.data.totalElements;
                        // $scope.paginationConf.totalPages = response.data.totalPages;
                        // $scope.items = response.data.content;
                        if (response.code == 200) {
                            $rootScope.loading = false;
                            $scope.paginationConf.totalItems = response.data.totalElements;
                            $scope.paginationConf.totalPages = response.data.totalPages;
                            $scope.items = response.data.content;

                        } else {
                            messageAlertService.successFun('failed', response.msg);
                            $rootScope.loading = false;
                        }
                        // for (let i = 0; i < $scope.items.length; i++) {
                        //     const item = $scope.items[i];
                        //     switch (item.manTask.tskStyle) {
                        //         case 1:
                        //             item.manTask.tskStyle = 'General Polling';
                        //             break;

                        //         case 2:
                        //             item.manTask.tskStyle = 'Fast Polling';
                        //             break;
                        //         case 200:
                        //             item.manTask.tskStyle = 'Batch Upgrade';
                        //             break;
                        //         case 213:
                        //             item.manTask.tskStyle = 'Batch Query Task';
                        //             break;
                        //         case 214:
                        //             item.manTask.tskStyle = 'Batch Design Task';
                        //             break;
                        //         default:
                        //             break;
                        //     }

                        // }

                    })
                    .error(function(err) {
                        $rootScope.loading = false;
                        console.info(err);
                    });
            } else {
                alert('Must select time!')
            }

        };

        $scope.reset = function() {
            $scope.query.deviceId16 = '';
            $scope.query.deviceId = '';
            $scope.query.deviceName = '';
            $scope.query.operationType = "";
            $scope.query.startTime = '';
            $scope.query.endTime = '';
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
                    $scope.checked.push(i.qryEleqrylogid);
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
                var index = $scope.checked.indexOf(i.qryEleqrylogid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.qryEleqrylogid);
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

        //排序
        $scope.faDown = false;
        $scope.faUp = true;
        $scope.orderFun = function(v) {
            $scope.faDown = !$scope.faDown;
            $scope.faUp = !$scope.faUp;
            if ($scope.faDown == true) {
                $scope.query.orderDesc = 'desc';
                $scope.query.orderName = v;
                $scope.search();
            } else if ($scope.faUp == true) {
                $scope.query.orderDesc = 'asc';
                $scope.query.orderName = v;
                $scope.search();
            }

        };


        // divceName链接弹框
        $scope.detailDeviceName = function(item, $event) {
            // //console.log(`当前item是${item},event是${$event}`);
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/LogManagement/deviceLog/detailDeviceNameModal.html',
                controller: 'detailDeviceNameModalLogCtrl',
                size: "md",
                resolve: {
                    checkedItems: function() {
                        return item;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/LogManagement/deviceLog/detailDeviceNameModalLogCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);

            });
        };


        //导出
        $scope.exportList = function(item) { 
            $rootScope.loading = true;
            return $http({    
                url: Url + '/sunwave-log-management/log/ManEleqryLog/export',
                    method: "POST",
                    headers: {      
                    'Content-type': 'application/json',
                    'Authorization': window.localStorage.myToken    
                },
                    data: $scope.query,
                    responseType: 'arraybuffer'  
            }).success(function(data, status, headers, config) {   //     var blob = new Blob([data], {type:
                $rootScope.loading = false;
                // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                   // 使用{type:
                // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                  
                var contentType = headers('Content-Type');
                if (contentType == 'multipart/form-data;charset=utf-8') {
                    var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    //         var time=$scope.CurentTime();
                        
                    var filename = 'Device Log.xlsx';  
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
                } else {
                    let resBlob = new Blob([data])
                    let reader = new FileReader()
                    reader.readAsText(resBlob, "utf-8")
                    reader.onload = () => {
                        let res = JSON.parse(reader.result)
                        alert(res.msg);
                    }
                }
                $rootScope.loading = false;
            });
        };



    }
})();