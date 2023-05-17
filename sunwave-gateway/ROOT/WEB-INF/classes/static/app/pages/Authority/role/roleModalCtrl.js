angular.module('SunWave.pages.Authority.role', [])
    .controller('roleModalCtrl', roleModalCtrl);

function roleModalCtrl($scope, isAdd, $q, role, $uibModalInstance, roleService) {

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        $scope.title = 'Add';
    } else {
        $scope.title = "Modify";
        $scope.role = role;
    };

    // $scope.statuses = [
    // 	{name: "禁用", id: 0},
    // 	{name: "启用", id: 1}
    // ];


    //authority 验证是否有操作权限
    // var checkAuthority_check;
    $scope.checkAuthority = (ids) => {
        roleService.checkHasRoleAuth(ids).success((res) => {
            if (res.data == true) {

                $scope.checkAuthority_check = true;
                return true;
            } else {
                $scope.checkAuthority_check = false;

                return false;
            }
        }).error((err) => {

        })
    };

    $scope.ok = function() {

        // if($scope.role_exist == true) return;
        var newItems = {};
        newItems = $scope.role;
        newItems.status = $scope.role.status;
        if ($scope.isAdd == 'Add') {
            roleService.isRoleExist(newItems.name).success((res) => {
                if (res.data == true) {
                    roleService.addContent(newItems)
                        .success(function(response) {
                            if (response.error == null && response.error == undefined) {
                                alert("Success")
                                $scope.close();
                            } else {
                                alert("Failed")
                            }
                        })
                        .error(function(err) {
                            console.info(err);
                        });
                } else {
                    alert('The role name exist!');
                    return
                }

            }).error((err) => {

                alert(err.msg);
            });


        } else {
            //检验

            roleService.checkHasRoleAuth($scope.role.id).success((res) => {
                if (res.data == true) {
                    // $scope.checkAuthority_check = true;
                    //modify
                    roleService.editContent($scope.role)
                        .success(function(response) {
                            alert("Success");
                            $scope.close();
                        })
                        .error(function(err) {
                            console.info(err);
                        });


                } else {
                    // $scope.checkAuthority_check = false;
                    alert('The User has no authority!')
                }
            }).error((err) => {
                return
            });

        }


    };
    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}