(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.organization', [])
        .controller('organizationCtrl', organizationCtrl);

    function organizationCtrl($scope, organizationService, $uibModal, $log) {

        $scope.query = {
            areaName: "",
            keyword: "",
            pageIndex: 0,
            pageSize: 10
        }
        $scope.tree = {
            name: "",
            id: "",
            pId: ""
        }
        var setting = {
            view: {
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom,
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
                enable: true,
                removeTitle: "Delete",
                renameTitle: "Modify",
                addTitle: "Add"
            },
            callback: {
                beforeEditName: editNode,
                onClick: clickNode,
                beforeRemove: removeNode
            }
        };

        var zNodes = [
            // { id:1, pId:0, name:"SGMRT", open:true},
            // { id:11, pId:1, name:"Floor23"},
            // { id:111, pId:11, name:"Lab Meeting Room"},
            // { id:12, pId:1, name:"STATION01"},
            // { id:121, pId:12, name:"Centre1"},
            // { id:122, pId:12, name:"Centre1_3"},
            // { id:123, pId:12, name:"Centre2"},
            // { id:13, pId:1, name:"STATION02"},
            // { id:131, pId:13, name:"TE02", open:true},
            // { id:14, pId:1, name:"STATION03"},
            // { id:15, pId:1, name:"STATION04"},
            // { id:16, pId:1, name:"Sunwave"},
            // { id:161, pId:16, name:"0710aaa"},
        ];
        //查tree
        var searchForm = function() {
            organizationService.searchContent()
                .success(function(response) {
                    console.log("~~~~~~~~" + response.data);
                    zNodes = response.data;
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        searchForm();

        //tree的编辑modal
        function editNode(treeId, treeNode) {
            $scope.isAdd = false;
            $scope.openEditDialog(treeNode);

            return false;
        };
        //search右边
        function clickNode(event, treeId, treeNode) {
            console.log(treeNode)
            $scope.$apply(function() {
                $scope.tree = treeNode;
            })
        }
        //tree删除节点
        function removeNode(treeId, treeNode) {
            // var zTree = $.fn.zTree.getZTreeObj("tree");
            // zTree.selectNode(treeNode);
            var a = confirm("Are you sure to delete -- " + treeNode.name + " 吗？");
            if (a) {
                organizationService.removeTreeNode(treeNode)
                    .success(function(response) {
                        alert("Success");
                    })
                    .error(function(err) {
                        alert("Failed")
                    });

            } else {
                alert("Cancel");
                return false
            }
        }

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
                // var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                // zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
                addTreeNode(treeNode);
                return false;
            });
        };

        function addTreeNode(treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo")
            treeNode.checked = true;
            zTree.updateNode(treeNode);

            var changedNodes = zTree.getChangeCheckedNodes(); //获取改变的全部结点
            if (changedNodes.length == 1) {
                $scope.isAdd = true;
                $scope.openEditDialog(treeNode);
            } else if (changedNodes.length == 0 || changedNodes == null) {
                alert('Must Select One!')
            } else {
                alert('Only one can be selected!')
            };

        };

        function removeHoverDom(treeId, treeNode) {

            $("#addBtn_" + treeNode.tId).unbind().remove();
        };

        $scope.openEditDialog = function(treeNode, size) {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/organization/organizationEditModal.html',
                controller: 'organizationEditModalCtrl',
                size: size,
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    treeNode: function() {
                        return treeNode;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/organization/organizationEditModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // for (let i = 0; i < zNodes.length; i++) {
                //     if (zNodes[i].id == newItems.id) {
                //         zNodes.splice(i,1);
                //     }

                // }
                // zNodes.push(newItems);
                searchForm();
                // $.fn.zTree.init($("#treeDemo"), setting, zNodes);

            }, function(newItems) {
                console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
})();