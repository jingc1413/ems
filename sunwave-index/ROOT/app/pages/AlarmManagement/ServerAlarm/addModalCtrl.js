angular.module('SunWave.pages.AlarmManagement.ServerAlarm', [])
    .controller('addModalCtrl', addModalCtrl);

function addModalCtrl($rootScope, $scope, isAdd, AlarmKind, $uibModalInstance, $http, ServerAlarmService, messageAlertService) {

    $scope.isDisplay = "true";
    $scope.isreadonly = false;

    $scope.ServerStatus = {
        hostName: "",
        hostIp: ""
    };
    // 在这里处理要进行的操作
    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'add') {
        $scope.isDisplay = true;
        // $scope.title = 'Add';
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
        $scope.readonly = false;
    } else if ($scope.isAdd == 'modify') {
        $scope.isDisplay = true;
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '修改'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.AlarmKind = AlarmKind;
        $scope.isreadonly = true;

    } else {
        $scope.isDisplay = false;
        // $scope.title = "View";
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        };
        $scope.AlarmKind = AlarmKind;
        $scope.isreadonly = true;

    }

    $scope.ok = function() {
        // if($scope.role_exist == true) return;
        if ($scope.isAdd == 'add') {

            var newItems = {};
            newItems = $scope.ServerStatus;
            AlarmKindService.addContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        // alert("Success!");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        alert(response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'modify') {
            var newItems = {};
            newItems = $scope.ServerStatus;
            AlarmKindService.editContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        // alert("Success!");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        alert(response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });
            // }

        } else {
            $scope.close();
        }


    };
    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };


}