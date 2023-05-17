angular.module('SunWave.pages.Authority.safe', ['SunWave.pages.Authority.area',
        'SunWave.pages.Authority.organization'
    ])
    .controller('areaTreeModalCtrl_safe', areaTreeModalCtrl_safe);

function areaTreeModalCtrl_safe($rootScope, $scope, isArea, user, add, safeService, organizationService, areaService, $uibModalInstance) {


    $scope.add = add;

    if ($scope.add == 'add') {
        $scope.isArea = isArea;

        $scope.user = {};

        if ($scope.isArea == 'Area') {
            // $scope.title = 'Area';
            if ($rootScope.language == 'chinese') {
                $scope.title = '地区'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Area';
            } else {
                $scope.title = 'Area';
            };
            areaService.searchAuthTree().success(function(res) {
                    zNodes = res.data;
                    $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);

                })
                .error(function(err) {
                    console.info(err);
                });
        } else {
            //菜单授权
            // $scope.title = "Menu";
            if ($rootScope.language == 'chinese') {
                $scope.title = '菜单'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Menu';
            } else {
                $scope.title = 'Menu';
            };
            organizationService.searchContent().success(function(res) {
                    zNodes = res.data;
                    $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
                })
                .error(function(err) {
                    console.info(err);
                });
        }
    } else if ($scope.add == 'authority' || $scope.add == 'modify') {
        $scope.isArea = isArea;
        $scope.user = user;
        $scope.sysAreaSet = $scope.user.sysAreaSet;
        if ($scope.isArea == 'Area') {
            // $scope.title = 'Area';
            if ($rootScope.language == 'chinese') {
                $scope.title = '地区'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Area';
            } else {
                $scope.title = 'Area';
            };
            areaService.searchAuthTree().success(function(res) {
                    zNodes = res.data;
                    // $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);

                    for (let i = 0; i < zNodes.length; i++) {
                        for (let j = 0; j < $scope.sysAreaSet.length; j++) {
                            if ($scope.sysAreaSet[j].areaCode == zNodes[i].code) {
                                zNodes[i].checked = true;
                            }
                        }
                    };
                    $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);

                })
                .error(function(err) {
                    console.info(err);
                });
        } else {
            //菜单授权
            // $scope.title = "Menu";
            if ($rootScope.language == 'chinese') {
                $scope.title = '菜单'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Menu';
            } else {
                $scope.title = 'Menu';
            };
            organizationService.searchContent().success(function(res) {
                    zNodes = res.data;
                    $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
                })
                .error(function(err) {
                    console.info(err);
                });
        };
    };

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
            chkboxType: { "Y": "s", "N": "ps" }
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

    // var treeCheckedNode = $scope.checked;


    $scope.save = function(treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");
        var changedNodes = zTree.getCheckedNodes(); //获取改变的全部结点
        for (var i = 0; i < changedNodes.length; i++) {
            changedNodes[i].areaName = changedNodes[i].name;
            changedNodes[i].areaCode = changedNodes[i].code;
        };
        //console.log(changedNodes); //选中的nodes
        var needItems = $scope.user;
        if ($scope.isArea == 'Area') {
            needItems.sysAreaSet = changedNodes;
        } else if ($scope.isArea == 'menu') {
            needItems.menuSet = changedNodes;
        };

        if ($scope.add == 'add' || $scope.add == 'modify') {

            $uibModalInstance.close(changedNodes);

        } else if ($scope.add == 'authority') {
            safeService.editContent(needItems).success(function(res) {
                if (res.code == 200) {
                    alert('Success!');
                    $uibModalInstance.close(changedNodes);

                } else {
                    alert('Failed' + res.message);
                }
            })

        }
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('cancel');
    };

}