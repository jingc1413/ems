angular.module('SunWave.pages.Authority.area', [])
    .controller('areaModalCtrl', areaModalCtrl);

function areaModalCtrl($scope, isAdd, treeNode, areaService, $uibModal, $uibModalInstance) {


    $scope.area = treeNode;
    // $scope.area={
    // 	areaName:"",
    // 	areaCode:""
    // }
    $scope.treeNode = treeNode;
    console.log($scope.treeNode);

    // findSysAreaById修改之前查数据
    $scope.findSysAreaById = function(id) {
        areaService.findSysAreaById(id).success(function(res) {
            $scope.area = res.data;
        })

        return $scope.data;
    };
    //getNameAndUpNameByAreaId根据id查名称和父级名称
    $scope.getNameAndUpNameByAreaId = function(id) {
        areaService.findPName(id).success(function(res) {
            if (isAdd == 'add') {
                $scope.area.pAreaName = res.data.nAreaName;
            } else {
                $scope.area.pAreaName = res.data.uAreaName;

            }
        })
    };

    if (isAdd == "add") {
        $scope.title = "Add";
        // $scope.area = "";
        $scope.getNameAndUpNameByAreaId($scope.area.id);

    } else {
        $scope.title = "Modify";
        //findSysAreaById
        $scope.findSysAreaById($scope.area.id);
        $scope.getNameAndUpNameByAreaId($scope.area.id);

    };


    //根据areaCode查上级地区
    $scope.getNameAndUpNameByAreaId = function() {
        areaService.getNameAndUpNameByAreaId($scope.areaCode)
            .success(function(response) {
                $scope.items = response.data;
            })
            .error(function(err) {
                $scope.area.upArea = "";
            });
    }

    //根据areaCode查子地区
    $scope.getChildNameByAreaId = function() {
            areaService.getChildNameByAreaId($scope.areaCode)
                .success(function(response) {
                    $scope.items = response.data;
                })
                .error(function(err) {
                    $scope.area.upArea = "";
                });
        }
        // 树
        //getAreaTree
    $scope.getAreaTree = function() {
        $scope.openGetAreaTreeModal();
    }
    $scope.openGetAreaTreeModal = function(size) {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/Authority/area/openAreaTreeModal.html',
            controller: 'openAreaTreeModalCtrl',
            size: 'md',
            resolve: {
                // area: function () {
                // 	return $scope.area;
                // },
                areaService: function() {
                    return areaService;
                },
                // isAdd:function(){
                // 	return $scope.isAdd;
                // },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/Authority/area/openAreaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(checked) {
            console.log("外面的---" + checked);
            $scope.checkedId = checked.id;
            $scope.upAreaName = checked.name;
        }, function(checked) {
            // console.log("外面的2---"+checked);
            // $scope.upAreaName = checked.name;
        });
    };


    //保存
    $scope.saveEdit = function() {
        // if($scope.upAreaName==undefined){
        // 	alert("Please Select上级地区！");
        // 	return ;
        // }
        var newItems = {};
        newItems = $scope.area;
        if (isAdd == "add") {
            newItems.pId = $scope.treeNode.id;
            newItems.pCode = $scope.treeNode.code;

            areaService.addContent(newItems).success(function(response) {
                if (response.msg == "操作成功") {
                    alert("Success!");
                    $scope.close();
                    // }else if(response.saveFlag=="modifySuccess"){
                    // 	alert("修改成功!");
                    // 	$scope.close();
                } else {
                    alert(msg);
                    $scope.close();
                }
            });
        } else {
            newItems.pId = $scope.treeNode.pId;
            areaService.editContent(newItems).success(function(response) {
                if (response.msg == "操作成功") {
                    alert("Success!");
                    $scope.close();
                } else {
                    alert(response.msg);
                    $scope.close();
                }
            });
        }
    }

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}