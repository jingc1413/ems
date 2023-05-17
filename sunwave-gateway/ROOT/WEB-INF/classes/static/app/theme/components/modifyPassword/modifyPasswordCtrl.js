(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('modifyPasswordCtrl', modifyPasswordCtrl);

    function modifyPasswordCtrl($rootScope, $scope, firstLogFlag, $uibModalInstance, $http) {
        $scope.isModify = false;
        $scope.firstLogFlag = firstLogFlag;

        var done = false;
        $scope.user = {
            username: "",
            password: "",
            newPassword: "",
            newPassword2: ""
        };
        $scope.user.username = $rootScope.user.username;
        $scope.modifyPassword = function() {

            if ($scope.user.password == null || $scope.user.newPassword == null) {
                alert('Must enter the original password and the new password')
            } else if ($scope.user.password == $scope.user.newPassword) {
                alert('Old and new passwords cannot be the same！')
            } else {

                $http({
                    url: Url + '/sunwave-authority/authority/sysUser/checkDbPassword',
                    method: "POST",
                    params: {
                        'password': $scope.user.password
                    }
                }).success(function(res) {
                    if (res.data == true) {
                        // console.log(res);s
                        if ($scope.user.newPassword == $scope.user.newPassword2) {
                            return $http({
                                url: Url + '/sunwave-authority/authority/sysUser/changePassword',
                                method: "POST",
                                params: {
                                    'password': $scope.user.newPassword
                                }
                            }).success(function(res) {
                                if (res.data == true) {
                                    console.log(res);
                                    done = true;
                                    alert('Modify Success!');
                                    $scope.close();
                                } else {
                                    done = false;

                                    alert('Modify Failed!');
                                }
                            }).error(function(err) {
                                console.log(err.msg)
                            });
                        } else {
                            alert('The two inputs are inconsistent')
                        }
                    } else {
                        alert('The original password verification failed');
                    }
                })
            }

        };

        $scope.close = function(changedNodes) {
            if ($scope.firstLogFlag == true) {
                if (done) {
                    // $scope.logout();
                    $rootScope.logout();
                    $uibModalInstance.close(changedNodes);
                } else {
                    // alert('Must modify password!')
                    // $scope.logout();
                    // $rootScope.logout();
                    // $uibModalInstance.close();
                    return

                }
            } else if ($scope.firstLogFlag == false) {
                if (done) {
                    $rootScope.logout();
                    $uibModalInstance.close(changedNodes);
                } else {
                    alert('cancel!')
                    $uibModalInstance.close(changedNodes);
                }

                // $scope.logout();
            };

        };
    }

})();