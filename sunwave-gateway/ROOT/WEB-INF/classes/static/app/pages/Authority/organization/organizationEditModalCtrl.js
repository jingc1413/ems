/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.Authority.organization', [])
    .controller('organizationEditModalCtrl', organizationEditModalCtrl);

function organizationEditModalCtrl($scope, organizationService, isAdd, treeNode, transmitModalItems, $uibModalInstance) {

    console.log('treeNode:' + treeNode);

    $scope.tree = {
        name: "",
        id: "",
        pId: "",
        code: "",
        isMenu: "",
        isButton: "",
        status: "",
        sort: ""
    }


    $scope.Show = false;
    $scope.isShow = function() {
        $scope.Show = !$scope.Show;
    };

    $scope.addShow = function() {
        // $scope.isShow = !$scope.isShow;
        $scope.adds.splice($scope.adds.length + 1, 0, {
            name: "",
            id: ""
        });
    }
    $scope.deleteShow = function() {
        // $scope.isShow = !$scope.isShow;
        $scope.adds.splice($index, 1);
    };



    $scope.isAdd = isAdd;
    if ($scope.isAdd) {
        $scope.title = 'Add';
        organizationService.searchNodeById(treeNode.id).success(function(res) {
            $scope.tree.pId = res.data.id; //渲染
            $scope.data = res.data;
        });
        // if ($scope.data.pId == null || $scope.data.pId == undefined) {
        //     $scope.tree.pId = "null";
        // } else {
        //     $scope.tree.pId = $scope.data.pId;
        // }

    } else {
        $scope.title = "Modify";
        organizationService.searchNodeById(treeNode.id).success(function(res) {
            $scope.tree = res.data; //渲染
            // $scope.tree.pId = res.data.id; //查到节点的id是新增的该节点的pId
            $scope.data = res.data; //点击的节点

        });
    }

    $scope.save = function() {
        var newItems = $scope.tree;
        var newItemsArr = [];

        if ($scope.isAdd) {
            newItems.pId = $scope.data.id;
            newItems.level = $scope.data.level + 1;

            newItemsArr.push(newItems);
            organizationService.addContent(newItemsArr)
                .success(function(response) {
                    alert(response.msg);
                    $scope.close(newItems);
                })
                .error(function(err) {
                    console.info(err);
                });

        } else {
            newItemsArr.push(newItems);
            organizationService.editContent(newItemsArr)
                .success(function(response) {
                    alert(response.msg);
                    $scope.close(newItems);
                })
                .error(function(err) {
                    alert(err.message);
                });
        }

    }




    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

    // });
}
// });