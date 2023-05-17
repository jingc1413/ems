angular.module('SunWave.pages.Authority.safe', [])
    .controller('safeModalCtrl', safeModalCtrl);

function safeModalCtrl($rootScope, $scope, isAdd, item, safeService, $uibModal, $uibModalInstance, $log) {


    $scope.item = item;
    $scope.isAdd = isAdd;
    console.log($scope.item);
    $scope.isPassword = true;
    $scope.isSelf = false;

    $scope.user = {
        name: "",
        // id: "",
        username: "",
        areaName: "",
        roleName: "",
        password: "",
        email: "",
        phone: ""
    };

    if ($scope.isAdd == 'Add') {
        $scope.add = 'add';
        $scope.title = "Add";
        $scope.readonlyPasw = false;
        // $scope.user = "";
    } else {
        $scope.add = 'modify';
        $scope.title = "Modify";
        $scope.user = $scope.item;
        $scope.isPassword = false;
        if ($scope.user.username == $rootScope.user.username) {
            $scope.isSelf = true;
        };

        $scope.sysAreaSet = $scope.item.sysAreaSet;
        var areaArr = [];
        for (let i = 0; i < $scope.sysAreaSet.length; i++) {
            areaArr.push($scope.sysAreaSet[i].areaName);
        };

        $scope.user.areaName = areaArr.toString();

        $scope.sysroleSet = $scope.item.sysroleSet;
        var roleArr = [];
        for (let i = 0; i < $scope.sysroleSet.length; i++) {
            roleArr.push($scope.sysroleSet[i].name);
        };

        $scope.user.roleName = roleArr.toString();

        $scope.readonlyPasw = true;

    };

    //role授权
    $scope.getRole = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/Authority/safe/getRoleModal.html',
            controller: 'getRoleModalCtrl',
            size: 'md',
            resolve: {
                item: function() {
                    return $scope.item;
                },
                add: function() {
                    return $scope.add;
                },
                safeService: function() {
                    return safeService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/Authority/safe/getRoleModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(newRoles) {
            $scope.user.sysroleSet = newRoles.sysroleSet;
            $scope.newRoles = newRoles.sysroleSet;
            var roleNameArr = [];
            for (let j = 0; j < $scope.newRoles.length; j++) {
                roleNameArr.push($scope.newRoles[j].name);
            };
            $scope.user.roleName = roleNameArr.toString();
        }, function(newPassword) {
            console.log(newPassword);
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
    //area授权
    $scope.getAreaTree = function(size) {
        $scope.isArea = 'Area';
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/Authority/safe/areaTreeModal.html',
            controller: 'areaTreeModalCtrl',
            size: 'md',
            resolve: {
                isArea: function() {
                    return $scope.isArea;
                },
                safeService: function() {
                    return safeService;
                },
                user: function() {
                    return $scope.item;
                },
                add: function() {
                    return $scope.add;
                },

                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/Authority/safe/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(treeNode) {
            console.log(treeNode);
            $scope.user.sysAreaSet = treeNode;
            $scope.treeNode = treeNode;
            var areaNameArr = [];
            for (let j = 0; j < treeNode.length; j++) {
                areaNameArr.push(treeNode[j].name);
            };
            $scope.user.areaName = areaNameArr.toString();
        }, function(treeCheckedNode) {
            console.log(treeCheckedNode);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //保存
    $scope.saveEdit = function() {

        var newItems = {};
        newItems = $scope.user;

        if (isAdd == "Add") {

            if ($scope.user.password == null) {
                alert('Password required!')
            } else {

                newItems.sysAreaSet = $scope.treeNode;
                newItems.sysroleSet = $scope.newRoles;
                safeService.checkUserName(newItems.username).success((res) => {
                    if (res.data == true) {
                        safeService.addContent(newItems).success(function(response) {
                                if (response.data == true) {
                                    alert("Success!");
                                    $scope.close();
                                } else {
                                    alert("Failed!" + response.msg);
                                    // $scope.close();
                                }
                            })
                            .error(function(err) {
                                alert(err.msg)
                            });
                    } else {
                        alert('repeat of user name!');
                    }
                })

            }
        } else {
            // newItems.name = $scope.user.name;
            // newItems.sysAreaSet = $scope.treeNode;
            // newItems.sysroleSet = $scope.newRoles;
            safeService.editContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
                        alert('Success!');
                        $scope.close();
                    } else {
                        alert(response.msg);
                    }
                })
                .error(function(err) {
                    alert(err.msg)
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