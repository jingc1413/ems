angular.module('SunWave.pages.Authority.role', [])
    .controller('roleModalCtrl', roleModalCtrl);

function roleModalCtrl($rootScope, $scope, isAdd, $q, role, $uibModalInstance, roleService, messageAlertService) {

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        // $scope.title = 'Add';
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
    } else {
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '编辑'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.role = role;
    };

    // $scope.statuses = [
    // 	{name: "禁用", id: 0},
    // 	{name: "启用", id: 1}
    // ];


    //authority 验证是否有操作权限
    // var checkAuthority_check;
    $scope.checkAuthority = function(ids) {
        roleService.checkHasRoleAuth(ids).success(function(res) {
            if (res.data == true) {

                $scope.checkAuthority_check = true;
                return true;
            } else {
                $scope.checkAuthority_check = false;

                return false;
            }
        }).error(function(err) {

        })
    };

    $scope.ok = function() {

        // if($scope.role_exist == true) return;
        var newItems = {};
        newItems = $scope.role;
        newItems.status = $scope.role.status;
        if ($scope.isAdd == 'Add') {
            // roleService.isRoleExist(newItems.name).success(function(res) {
            // if (res.data == true) {
            roleService.addContent(newItems)
                .success(function(response) {
                    if (response.error == null && response.error == undefined && response.code == 200) {
                        // alert("Success")
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else if (response.code == 100) {
                        // alert("Failed" + response.msg)
                        messageAlertService.successFun('failed', response.msg);

                    } else {
                        // alert("Failed")
                        messageAlertService.successFun('failed', response.msg);
                    }
                })
                .error(function(err) {
                    console.info(err);
                });
            //     } else {
            //         // alert('The role name exist!');
            //         messageAlertService.authorityFun('exist');
            //         return
            //     }

            // }).error(function(err) {

            //     // alert(err.msg);
            //     messageAlertService.successFun('failed');
            // });


        } else {
            //检验

            roleService.checkHasRoleAuth($scope.role.id).success(function(res) {
                if (res.data == true) {
                    // $scope.checkAuthority_check = true;
                    //modify
                    roleService.editContent($scope.role)
                        .success(function(response) {
                            if (response.error == null && response.error == undefined && response.code == 200) {
                                // alert("Success")
                                messageAlertService.successFun('success');
                                $scope.close();
                            } else if (response.code == 100) {
                                // alert("Failed" + res.msg)
                                messageAlertService.successFun('failed', response.msg);

                            } else {
                                // alert("Failed")
                                // messageAlertService.successFun('failed');
                            }
                        })
                        .error(function(err) {
                            console.info(err);
                        });


                } else {
                    // $scope.checkAuthority_check = false;
                    // alert('The User has no authority!')
                    messageAlertService.authorityFun('no');
                }
            }).error(function(err) {
                return
            });

        }


    };
    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}