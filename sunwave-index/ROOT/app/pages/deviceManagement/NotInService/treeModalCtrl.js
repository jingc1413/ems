angular.module('SunWave.pages.deviceManagement.NotInService', ['SunWave.pages.Authority.area'])
    .controller('treeModalCtrl', treeModalCtrl);

function treeModalCtrl($scope, isArea, areaService, $uibModalInstance) {

    $scope.isArea = isArea;

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
            onCheck: zTreeOnCheck
                // beforeRemove:removeNode
        }
    };

    if ($scope.isArea == 'Area') {
        $scope.title = 'Area Select';
        areaService.searchAuthTree().success(function(res) {
                var zNodes = res.data;
                $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
                var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree");
                let nodes = treeObj.getNodes();
                if (nodes.length > 0) {
                    for (var j = 0; j < nodes.length; j++) { //设置节点展开
                        treeObj.expandNode(nodes[j], true, false, true);
                    }
                };
            })
            .error(function(err) {
                console.info(err);
            });
    } else {
        return false;
    }

    //tree checked
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;
    };

    $scope.save = function(treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");
        var changedNodes = zTree.getChangeCheckedNodes(); //获取改变的全部结点
        if (changedNodes.length == 0 || changedNodes == null) {
            alert('Must Select One!')
        } else {
            // alert('Only one can be selected!')
            $scope.close(changedNodes[0]);
        }
    };

    $scope.close = function(changedNodes) {
        $uibModalInstance.close(changedNodes);
    };

}