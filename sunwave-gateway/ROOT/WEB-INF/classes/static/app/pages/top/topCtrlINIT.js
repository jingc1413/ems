(function() {
    'use strict';

    angular.module('SunWave.pages.top', ['SunWave.pages.deviceManagement.deviceList'])
        .controller('topCtrl', topCtrl);

    function topCtrl($scope, $log, topService, deviceListService, $uibModal) {

        // $(function() {
        //     $('select').searchableSelect();
        // });


        // $scope.selected = { value: $scope.itemArray[2] };

        $scope.getEleNames = function() {

            // $scope.isSearch = true;
            // $scope.Names = [
            //     { id: 1, name: 'first' },
            //     { id: 2, name: 'second' },
            //     { id: 3, name: 'third' },
            //     { id: 4, name: 'fourth' },
            //     { id: 5, name: 'fifth' },
            // ];
            topService.getEleNames($scope.tranEleName).success(function(res) {
                if (res.data.length != 0) {
                    $scope.isSearch = true;
                    $scope.Names = res.data;
                }
            })
        };

        //tree查询条件
        $scope.treeQuery = {
            elementName: "",
            treeId: "",
            neId: ""
        };


        $scope.showContextMen = false;
        var isContextClick = false;

        var zNodes = [
            // { id:1, pId:0, name:"SGMRT", open:true},
            // { id:11, pId:1, name:"Floor23"},
        ];

        var setting = {
            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            // check: {
            //     enable: true
            // },
            check: {
                enable: true,
                chkboxType: { "Y": "", "N": "" }
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            edit: {
                // enable: true
            },
            callback: {
                // beforeEditName:editNode,
                onClick: clickNode,
                onCheck: zTreeOnCheck
                    // beforeRemove:removeNode
            }
        };


        var data2 = {
            // "name": "flare",
            // "children": [
            //     {
            //         "name": "flex",
            //         "children": [
            //             {"name": "FlareVis", "value": 11}
            //         ]
            //     },
            //     {
            //         "name": "scale",
            //         "children": [
            //             {"name": "IScaleMap", "value": 112},
            //             {"name": "LinearScale", "value": 12},
            //             {"name": "LogScale", "value": 13},
            //             {"name": "OrdinalScale", "value": 14},
            //             {"name": "QuantileScale", "value": 15}

            //        ]
            //     },
            //     {
            //         "name": "display",
            //         "children": [
            //             {"name": "DirtySprite", "value": 2}
            //        ]
            //     }
            // ]
        };


        $scope.searchTop = function(neid) {
            topService.gettopData(neid).success(function(res) {
                $scope.data = res.data;

                echarts.util.each($scope.data.children, function(datum, index) {
                    index % 2 === 0 && (datum.collapsed = true);
                    console.log('************' + datum)
                });

                setStyle(res.data.neId, res.data.children);

                $scope.initGragh();
                setStyle(res.data.neId, res.data.children);
            })
        };




        function setStyle(leafId, nodes, path) {
            if (path === undefined) {
                path = [];
            };
            for (var i = 0; i < nodes.length; i++) {
                var tmpPath = path.concat();
                tmpPath.push(nodes[i].neId);
                $scope.leafId = leafId;
                // var hasChildren = false;

                // var collapsed = nodes[i].collapsed;
                if (nodes[i].neElement.tpAlarmList.length != 0) {
                    // $scope.collapsed = nodes[i].collapsed;

                    // console.log('---'+nodes[i].neElement.tpAlarmList.length);
                    nodes[i].lineStyle = {
                        color: '#ff0000',
                        borderColor: '#ff0000'
                    };
                    // console.log(nodes[i].lineStyle);
                    nodes[i].symbol = 'image://assets/img/AU_ALARM.png';
                    if (nodes[i].children != null && nodes[i].children.length > 0) {
                        // hasChildren = true;
                        if (nodes[i].collapsed == true) {
                            nodes[i].symbol = 'image://assets/img/AU_ALARM-.png';
                        } else {
                            nodes[i].symbol = 'image://assets/img/AU_ALARM+.png';
                            setStyle($scope.leafId, nodes[i].children);
                        }
                    } else {
                        // nodes[i].symbol = 'image://assets/img/AU_ALARM.png';
                    }

                    // return tmpPath;
                } else if (nodes[i].neElement.neOnline >= 4) {
                    // $scope.collapsed = nodes[i].collapsed;
                    // if (nodes[i].neElement.neOnline >= 4) {
                    nodes[i].lineStyle = {
                        color: '#5f5f5f',
                        borderColor: '#5f5f5f'
                    };
                    nodes[i].symbol = 'image://assets/img/AU_OFFLINE.png';
                    if (nodes[i].children != null && nodes[i].children.length > 0) {
                        console.log(nodes[i]);
                        if (nodes[i].collapsed == true) {
                            nodes[i].symbol = 'image://assets/img/AU_OFFLINE+.png';

                        } else {
                            nodes[i].symbol = 'image://assets/img/AU_OFFLINE-.png';
                            setStyle($scope.leafId, nodes[i].children);
                        }
                    } else {
                        // nodes[i].symbol = 'image://assets/img/AU_OFFLINE.png';
                    }
                } else {
                    // $scope.collapsed = nodes[i].collapsed;
                    if (nodes[i].children != null && nodes[i].children.length > 0) {
                        if (nodes[i].collapsed == true) {
                            nodes[i].symbol = 'image://assets/img/AU_OK+.png';

                        } else {
                            nodes[i].symbol = 'image://assets/img/AU_OK-.png';
                            setStyle($scope.leafId, nodes[i].children);
                        }
                    } else {
                        // nodes[i].symbol = 'image://assets/img/AU_OK.png';
                    }
                }
                // }
                // else {
                // if (hasChildren) {
                //     if (collapsed || collapsed == undefined) {
                //         nodes[i].symbol = 'image://assets/img/AU_OK+.png';
                //     } else {
                //         nodes[i].symbol = 'image://assets/img/AU_OK-.png';
                //     }
                // }
                // }
            }

            // if (hasChildren) {
            //     var findResult = setStyle(leafId, nodes[i].children, tmpPath);
            //     if (findResult) {
            //         return findResult;
            //     }
            // }

        };


        $scope.reset = function() {
            $scope.tranEleName = '';
        };


        //tree checked
        function zTreeOnCheck(event, treeId, treeNode) {
            $scope.treeNode = treeNode;
            // console.log($scope.treeNode);

            var treeObj = $.fn.zTree.getZTreeObj("leftTree"),
                nodes = treeObj.getCheckedNodes(true),
                areaStrArr = [];
            for (var i = 0; i < nodes.length; i++) {
                areaStrArr.push(nodes[i].name);
            };

            $scope.areaStrArr = areaStrArr;
            console.log(nodes);
        };

        $scope.searchArea = function() {
            if ($scope.treeQuery.neId == "" || $scope.treeQuery.neId == undefined) {
                topService.searchTree($scope.treeQuery).success(function(res) {
                        zNodes = res.data;
                        $.fn.zTree.init($("#leftTree"), setting, zNodes).expandAll(true);

                    })
                    .error(function(err) {
                        console.info(err);
                    });
            } else {
                topService.searchTree($scope.treeQuery).success(function(res) {
                        zNodes = res.data;
                        $.fn.zTree.init($("#leftTree"), setting, zNodes).expandAll(true);
                        var zTree = $.fn.zTree.getZTreeObj("leftTree");


                        var hiddenNodes = [];
                        var showNodes = [];
                        for (var i = 0; i < zNodes.length; i++) {
                            if (zNodes[i].checked == false) {
                                hiddenNodes.push(zNodes[i]);
                            } else {
                                showNodes.push(zNodes[i]);
                            }
                        }

                        zTree.hideNodes(hiddenNodes);
                        // $.fn.zTree.init($("#leftTree"), setting, zNodes).expandAll(true);
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            };
        };
        $scope.searchArea();

        //点击搜索树列表查area树
        $scope.getTopByNeId = function(e, item) {
            console.log(item);
            item.select = !item.select;
            $scope.isSearch = false;
            $scope.tranEleName = item.neName;
            $scope.neId = item.neNeid;
            $scope.treeQuery = {
                elementName: $scope.tranEleName,
                neId: $scope.neId,
                treeId: ""
            };
            $scope.searchArea();

        };


        //top图
        $scope.initGragh = function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('top'));
            // 使用刚指定的配置项和数据显示图表。
            myChart.off('click');

            myChart.showLoading();
            // $scope.searchTop();

            var img = new Image(10, 20);
            img.src = 'assets/img/add.svg';

            var option = {
                legend: {
                    top: '12%',
                    // left: '23%',
                    // orient: 'vertical',
                    show: true,
                    data: [{
                            name: 'alarm',
                            icon: 'image://assets/img/AU_OK.png'
                        },
                        {
                            name: 'base',
                            icon: 'image://assets/img/AU_OK.png'

                        }
                    ],
                    textStyle: {
                        fontSize: 22,
                        color: '#fff',
                    },

                },
                tooltip: {
                    // trigger: 'item',
                    // triggerOn: 'mousemove' //有mousemove和click两种
                    formatter: function(params) {
                        // console.log(params);//打印params
                        return `${params.name}<br />
                        ${params.data.neElement.neRepeaterid16},${params.data.neDeviceid}<br />
                        ${params.data.neElement.neInstallplace}<br />
                        ${params.data.route}<br />
                        `;
                    }
                },

                series: [{
                        type: 'tree',
                        name: ['alarm', 'base'],
                        data: [$scope.data],
                        roam: true,

                        top: '4%',
                        left: '10%',
                        bottom: '4%',
                        right: '20%',
                        // x: '15%', //靠左
                        // y: '15%', //距离容器上方15%


                        symbol: 'image://assets/img/AU_OK.png',
                        symbolSize: [30, 20],

                        lineStyle: {
                            color: '#008811',
                            borderColor: '#008811'
                        },

                        label: {
                            normal: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 12
                            }
                        },
                        // 当此节点下还有子节点时候，设置的节点样式，用于区别 没有子节点的节点的样式
                        itemStyle: {
                            normal: {
                                color: '#b22125'
                            },
                            emphasis: {
                                borderColor: '#ccc'
                            },
                            borderWidth: 5,
                            borderColor: '#c23531',
                            borderType: 'solid',
                            // 纹理填充
                            color: {
                                image: img, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                                // repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                            }
                        },

                        leaves: {
                            label: {
                                normal: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            }
                        },

                        expandAndCollapse: true,
                        initialTreeDepth: 2, //展示层级数,默认是2
                        animationDuration: 550,
                        animationDurationUpdate: 750
                    },

                ]
            };
            myChart.setOption(option);

            //这里开始
            myChart.on('mousedown', (e) => {
                const route = e.data.route;
                if (route == '0.0.0.0') {
                    myChart._chartsViews[0]._data.tree._nodes.forEach((item, index) => {
                        //
                        // item.isExpand = false;

                    });
                }
            });
            //这里结束

            // function getPosition() {
            // myChart.getMyPosition({ finder: { seriesIndex: 1 } });
            // console.log(seriesIndex);
            // };


            myChart.hideLoading();
            //右键事件
            myChart.on("contextmenu", clickFun);
            //左键L
            myChart.on("click", clickL);

            function clickL(params) {
                $scope.params = params;
                if (typeof $scope.params.seriesIndex == 'undefined') {
                    return;
                }
                if ($scope.params.type == 'click') {

                    if ($scope.params.data.route == '0.0.0.0') {
                        $scope.params.event = null;
                    } else {
                        var node = $scope.params.data;
                        if (node.children != null && node.children.length > 0) {
                            var symbol = node.symbol;
                            if (symbol.indexOf('+') > 0) {
                                node.symbol = node.symbol.replace('+', '-');
                            } else {
                                node.symbol = node.symbol.replace('-', '+');
                            }

                        }

                    }
                }
            };
            //去除默认的鼠标事件
            document.oncontextmenu = function() {
                if (isContextClick == false) {
                    $scope.showContextMen = false;
                    $scope.$apply();
                }
                isContextClick = false;
                return false;
            };
            document.onclick = function() {
                $scope.showContextMen = false;
                $scope.$apply();
            };


            // myChart.getZr().on('click',params=>{
            //     $scope.showContextMen = false;
            //     $scope.$apply();
            // });
            // myChart.getZr().on('contextmenu',params=>{
            //     if(isContextClick==false){
            //         $scope.showContextMen = false;
            //         $scope.$apply();
            //     }
            //     isContextClick = false;
            // });
        };

        //点击tree显示top
        function clickNode(event, treeId, treeNode) {
            console.log(treeNode);
            $scope.t = treeNodetreeNode.t;
            $scope.id = treeNode.id;

            $scope.searchTop($scope.id);
        };

        $scope.refresh = function() {
            document.getElementById('top').removeAttribute('_echarts_instance_'); // 移除容器上的 _echarts_instance_ 属性
            // myChart.resize();
            $scope.searchTop($scope.id);
        }

        //右键click事件
        function clickFun(param) {
            //data-该节点数据
            // console.log(param.data);
            $scope.topData = param.data;

            if (typeof param.seriesIndex == 'undefined') {
                return;
            }
            if (param.type == 'contextmenu') {
                isContextClick = true;
                // alert(param.name);
                var menu = document.getElementById("menuuu");
                $scope.showContextMen = true;

                var event = param.event;
                var pageX = event.offsetX;
                var pageY = event.offsetY;
                menu.style.left = pageX + 'px';
                menu.style.top = pageY + 'px';
                menu.style.display = "block";

                $scope.$apply();
            }
        };

        //add和modify弹窗
        $scope.deviceAddModal = function(item) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/deviceAddModal.html',
                controller: 'deviceAddModalCtrl',
                size: "md",
                resolve: {
                    transmitModalItems: function() {
                        return $scope.topData;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deviceListService: function() {
                        return deviceListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/top/deviceAddModalCtrl.js',
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // // $scope.items.push(newItems);
                $scope.searchArea();

            }, function(newItems) {
                console.log(newItems);

            });
        };
        //detail弹窗
        $scope.deviceDetailModal = function(item) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/detailDeviceNameModal.html',
                controller: 'detailDeviceNameModalCtrl',
                size: "lg",
                resolve: {
                    checkedItems: function() {
                        return $scope.topData.neElement;
                    },
                    // isAdd: function() {
                    //     return $scope.isAdd;
                    // },
                    deviceListService: function() {
                        return deviceListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/detailDeviceNameModalCtrl.js',
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // // $scope.items.push(newItems);
                $scope.searchArea();

            }, function(newItems) {
                console.log(newItems);

            });
        };

        //addTop
        $scope.addTop = function() {
            // alert('add');
            $scope.isAdd = 'Add';
            $scope.deviceAddModal();
        };
        //modifyTop
        $scope.modifyTop = function() {
            $scope.isAdd = 'Modify';
            $scope.deviceAddModal();
        };
        //viewTop
        $scope.viewTop = function() {
            $scope.isAdd = 'View';
            $scope.deviceAddModal();
        };
        //detailTop
        $scope.detailTop = function() {
            // $scope.isAdd = 'detail';
            $scope.deviceDetailModal();
        };

    }
})();