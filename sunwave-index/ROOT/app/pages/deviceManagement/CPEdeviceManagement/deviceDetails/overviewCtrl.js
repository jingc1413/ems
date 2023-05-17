(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
        .controller('overviewCtrl', overviewCtrl);

    function overviewCtrl($scope, $log, $uibModal, $state, $stateParams, deviceDetailsService) {
        if ($stateParams.Id != null) {
            $scope.neNeid = $stateParams.Id;
        } else {
            if (window.localStorage) {
                var storage = window.localStorage;
                $scope.neNeid = storage.getItem("deviceId");
                // $state.reload('CPEdeviceManagement.CPEdeviceDetails');
            }
        };
        //console.log("overviewCtrl")
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
        var searchForm = function() {
            deviceDetailsService.visitingReason($scope.neNeid).success(function(res) {
                var reboot = res.data.reboot;
                var periodic = res.data.periodic;
                var valueChange = res.data.valueChanged;
                $scope.reboot = [];
                $scope.periodic = [];
                $scope.valueChange = [];
                for (var i = 0; i < reboot.length; i++) {
                    var temp = [];
                    temp.push(reboot[i].timePoint);
                    temp.push(reboot[i].value);
                    $scope.reboot.push(temp);
                }
                for (var i = 0; i < periodic.length; i++) {
                    var temp = [];
                    temp.push(periodic[i].timePoint);
                    temp.push(periodic[i].value);
                    $scope.periodic.push(temp);
                }

                for (var i = 0; i < valueChange.length; i++) {
                    var temp = [];
                    temp.push(valueChange[i].timePoint);
                    temp.push(valueChange[i].value);
                    $scope.valueChange.push(temp);
                }
                //测试散点图
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('visitingReasonChart'));

                // 指定图表的配置项和数据
                var option = {
                    xAxis: [{
                        "show": true,
                        "splitLine": { //网格线
                            "show": false
                        },
                        type: 'time'
                    }],
                    yAxis: [{
                        "show": false,
                        "splitLine": { //网格线
                            "show": false
                        }
                    }],
                    //数据区域缩放
                    dataZoom: [{
                            type: 'slider',
                            show: true,
                            xAxisIndex: [0],
                            srart: 1,
                            end: 35
                        },
                        // {
                        //     type: 'slider',
                        //     show: true,
                        //     yAxisIndex: [0],
                        //     left: '93%',
                        //     srart: 29,
                        //     end: 36

                        // },
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            srart: 1,
                            end: 35
                        },
                        // {
                        //     type: 'inside',
                        //     yAxisIndex: [0],
                        //     srart: 29,
                        //     end: 36
                        // }
                    ],
                    title: {
                        text: 'visiting reason'
                    },
                    legend: {
                        right: 10,
                        data: ['reboot', 'periodic', 'value change']
                    },
                    series: [{
                            name: 'reboot',
                            data: $scope.reboot,
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    color: '#C1232B'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    formatter: function(param) {
                                        return param.data[0];
                                    },
                                    position: 'top'
                                }
                            }
                        },
                        {
                            name: 'periodic',
                            data: $scope.periodic,
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    color: '#FCCE10'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    formatter: function(param) {
                                        return param.data[0];
                                    },
                                    position: 'top'
                                }
                            }
                        },
                        {
                            name: 'value change',
                            data: $scope.valueChange,
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    color: '#00CCFF'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    formatter: function(param) {
                                        return param.data[0];
                                    },
                                    position: 'top'
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //测试散点图
            })

        };
        searchForm();

        //重置查询条件
        $scope.reset = function() {
            $scope.search.searchValue = "";
            $scope.search.searchValue1 = "";
            $scope.search.searchValue2 = "";

        };
    };
})();