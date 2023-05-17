(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmForward', ['SunWave.pages.Authority.area'])
        .controller('areaTreeCtrl', areaTreeCtrl);

    function areaTreeCtrl($scope, isAdd, selectTreeNode, AlarmForwardService, areaService, $uibModal, $log, $uibModalInstance, ) {

        $scope.checkbox = {
            select_all: "",
        };

        $scope.selectTreeNode = selectTreeNode.split(',');
        $scope.isAdd = isAdd;

        $scope.AlarmForward = {
            useName: "",
            useUserid: "",
            useMobile: "",
            useMobileturn: 0,
            useEmail: "",
            useEmailturn: 0,
            useAlarmlevel: "",
            useAlarmturncondition: "",
            useArea: "",
            useCompany: "",
            useSitelevel: ""
        }

        $scope.area = "";
        // $scope.absUrl = $location.url();
        $scope.selectedItem = "";



        var setting = {
            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            check: {
                enable: true
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
                // beforeEditName:toModifyNode,
                // onClick:clickNode,
                // beforeRemove:removeNode,
                onCheck: onChecked
            }
        };

        function onChecked(event, treeId, treeNode) {
            $scope.checkNode = treeNode;
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
                    // $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                    // var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    //初始化树 select树
                    if ($scope.isAdd == 'modify' || $scope.isAdd == 'view') {
                        for (let i = 0; i < zNodes.length; i++) {
                            const tree = zNodes[i];
                            for (let j = 0; j < $scope.selectTreeNode.length; j++) {
                                const select = $scope.selectTreeNode[j];
                                if (tree.id == select) {
                                    tree.checked = true;
                                }
                            }
                        }
                    } else if ($scope.iaAdd == 'add') {}
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    treeObj.reAsyncChildNodes(null, "refresh");
                    var nodes = treeObj.getNodes();
                    if (nodes.length > 0) {
                        for (let i = 0; i < nodes.length; i++) {
                            treeObj.expandNode(nodes[i], true, false, false);
                        }
                    };
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        $scope.searchTree();



        $scope.close = function(newItems) {

            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            $scope.nodes = zTree.getCheckedNodes(true);
            newItems = $scope.nodes;
            $uibModalInstance.close(newItems);

        };

    }
})();