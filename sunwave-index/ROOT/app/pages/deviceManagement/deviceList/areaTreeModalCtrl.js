angular.module('SunWave.pages.deviceManagement.deviceList', ['SunWave.pages.Authority.area'])
    .controller('areaTree_deviceModalCtrl', areaTree_deviceModalCtrl);

function areaTree_deviceModalCtrl($scope, isArea, isAdd, item, areaService, $uibModalInstance) {

    $scope.isArea = isArea;
    $scope.isAdd = isAdd;
    $scope.item = item;

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
            // onClick:clickNode,
            // onCheck: zTreeOnCheck,
            // beforeRemove:removeNode
            beforeCheck: function(treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");
                zTree.checkAllNodes(false);
                return true;
            },
            onCheck: function(e, treeId, treeNode) {
                //console.log("当前被选择的节点：");
                //console.log(treeNode);
            }
        }
    };

    if ($scope.isArea == 'Area') {
        if ($scope.isAdd == 'Modify') {
            $scope.title = 'Area Modify';
            areaService.searchAuthTree().success(function(res) {
                    var zNodes = res.data;
                    for (let i = 0; i < zNodes.length; i++) {

                        if ($scope.item.neAreaid == zNodes[i].id) {
                            zNodes[i].checked = true;
                        };

                    };
                    $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
                    var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree");
                    var nodes = treeObj.getNodes(); //可以获取所有的父节点
                    var nodesSysAll = treeObj.transformToArray(nodes); //获取树所有节点
                    if (nodesSysAll.length > 0) {
                        for (let i = 0; i < nodesSysAll.length; i++) {
                            treeObj.expandNode(nodesSysAll[i], true, true, false);
                        }
                    };
                    for (let i = 0; i < nodesSysAll.length; i++) {
                        const t_node = nodesSysAll[i];
                        if (t_node.check_Child_State !== -1) {
                            t_node.nocheck = true;
                            treeObj.updateNode(t_node);
                        }
                    };

                })
                .error(function(err) {
                    console.info(err);
                });
        } else {
            $scope.title = 'Area Add';
            areaService.searchAuthTree().success(function(res) {
                    var zNodes = res.data;
                    $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
                    var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree");
                    // var nodes = treeObj.getNodes();
                    let nodes = treeObj.transformToArray(treeObj.getNodes());
                    let nodes2 = treeObj.getNodes();
                    let node;
                    if (nodes.length > 0) {
                        for (let i = 0; i < nodes.length; i++) {
                            let id = nodes[i].id;
                            for (let j = 0; j < nodes.length; j++) {
                                if (id == nodes[j].pId) {
                                    node = treeObj.getNodeByParam("id", id, null);
                                    node.nocheck = true;
                                    treeObj.updateNode(node);
                                }
                            }
                        };
                    };
                    if (nodes2.length > 0) {
                        for (var j = 0; j < nodes2.length; j++) { //设置节点展开
                            treeObj.expandNode(nodes2[j], true, false, true);
                        }
                    };

                })
                .error(function(err) {
                    console.info(err);
                });
        }

    } else {
        return false;
    };

    //tree checked
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;
    };

    $scope.save = function(treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");

        var changedNodes = zTree.getCheckedNodes();; //获取改变的全部结点

        if (changedNodes.length == 1) {
            // //console.log(changedNodes);
            $uibModalInstance.close(changedNodes[0]);
        } else if (changedNodes.length == 0 || changedNodes == null) {
            alert('Must Select One!')
        } else {
            alert('Only one can be selected!')
        }
    };

    $scope.close = function(changedNodes) {
        $uibModalInstance.close(changedNodes);
    };

}