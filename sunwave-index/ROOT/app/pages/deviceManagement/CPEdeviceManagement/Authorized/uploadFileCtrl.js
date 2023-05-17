angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('uploadFileCtrl', uploadFileCtrl);

function uploadFileCtrl($rootScope, $scope, $translate, AuthorizedService, item, $uibModalInstance, itemsId, AuthorizedService) {


    $scope.modal = {
        neCompanyId: "",
        neDevicetypeId: "",
        file: ""
    };

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 15,
        name: "",
        keyword: "",
        version: "",
        manufacturer: "",

    };

    $scope.itemsId = itemsId;

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    $scope.selectOne = function() {
        angular.forEach($scope.items, function(i) {
            var index = $scope.checked.indexOf(i.id);
            if (i.checked && index == -1) {
                $scope.checked.push(i.id);
                $scope.checkedItems.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checked.splice(index, 1);
                $scope.checkedItems.splice(index, 1);
            };
        });
        //console.log($scope.checkedItems);
    };

    $scope.manufacturer = item;

    //文件名回显
    $scope.filegetClick = true;
    var searchFile = function() {
        $scope.query.manufacturer = $scope.manufacturer
        AuthorizedService.searchFile($scope.query)
            .success(function(response) {
                $scope.items = response.content;
                $scope.paginationConf.totalItems = response.totalElements
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

    $scope.reset = function() {
        $scope.query.version = '';
        $scope.query.name = '';
    };

    $scope.search = function() {
        searchFile();
    }

    $scope.fileGet = function() {
        // $scope.filegetClick = false;
        var filename = document.getElementById('fileUpload').files[0].name;
        $scope.textS = filename;
        //需优化
        $scope.$apply();
        // document.getElementById('fileUpload').files[0].name = '';
    };

    $scope.upgrade = function(params) {
        // var alert_Confirm = $translate.instant('deviceManagement.CPEdevice.Upgrade.alert_Confirm');
        // var truthBeTold = window.confirm(alert_Confirm)
        swal({
            title: "Waring",
            text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Upgrade.alert_Confirm'),
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then(function(isOk) {
            if (isOk) {
                var deviceIds = $scope.itemsId;
                AuthorizedService.upgrade(deviceIds, params.id)
                    .success(function(response) {
                        if (response.code == 200) {
                            // var alert_Upgrading = $translate.instant('deviceManagement.CPEdevice.Upgrade.alert_Upgrading');
                            // alert(alert_Upgrading);
                            swal({
                                title: "Tips:",
                                text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Upgrade.alert_Upgrading'),
                                icon: "success",
                                timer: 4000,
                            });
                            // alert("Upgrading !");
                        } else {
                            // var alert_Fail = $translate.instant('deviceManagement.CPEdevice.Upgrade.alert_Fail');
                            // alert(alert_Fail);
                            // alert("Fail !");
                            swal({
                                title: "Tips:",
                                text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Upgrade.alert_Fail'),
                                icon: "error",
                                timer: 4000,
                            });
                        }

                    })
                    .error(function(err) {
                        console.info(err);
                        // var alert_Fail = $translate.instant('deviceManagement.CPEdevice.Upgrade.alert_Fail');
                        // alert(alert_Fail);
                        swal({
                            title: "Tips:",
                            text: $translate.instant('deviceManagement.CPEdeviceManagement.CPEdevice.Upgrade.alert_Fail'),
                            icon: "error",
                            timer: 4000,
                        });
                        // alert("Fail !")
                    });
            }
        })

    };


    // $scope.save = function() {
    //     var form = new FormData();
    //     var file = document.getElementById("fileUpload").files[0];
    //     var fileName = document.getElementById("fileUpload").files[0].name;
    //     if (fileName.length > 1) {
    //         //console.log(fileName);
    //     }
    //     form.append("file", file);
    //     form.append('fileName', fileName);
    //     form.append('neCompanyId', $scope.modal.neCompanyId);
    //     form.append('neDevicetypeId', Number($scope.modal.neDevicetypeId));
    //     //console.log(form.get("file"));
    //     //console.log(form);
    //     AuthorizedService.uploadFile(form)
    //         .success(function(response) {
    //             //console.log("22222222222" + response);
    //         })
    //         .error(function(err) {
    //             console.info(err);
    //             alert("Fail !")
    //         });
    // }

    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchFile);

}