(function() {
    'use strict';

    angular.module('SunWave.pages.top', ['SunWave.pages.deviceManagement.deviceList'])
        .controller('topCtrl', topCtrl);

    function topCtrl($scope, $log, topService, deviceListService, $uibModal, $filter, $state) {

        //tree查询条件
        $scope.treeQuery = {
            elementName: "",
            treeId: "",
            neId: ""
        };


        $scope.showContextMen = false;
        $scope.showContextMen_Au = false;
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
                //只选中一个节点控制
                beforeClick: function(treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj("leftTree");
                    zTree.checkAllNodes(false);
                    return true;
                },
                onClick: clickNode,
                onCheck: zTreeOnCheck
                    // beforeRemove:removeNode
            }
        };

        //左边树初始化
        $scope.searchArea = function() {
            //初始查询
            if ($scope.treeQuery.neId == "" || $scope.treeQuery.neId == undefined) {
                topService.searchTree($scope.treeQuery).success(function(res) {
                        zNodes = res.data;
                        var treeObj = $.fn.zTree.init($("#leftTree"), setting, zNodes);
                        var nodes = treeObj.getNodes();
                        for (var i = 0; i < nodes.length; i++) { //设置节点展开
                            treeObj.expandNode(nodes[i], true, false, true);
                        }

                    })
                    .error(function(err) {
                        console.info(err);
                    });

            } else {
                //条件查询
                topService.searchTree($scope.treeQuery).success(function(res) {
                        zNodes = res.data;
                        $.fn.zTree.init($("#leftTree"), setting, zNodes).expandAll(false);
                        var zTree = $.fn.zTree.getZTreeObj("leftTree");
                        var nodes = zTree.getNodesByParam('checked', true, null);
                        zTree.selectNode(nodes[0]); //选择定位该节点
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            };
        };
        $scope.searchArea();

        $scope.goOmc = () => {
            let omcURl = $scope.topData.neElement.omcIp;
            // let URl_ = $state.href('https://10.7.6.26/');
            window.open('https://' + omcURl, '_blank');
        }


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


        //树的input框查询name
        $scope.getEleNames = function() {

            topService.getEleNames($scope.tranEleName).success(function(res) {
                if (res.data.length != 0) {
                    $scope.isSearch = true;
                    $scope.Names = res.data;
                }
            })
        };
        //点击搜索树列表li查area树
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

        //top属性设置
        function setStyle(leafId, nodes, index, path) {
            console.log(path);
            if (nodes == null && leafId == null) {
                alert('No topology data！');
                return
            };
            $scope.index = index;

            if (nodes instanceof Array) {
                for (let t = 0; t < nodes.length; t++) {
                    const nod = nodes[t];
                    if (nod.name == $scope.treeNod_name) {

                    } else {

                    }
                }
            } else {
                if (nodes.name == $scope.treeNod_name) {

                } else {

                }
            };
            //叶子结点
            if (nodes instanceof Array) {
                for (var i = 0; i < nodes.length; i++) {
                    // var tmpPath = path.concat();
                    // tmpPath.push(nodes[i].neId);
                    $scope.leafId = leafId;
                    // var hasChildren = false;

                    // var collapsed = nodes[i].collapsed;

                    if (nodes[i].neElement.neOnline >= 4) {
                        // $scope.collapsed = nodes[i].collapsed;
                        // if (nodes[i].neElement.neOnline >= 4) {
                        nodes[i].lineStyle = {
                            // color: '#5f5f5f',
                            borderColor: '#5f5f5f'
                        };
                        if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                            nodes[i].symbol = 'image://assets/img/EU_OFFLINE_MAINTAINCE.png';
                        } else {
                            nodes[i].symbol = 'image://assets/img/AU_OFFLINE.png';
                        };
                        if (nodes[i].children != null && nodes[i].children.length > 0) {
                            // console.log(nodes[i]);
                            if (nodes[i].collapsed == true) {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_offline+.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_OFFLINE+.png';
                                }
                            } else {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_offline-.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_OFFLINE-.png';
                                }
                                // if ($scope.index >= 2) {
                                //     if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                //         nodes[i].symbol = 'image://assets/img/weihu_offline+.png';
                                //     } else {
                                //         nodes[i].symbol = 'image://assets/img/AU_OFFLINE+.png';
                                //     }
                                // }
                            }
                            setStyle($scope.leafId, nodes[i].children, $scope.index + 1);
                        } else {}
                    } else if (nodes[i].neElement.tpAlarmList.length != 0) {
                        // $scope.collapsed = nodes[i].collapsed;
                        nodes[i].lineStyle = {
                            // color: '#ff0000',
                            borderColor: '#ff0000'
                        };
                        // console.log(nodes[i].lineStyle);
                        if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                            nodes[i].symbol = 'image://assets/img/AU_ALARM_MAINTAINCE.png';
                        } else {
                            nodes[i].symbol = 'image://assets/img/AU_ALARM.png';
                        }
                        if (nodes[i].children != null && nodes[i].children.length > 0) {
                            // hasChildren = true;
                            if (nodes[i].collapsed == true) {

                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_alarm+.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_ALARM+.png';
                                }
                            } else {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_alarm-.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_ALARM-.png';
                                }
                                // if (index >= 2) {
                                //     if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                //         nodes[i].symbol = 'image://assets/img/weihu_alarm-.png';
                                //     } else {
                                //         nodes[i].symbol = 'image://assets/img/AU_ALARM-.png';
                                //     }
                                // }
                            }
                            setStyle($scope.leafId, nodes[i].children);
                        } else {}
                    } else {
                        if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                            nodes[i].symbol = 'image://assets/img/AU_MAINTAINCE.png';
                        };
                        // $scope.collapsed = nodes[i].collapsed;
                        if (nodes[i].children != null && nodes[i].children.length > 0) {
                            if (nodes[i].collapsed == true) {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu+.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_OK+.png';
                                }
                            } else {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu-.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_OK-.png';
                                }
                            }
                            setStyle($scope.leafId, nodes[i].children);
                        } else {}
                    }

                }
            } else {
                //字体

                //根节点
                $scope.leafId = leafId;
                if (nodes.neElement == null) {
                    $scope.noTop = true;
                    return
                }
                if (nodes.neElement.tpAlarmList.length != 0) {
                    nodes.lineStyle = {
                        // color: '#ff0000',
                        borderColor: '#ff0000'
                    };
                    if (nodes.neElement.neDevicestatus.dsId > 10) {
                        nodes.symbol = 'image://assets/img/AU_ALARM_MAINTAINCE.png';
                    } else {
                        nodes.symbol = 'image://assets/img/AU_ALARM.png';
                    }
                    if (nodes.children != null && nodes.children.length > 0) {
                        // hasChildren = true;
                        if (nodes.collapsed == true) {
                            if (nodes.neElement.neDevicestatus.dsId > 10) {
                                nodes.symbol = 'image://assets/img/weihu_alarm+.png';
                            } else {
                                nodes.symbol = 'image://assets/img/AU_ALARM+.png';
                            }
                        } else {
                            if (nodes.neElement.neDevicestatus.dsId > 10) {
                                nodes.symbol = 'image://assets/img/weihu_alarm-.png';
                            } else {
                                nodes.symbol = 'image://assets/img/AU_ALARM-.png';
                            }
                            // if (index == 1) {
                            //     nodes.symbol = 'image://assets/img/AU_ALARM-.png';
                            // }
                        }
                        setStyle($scope.leafId, nodes.children, $scope.index + 1);
                    } else {}

                    // return tmpPath;
                } else if (nodes.neElement.neOnline >= 4) {
                    nodes.lineStyle = {
                        // color: '#5f5f5f',
                        borderColor: '#5f5f5f'
                    };
                    if (nodes.neElement.neDevicestatus.dsId > 10) {
                        nodes.symbol = 'image://assets/img/EU_OFFLINE_MAINTAINCE.png';
                    } else {
                        nodes.symbol = 'image://assets/img/AU_OFFLINE.png';
                    }
                    if (nodes.children != null && nodes.children.length > 0) {
                        // console.log(nodes[i]);
                        if (nodes.collapsed == true) {
                            if (nodes.neElement.neDevicestatus.dsId > 10) {
                                nodes.symbol = 'image://assets/img/weihu_offline+.png';
                            } else {
                                nodes.symbol = 'image://assets/img/AU_OFFLINE+.png';
                            }
                        } else {
                            if (nodes.neElement.neDevicestatus.dsId > 10) {
                                nodes.symbol = 'image://assets/img/weihu_offline-.png';
                            } else {
                                nodes.symbol = 'image://assets/img/AU_OFFLINE-.png';
                            }
                            // if (index >= 2) {
                            //     nodes.symbol = 'image://assets/img/AU_OFFLINE+.png';
                            // }
                        }
                        setStyle($scope.leafId, nodes.children, $scope.index + 1);
                    } else {

                    }
                } else {
                    if (nodes.children != null && nodes.children.length > 0) {
                        if (nodes.collapsed == true) {
                            if (nodes.neElement.neDevicestatus.dsId > 10) {
                                nodes.symbol = 'image://assets/img/weihu+.png';
                            } else {
                                nodes.symbol = 'image://assets/img/AU_OK+.png';
                            }

                        } else {
                            if (nodes.neElement.neDevicestatus.dsId > 10) {
                                nodes.symbol = 'image://assets/img/weihu-.png';
                            } else {
                                nodes.symbol = 'image://assets/img/AU_OK-.png';
                            }
                        }
                        setStyle($scope.leafId, nodes.children, $scope.index + 1);
                    } else {}
                }
            }

        };

        //树查询条件清空
        $scope.reset = function() {
            $scope.tranEleName = '';
            $scope.isSearch = false;
        };

        var myChart = echarts.init(document.getElementById('top'));
        // console.log(myChart);
        //top图初始化
        $scope.initGragh = function() {
            // 基于准备好的dom，初始化echarts实例
            myChart.showLoading();
            setStyle($scope.data.neId, $scope.data, 0);

            var option = {
                legend: {
                    top: '10%',
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
                    // textStyle: {
                    //     fontSize: 34,
                    //     color: '#333',
                    // },

                },
                tooltip: {
                    // trigger: 'item',
                    // triggerOn: 'mousemove' //有mousemove和click两种
                    formatter: function(params) {
                        // console.log(params);//打印params
                        return `${params.name}<br />
                        ${params.data.neElement.neRepeaterid16},${params.data.neElement.neDeviceid}<br />
                        ${params.data.neElement.neRoute}<br />
                        ${params.data.neElement.neInstallplace}<br />
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
                        // y: '15%', //距容器上方15%


                        symbol: 'image://assets/img/AU_OK.png',
                        symbolSize: [30, 20],

                        lineStyle: {
                            color: '#008811',
                            borderColor: '#008811'
                        },

                        label: {
                            normal: {
                                position: 'bottom',
                                verticalAlign: 'middle',
                                align: 'center',
                                fontSize: 10,
                                color: '#333',
                                formatter: function(param) {
                                    if (param.data.neId == $scope.treeNod_Id) {
                                        return '{a|' + param.name + '}'
                                    } else {
                                        return param.name;
                                    }
                                },
                                rich: {
                                    a: {
                                        color: '#2ab1de',
                                        lineHeight: 10,
                                        borderWidth: 2,
                                        borderColor: '#2ab1de',
                                        borderType: 'solid'
                                    }
                                }
                            }
                        },
                        // 当此节点下还有子节点时候，设置的节点样式，用于区别 没有子节点的节点的样式
                        itemStyle: {
                            // normal: {
                            //     color: '#b22125'
                            // },
                            emphasis: {
                                borderColor: '#ccc'
                            },
                            borderWidth: 5,
                            borderColor: '#c23531',
                            borderType: 'solid',

                            // 纹理填充
                            // color: {
                            //     image: img, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                            //     // repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
                            // }
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
                        // animation: false,

                        expandAndCollapse: true,
                        initialTreeDepth: 4, //展示层级数,默认是2
                        animationDuration: 10, //渲染速度
                        animationDurationUpdate: 150
                    },

                ]
            };
            myChart.setOption(option, true);

            myChart.hideLoading();

        };

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

        //右键事件
        myChart.on("contextmenu", clickFun);
        //左键L
        myChart.on("click", clickL);

        myChart.on('finished', function() {
            myChart.resize();
        });

        myChart.on('restore', function(params) {
            console.log("restore");
        });

        function clickL(params) {
            $scope.params = params;
            if (typeof $scope.params.seriesIndex == 'undefined') {
                return;
            }
            if ($scope.params.type == 'click') {

                // if ($scope.params.data.route == '0.0.0.0') {
                //     $scope.params.event = null;
                // } else {
                var node = $scope.params.data;
                console.log(node);
                if (node.children != null && node.children.length > 0) {
                    var symbol = node.symbol;
                    if (symbol.indexOf('+') > 0) {
                        node.symbol = node.symbol.replace('+', '-');
                    } else {
                        node.symbol = node.symbol.replace('-', '+');
                    }
                    // myChart.resize();

                }

                // }
            }
        };
        //去除默认的鼠标事件
        document.oncontextmenu = function() {
            if (isContextClick == false) {
                $scope.showContextMen = false;
                $scope.showContextMen_Au = false;
                $scope.$apply();
            }
            isContextClick = false;
            return false;
        };
        document.onclick = function() {
            $scope.showContextMen = false;
            $scope.showContextMen_Au = false;
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
        // };

        $scope.zkFun = function(datas) {
            echarts.util.each(datas, function(datum, index) {

                var xx_data = datum;
                var compare_route = datum.route;
                compare_route.substr(0, 1);
                // console.log('99999999999999999' + datum.children);
                if (datum.children != null) {

                    console.log('77777777777' + datum.children);
                    datum.collapsed = false;
                    if (datum.neId == $scope.treeNod_Id) {
                        var node_route = datum.route;
                        node_route.substr(0, 1);
                        datum.collapsed = false;
                    } else {
                        // datum.collapsed = true;
                    };

                    $scope.zkFun(xx_data.children);

                } else {
                    datum.collapsed = true;
                };


                // if (index % 2 == 0) {
                //     $scope.data.children[index].collapsed = true;
                // } else {
                //     $scope.data.children[index].collapsed = false;
                // }
                // index % 2 === 0 && (datum.collapsed = true);
                // console.log('************' + datum)
            });
        }


        //通过neId查top
        $scope.searchTop = function(neid) {
            topService.gettopData(neid).success(function(res) {
                    $scope.data = res.data;
                    if ($scope.data == null || $scope.data == undefined) {
                        alert('This node has no topology data!');
                        return
                    } else {
                        myChart.showLoading();

                        //展开
                        $scope.zkFun($scope.data.children);
                        console.log(res.data.children);


                        $scope.initGragh();
                    }


                    // myChart.setOption(option);
                    // setStyle(res.data.neId, res.data.children);
                })
                .error(function(err) {
                    alert('This node has no topology data!')
                });
        };

        //点击tree显示top
        function clickNode(event, treeId, treeNode) {
            console.log(treeNode);
            $scope.t = treeNode.t;
            $scope.id = treeNode.id;
            $scope.treeNod_Id = treeNode.id;
            $scope.treeNod_name = treeNode.name;
            var zTree = $.fn.zTree.getZTreeObj("leftTree");
            //选中
            treeNode.checked = true;
            zTree.updateNode(treeNode);

            $scope.searchTop($scope.id);

        };

        //tree节点checked事件
        function zTreeOnCheck(event, treeId, treeNode) {
            $scope.treeNode = treeNode;
            // console.log($scope.treeNode);

            var treeObj = $.fn.zTree.getZTreeObj("leftTree");
            var nodes = treeObj.getCheckedNodes(true);
            var areaStrArr = [];
            for (var i = 0; i < nodes.length; i++) {
                areaStrArr.push(nodes[i].name);
            };

            $scope.areaStrArr = areaStrArr;
            console.log(nodes);
        };


        // $(document).mouseup(function(e) {
        //     var _con = $('.my-select-ul'); // 设置目标区域
        //     if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        //         $scope.isSearch = false;
        //     }
        // });



        $scope.refresh = function() {
            document.getElementById('top').removeAttribute('_echarts_instance_'); // 移除容器上的 _echarts_instance_ 属性
            // myChart.resize();
            $scope.searchTop($scope.id);

            // var myChart = echarts.init(document.getElementById('top'));

            // var myChart = document.getElementById("top")
            // myChart.removeAttribute("_echarts_instance_"); // 移除容器上的 _echarts_instance
            // $scope.initGragh();
            // myChart.restore();

            // $scope.searchTop($scope.id);
            // $scope.$apply();
        };

        //右键click事件
        function clickFun(param) {
            //data-该节点数据
            // console.log(param.data);
            $scope.topData = param.data;
            var deviceId = $scope.topData.neElement.neDeviceid;

            if (typeof param.seriesIndex == 'undefined') {
                return;
            }
            if (param.type == 'contextmenu') {
                //判断Au
                if (deviceId == 0) {
                    isContextClick = true;
                    // alert(param.name);
                    var menu = document.getElementById("menuuu_Au");
                    $scope.showContextMen_Au = true;

                    var event = param.event;
                    var pageX = event.offsetX;
                    var pageY = event.offsetY;
                    menu.style.left = pageX + 'px';
                    menu.style.top = pageY + 'px';
                    menu.style.display = "block";

                    $scope.$apply();
                } else {
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

            }
        };

        //query device
        $scope.queryDevice = function() {
            $scope.openQueryDeviceModal();
        };

        $scope.openQueryDeviceModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/queryDeviceModal.html',
                controller: 'queryDeviceModalCtrl',
                size: "md",
                resolve: {
                    deviceListService: function() {
                        return deviceListService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/queryDeviceModalCtrl.js',
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                console.log(newItems);

            });
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
                        return $scope.topData.neElement;
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
                                'app/pages/deviceManagement/deviceList/deviceAddModalCtrl.js',
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // // $scope.items.push(newItems);
                $scope.refresh();

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