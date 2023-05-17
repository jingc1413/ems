angular.module('SunWave.pages.AlarmConfiguration.SNMPConfiguration', [])
    .controller('addCtrl', addCtrl);

function addCtrl($rootScope, $scope, isAdd, modal, $uibModalInstance, SNMPConfigurationService, messageAlertService) {

    $scope.isDisplay = true;
    // $scope.isAlarm = false;

    $scope.modal = {
        // alarm: "",
        // heartbeat: "",
        trapType: "Alarm",
        trapIp: "",
        trapPort: "",
        trapVer: "3",
        community: "",
        securityLevel: "noAuthNoPriv",
        trapStatus: 0,
        intervalTime: "",
        username: "",
        authProtocol: "none",
        authPwd: "",
        privacyProtocol: "none",
        privacyPwd: "",
        engineId: ""
    };

    let intervalFun = function(intervalTime) {
        if (intervalTime == '' || intervalTime == null) {
            $scope.modal.trapType = 'Alarm';
            // $scope.isAlarm = true;
        } else {
            $scope.modal.trapType = 'Heartbeat';
            // $scope.isAlarm = false;
        }
    }

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
        $scope.modal = modal;
        // intervalFun();

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
        $scope.modal = modal;
        // intervalFun();
    }


    // $scope.typeSelect = function() {
    //     if ($scope.modal.type == '1') {
    //         $scope.isAlarm = true;

    //     } else if ($scope.modal.type == '0') {
    //         $scope.isAlarm = false;
    //     }
    // }

    $scope.save = function() {
        // if($scope.role_exist == true) return;
        if ($scope.isAdd == 'add') {

            var newItems = {};
            newItems = $scope.modal;
            SNMPConfigurationService.addContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
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
            newItems = $scope.modal;
            SNMPConfigurationService.editContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
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