(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmKind', [])
        .controller('AlarmKindCtrl', AlarmKindCtrl);

    function AlarmKindCtrl($scope, AlarmKindService, $uibModal, $log, $http, messageAlertService) {
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
            id: "",
            name: "",
            memo: "",

        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        //全选（取消全选
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
        //单选
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
                    AlarmKindService.deleteItem($scope.checked.toString()).success(function(response) {
                        if (response.code == "200" && response.data == true) {
                            // alert("Success!");
                            messageAlertService.successFun('success');
                            $scope.removeAllSelectItemFromArray();
                            $scope.search();
                            // $scope.checkedItems=[];
                        } else {
                            // alert("Failed!" + response.msg);
                            messageAlertService.successFun('failed', response.msg);
                        }
                    });

                }
            }
        };

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll();
            AlarmKindService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                })
                .error(function(err) {
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
            $scope.query.id = '';
            $scope.query.name = '';
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
                templateUrl: 'app/pages/AlarmConfiguration/AlarmKind/add.component.html',
                controller: 'addCtrl',
                size: 'md',
                resolve: {
                    AlarmKind: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    AlarmKindService: function() {
                        return AlarmKindService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmKind/addCtrl.js']);
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
                $scope.search();
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
            $scope.clearAll();
        };

    }

})();