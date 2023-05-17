(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.area', [])
        .controller('areaCtrl', areaCtrl);

    function areaCtrl($scope, areaService, $uibModal, $log, messageAlertService) {

        $scope.checkbox = {
            select_all: "",
        }

        $scope.area = "";
        // $scope.absUrl = $location.url();
        $scope.selectedItem = "";

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.checkbox.select_all = false;
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 10,
            areaName: null
        };

        //modify

        $scope.modifyArea = function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var checkNodes = zTree.getCheckedNodes(true); //获取选中的树节点
            if (checkNodes.length == 1) {
                $scope.isAdd = "edit";
                $scope.openEditAreaDialog(checkNodes[0]);
            } else if (checkNodes.length == 0 || checkNodes == null) {
                // alert('Must Select One!')
                messageAlertService.alertFun('must');
            } else {
                // alert('Only one can be selected!')
                messageAlertService.alertFun('only');
            }
        };
        // var toModifyNode = function(treeNode, treeId) {

        //     var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        //     var changedNodes = zTree.getChangeCheckedNodes(); //获取改变的全部结点
        //     if (changedNodes.length == 1) {
        //         $scope.isAdd = "edit";
        //         $scope.openEditAreaDialog(changedNodes);
        //     } else if (changedNodes.length == 0 || changedNodes == null) {
        //         alert('Must Select One!')
        //     } else {
        //         alert('Only one can be selected!')
        //     }

        //     return false;
        // };

        var setting = {
            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: false
            },


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
                // enable: true,
                // removeTitle: "Delete",
                // renameTitle: "Modify",
                // addTitle: "Add"
            },
            // callback: {
            //     beforeEditName: toModifyNode,
            //     // onClick:clickNode,
            //     beforeRemove: removeNode,
            //     onCheck: onChecked
            // }
            callback: {
                //只能选中一个功能
                beforeClick: function() {
                    //禁止节点被选中
                    var e = e || window.event;
                    e.stopPropagation();
                    return false;
                },
                onCheck: function(e, treeId, treeNode) {
                    var treeObj = $.fn.zTree.getZTreeObj(treeId);
                    var status = treeNode.checked;
                    treeObj.checkAllNodes(false);
                    treeObj.checkNode(treeNode, status, false);
                }
            }
        };

        function onChecked(event, treeId, treeNode) {
            $scope.checkNode = treeNode;
            //console.log($scope.checkNode);
        };
        var zNodes = [
            // { id:1, pId:0, name:"SGMRT", open:true},
            // { id:11, pId:1, name:"Floor23"},
        ];

        //查tree
        $scope.searchTree = function() {
            areaService.searchAuthTree()
                .success(function(response) {
                    zNodes = response.data;
                    //console.log(response.data);
                    var treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                    var nodes = treeObj.getNodes();
                    for (var i = 0; i < nodes.length; i++) { //设置节点展开
                        treeObj.expandNode(nodes[i], true, false, true);
                    }
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        $scope.searchTree();

        //tree add
        var newCount = 1;

        function addHoverDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
            var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
                "' title='Add Node' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_" + treeNode.tId);
            if (btn) btn.bind("click", function() {
                $scope.toAddItem(treeNode);
                return false;
            });
        };

        //tree删除
        $scope.deleteArea = function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var checkNodes = zTree.getCheckedNodes(true); //获取选中的树节点

            if (checkNodes.length == 0) {
                // alert('Please select one!')
                messageAlertService.alertFun('must');
            } else {
                var a = messageAlertService.confirmFun('sure');
                if (a) {
                    var idsArr = [];
                    for (let d = 0; d < checkNodes.length; d++) {
                        const idd = checkNodes[d].id;
                        idsArr.push(idd);
                    }
                    areaService.deleteAreas(idsArr.toString())
                        .success(function(response) {
                            // alert("Success");
                            if (response.code == 200 && response.err == undefined) {
                                messageAlertService.successFun('success');
                                $scope.searchTree();
                            } else {
                                alert(response.msg)
                            }
                        })
                        .error(function(err) {
                            // alert("Failed")
                            messageAlertService.successFun('failed');
                        });

                } else {
                    // alert("Cancel!");
                    messageAlertService.successFun('');
                    return false
                }
            }

        };

        function removeNode(treeId, treeNode) {
            // var zTree = $.fn.zTree.getZTreeObj("tree");
            // zTree.selectNode(treeNode);
            var a = confirm("Are you sure to delete -- " + treeNode.name + " 吗？");
            if (a) {
                areaService.deleteAreas(treeNode)
                    .success(function(response) {
                        // alert("Success");
                        messageAlertService.successFun('success');
                        $scope.searchTree();
                    })
                    .error(function(err) {
                        // alert("Failed")
                        messageAlertService.successFun('failed');
                    });

            } else {
                // alert("cancel");
                messageAlertService.successFun('');
                return false
            }
        }

        function removeHoverDom(treeId, treeNode) {

            $("#addBtn_" + treeNode.tId).unbind().remove();
        };

        //add
        $scope.addArea = function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var checkNodes = zTree.getCheckedNodes(true); //获取改变的全部结点
            if (checkNodes.length == 1) {
                $scope.isAdd = "add";
                $scope.openEditAreaDialog(checkNodes[0]);
            } else if (checkNodes.length == 0 || checkNodes == null) {
                // alert('Must Select One!')
                messageAlertService.alertFun('must');
            } else {
                // alert('Only one can be selected!')
                messageAlertService.alertFun('only');
            }
        };
        // $scope.toAddItem = function(treeNode) {
        //     // $scope.isAdd = "add";
        //     // $scope.openEditAreaDialog(treeNode);
        //     var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        //     //选中
        //     treeNode.checked = true;
        //     zTree.updateNode(treeNode);

        //     var changedNodes = zTree.getChangeCheckedNodes(); //获取改变的全部结点
        //     if (changedNodes.length == 1) {
        //         $scope.isAdd = "add";
        //         $scope.openEditAreaDialog(treeNode);
        //     } else if (changedNodes.length == 0 || changedNodes == null) {
        //         alert('Must Select One!')
        //     } else {
        //         alert('Only one can be selected!')
        //     }

        //     return false;


        // };
        //修改 Add modal
        $scope.openEditAreaDialog = function(treeNode) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/area/areaModal.html',
                controller: 'areaModalCtrl',
                size: 'md',
                resolve: {
                    // area: function () {
                    // 	return $scope.area;
                    // },
                    treeNode: function() {
                        return treeNode;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    areaService: function() {
                        return areaService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/area/areaModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                $scope.searchTree();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //=======右边===============================================

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

        /*查询*/
        // var getForm = function() {   //查询
        // 	$scope.query.pageIndex = $scope.paginationConf.currentPage;
        // 	$scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        // 	$scope.clearAll();  //清空数组
        // 	areaService.search($scope.query)
        // 			.success(function(response) {
        // 				$scope.paginationConf.totalItems = response.data.totalElements;
        // 				//console.log(response);
        // 				$scope.items = response.data.content;
        // 				// getNameAndUpNameByAreaId($scope.checkedItems[0].id);

        // 			})
        // 			.error(function(err){
        // 				console.info(err);
        // 			});
        // };

        var getNameAndUpNameByAreaId = function() {
            areaService.getNameAndUpNameByAreaId().success(function(response) {
                $scope.items = response.data;
            })
        }

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [10, 20, 30, 40, 50]

        };

        $scope.search = function() {
            getForm();
        };


        // $scope.search();

        //排序
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


        /*******************************************************************
         * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ******************************************************************/
        // $scope.$watch(
        // 		'paginationConf.currentPage + paginationConf.itemsPerPage',
        // 		getForm);

        $scope.openGetAreaTreeModal = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/area/openAreaTreeModal.html',
                controller: 'openAreaTreeModalCtrl',
                size: 'md',
                resolve: {
                    area: function() {
                        return $scope.area;
                    },
                    areaService: function() {
                        return areaService;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/area/openAreaTreeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


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
            $scope.checked = [];
            $scope.checkedItems = [];
        };


    }
})();