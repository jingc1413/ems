angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('modalTreeCtrl', modalTreeCtrl);

function modalTreeCtrl($rootScope, $scope, AuthorizedService, $filter, $uibModalInstance, $uibModal, element, $log, ) {
    $scope.navFunc = function(arg) {

        $scope.navAction = arg;
    };
    $scope.webSocketResponse = $rootScope.webSocketResponse;
    $scope.neNeid = element.neNeid;
    $scope.OnlineStatus = element.onlineStatus;
    $scope.isLoading = false;

    $scope.showInfo = {};
    $scope.valueChange = false;
    $scope.tosearch = false;

    $scope.treeQuery = {
        elementName: "",
        treeId: "",
        neId: ""
    };
    var setting = {
        view: {
            // addHoverDom: addHoverDom,
            // removeHoverDom: removeHoverDom,
            selectedMulti: false
        },
        check: {
            enable: true
        },
        check: {
            enable: true,
            chkboxType: { "Y": "s", "N": "s" }
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
            // beforeClick: function(treeId, treeNode) {
            //     var zTree = $.fn.zTree.getZTreeObj("leftTree");
            //     zTree.checkAllNodes(false);
            //     return true;
            // },
            onClick: clickNode,
            onCheck: zTreeOnCheck
                // beforeRemove:removeNode
        }
    };


    //左边树初始化
    var searchTree = function() {

        //初始查询
        if ($scope.treeQuery.neId == "" || $scope.treeQuery.neId == undefined) {
            // //console.log("data"+res.data);
            //     zNodes = res.data;
            AuthorizedService.searchModelTree($scope.neNeid)
                .success(function(response) {
                    zNodes = response;
                    //console.log(response);
                    var treeObj = $.fn.zTree.init($("#leftTree"), setting, zNodes);
                    $scope.allItems = treeObj;
                    var nodes = treeObj.getNodes();
                    //console.log("后台数据" + nodes)
                    for (var i = 0; i < nodes.length; i++) { //设置节点展开
                        treeObj.expandNode(nodes[i], true, false, true);
                    }
                })
                .error(function(err) {
                    console.info(err);
                });
            //    var treeObj = $.fn.zTree.init($("#leftTree"), setting, $scope.menuItems);
            //    //console.log("树对象"+treeObj);
            //    var nodes = $scope.menuItems;
            //    //console.log(nodes);
            //    for (var i = 0; i < nodes.length; i++) { //设置节点展开
            //        treeObj.expandNode(nodes[i], true, false, true);
            //        //console.log("节点" + nodes[i].name);

            //    }
        }
    }
    searchTree();
    //   $scope.getTopByNeId($scope.menuItems[0]);

    //点击搜索树列表li查area树
    $scope.getTopByNeId = function(item) {
        // //console.log(e)
        //console.log("选择" + item);
        item.select = !item.select;
        $scope.isSearch = false;
        $scope.tranEleName = item.name;
        $scope.neId = item.paramId;
        $scope.treeQuery = {
            elementName: $scope.tranEleName,
            neId: $scope.neId,
            treeId: ""
        };
        //  searchTree();
    };

    // var orange = function() {
    //     $scope.getTopByNeId($scope.menuItems[0])
    // }

    // orange();

    $scope.isSearch = false;


    //top属性设置
    function setStyle(leafId, nodes, index, path) {
        //console.log(path);
        if (nodes == null && leafId == null) {
            // alert('No topology data！');
            swal({
                title: "Tips:",
                text: "No topology data ！",
                icon: "info",
                timer: 4000,
            });
            return
        };

        $scope.index = index;


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
                        color: '#5f5f5f',
                        borderColor: '#5f5f5f'
                    };
                    if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                        nodes[i].symbol = 'image://assets/img/EU_OFFLINE_MAINTAINCE.png';
                    } else {
                        nodes[i].symbol = 'image://assets/img/AU_OFFLINE.png';
                    };
                    if (nodes[i].children != null && nodes[i].children.length > 0) {
                        // //console.log(nodes[i]);
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
                            if ($scope.index >= 2) {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_offline+.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_OFFLINE+.png';
                                }
                            }
                        }
                        setStyle($scope.leafId, nodes[i].children, $scope.index + 1);
                    } else {}
                } else if (nodes[i].neElement.tpAlarmList.length != 0) {
                    // $scope.collapsed = nodes[i].collapsed;
                    nodes[i].lineStyle = {
                        color: '#ff0000',
                        borderColor: '#ff0000'
                    };
                    // //console.log(nodes[i].lineStyle);
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
                            if (index >= 2) {
                                if (nodes[i].neElement.neDevicestatus.dsId > 10) {
                                    nodes[i].symbol = 'image://assets/img/weihu_alarm-.png';
                                } else {
                                    nodes[i].symbol = 'image://assets/img/AU_ALARM-.png';
                                }
                            }
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
            //根节点
            $scope.leafId = leafId;
            if (nodes.neElement == null) {
                $scope.noTop = true;
                return
            }
            if (nodes.neElement.tpAlarmList.length != 0) {
                nodes.lineStyle = {
                    color: '#ff0000',
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
                    color: '#5f5f5f',
                    borderColor: '#5f5f5f'
                };
                if (nodes.neElement.neDevicestatus.dsId > 10) {
                    nodes.symbol = 'image://assets/img/EU_OFFLINE_MAINTAINCE.png';
                } else {
                    nodes.symbol = 'image://assets/img/AU_OFFLINE.png';
                }
                if (nodes.children != null && nodes.children.length > 0) {
                    // //console.log(nodes[i]);
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
            //console.log(node);
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



    //点击tree显示top
    function clickNode(event, treeId, treeNode) {
        $scope.showInfo = treeNode;
        //console.log(treeNode);
        //console.log($scope.showInfo);
        $scope.t = treeNode.t;
        $scope.id = treeNode.id;
        var zTree = $.fn.zTree.getZTreeObj("leftTree");
        //选中
        treeNode.checked = true;
        zTree.updateNode(treeNode);

    };

    $scope.selectParamsId = [];
    //tree节点checked事件
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;
        // //console.log($scope.treeNode);

        var treeObj = $.fn.zTree.getZTreeObj("leftTree");
        var nodes = treeObj.getCheckedNodes(true);
        var areaStrArr = [];
        for (var i = 0; i < nodes.length; i++) {
            areaStrArr.push(nodes[i].name);
        };

        $scope.areaStrArr = areaStrArr;
        //console.log(nodes);
        $scope.selectParamsId = nodes;

    };


    //右键click事件
    function clickFun(param) {
        //data-该节点数据
        // //console.log(param.data);
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

    $scope.modalValue = function() {
        if ($scope.OnlineStatus == 1) {
            if ($scope.showInfo.writable && $scope.isLoading == false) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/modalValue.html',
                    controller: 'modalValueCtrl',
                    size: 'sm',
                    resolve: {
                        showInfo: function() {
                            return $scope.showInfo;
                        },
                        neNeId: function() {
                            return $scope.neNeid;
                        },
                        AuthorizedService: function() {
                            return AuthorizedService;
                        },
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/modalValueCtrl.js']);
                            }
                        ]
                    }
                });
                //点击保存后执行
                // $scope.items = [];
                modalInstance.result.then(function(newItems) {
                    // $scope.valueChange = newItems;
                    // searchTree();
                    if (newItems) {
                        $scope.isLoading = true;
                    } else {
                        $scope.isLoading = false;
                    }
                    // $scope.isLoading = true;

                }, function(newItems) {
                    //console.log(newItems);
                    // searchTree();
                    // $scope.valueChange = newItems;
                    $log.info('Modal dismissed at: ' + new Date());
                });

            } else if ($scope.showInfo.writable && $scope.isLoading == true) {
                // alert("Waiting !");
                swal({
                    title: "Tips:",
                    text: "Waiting !",
                    icon: "info",
                    timer: 4000,
                });
            } else if ($scope.showInfo.paramId == null) {

            } else {
                // alert("Can not writable !");
                swal({
                    title: "Tips:",
                    text: "Can not writable !",
                    icon: "info",
                    timer: 4000,
                });
            };
        } else {
            // alert("The current device is offline or restarting, unable to set parameter value !");
            swal({
                title: "Tips:",
                text: "The current device is offline or restarting, unable to set parameter value !",
                icon: "info",
                timer: 4000,
            });
        }

    };

    //刷新模型参量值
    $scope.refresh = function() {
        if ($scope.OnlineStatus == 1) {
            // var truthBeTold = window.confirm("Are you sure ?");
            swal({
                    title: "Waring",
                    text: "Are you sure ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        var paramsIds = [];
                        if ($scope.selectParamsId.length > 0) {
                            for (let index = 0; index < $scope.selectParamsId.length; index++) {
                                paramsIds.push($scope.selectParamsId[index].paramId);
                            };
                        };
                        AuthorizedService.refreshModelValue($scope.neNeid, paramsIds)
                            .success(function(response) {
                                if (response.code == 200) {
                                    //console.log(response);
                                    $scope.isLoading = true;
                                } else {
                                    // alert(response.msg);
                                    swal({
                                        title: "Tips:",
                                        text: response.msg,
                                        icon: "error",
                                        timer: 4000,
                                    });
                                }

                            })
                            .error(function(err) {
                                console.info(err);
                            });
                    }
                })
                // if (truthBeTold) {

            // } else {

            // };
        } else {
            // alert("The current device is offline or restarting, unable to get the latest parameter value !");
            swal({
                title: "Tips:",
                text: "The current device is offline or restarting, unable to get the latest parameter value !",
                icon: "info",
                timer: 4000,
            });
        }

    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');

    };
    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };

    $rootScope.websocket2.onmessage = function(event) {
        //deviceDetailNameModal里的接收消息
        // alert("Success !")
        var e = JSON.parse(event.data);
        $scope.$apply(function() {
            $rootScope.messageItem = $rootScope.messageItem.reverse();
            $rootScope.messageCount = $rootScope.messageCount + 1;
            e.messageTime = new Date();
            $rootScope.messageItem.push(e);
            $rootScope.messageItem = $rootScope.messageItem.reverse();
        });
        if (e.notifyType == "setParameter") {
            var nodeValue = e.data[0].paramValue;
            $scope.$apply(function() {
                $scope.showInfo.nodeValue = nodeValue;
                $scope.isLoading = false;
            });
            // alert(e.msg);
            swal({
                title: "Tips:",
                text: e.msg,
                icon: "info",
                timer: 4000,
            });
        } else if (e.notifyType == "refreshAllParameter" || e.notifyType == "refreshParamter") {
            // alert(e.msg)
            swal({
                title: "Tips:",
                text: e.msg,
                icon: "info",
                timer: 4000,
            });
            $scope.isLoading = false;
            searchTree();
        };


    };

    //文本超出过滤器
    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice')
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
}