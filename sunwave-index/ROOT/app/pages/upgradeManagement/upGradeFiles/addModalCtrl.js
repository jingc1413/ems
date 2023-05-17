(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.upGradeFiles', ['SunWave.pages.deviceManagement.deviceList'])
        .controller('addModalAddCtrl', addModalAddCtrl);

    function addModalAddCtrl($rootScope, $scope, $uibModal, transmitModalItems, $uibModalInstance, isAdd, upGradeFilesService, deviceListService, $log, messageAlertService) {

        $scope.transmitModalItems = transmitModalItems;
        $scope.isAdd = isAdd;
        $scope.showSave = true;

        //select input pelasu
        if ($rootScope.language == 'chinese') {
            $scope.textS = '请选择文件';
        } else if ($rootScope.language == 'english') {
            $scope.textS = 'Please select file';
        } else {
            $scope.textS = 'Please select file';
        };

        $scope.modal = {

            neCompanyId: "",
            neDevicetypeId: "",
            file: ""
        };

        if (isAdd == "Add") {
            // $scope.title = "Add";
            if ($rootScope.language == 'chinese') {
                $scope.title = '新增'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Add';
            } else {
                $scope.title = 'Add';
            };
            // $scope.isReadonly = false;
        } else if (isAdd == "Modify") {
            // $scope.title = "Modify";
            if ($rootScope.language == 'chinese') {
                $scope.title = '编辑'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'Modify';
            } else {
                $scope.title = 'Modify';
            };
            $scope.modal = $scope.transmitModalItems;
            $scope.textS = $scope.transmitModalItems.name;
            // $scope.isReadonly = true;

        } else {
            // $scope.title = "View";
            if ($rootScope.language == 'chinese') {
                $scope.title = '查看'
            } else if ($rootScope.language == 'english') {
                $scope.title = 'View';
            } else {
                $scope.title = 'View';
            };
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
                // //console.log(`查的DeviceType是：${res.data}`);
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
                // //console.log(checkedFTP);
                if ($scope.isAdd == 'Modify' && checkedFTP.name !== $scope.transmitModalItems.upFtpServerConfig.name) {
                    $scope.modal.name = '';
                    $scope.modal.size = '';
                    $scope.textS = '';
                }
                $scope.$checkedFTP = checkedFTP;
                $scope.modal.upFtpServerConfig = $scope.$checkedFTP;

            }, function() {
                //console.log();
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.save = function() {

            var form = new FormData();
            var file = document.getElementById("fileUpload").files[0];

            var newItems = {};
            newItems = $scope.modal;

            if ($scope.isAdd == 'Modify') {
                if (($scope.modal.name || file.name) && $scope.modal.upFtpServerConfig && $scope.modal.neCompanyId && $scope.modal.neDevicetypeId) {
                    form.append('file', file);
                    form.append('ftpServerConfigId', $scope.modal.upFtpServerConfig.id);
                    form.append('neCompanyId', $scope.modal.neCompanyId);
                    form.append('neDevicetypeId', Number($scope.modal.neDevicetypeId));
                    form.append('oldUpgradeFileId', $scope.transmitModalItems.id);
                    form.append('size', $scope.modal.size);
                    form.append('name', $scope.modal.name);

                    upGradeFilesService.editContent(form).success(function(res) {
                        $rootScope.loading = true;

                        if (res.data == true && res.msg == '操作成功') {
                            // alert('Success!');
                            messageAlertService.successFun('success');
                            $rootScope.loading = false;

                            $scope.close();
                        } else {
                            // alert('Failed!' + res.msg);
                            $rootScope.loading = false;
                            messageAlertService.successFun('failed', res.msg);
                        }
                    });
                } else {
                    alert('Please check the missing items！');
                    return
                }
            } else if ($scope.isAdd == 'Add') {
                if (file && $scope.modal.upFtpServerConfig && $scope.modal.neCompanyId && $scope.modal.neDevicetypeId) {
                    form.append('file', file);
                    form.append('ftpServerConfigId', $scope.modal.upFtpServerConfig.id);
                    form.append('neCompanyId', $scope.modal.neCompanyId);
                    form.append('neDevicetypeId', Number($scope.modal.neDevicetypeId));
                    upGradeFilesService.addContent(form)
                        .success(function(res) {
                            $rootScope.loading = true;

                            if (res.data == true && res.code == 200) {
                                // alert('Success!');
                                $rootScope.loading = false;
                                messageAlertService.successFun('success');
                                $scope.close();
                            } else {
                                // alert('Failed!' + res.msg);
                                $rootScope.loading = false;
                                messageAlertService.successFun('failed', res.msg);
                            }

                        })
                        // .err(function(res) {
                        //     alert(res.message);
                        // });
                } else {
                    alert('Please check the missing items！');
                    return
                }

            }

        };

        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

        $scope.cancel = function() {
            $uibModalInstance.close();
        };


    }
})();