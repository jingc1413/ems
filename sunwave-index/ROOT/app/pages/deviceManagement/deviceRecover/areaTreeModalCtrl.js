angular.module('SunWave.pages.deviceManagement.deviceRecover', ['SunWave.pages.Authority.area'])
    .controller('areaTreeModalCtrl', areaTreeModalCtrl);

function areaTreeModalCtrl($scope, isArea, areaService, $uibModalInstance) {

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
        $scope.title = 'Area';
        areaService.searchAuthTree().success(function(res) {
                zNodes = res.data;
                $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
            })
            .error(function(err) {
                console.info(err);
            });
    } else {
        $scope.title = "Menu";
        organizationService.searchContent().success(function(res) {
                zNodes = res.data;
                $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
            })
            .error(function(err) {
                console.info(err);
            });
    }

    //tree checked
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;
    };


    $scope.save = function(treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");
        var changedNodes = zTree.getChangeCheckedNodes(); //获取改变的全部结点
        for (var i = 0; i < changedNodes.length; i++) {
            var treeNode = changedNodes[i];
        };
        $uibModalInstance.close(changedNodes);
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

}