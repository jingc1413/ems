(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.ftpConfig', [])
        .controller('addModalCtrl', addModalCtrl);

    function addModalCtrl($scope, transmitModalItems, isAdd, ftpConfigService, $uibModalInstance) {

        $scope.transmitModalItems = transmitModalItems;
        $scope.ftpConfig = {
            name: "",
            path: "",
            host: "",
            port: "",
            userName: "",
            pwassword: "",
            ftpSftpFlag: "1" //默认都是sftp  数据有1，0
        };

        $scope.isAdd = isAdd;
        $scope.view = true;


        if ($scope.isAdd == 'add') {
            $scope.title = 'Add';

        } else if ($scope.isAdd == 'modify') {
            $scope.title = "Modify";
            $scope.ftpConfig = transmitModalItems;
        } else {
            $scope.title = "View";
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
                            alert("Success");
                            $scope.close();
                        } else {
                            alert("failed" + response.data.msg)
                        }
                    })
                    .error(function(err) {
                        console.info(err);
                    });

            } else if ($scope.isAdd == 'modify') {
                ftpConfigService.editContent(newItems)
                    .success(function(response) {
                        if (response.data == true) {
                            alert("Success");
                            $scope.close();
                        } else {
                            alert("failed" + response.data.msg)
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