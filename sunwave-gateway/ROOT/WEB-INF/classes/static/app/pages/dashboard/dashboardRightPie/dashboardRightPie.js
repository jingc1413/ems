(function() {
    'use strict';

    angular.module('SunWave.pages.dashboard')
        .controller('dashboardRightPieCtrl', dashboardRightPieCtrl);

    /** @ngInject */
    function dashboardRightPieCtrl($scope, $rootScope, $element, $state, layoutPaths, dashboardService, baConfig, $interval) {
        // var layoutColors = baConfig.colors;
        // var id = $element[0].getAttribute('id');
        var pieChart;

        $scope.initChart = function() {
            pieChart = AmCharts.makeChart("dashboardRightPie", {
                type: 'pie',
                startDuration: 1,
                theme: 'blur',
                addClassNames: true,
                // color: layoutColors.defaultText,
                // labelTickColor: layoutColors.borderDark,
                legend: {
                    position: 'top',
                    marginRight: 200,
                    autoMargins: false,
                },
                innerRadius: '40%',
                defs: {
                    filter: [{
                        id: 'shadow',
                        width: '200%',
                        height: '200%',
                        feOffset: {
                            result: 'offOut',
                            in: 'SourceAlpha',
                            dx: 0,
                            dy: 0
                        },
                        feGaussianBlur: {
                            result: 'blurOut',
                            in: 'offOut',
                            stdDeviation: 5
                        },
                        feBlend: { in: 'SourceGraphic',
                            in2: 'blurOut',
                            mode: 'normal'
                        }
                    }]
                },
                dataProvider: $scope.alarmDatas,
                valueField: 'almNum',
                titleField: 'almName',
                colorField: "color",
                export: {
                    enabled: true
                },
                creditsPosition: 'bottom-left',

                autoMargins: false,
                marginTop: 5,
                alpha: 0.8,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                pullOutRadius: 0,
                pathToImages: layoutPaths.images.amChart,
                responsive: {
                    enabled: true,
                    rules: [
                        // at 900px wide, we hide legend
                        {
                            maxWidth: 300,
                            overrides: {
                                legend: {
                                    enabled: false
                                }
                            }
                        },

                        // at 200 px we hide value axis labels altogether
                        {
                            maxWidth: 200,
                            overrides: {
                                valueAxes: {
                                    labelsEnabled: false
                                },
                                marginTop: 30,
                                marginBottom: 30,
                                marginLeft: 30,
                                marginRight: 30
                            }
                        }
                    ]
                }
            });

            return pieChart;
        };

        $scope.getAlarms = function() {

            dashboardService.alarmInfoLevelCalculate().success(function(res) {
                $scope.alarmDatas = res.data;
                for (let i = 0; i < $scope.alarmDatas.length; i++) {
                    $scope.alarmDatas[i].color = $scope.alarmDatas[i].almColor;
                };
                $scope.initChart();
                pieChart.addListener('init', handleInit);
                pieChart.addListener("clickSlice", handleClick);
                pieChart.addListener('rollOverSlice', function(e) {
                    handleRollOver(e);
                });
                console.log($scope.alarmDatas);
            });
            $interval(function() {
                dashboardService.alarmInfoLevelCalculate().success(function(res) {
                    $scope.alarmDatas = res.data;
                    for (let i = 0; i < $scope.alarmDatas.length; i++) {
                        $scope.alarmDatas[i].color = $scope.alarmDatas[i].almColor;
                    };
                    $scope.initChart();
                    pieChart.addListener('init', handleInit);
                    pieChart.addListener("clickSlice", handleClick);
                    pieChart.addListener('rollOverSlice', function(e) {
                        handleRollOver(e);
                    });
                    console.log($scope.alarmDatas);
                });
            }, 1800000);

        };

        $scope.getAlarms();

        $scope.$on('toDashboard', function(event, data) {
            $scope.getAlarms();
        });

        function handleClick(item) {
            console.info(item);
            $scope.levelId = item.dataItem.dataContext.levelId;
            //跳转链接修改时需要修改这里————————-
            window.sessionStorage.setItem('menuId', 603);
            $state.go("AlarmManagement.currentAlarm", { levelId: $scope.levelId, searchConditionSelected: '5' });
            // $scope.searchFun($scope.levelId);
        };
        $scope.searchFun = function(levelId) {
            $rootScope.$emit("CallDashboardFun", levelId);
        };

        function handleInit() {
            // pieChart.legend.addListener('rollOverItem', handleRollOver);
            alert('heelo')
        };

        function handleRollOver(e) {
            var wedge = e.dataItem.wedge.node;
            wedge.parentNode.appendChild(wedge);
        }
    }

})();