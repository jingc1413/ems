angular.module('SunWave.pages.deviceManagement.deviceList', ['SunWave.pages.Authority.area'])
    .controller('areaTreeModalCtrl', areaTreeModalCtrl);

function areaTreeModalCtrl($scope, isArea, isAdd, item, areaService, $uibModalInstance) {

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
                console.log("当前被选择的节点：");
                console.log(treeNode);
            }
        }
    };

    if ($scope.isArea == 'Area') {
        if ($scope.isAdd == 'Modify') {
            $scope.title = 'Area Modify';
            areaService.searchAuthTree().success(function(res) {
                    zNodes = res.data;
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
                    zNodes = res.data;
                    $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
                    var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree");
                    var nodes = treeObj.getNodes();
                    if (nodes.length > 0) {
                        for (let i = 0; i < nodes.length; i++) {
                            treeObj.expandNode(nodes[i], true, false, false);
                        }
                    }

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
            // console.log(changedNodes);
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