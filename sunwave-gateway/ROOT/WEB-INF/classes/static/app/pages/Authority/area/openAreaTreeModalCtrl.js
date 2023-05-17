
angular.module('SunWave.pages.Authority.area', [])
.controller('openAreaTreeModalCtrl', openAreaTreeModalCtrl);

function openAreaTreeModalCtrl($scope,areaService,$uibModalInstance) {

var setting = {
    view: {
        // addHoverDom: addHoverDom,
        // removeHoverDom: removeHoverDom,
        selectedMulti: true
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
    callback:{
        // beforeEditName:editNode,
        // onClick:clickNode,
        onCheck: zTreeOnCheck
        // beforeRemove:removeNode
    }
};

//查询
var searchTree = function() {
    areaService.searchTree()
        .success(function(response) {
            zNodes = response.data;
            $.fn.zTree.init($("#areaTree"), setting, zNodes);
        })
        .error(function(err) {
            console.info(err);
        });
};
searchTree();

//tree checked
function zTreeOnCheck(event, treeId, treeNode) {
    $scope.checked = treeNode;
    console.log($scope.checked);

    // refreshLayers();
    // clearCheckedOldNodes();
};



/*钮*/
$scope.save = function(checked){
    var checked = {};
    checked = $scope.checked;
    $uibModalInstance.close(checked);
};

$scope.close = function(){
    $uibModalInstance.dismiss('cancel');
};

}