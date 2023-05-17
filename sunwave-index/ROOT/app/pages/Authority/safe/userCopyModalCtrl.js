angular.module('SunWave.pages.Authority.safe', [])
    .controller('userCopyModalCtrl', userCopyModalCtrl);

function userCopyModalCtrl($rootScope, $scope, isAdd, item, safeService, $uibModal, $uibModalInstance, $log, messageAlertService) {

    $scope.title = 'Copy User';
    $scope.item = item;
    $scope.copyUserId = $scope.item.id;
    $scope.user = {
        // name: "",
        // id: "",
        userName: "",
        // areaName: "",
        // roleName: "",
        password: "",
        // email: "",
        // phone: ""
        userId: ""
    };


    //保存
    $scope.save = function() {
        if ($scope.user.password == '' || $scope.user.userName == '') {
            alert('Password and user name are required!');
            return
        };
        $scope.user.userId = $scope.copyUserId;
        safeService.copySysUser($scope.user.password, $scope.user.userId, $scope.user.userName).success(function(res) {
            if (res) {
                alert('success!');
                $scope.close();
            } else {
                alert('Failed')
            }
        })
    }

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}