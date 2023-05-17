(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.ftpConfig', [])
        .controller('addFtpModalCtrl', addFtpModalCtrl);

    function addFtpModalCtrl($rootScope, $scope, transmitModalItems, isAdd, ftpConfigService, messageAlertService, $uibModalInstance) {

        $scope.transmitModalItems = transmitModalItems;
        $scope.ftpConfig = {
            name: "",
            path: "",
            host: "",
            port: "",
            userName: "",
            // password: "",
            pwassword: "",
            ftpSftpFlag: "1" //默认都是sftp  数据有1，0
        };

        $scope.isAdd = isAdd;
        $scope.view = true;

        $scope.pwshow = false;
        $scope.changePsd_eye = function() {
            // var inputType = document.getElementById('psd-input');
            $scope.pwshow = !$scope.pwshow;
        }


        if ($scope.isAdd == 'add') {
            // $scope.title = 'Add';
            if ($rootScope.language == 'chinese') {
                $scope.title = '新增'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Add';
            } else {
                $scope.title = 'Add';
            };

        } else if ($scope.isAdd == 'modify') {
            // $scope.title = "Modify";
            if ($rootScope.language == 'chinese') {
                $scope.title = '编辑'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Modify';
            } else {
                $scope.title = 'Modify';
            };
            $scope.ftpConfig = transmitModalItems;
        } else {
            // $scope.title = "View";
            if ($rootScope.language == 'chinese') {
                $scope.title = '查看'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'View';
            } else {
                $scope.title = 'View';
            };
            $scope.view = false;
            $scope.ftpConfig = transmitModalItems;
        };

        $scope.save = function() {
            var newItems = {};
            newItems = $scope.ftpConfig;

            if ($scope.isAdd == 'add') {
                ftpConfigService.addContent(newItems)
                    .success(function(response) {
                        if (response.data == true) {
                            // alert("Success");
                            messageAlertService.successFun('success');
                            $scope.close();
                        } else {
                            // alert("failed" + response.data.msg)
                            messageAlertService.successFun('failed', response.msg);
                        }
                    })
                    .error(function(err) {
                        console.info(err);
                    });

            } else if ($scope.isAdd == 'modify') {
                ftpConfigService.editContent(newItems)
                    .success(function(response) {
                        if (response.data == true) {
                            // alert("Success");
                            messageAlertService.successFun('success');
                            $scope.close();
                        } else {
                            // alert("failed" + response.data.msg)
                            messageAlertService.successFun('failed', response.msg);
                        }
                    })
                    .error(function(err) {
                        console.info(err);
                    });

            } else {
                $scope.close();
            }


        };
        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();