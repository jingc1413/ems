(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.dasLog', [])
        .controller('dasLogCtrl', dasLogCtrl);

    function dasLogCtrl($rootScope, $scope, $log, $uibModal, dasLogService, messageAlertService, $http) {
        $scope.checkbox = {
            select_all: "",
        }
        $scope.query = {
            deviceName: "",
            deviceId: "",
            logFile: ""
        };

        $scope.params = '';

        $scope.load = {
            isOnLine: false,
            fullPath: ""
        };

        $scope.condition = '';

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.checkbox.select_all = false;
        };
        $scope.search = function() {
            $rootScope.loading = true;
            searchForm();
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.queryCondition();
            $scope.clearAll();
            dasLogService.searchContent($scope.query)
                .success(function(response) {
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
                })
                .error(function(err) {
                    console.info(err);
                });
        };

        $scope.queryCondition = function() {
            switch ($scope.condition) {
                case '0':
                    $scope.query.deviceName = $scope.params;
                    $scope.query.deviceId = '';
                    $scope.query.logFile = '';
                    break;
                case '1':
                    $scope.query.deviceId = $scope.params;
                    $scope.query.deviceName = '';
                    $scope.query.logFile = '';
                    break;
                case '2':
                    $scope.query.logFile = $scope.params;
                    $scope.query.deviceId = '';
                    $scope.query.deviceName = '';
                    break;
                default:
                    break;
            }
        };

        $scope.downloadLog = function(item, event) {
            if ($scope.checkedItems.length > 1) {
                messageAlertService.alertFun('only');
                return
            } else if ($scope.checkedItems.length == 0) {
                messageAlertService.alertFun('must');
                return
            } else {
                $scope.load.isOnLine = Boolean(false);
                $scope.load.fullPath = $scope.checkedItems[0].fullPath;
                $scope.load.log = $scope.checkedItems[0].log;

                // dasLogService.downloadLog($scope.load.isOnLine, $scope.load.fullPath).success(function(res) {
                //     //console.log(res)
                // })

                return $http({    
                    url: Url + '/sunwave-log-management/log/deviceReportLog/downloadReportLog',
                        method: "POST",
                        headers: {      
                        'Content-type': 'application/json',
                        'Authorization': window.localStorage.myToken    
                    },
                        params: {
                        'fullPath': $scope.load.fullPath,
                        'isOnLine': $scope.load.isOnLine
                    },
                        responseType: 'arraybuffer'  
                }).success(function(data) {    
                    var blob = new Blob([data], { type: "application/octet-stream" });
                    //         var time=$scope.CurentTime();
                        
                    var filename = $scope.load.log;  
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
            }

        };

        $scope.delete = function(item, event) {
            if ($scope.checkedItems.length == 0) {
                messageAlertService.alertFun('must');
                return
            } else {
                if (messageAlertService.confirmFun('sure')) {
                    var fullPathArr = [];
                    for (let i = 0; i < $scope.checkedItems.length; i++) {
                        const ele = $scope.checkedItems[i];
                        fullPathArr.push(ele.fullPath)
                    };
                    dasLogService.deleteLog(fullPathArr.toString()).success(function(res) {
                        if (res.code === 200) {
                            alert('Success!');
                            $scope.search();
                        }
                    })
                } else {
                    return
                }
            }
        };


        $scope.reset = function() {
            $scope.query = {
                deviceName: "",
                deviceId: "",
                logFile: ""
            };
            $scope.params = '';
            $scope.condition = '';
        };
        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
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
                    $scope.checked.push(i.fullPath);
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
                var index = $scope.checked.indexOf(i.fullPath);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.fullPath);
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


        $scope.exportList = function(item) { 
            return $http({    
                url: Url + '/sunwave-log-management/log/manLinkLog/export',
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
                    
                var filename = 'Log';  
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

    }
})();