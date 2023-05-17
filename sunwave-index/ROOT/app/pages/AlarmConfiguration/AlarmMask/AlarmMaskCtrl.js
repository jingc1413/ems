(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmMask', [])
        .controller('AlarmMaskCtrl', AlarmMaskCtrl);

    function AlarmMaskCtrl($scope, AlarmMaskService, $uibModal) {
        var setting = {
            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
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
                onExpand: zTreeOnExpand,
                // onClick:clickNode,
                // beforeRemove:removeNode,
                onCheck: onChecked
            }
        };

        var zNodes = [];

        function onChecked(event, treeId, treeNode) {
            $scope.checkNode = treeNode;
            //console.log($scope.checkNode);
        };

        //查tree
        $scope.searchTree = function() {
            AlarmMaskService.getAlarmMaskTree()
                .success(function(response) {
                    zNodes = response.data;
                    //console.log(response.data);
                    $.fn.zTree.init($("#maskTree"), setting, zNodes);
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        $scope.searchTree();

        //refresh
        $scope.refresh = function() {
            $scope.searchTree();
        };

        //展开
        var zTreeOnExpand = function(event, treeId, treeNode) {
            var ztree = $.fn.zTree.init($("#maskTree"), setting, zNodes);
            ztree.expandAll(true);
        };
        $scope.expanAll = function() {
            zTreeOnExpand();
        };
        //收缩
        $scope.collapseAll = function() {
            var ztree = $.fn.zTree.init($("#maskTree"), setting, zNodes);
            ztree.expandAll(false);
        };


        //save
        $scope.save = function() {
            var zTree = $.fn.zTree.getZTreeObj("maskTree");
            var checkedNodes = zTree.getCheckedNodes(true); //获取改变的全部结点

            $scope.ids = [];

            if (checkedNodes.length == 0 || checkedNodes == null) {
                alert('Must Select One!')
            } else if (checkedNodes.length != 0) {
                for (var i = 0; i < checkedNodes.length; i++) {
                    if (checkedNodes[i].pId == '0' || checkedNodes[i].pId == null) {
                        // alert('Cannot select root node!');
                        // return
                    } else {
                        $scope.ids.push(checkedNodes[i].id);
                    }
                };
                if (confirm('Are U Sure?')) {
                    AlarmMaskService.maskTreeSave($scope.ids.toString()).success(function(res) {
                        if (res.data == true) {
                            alert('Success!')
                        }
                    });
                };
            } else {
                return
            }
        };

    }
})();