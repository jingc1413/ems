(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.ServerAlarm', [])
        .controller('ServerAlarmCtrl', ServerAlarmCtrl);

    function ServerAlarmCtrl($rootScope, $scope, $uibModal, $log, $http, ServerAlarmService, messageAlertService) {
        $scope.checkbox = {
            select_all: "",
        }

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.checkbox.select_all = false;
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 10,
            // deviceType: "",
            // hostName: "",
            // hostIp: "",
            // msg: "",
            // startTime: "",
            // endTime: ""
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.inputVal = false;
        $scope.deviceTypeShow = true;
        $scope.searchCondition = "";

        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.logId);
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
            angular.forEach($scope.items, function(i) {

                var index = $scope.checked.indexOf(i.logId);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.logId);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });
            //console.log($scope.checkedItems);


            if ($scope.items.length == $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
        };



        //查询表格
        // $scope.search = function(){
        // 	getForm();
        // };
        //物理排序
        $scope.oldOrder = "";
        $scope.orderFun = function(v) {
            if ($scope.oldOrder == "" || $scope.oldOrder == undefined) {
                $scope.oldOrder = v;
            }
            if ($scope.oldOrder == v) {
                $scope.oldOrder = "-" + v;
            } else {
                $scope.oldOrder = v;
            }
            $scope.order = $scope.oldOrder;
        };

        // 修改
        $scope.toModify = function() {
            $scope.isAdd = "modify";
            if ($scope.checked.length == 0) {
                // alert("Must select one");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only select one");
                messageAlertService.alertFun('only');
                return;
            } else {
                $scope.isAdd == 'modify';
                $scope.openEditDialog();
            };
        }

        //删除delete
        $scope.deleteItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must select one");
                messageAlertService.alertFun('must');
                return;
            } else {
                if (messageAlertService.confirmFun('sure')) {
                    // //console.log("选中项");
                    //console.log($scope.checkedItems);
                    ServerAlarmService.deleteItem($scope.checked.toString()).success(function(response) {
                        if (response.code == "200") {
                            // alert("Success!");
                            messageAlertService.successFun('success');
                            $scope.removeAllSelectItemFromArray();
                            $scope.search();
                            // $scope.checkedItems=[];
                        } else {
                            // alert("Failed!" + response.msg);
                            messageAlertService.successFun('failed');
                        }
                    });

                }
            }
        };

        //query查询条件清除
        $scope.clearQueryCondition = function() {
            $scope.query.neType = "";
            $scope.query.hostName = "";
            $scope.query.hostIp = "";
            $scope.query.msg = "";
            // $scope.query.startTime = "";
            // $scope.query.endTime = "";
        };
        $scope.condition = {
            neType: ""
        }

        //判断查询条件
        $scope.switchSearchCondition = function() {

            switch ($scope.searchCondition) {
                case "1":
                    $scope.deviceTypeShow = true;
                    $scope.inputVal = false;
                    $scope.clearQueryCondition();
                    $scope.query.neType = $scope.condition.neType;
                    break;
                case "2":
                    $scope.deviceTypeShow = false;
                    $scope.inputVal = true;
                    $scope.clearQueryCondition();
                    $scope.query.hostName = $scope.conditionValue;
                    break;
                case "3":
                    $scope.deviceTypeShow = false;
                    $scope.inputVal = true;
                    $scope.clearQueryCondition();
                    $scope.query.hostIp = $scope.conditionValue;
                    break;
                case "4":
                    $scope.deviceTypeShow = false;
                    $scope.inputVal = true;
                    $scope.clearQueryCondition();
                    $scope.query.msg = $scope.conditionValue;
                    break;
                default:
                    // $scope.query.keyword = "";
                    $scope.condition.neType = '';
                    $scope.conditionValue = '';
                    $scope.clearQueryCondition();
            }
        };

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $rootScope.loading = true;
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            $scope.switchSearchCondition();
            ServerAlarmService.searchContent($scope.query)
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
                })
                .error(function(err) {
                    $rootScope.loading = false;
                    console.info(err);
                });
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "add";
            $scope.openEditDialog();
        };

        //reset
        $scope.reset = function() {
            $scope.query.hostIp = '';
            $scope.query.hostName = '';
            $scope.query.neType = "";
            $scope.query.msg = "";
            $scope.conditionValue = "";
            $scope.condition.neType = "";
            $scope.searchCondition = "";
            $scope.deviceTypeShow = false;
            $scope.inputVal = true;
        };

        /**查看**/
        $scope.toShowItem = function(page, size) {
            $scope.isAdd = "show";
            if ($scope.checked.length == 0) {
                // alert("Must select one");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                // alert("Only select one");
                messageAlertService.alertFun('only');
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = "show";
                $scope.openEditDialog(page, size);

            }

        };


        $scope.openEditDialog = function() {
            // $scope.checkedItems = [];
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/AlarmManagement/ServerAlarm/addModal.html',
                controller: 'addModalCtrl',
                size: 'md',
                resolve: {
                    AlarmKind: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/AlarmManagement/ServerAlarm/addModalCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行
            // $scope.items = [];
            modalInstance.result.then(function(newItems) {
                $scope.clearAll();
                $scope.search();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


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


        //告警确认
        $scope.Acknowledge = function() {
            $scope.AlarmLogId = [];
            if ($scope.checkedItems.length >= 1) {
                for (let k = 0; k < $scope.checkedItems.length; k++) {
                    const ele = $scope.checkedItems[k];
                    $scope.AlarmLogId.push(ele.logId);
                };

                //判断当前告警是否可以做告警确认
                ServerAlarmService.checkAcknowledged($scope.AlarmLogId.toString()).success(function(res) {
                    if (res.data.success && res.data.success == 'success') {
                        //告警确认
                        ServerAlarmService.alarmConfirm($scope.AlarmLogId.toString()).success(function(res) {
                            if (res.data.success) {
                                messageAlertService.successFun('success');
                                $scope.checked = [];
                                $scope.checkedItems = [];
                                searchForm();

                            } else {
                                messageAlertService.successFun('failed', res.msg);
                                return
                            }
                        })
                    } else if (res.data.success && res.data.success !== 'success') {
                        messageAlertService.confirmFun_alarm('');
                        return
                    } else {
                        messageAlertService.cancelAlarmFun('confirmed');
                    }
                })


            } else {
                messageAlertService.alertFun('must');
            }

        };


        //告警恢复
        $scope.reactiveAlarm = function() {
            $scope.AlarmLogId = [];
            if ($scope.checkedItems.length >= 1) {
                for (let k = 0; k < $scope.checkedItems.length; k++) {
                    const ele = $scope.checkedItems[k];
                    $scope.AlarmLogId.push(ele.logId);
                };
                //判断是否可以取消确认
                ServerAlarmService.checkCancelConfirm($scope.AlarmLogId.toString()).success(function(res) {
                    if (res.data.success && res.data.success == 'success') {
                        //取消确认
                        ServerAlarmService.alarmCancel($scope.AlarmLogId.toString()).success(function() {
                            if (res.data.success && res.data.success == 'success') {
                                messageAlertService.successFun('success');
                                searchForm();
                            } else {
                                messageAlertService.successFun('failed');
                                searchForm();
                            }
                        })
                    } else if (res.data.success && res.data.success !== 'success') {
                        messageAlertService.cancelAlarmFun('cancel');
                        return
                    } else {
                        messageAlertService.alarmClearFun('cantclear');
                    }
                })
            } else {
                messageAlertService.alertFun('must');
            }
        };

        $scope.clearAlarm = function() {
            $scope.AlarmLogId = [];

            if ($scope.checkedItems.length >= 1) {
                for (let k = 0; k < $scope.checkedItems.length; k++) {
                    const ele = $scope.checkedItems[k];
                    $scope.AlarmLogId.push(ele.logId);
                };
                //告警清除判断
                ServerAlarmService.clearAlarmCheck($scope.AlarmLogId.toString()).success(function(res) {
                    if (res.data.success && res.data.success == 'success') {
                        //当前告警清除清除
                        ServerAlarmService.clearAlarm($scope.AlarmLogId.toString()).success(function() {
                            if (res.data.success && res.data.success == 'success') {
                                // alert('Successful clearance!');
                                messageAlertService.successFun('success');
                                searchForm();
                            } else {
                                // alert('Scavenging failure' + res.msg)
                                messageAlertService.successFun('failed');
                                searchForm();
                            }
                        })

                    } else if (res.data.success && res.data.success !== 'success') {
                        messageAlertService.confirmFun_alarm('');
                        return
                    } else {
                        messageAlertService.alarmClearFun('cantclear');
                    }
                })
            } else {
                messageAlertService.alertFun('must');
            }
        };

        //导出
        $scope.exportList = function(item) { 
            $rootScope.loading = true;
            return $http({    
                url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/export',
                    method: "POST",
                    headers: {      
                    'Content-type': 'application/json',
                    'Authorization': window.localStorage.myToken    
                },
                    data: $scope.query,
                    responseType: 'arraybuffer'  
            }).success(function(data) {   //     var blob = new Blob([data], {type:
                $rootScope.loading = false;
                // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                   // 使用{type:
                // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                  
                var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                //         var time=$scope.CurentTime();
                    
                var filename = 'Server Alarm.xlsx';  
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