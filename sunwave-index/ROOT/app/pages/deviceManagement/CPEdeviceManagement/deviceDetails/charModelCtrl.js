(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
        .controller('charModelCtrl', charModelCtrl);

    function charModelCtrl($scope, $log, $uibModal, $state, deviceDetailsService, item, $stateParams) {
        // $scope.search = {
        //     searchValue: "",
        //     searchValue1: "",
        // }

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 3,
            pagesLength: 3,
            perPageOptions: [1, 3] //[15, 20, 30, 50, 100, 200]

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
            searchValue: null,
            searchValue1: null
        };

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        //查询
        // var searchForm = function() {
        //     // $scope.query.pageIndex = $scope.paginationConf.currentPage;
        //     // $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        //     deviceDetailsService.searchMonitoringDetails()
        //         .success(function(response) {
        //             //console.log("22222222222" + response);
        //             $scope.paginationConf.totalItems = 200;
        //             $scope.items = response;
        //             //console.log($scope.items.ip)
        //         })
        //         .error(function(err) {
        //             console.info(err);
        //         });

        // };
        // searchForm();

        //重置查询条件
        $scope.reset = function() {
            $scope.search.searchValue = "";
            $scope.search.searchValue1 = "";
            $scope.search.searchValue2 = "";

        };

        //全选（取消全选
        $scope.selectAll = function() {
            if ($scope.checkbox.select_all == true) {
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
        //单选
        $scope.selectOne = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
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
            //console.log($scope.checkedItems);

            if ($scope.items.length == $scope.checked.length) {
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
        };

        $scope.draw = function() {
            deviceDetailsService.searchMonitoringDetails(item)
                .success(function(results) {
                    //console.log(results);
                    var length = results.length;
                    var timeRiskInd = new Array();
                    var dataRiskInd = new Array();
                    for (var i = 0; i < length; i++) {
                        var time = results[i].timePoint;
                        var riskInd = results[i].value;
                        timeRiskInd.push(time);
                        dataRiskInd.push(riskInd);
                    }

                    // 用于存放图表上的数据
                    var data = {

                        // 表的X轴参数
                        labels: timeRiskInd,
                        datasets: [{
                            // 背景色，常用transparent透明
                            fillColor: "rgba(151,187,205,0.5)",
                            // 线条颜色，也可用"#ffffff"
                            strokeColor: "rgba(151,187,205,1)",
                            // 点的填充颜色
                            pointColor: "rgba(151,187,205,1)",
                            // 点的外边框颜色
                            pointStrokeColor: "#fff",
                            // 表的Y轴值
                            data: dataRiskInd
                        }]
                    };

                    // 定义图表的参数
                    var defaultsParam = {
                        // Y轴的起始值
                        scaleStartValue: null,
                        // Y/X轴的颜色
                        scaleLineColor: "rgba(0,0,0,.1)",
                        // X,Y轴的宽度
                        scaleLineWidth: 1,
                        // 刻度是否显示标签, 即Y轴上是否显示文字
                        scaleShowLabels: true,
                        // Y轴上的刻度,即文字
                        scaleLabel: "<%=value%>",
                        // 字体
                        scaleFontFamily: "'Arial'",
                        // 文字大小
                        scaleFontSize: 20,
                        // 文字样式
                        scaleFontStyle: "normal",
                        // 文字颜色
                        scaleFontColor: "#666",
                        // 是否显示网格
                        scaleShowGridLines: true,
                        // 网格颜色
                        scaleGridLineColor: "rgba(0,0,0,.05)",
                        // 网格宽度
                        scaleGridLineWidth: 2,
                        // 是否使用贝塞尔曲线? 即:线条是否弯曲
                        bezierCurve: false,
                        // 是否显示点数
                        pointDot: true,
                        // 圆点的大小
                        pointDotRadius: 8,
                        // 圆点的笔触宽度, 即:圆点外层边框大小
                        pointDotStrokeWidth: 1,
                        // 数据集行程
                        datasetStroke: true,
                        // 线条的宽度, 即:数据集
                        datasetStrokeWidth: 2,
                        // 是否填充数据集
                        datasetFill: false,
                        // 是否执行动画
                        animation: true,
                        // 动画的时间
                        animationSteps: 60,
                        // 动画的特效
                        animationEasing: "easeOutQuart",
                        // 动画完成时的执行函数
                        onAnimationComplete: null
                    }
                    var ctx = document.getElementById("myChart").getContext("2d");
                    new Chart(ctx, {
                        type: 'line',
                        data: data
                    });
                })
                .error(function(err) {
                    console.info(err);
                });
        };

        $scope.draw();

    };


})();