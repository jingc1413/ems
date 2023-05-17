angular.module('SunWave.pages.upgradeManagement.CPEfileManagement', [])
    .controller('uploadFileCtrl', uploadFileCtrl);

function uploadFileCtrl($rootScope, $scope, isAdd, fileManagementService, $uibModalInstance, item) {

    $scope.isAdd = isAdd;
    $scope.isEdit = true;
    var init = function() {
        if ($scope.isAdd == 'add') {
            $scope.modal = {
                manufacturer: "",
                version: "",
                file: "",
                remark: ""
            };
        } else {
            $scope.modal = item;
            $scope.oldRemark = angular.copy($scope.oldRemark = angular.copy(item.remark));
            $scope.isEdit = false;
        }
    }

    init();

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

    $scope.fileIsUpload = false;
    $scope.progressPercentage = 0;
    $scope.save = function() {
        if ($scope.isAdd == 'add') {
            if (document.getElementById("fileUpload").files.length > 0) {
                var form = new FormData();
                var file = document.getElementById("fileUpload").files[0];
                var fileName = document.getElementById("fileUpload").files[0].name;
                if (fileName.length > 30) {
                    $scope.fileIsUpload = false;
                    // alert("文件名过长，请重新选择文件或重命名文件");
                    swal({
                        title: "Tips:",
                        text: "文件名过长，请重新选择文件或重命名文件",
                        icon: "info",
                        timer: 4000,
                    });
                } else if (document.getElementById("fileUpload").files[0].size > 1024 * 1024 * 50) {
                    // alert("文件过大，请重新选择文件(文件大小小于50MB)");
                    swal({
                        title: "Tips:",
                        text: "文件过大，请重新选择文件(文件大小小于50MB",
                        icon: "info",
                        timer: 4000,
                    });
                } else if (document.getElementById("fileUpload").files[0].size == 0) {
                    // alert("文件大小不允许为0KB");
                    swal({
                        title: "Tips:",
                        text: "文件大小不允许为0KB",
                        icon: "info",
                        timer: 4000,
                    });
                } else {
                    $scope.fileIsUpload = true;
                    form.append("file", file);
                    form.append('version', $scope.modal.version);
                    form.append('remark', $scope.modal.remark);
                    form.append('manufacturer', $scope.modal.manufacturer);
                    form.append('name', fileName);
                    fileManagementService.uploadFile(form,
                            function(e) {
                                // //console.log('enter into')
                                // //console.log(e);
                                $scope.progressPercentage = parseInt(100.0 * e.loaded / e.total);
                                if ($scope.progressPercentage == 100) {
                                    // alert("Success !");
                                    swal({
                                        title: "Tips:",
                                        text: "Success !",
                                        icon: "success",
                                        timer: 4000,
                                    });
                                }
                            })
                        .success(function(response) {
                            if (response.code == 200) {
                                $uibModalInstance.close();
                            } else {
                                // alert("Fail !");
                                swal({
                                    title: "Tips:",
                                    text: "Fail !",
                                    icon: "error",
                                    timer: 4000,
                                });
                            };
                        })
                        .error(function(err) {
                            console.info(err);
                            // alert("Fail !");
                            swal({
                                title: "Tips:",
                                text: "Fail !",
                                icon: "error",
                                timer: 4000,
                            });
                        })
                };

            } else {
                // alert("请选择文件");
                swal({
                    title: "Tips:",
                    text: "请选择文件",
                    icon: "info",
                    timer: 4000,
                });
            };

            // ProgressEvent(function(evt) {

            //     if ($scope.progressPercentage == 100.0) {
            //         alert("Success !");
            //     }
            // })

        } else {
            //修改文件属性
            var item = {
                manufacturer: $scope.modal.manufacturer,
                version: $scope.modal.version,
                id: $scope.modal.id,
                remark: $scope.modal.remark
            };
            fileManagementService.toModifyItem(item)
                .success(function(response) {
                    if (response.code == 200) {
                        // alert(response.msg);
                        swal({
                            title: "Tips:",
                            text: response.msg,
                            icon: "success",
                            timer: 4000,
                        });
                        $uibModalInstance.close();
                    } else {
                        // alert(response.msg);
                        swal({
                            title: "Tips:",
                            text: response.msg,
                            icon: "error",
                            timer: 4000,
                        });
                    };

                })
                .error(function(err) {
                    console.info(err);
                    // alert("Fail !")
                    swal({
                        title: "Tips:",
                        text: "Fail !",
                        icon: "error",
                        timer: 4000,
                    });
                });
        };

    };





    $scope.close = function(item) {
        if ($scope.isAdd == "view") {
            $uibModalInstance.close();
        } else if ($scope.isAdd == "modify") {
            if ($scope.modal.remark == $scope.oldRemark) {
                $uibModalInstance.close();
            } else {
                // var truthBeTold = window.confirm("After closing,your chenges will not be saved, Are you sure ?");
                swal({
                    title: "Waring",
                    text: "After closing,your chenges will not be saved, Are you sure ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        $uibModalInstance.close();
                    }
                });
            }
        } else {
            if ($scope.modal.manufacturer == undefined || $scope.modal.version == undefined || $scope.modal.remark == undefined) {
                $uibModalInstance.close();
            } else if ($scope.modal.manufacturer.length == 0 && $scope.modal.version.length == 0 && $scope.modal.remark.length == 0 && document.getElementById("fileUpload").files.length == 0) {
                $uibModalInstance.close();
            } else {
                // var truthBeTold = window.confirm("After closing,your chenges will not be saved, Are you sure ?");
                swal({
                    title: "Waring",
                    text: "After closing,your chenges will not be saved, Are you sure ?",
                    icon: "warning",
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(function(isOk) {
                    if (isOk) {
                        $uibModalInstance.close();
                    }
                });
            };

        };
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    // $scope.$watch(
    //     'progress', $scope.progressPercentage = parseInt(100.0 * $rootScope.progress.loaded / $rootScope.progress.total));

}