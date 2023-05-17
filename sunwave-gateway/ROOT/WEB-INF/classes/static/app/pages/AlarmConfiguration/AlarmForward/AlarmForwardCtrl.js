(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmForward', [])
        .controller('AlarmForwardCtrl', AlarmForwardCtrl);

    function AlarmForwardCtrl($scope, $log, AlarmForwardService, $uibModal) {
        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            userName: "",
            mobile: ""
        };

        $scope.search = function() {
            searchForm();
        };

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
            pageSize: 10,
            name: "",
            keyword: ""
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            AlarmForwardService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                    console.log(response);
                })
                .error(function(err) {
                    console.info(err);
                });

        };

        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.useUserid);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.items, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            console.log($scope.checked);

        };

        $scope.reset = function() {
            $scope.query.userName = '';
            $scope.query.mobile = '';

        };


        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "add";
            $scope.openEditDialog();
        };
        //单选
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {

                var index = $scope.checked.indexOf(i.useUserid);

                if (i.checked && index == -1) {
                    $scope.checked.push(i.useUserid);

                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });
            console.log($scope.checkedItems);


            if ($scope.items.length == $scope.checked.length) {
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
        };


        //修改modal

        $scope.openEditDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/AlarmConfiguration/AlarmForward/addMessage.html',
                controller: 'addMessageCtrl',
                size: 'md',
                resolve: {

                    AlarmForward: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    AlarmForwardService: function() {
                        return AlarmForwardService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/AlarmConfiguration/AlarmForward/addMessageCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行
            // $scope.items = [];
            modalInstance.result.then(function(newItems) {
                $scope.checked = []; //选中的ID
                $scope.checkedItems = []; //选中的对象数组
                $scope.checkbox.select_all = false;

                // alert(newItems);
                // // $scope.items.push(newItems);
                $scope.search();
            }, function(newItems) {
                console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

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
            if ($scope.checked.length < 1) {
                alert("Please select one");
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
            } else {
                $scope.isAdd = 'modify';
                $scope.openEditDialog();
            };

        };
        //查看
        $scope.tolook = function() {

            if ($scope.checked.length < 1) {
                alert("Please select one");
            } else if ($scope.checked.length > 1) {
                alert("Only select one");
            } else {
                $scope.isAdd = 'seach';
                $scope.openEditDialog();
            };
        };

        //delete
        $scope.deleteItem = function() {
            if ($scope.checked.length == 0) {
                alert("Must select one");
                return;
            } else {
                if (confirm("Are U Sure?")) {
                    console.log($scope.checkedItems);
                    AlarmForwardService.deleteItem($scope.checked).success(function(response) {
                        if (response.code == "200") {
                            alert("Success!");
                            $scope.search();
                            $scope.checked = [];
                            $scope.checkedItems = [];
                        } else {
                            alert("Failed!");
                            $scope.search();
                        }
                    });
                }
            }
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 200,
            pagesLength: 200,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);



    };



    //文本超出过滤器
    angular.module('SunWave.pages.AlarmConfiguration.AlarmForward')
        .filter('cut', function() {
            return function(value, wordwise, max, tail) {
                if (!value) return '';

                max = parseInt(max, 10);
                if (!max) return value;
                if (value.length <= max) return value;

                value = value.substr(0, max);
                if (wordwise) {
                    var lastspace = value.lastIndexOf(' ');
                    if (lastspace != -1) {
                        value = value.substr(0, lastspace);
                    }
                }

                return value + (tail || ' …');
            };
        });
})();