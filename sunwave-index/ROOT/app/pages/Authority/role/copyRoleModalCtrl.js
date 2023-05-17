angular.module('SunWave.pages.Authority.role', [])
    .controller('copyRoleModalCtrl', copyRoleModalCtrl);

function copyRoleModalCtrl($rootScope, $scope, $q, role, $uibModalInstance, roleService) {


    $scope.role = role;
    $scope.roleName = '';

    $scope.ok = function() {
        if ($scope.roleName == '') {
            alert('Please fill in the role name!');
            return
        } else {
            $scope.roleId = $scope.role.id;
            roleService.copySysRole($scope.roleId, $scope.roleName).success(function(res) {
                if (res) {
                    alert('Success!');
                    $scope.close();
                } else {
                    alert('Failed!')
                }
            })
        }
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}