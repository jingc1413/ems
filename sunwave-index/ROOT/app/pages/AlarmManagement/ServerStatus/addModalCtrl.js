angular.module('SunWave.pages.AlarmManagement.ServerStatus', [])
    .controller('addModalCtrl', addModalCtrl);

function addModalCtrl($rootScope, $scope, isAdd, ServerStatus, $uibModalInstance, $http, ServerStatusService, messageAlertService) {

    $scope.isDisplay = "true";

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
        $scope.ServerStatus = ServerStatus;

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
        $scope.ServerStatus = ServerStatus;

    }

    $scope.ok = function() {
        // if($scope.role_exist == true) return;
        if ($scope.isAdd == 'add') {

            var newItems = {};
            newItems = $scope.ServerStatus;
            ServerStatusService.addContent(newItems)
                .success(function(response) {
                    if (response.code == 200 && response.error == undefined) {
                        // alert("Success!");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert(response.msg)
                        messageAlertService.successFun('failed', response.msg);
                    }

                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'modify') {
            var newItems = {};
            newItems = $scope.ServerStatus;
            ServerStatusService.editContent(newItems)
                .success(function(response) {
                    if (response.code == 200 && response.error == undefined) {
                        // alert("Success!");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert(response.msg)
                        messageAlertService.successFun('failed', response.msg);

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