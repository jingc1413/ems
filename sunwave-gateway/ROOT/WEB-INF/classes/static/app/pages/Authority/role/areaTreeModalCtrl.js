angular.module('SunWave.pages.Authority.role', ['SunWave.pages.Authority.area',
        'SunWave.pages.Authority.organization'
    ])
    .controller('areaTreeModalCtrl', areaTreeModalCtrl);

function areaTreeModalCtrl($scope, isArea, role, roleService, organizationService, areaService, $uibModalInstance) {

    $scope.isArea = isArea;
    $scope.role = role;
    $scope.menuSet = $scope.role.menuSet;

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
            chkboxType: { "Y": "ps", "N": "ps" }
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
        $scope.title = 'Area';
        areaService.searchTree().success(function(res) {
                zNodes = res.data;
                $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
            })
            .error(function(err) {
                console.info(err);
            });
    } else {
        $scope.title = "Menu";
        roleService.getMenuTree().success(function(res) {
                zNodes = res.data;
                for (let i = 0; i < zNodes.length; i++) {
                    for (let j = 0; j < $scope.menuSet.length; j++) {
                        if ($scope.menuSet[j].id == zNodes[i].id) {
                            zNodes[i].checked = true;
                        }
                    }
                };
                $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
                var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree");
                treeObj.reAsyncChildNodes(null, "refresh");
            })
            .error(function(err) {
                console.info(err);
            });
    }

    //tree checked
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;
    };

    // var treeCheckedNode = $scope.checked;


    $scope.save = function(treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");
        $scope.nodes = zTree.getCheckedNodes(true);
        // var changedNodes = zTree.getChangeCheckedNodes(); //获取改变的全部结点
        // for (var i = 0; i < changedNodes.length; i++) {
        //     var treeNode = changedNodes[i];
        //     // console.log((treeNode?treeNode.name:"root") + "checked " +(treeNode.checked?"true":"false"));
        // }
        // console.log(changedNodes); //选中的nodes
        // for (let i = 0; i < $scope.nodes.length; i++) {

        // }
        var needItems = $scope.role;
        needItems.menuSet = $scope.nodes;
        roleService.editContent(needItems).success(function(res) {
            if (res.code == 200 && res.error == undefined) {
                alert('Success');
                $uibModalInstance.close($scope.nodes);
            } else {
                alert('Failed' + res.message);
            }
        })


    };

    $scope.close = function() {
        $uibModalInstance.close('cancel');
    };

}