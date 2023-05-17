(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.SeacurityManagement.IpblockList', [])
        .controller('IpblockListCtrl', IpblockListCtrl);

    function IpblockListCtrl($rootScope, $scope, IpblockListService, $uibModal, $log, messageAlertService) {

        $scope.aler = function() {
            // alert('ede')
        };

        $scope.type = "safe2"; //默认显示
        $scope.myClick = function(type) {
            $scope.type = type;
        };

        $scope.conditions = [{
                "id": 0,
                "name": "BeginIP"
            },
            {
                "id": 1,
                "name": "EndIP"
            }
        ];

        $scope.query = { //查询条件
            beginIp: "",
            endIp: "",
            pageIndex: 0,
            pageSize: 15
        };
        $scope.query2 = { //查询条件
            ip: "",
            pageIndex: 0,
            pageSize: 15
        };
        $scope.xx = {
            select_all: ""
        };

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.xx.select_all = false;
        };

        $scope.search = function() {
            searchForm();
            searchForm_black();
        };

        //时间转换  sss=>m
        $scope.sToM = function(arg) {
            var output;
            if (arg instanceof Array) {
                output = new Array();
                for (var i = 0; i < arg.length; i++) {
                    output.push(Math.round((parseInt(arg[i] / 60) + arg[i] % 60 / 60) * 100) / 100000);
                }
            } else {
                output = Math.round((parseInt(arg / 60) + arg % 60 / 60) * 100) / 100000;
            }
            return output;
        };

        //时间转换  sss<=m
        $scope.MTos = function(arg) {
            var output;
            if (arg instanceof Array) {
                output = new Array();
                for (var i = 0; i < arg.length; i++) {
                    output.push(Math.round((parseInt(arg * 60 * 1000))));
                }
            } else {
                output = Math.round((parseInt(arg * 60 * 1000)));
            }
            return output;
        };


        //查询ip
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            IpblockListService.search($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                    //console.log(response);
                })
                .error(function(err) {
                    console.info(err);
                });

        };

        var searchForm_black = function() {
            $scope.query2.pageIndex = $scope.paginationConf2.currentPage;
            $scope.query2.pageSize = $scope.paginationConf2.itemsPerPage;
            // $scope.query2
            IpblockListService.search2()
                .success(function(response) {
                    // $scope.paginationConf2.totalItems = response.data.totalElements;
                    $scope.items2 = response.data.content;
                    //console.log(response);
                })
                .error(function(err) {
                    console.info(err);
                });

        };

        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        $scope.checked2 = []; //选中的ID
        $scope.checkedItems2 = []; //选中的对象数组

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

        $scope.selectAll2 = function() {
            if ($scope.xx.select_all2) {
                $scope.checked2 = [];
                $scope.checkedItems2 = [];
                angular.forEach($scope.items2, function(i) {
                    i.checked = true;
                    $scope.checked2.push(i.id);
                    $scope.checkedItems2.push(i);
                });
            } else {
                angular.forEach($scope.items2, function(i) {
                    i.checked = false;
                    $scope.checked2 = [];
                    $scope.checkedItems2 = [];
                });
            }
            //console.log($scope.checked2);
        };
        $scope.selectOne2 = function() {
            angular.forEach($scope.items2, function(i) {
                var index = $scope.checked2.indexOf(i.id);
                if (i.checked2 && index == -1) {
                    $scope.checked2.push(i.id);
                    $scope.checkedItems2.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked2.splice(index, 1);
                    $scope.checkedItems2.splice(index, 1);
                };
            });


            if ($scope.items2.length == $scope.checked2.length) {
                $scope.xx.select_all2 = true;
            } else {
                $scope.xx.select_all2 = false;
            }
            //console.log($scope.checkedItems2);
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };
        $scope.paginationConf2 = { //分页信息
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
            'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search);

        $scope.reset = function() {
            $scope.query.beginIp = "";
            $scope.query.endIp = "";
        };

        $scope.isRemain = function(remind, value) {
            //判断是否密码过期提醒true
            if (remind == true) {
                value = 0;
            } else {
                value = 1;
            };

            return value;
        };


        // $scope.reset = function() {
        //     $scope.log = {
        //         isLoginMessage: "",
        //         isMustModifyPassword: "",
        //         isPassowrdRemind: "",
        //         loginFreeTime: "",
        //         loginLockDuration: "",
        //         loginMessageContent: "",
        //         loginRetryDuration: "",
        //         loginRetryTimes: "",
        //         passwordBigCharMaxLen: "",
        //         passwordBigCharMinLen: "",
        //         passwordMaxLen: "",
        //         passwordMinLen: "",
        //         passwordNumMaxLen: "",
        //         passwordNumMinLen: "",
        //         passwordRemindDay: "",
        //         passwordSmallCharMaxLen: "",
        //         passwordSmallCharMinLen: "",
        //         passwordSpecialMaxLen: "",
        //         passwordSpecialMinLen: "",
        //         passwordValidityDay: "",
        //         simplePassword: "",
        //         usernameMaxLen: "",
        //         usernameMinLen: ""
        //     };
        // };

        $scope.save = function() {
            if (messageAlertService.confirmFun('sure')) {
                //保存修改规则
                //console.log($scope.log);
                $scope.log.loginFreeTime = $scope.MTos($scope.log.loginFreeTime);
                $scope.log.loginLockDuration = $scope.MTos($scope.log.loginLockDuration);
                $scope.log.loginRetryDuration = $scope.MTos($scope.log.loginRetryDuration);
                IpblockListService.modifyRule($scope.log).success(function(res) {
                    if (res.data == true) {
                        // alert('success!');
                        messageAlertService.successFun('success');
                        $scope.searchRuledata();
                    }
                })
            }
        };

        //add Ip
        $scope.toAddItem = function() {
            $scope.isAdd = 'Add';
            $scope.openAddModal();
        };
        //modify Ip
        $scope.toModify = function() {
            $scope.isAdd = 'Modify';
            if ($scope.checkedItems.length != 1) {
                // alert('Must Select One And Only Select One')
                messageAlertService.alertFun('must');
            } else {
                $scope.openAddModal();
            }

        };
        //view Ip
        $scope.viewItem = function() {
            $scope.isAdd = 'View';
            if ($scope.checkedItems.length != 1) {
                // alert('Must Select One And Only Select One')
                messageAlertService.alertFun('must');
            } else {
                $scope.openAddModal();
            }

        };


        //delete
        $scope.deleteItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must Select One!");
                messageAlertService.alertFun('must');
                return;
            } else {
                if (messageAlertService.confirmFun('sure')) {
                    //console.log($scope.checkedItems);
                    IpblockListService.deleteItem($scope.checked.toString()).success(function(response) {
                            if (response.error == undefined) {
                                // alert("Success!");
                                messageAlertService.successFun('success');
                                $scope.checked = [];
                                $scope.checkedItems = [];
                                $scope.search();
                            } else {
                                // alert("Failed!" + response.msg);
                                messageAlertService.successFun('failed');
                            }
                        })
                        .error(function(err) {
                            alert(err.msg)
                        });

                }
            }
        };

        $scope.deleteItem_black = function() {
            if ($scope.checked2.length == 0) {
                // alert("Must Select One!");
                messageAlertService.alertFun('must');
                return;
            } else {
                if (messageAlertService.confirmFun('sure')) {
                    //console.log($scope.checkedItems2);
                    IpblockListService.deleteItem_black($scope.checked2.toString()).success(function(response) {
                            if (response.code == '200') {
                                // alert("Success!");
                                messageAlertService.successFun('success');
                                $scope.checked2 = [];
                                $scope.checkedItems2 = [];
                                searchForm_black();
                            } else {
                                // alert("Failed!" + response.msg);
                                messageAlertService.successFun('failed');
                            }
                        })
                        .error(function(err) {
                            alert(err.msg)
                        });

                }
            }
        }


        //黑名单add modify
        $scope.openAddModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/SeacurityManagement/IpblockList/IpModal.html',
                controller: 'addIpCtrl',
                size: 'md',
                resolve: {
                    transmitModalItems: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    IpblockListService: function() {
                        return IpblockListService;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/SeacurityManagement/IpblockList/addIpCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.search();

            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.search();
            });
        };

    }
})();