(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.upGradeFiles', ['SunWave.pages.deviceManagement.deviceList'])
        .controller('addModalAddCtrl', addModalAddCtrl);

    function addModalAddCtrl($scope, $uibModal, transmitModalItems, $uibModalInstance, isAdd, upGradeFilesService, deviceListService, $log) {

        $scope.transmitModalItems = transmitModalItems;
        $scope.isAdd = isAdd;
        $scope.showSave = true;

        $scope.textS = 'Please select file';

        $scope.modal = {

            neCompanyId: "",
            neDevicetypeId: "",
            file: ""
        };

        if (isAdd == "Add") {
            $scope.title = "Add";
            // $scope.isReadonly = false;
        } else if (isAdd == "Modify") {
            $scope.title = "Modify";
            $scope.modal = $scope.transmitModalItems;
            $scope.textS = $scope.transmitModalItems.name;
            // $scope.isReadonly = true;

        } else {
            $scope.title = "View";
            $scope.modal = $scope.transmitModalItems;
            // $scope.modal.file = $scope.transmitModalItems.name;
            $scope.textS = $scope.transmitModalItems.name;
            $scope.showSave = false;
        };

        //文件名回显
        $scope.filegetClick = true;
        $scope.fileGet = function() {
            // $scope.filegetClick = false;
            var filename = document.getElementById('fileUpload').files[0].name;
            $scope.textS = filename;
            //需优化
            $scope.$apply();
            // document.getElementById('fileUpload').files[0].name = '';
        };


        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };
        $scope.searchDeviceType();
        //vendor
        $scope.getVendorName = function() {
            deviceListService.findAll().success(function(res) {
                $scope.vNames = res.data;
            })
        };
        $scope.getVendorName();

        $scope.getFTP = function(size) {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/upgradeManagement/upGradeFiles/ftpModal.html',
                controller: 'ftpModalCtrl',
                size: size,
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/upgradeManagement/upGradeFiles/ftpModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(checkedFTP) {
                console.log(checkedFTP);
                $scope.$checkedFTP = checkedFTP;
                $scope.modal.upFtpServerConfig = $scope.$checkedFTP;

            }, function() {
                console.log();
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.save = function() {

            var form = new FormData();
            var file = document.getElementById("fileUpload").files[0];

            var newItems = {};
            newItems = $scope.modal;

            form.append('file', file);
            form.append('ftpServerConfigId', $scope.modal.upFtpServerConfig.id);
            form.append('neCompanyId', $scope.modal.neCompanyId);
            form.append('neDevicetypeId', Number($scope.modal.neDevicetypeId));

            if ($scope.isAdd == 'Add') {
                upGradeFilesService.addContent(form)
                    .success(function(res) {
                        if (res.data == true && res.msg == '操作成功') {
                            alert('Success!');
                            $scope.close();
                        } else {
                            alert('Failed!');

                        }

                    })
                    // .err(function(res) {
                    //     alert(res.message);
                    // });
            } else if ($scope.isAdd == 'Modify') {
                form.append('oldUpgradeFileId', $scope.transmitModalItems.id);

                upGradeFilesService.editContent(form).success(function(res) {
                    if (res.data == true && res.msg == '操作成功') {
                        alert('Success!');
                        $scope.close();
                    } else {
                        alert('Failed!');
                    }
                });
            } else {
                return
            };
        };

        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss();
        };


    }
})();