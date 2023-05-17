angular.module('SunWave.pages.deviceManagement.objectsListValue', [])
    .controller('authorizeModalCtrl', authorizeModalCtrl);

function authorizeModalCtrl($scope, objectsListValueService, isAuthorize, $uibModalInstance) {
    $scope.isAuthorize = isAuthorize;
    if ($scope.isAuthorize == 'x') {
        $scope.title == 'x';
        objectsListValueService.searchAuthTree().success(function(res) {
                zNodes = res.data;
                $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
            })
            .error(function(err) {
                console.info(err);
            });
    } else {
        $scope.title == '';
    }

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


    //tree checked
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;
    };


    $scope.save = function(treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");
        var changedNodes = zTree.getChangeCheckedNodes(); //获取改变的全部结点
        for (var i = 0; i < changedNodes.length; i++) {
            var treeNode = changedNodes[i];
            // console.log((treeNode?treeNode.name:"root") + "checked " +(treeNode.checked?"true":"false"));
        }
        console.log(changedNodes); //选中的nodes

        var needItems = changedNodes;
        objectsListValueService.authorizeTree(needItems).success(function(res) {
            if (res.message = '操作成功') {
                alert('Authorize success!');
            } else {
                alert('Authorize Failed' + res.message);
            }
        })

        $uibModalInstance.close(changedNodes);
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

}