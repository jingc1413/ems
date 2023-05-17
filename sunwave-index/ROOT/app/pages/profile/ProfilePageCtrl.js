angular.module('SunWave.pages.profile', ['SunWave.pages.Authority.safe'])
    .controller('ProfilePageCtrl', ProfilePageCtrl);

/** @ngInject */
function ProfilePageCtrl($scope, $rootScope, fileReader, safeService, $filter, $uibModal) {

    // safeService.getLoginUser().success(function() {

    // });
    $scope.User = {
        username: "",
        password: "",
        newPassword: "",
        newPassword2: ""
    }
    $scope.User.username = $rootScope.user.username;

    $scope.modifyPassword = function() {

        // var newItems = {};
        // newItems = $scope.User;
        if ($scope.User.password == null || $scope.User.newPassword == null) {
            alert('必须输入原密码和新密码！')
        } else {
            safeService.checkDbPassword($scope.User.password).success(function(res) {
                if (res.msg == '操作成功' && res.data == true) {
                    //console.log(res);
                    if ($scope.User.newPassword == $scope.User.newPassword2) {
                        safeService.changePassword($scope.User.newPassword).success(function(res) {
                            if (res.data == true) {
                                alert('success!');
                                $scope.close();
                            } else {
                                alert(res.msg);
                                $scope.close();
                            }
                        })
                    } else {
                        alert('两次输入不一致')
                    }
                } else {
                    alert('验证失败');
                }
            })
        }

    }


    $scope.picture = $filter('profilePicture')('sw');

    $scope.removePicture = function() {
        $scope.picture = $filter('appImage')('theme/no-photo.png');
        $scope.noPicture = true;
    };

    $scope.uploadPicture = function() {
        var fileInput = document.getElementById('uploadFile');
        fileInput.click();

    };

    $scope.unconnect = function(item) {
        item.href = undefined;
    };

    $scope.showModal = function(item) {
        $uibModal.open({
            animation: false,
            controller: 'ProfileModalCtrl',
            templateUrl: 'app/pages/profile/profileModal.html'
        }).result.then(function(link) {
            item.href = link;
        });
    };

    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.picture = result;
            });
    };

    $scope.switches = [true, true, true, false];
}