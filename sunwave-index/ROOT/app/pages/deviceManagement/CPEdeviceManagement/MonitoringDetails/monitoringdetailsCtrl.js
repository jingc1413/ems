(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEMonitoringDetails', [])
        .controller('monitoringdetailsCtrl', monitoringdetailsCtrl);

    function monitoringdetailsCtrl($scope, $log, $uibModal, $stateParams, monitoringdetailsService) {
        // $scope.item = $stateParams.item;
        // $scope.neNeid = $stateParams.neNeid;
        $scope.modal = {
            beginTime: null,
            endTime: null,
        };
        if ($stateParams.neNeid != null) {
            $scope.neNeid = $stateParams.Id;
            $scope.item = $stateParams.item;
        } else {
            if (window.localStorage) {
                var storage = window.localStorage;
                $scope.neNeid = storage.getItem("deviceId");
                $scope.item = storage.getItem("monitorItem");
            }
        };

        var searchForm = function() {
            monitoringdetailsService.getAllMonitoringItemOfTask($scope.item).
            success(function(res) {
                $scope.monitoringItem = res;
                for (var i = 0; i < res.length; i++) {
                    monitoringdetailsService.searchCharValue(res[i]).success(function(res1) {
                        var length = res1.keyValues.length;
                        var data = [];
                        for (var i = 0; i < length; i++) {
                            var time = res1.keyValues[i].timePoint;
                            var riskInd = res1.keyValues[i].value;
                            var temp = [];
                            temp.push(time);
                            temp.push(riskInd);
                            data.push(temp);
                        }
                        var myChart = echarts.init(document.getElementById(res1.itemId));
                        var option = {
                            title: {
                                text: res1.itemName
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: {
                                data: data.map(function(item) {
                                    return item[0];
                                })
                            },
                            yAxis: {
                                splitLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    formatter: function(param) {
                                        return param.data[1];
                                    },
                                    position: 'top'
                                }
                            },
                            toolbox: {
                                left: 'center',
                                feature: {
                                    dataZoom: {
                                        yAxisIndex: 'none'
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            dataZoom: [{
                                startValue: '2014-06-01'
                            }, {
                                type: 'inside'
                            }],
                            visualMap: {
                                top: 10,
                                right: 10,
                                pieces: [{
                                    gt: 0,
                                    lte: Number(res1.infoTrigger),
                                    color: '#096'
                                }, {
                                    gt: Number(res1.infoTrigger),
                                    lte: Number(res1.warnTrigger),
                                    color: '#ffde33'
                                }, {
                                    gt: Number(res1.warnTrigger),
                                    lte: Number(res1.errorTrigger),
                                    color: '#ff9933'
                                }, {
                                    gt: Number(res1.errorTrigger),
                                    color: '#7e0023'
                                }],
                                outOfRange: {
                                    color: '#999'
                                }
                            },
                            series: {
                                name: res1.itemName,
                                type: 'line',
                                data: data,
                                markLine: {
                                    silent: true,
                                    data: [{
                                        yAxis: Number(res1.infoTrigger)
                                    }, {
                                        yAxis: Number(res1.warnTrigger)
                                    }, {
                                        yAxis: Number(res1.errorTrigger)
                                    }]
                                }
                            }
                        }
                        myChart.setOption(option);
                    })
                }
            })


        };

        searchForm();

        //查询选择时间范围的折线图
        $scope.searchByTime = function(mi) {
            if (mi.beginTime != undefined && mi.endTime != undefined) {
                var beginTime = mi.beginTime.replace(/-/g, '/');
                var endTime = mi.endTime.replace(/-/g, '/');
                var beginTimestamp = new Date(beginTime).getTime();
                var endTimestamp = new Date(endTime).getTime();
                mi.beginTime = beginTimestamp;
                mi.endTime = endTimestamp;
            }
            monitoringdetailsService.searchCharValue(mi).success(function(res1) {
                var d = new Date(beginTimestamp); //根据时间戳生成的时间对象
                var beginDate = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());
                mi.beginTime = beginDate;
                var d = new Date(endTimestamp); //根据时间戳生成的时间对象
                var endDate = (d.getFullYear()) + "-" +
                    (d.getMonth() + 1) + "-" +
                    (d.getDate()) + " " +
                    (d.getHours()) + ":" +
                    (d.getMinutes()) + ":" +
                    (d.getSeconds());
                mi.endTime = endDate;
                var length = res1.keyValues.length;

                var data = [];
                for (var i = 0; i < length; i++) {
                    var time = res1.keyValues[i].timePoint;
                    var riskInd = res1.keyValues[i].value;
                    var temp = [];
                    temp.push(time);
                    temp.push(riskInd);
                    data.push(temp);
                }
                var myChart = echarts.init(document.getElementById(res1.itemId));
                var option = {
                    title: {
                        text: res1.itemName
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: data.map(function(item) {
                            return item[0];
                        })
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            formatter: function(param) {
                                return param.data[1];
                            },
                            position: 'top'
                        }
                    },
                    toolbox: {
                        left: 'center',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: '2014-06-01'
                    }, {
                        type: 'inside'
                    }],
                    visualMap: {
                        top: 10,
                        right: 10,
                        pieces: [{
                            gt: 0,
                            lte: Number(res1.infoTrigger),
                            color: '#096'
                        }, {
                            gt: Number(res1.infoTrigger),
                            lte: Number(res1.warnTrigger),
                            color: '#ffde33'
                        }, {
                            gt: Number(res1.warnTrigger),
                            lte: Number(res1.errorTrigger),
                            color: '#ff9933'
                        }, {
                            gt: Number(res1.errorTrigger),
                            color: '#7e0023'
                        }],
                        outOfRange: {
                            color: '#999'
                        }
                    },
                    series: {
                        name: res1.itemName,
                        type: 'line',
                        data: data,
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: Number(res1.infoTrigger)
                            }, {
                                yAxis: Number(res1.warnTrigger)
                            }, {
                                yAxis: Number(res1.errorTrigger)
                            }]
                        }
                    }
                }
                myChart.setOption(option);
                // $scope.modal = {
                //     beginTime: null,
                //     endTime: null,
                // };
            })
        };
    };
})();