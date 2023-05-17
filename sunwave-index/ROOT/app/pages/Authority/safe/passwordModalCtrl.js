angular.module('SunWave.pages.Authority.safe', [])
    .controller('passwordModalCtrl', passwordModalCtrl);

function passwordModalCtrl($scope, item, safeService, $uibModalInstance, messageAlertService) {

    $scope.user = {
        name: ""
    }

    $scope.user.username = item.username;
    $scope.user.id = item.id;


    //保存
    $scope.save = function() {

        var newItems = {};
        newItems = $scope.user;


        /*****modify----2020-07-09  取消原密码验证**** */
        // if ($scope.user.password == null || $scope.user.newPassword == null) {
        //     alert('必须输入原密码！')
        // }else{
        // safeService.checkDbPassword($scope.user.password).success(function(res) {
        //         if (res.msg == '操作成功' && res.msg.data == 'true') {
        //             //console.log(res);
        if ($scope.user.newPassword == $scope.user.newPassword2) {
            // safeService.changePassword($scope.user.newPassword).success(function(res) {
            //     if (res.data == true) {
            //         alert('Success!');
            //         $scope.close();
            //     } else {
            //         alert('failed');
            //         $scope.close();
            //     }
            // })
            safeService.resetPassword($scope.user.newPassword, $scope.user.id).success(function(res) {
                if (res.code == 200 && res.data == true) {
                    // alert('Success!');
                    messageAlertService.successFun('success');
                    $scope.close();
                } else {
                    // alert('failed' + res.msg);
                    messageAlertService.successFun('failed', res.msg);
                    // $scope.close();
                }
            })
        } else {
            // alert('The two inputs are inconsistent')
            messageAlertService.userPasswordFun('inconsistent');
        }
        // } else {
        //     alert('Validation failed');
        // }
        // })
        // }

    };

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}