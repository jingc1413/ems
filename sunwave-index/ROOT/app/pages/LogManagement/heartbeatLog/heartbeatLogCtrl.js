(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.heartbeatLog', [])
        .controller('heartbeatLogCtrl', heartbeatLogCtrl);

    function heartbeatLogCtrl($rootScope, $scope, $log, $uibModal, heartbeatLogService, $http, $interval) {
        $scope.checkbox = {
            select_all: "",
        }
        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            deviceName: "",
            deviceId: ""
        };

        $scope.condition = '';

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.checkbox.select_all = false;
        };

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $rootScope.loading = true;

            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.queryCondition();
            $scope.clearAll();
            heartbeatLogService.searchContent($scope.query)
                .success(function(response) {
                    // $rootScope.loading = false;
                    // $scope.paginationConf.totalItems = response.data.totalElements;
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
                    $scope.clearAll();
                    $scope.checkbox.select_all = false;

                })
                .error(function(err) {
                    console.info(err);
                    $rootScope.loading = false;

                });
        };

        $scope.queryCondition = function() {
            if ($scope.condition == '') {
                $scope.query.deviceName = $scope.query.params;
                $scope.query.deviceId = '';
            } else if ($scope.condition == '1') {
                $scope.query.deviceId = $scope.query.params;
                $scope.query.deviceName = '';
            }
        };


        $scope.reset = function() {
            $scope.query.params = '';
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
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
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
            //console.log($scope.checkedItems);
        };


        //定时
        var stopEvent = $interval(function() {
            //每10s执行一次定时任务
            searchForm();
        }, 60000);
        $scope.$on("$destroy", function() {
            //离开controller时清除配置,不然scroll会重复请求
            $interval.cancel(stopEvent);
        });

        $scope.$on('processSignOut', function(e) {
            $interval.cancel(stopEvent);
        });




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


        $scope.toModifyItem = function(page, size) {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = false;
                $scope.openAddDialog(page, size);

            }

        };

        //导出
        $scope.exportList = function(item) { 
            $rootScope.loading = true;
            return $http({    
                url: Url + '/sunwave-log-management/log/manLinkLog/export',
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
                        
                    var filename = 'Heartbeat Log.xlsx';  
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