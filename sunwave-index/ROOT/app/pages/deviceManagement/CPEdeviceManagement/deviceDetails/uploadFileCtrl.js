angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
    .controller('uploadFileCtrl', uploadFileCtrl);

function uploadFileCtrl($rootScope, $scope, $filter, deviceDetailsService, $log, $stateParams, $uibModal) {
    $scope.isAdd = false;
    if ($stateParams.Id != null) {
        $scope.neNeid = $stateParams.Id;
    } else {
        if (window.localStorage) {
            var storage = window.localStorage;
            $scope.neNeid = storage.getItem("deviceId");
        }
    };
    $scope.value = {
        value: "",
        name: ""
    };

    $scope.modal = {
        manufacturer: "",
        version: "",
        file: "",
        remark: ""
    };

    $scope.items = []

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组
    $scope.checkbox = {
        select_all: false
    }

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 15,
        name: "",
        keyword: ""
    };
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };
    var searchForm = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        deviceDetailsService.searchFile($scope.query)
            .success(function(response) {
                $scope.paginationConf.totalItems = response.totalElements
                    //console.log("33" + $scope.paginationConf.totalItems)
                $scope.items = response.content;
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
            });
    };
    $scope.search = function() {
        searchForm();
    };

    // $scope.selectAll = function() {
    //     if ($scope.checkbox.select_all == true) {
    //         angular.forEach($scope.items, function(i) {
    //             i.checked = true;
    //             $scope.checked.push(i.name);
    //             $scope.checkedItems.push(i);
    //         });
    //     } else {
    //         angular.forEach($scope.items, function(i) {
    //             i.checked = false;
    //             $scope.checked = [];
    //             $scope.checkedItems = [];
    //         });
    //     }
    //     //console.log($scope.checked);

    // };

    // $scope.selectOne = function() {
    //     $scope.checked = [];
    //     $scope.checkedItems = [];
    //     angular.forEach($scope.items, function(i) {
    //         var index = $scope.checked.indexOf(i.name);
    //         if (i.checked && index == -1) {
    //             $scope.checked.push(i.name);
    //             $scope.checkedItems.push(i);
    //         } else if (!i.checked && index !== -1) {
    //             $scope.checked.splice(index, 1);
    //             $scope.checkedItems.splice(index, 1);
    //         };
    //     });
    //     if ($scope.items.length == $scope.checked.length) {
    //         $scope.checkbox.select_all = true;
    //     } else {
    //         $scope.checkbox.select_all = false;
    //     }
    // };

    $scope.clearAll = function() {
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
    };

    $scope.add = function() {
        $scope.isAdd = true;
    }

    $scope.edit = function() {
        if ($scope.checkedItems.length == 1) {
            $scope.isAdd = true;
            $scope.value = $scope.checkedItems[0]
        } else {
            // alert("Please selete one !")
            swal({
                title: "Tips:",
                text: "Please selete one !",
                icon: "info",
                timer: 4000,
            });

        }

    }

    //选择文件进行升级
    $scope.upgrade = function(params) {
        // var truthBeTold = window.confirm("Are you sure ?")
        swal({
            title: "Waring",
            text: "Are you sure ?",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then(function(isOk) {
            if (isOk) {
                var deviceIds = [];
                deviceIds.push($scope.neNeid);
                deviceDetailsService.upgradeDevice(deviceIds, params.id)
                    .success(function(response) {
                        if (response.code == 200) {
                            // alert("Upgrading !");
                            swal({
                                title: "Tips:",
                                text: "Upgrading !",
                                icon: "success",
                                timer: 4000,
                            });
                        } else {
                            // alert(response.msg);
                            swal({
                                title: "Tips:",
                                text: response.msg,
                                icon: "error",
                                timer: 4000,
                            });
                        }
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
            }
        })

    };

    $scope.toAddItem = function() {
        $scope.action = "add";
        var e = null
        $scope.openEditDialog(e);
    };

    $scope.openEditDialog = function(item) {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/upgradeManagement/CPEfileManagement/uploadFile.html',
            controller: 'uploadFileCtrl',
            size: 'md',
            resolve: {
                isAdd: function() {
                    return $scope.action;
                },
                item: function() {
                    return item;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/upgradeManagement/CPEfileManagement/uploadFileCtrl.js',
                            'app/pages/upgradeManagement/CPEfileManagement/fileManagementService.js'
                        ]);
                    }
                ]
            }
        });

        //点击保存后执行
        // $scope.items = [];
        modalInstance.result.then(function(newItems) {
            searchForm();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.save = function() {
        if (document.getElementById("fileUpload").files.length > 0) {
            var form = new FormData();
            var file = document.getElementById("fileUpload").files[0];
            var fileName = document.getElementById("fileUpload").files[0].name;
            if (fileName.length > 30) {
                $scope.fileIsUpload = false;
                alert("文件名过长，请重新选择文件或重命名文件");
            } else if (document.getElementById("fileUpload").files[0].size > 1024 * 1024 * 50) {
                alert("文件过大，请重新选择文件");
            } else if (document.getElementById("fileUpload").files[0].size == 0) {
                alert("文件大小不允许为0KB");
            } else {
                form.append("file", file);
                form.append('version', $scope.modal.version);
                form.append('remark', $scope.modal.remark);
                form.append('manufacturer', $scope.modal.manufacturer);
                form.append('name', fileName);
                deviceDetailsService.uploadFile(form, function(e) {
                        // //console.log('enter into')
                        // //console.log(e);
                        $scope.progressPercentage = parseInt(100.0 * e.loaded / e.total);
                        if ($scope.progressPercentage == 100) {
                            alert("Success !");
                        }
                    })
                    .success(function(response) {
                        if (response.uploadFlag == 'success') {
                            // alert("Uploading !");
                            // $scope.close();
                        } else {
                            alert("Fail !");
                        };
                    })
                    .error(function(err) {
                        console.info(err);
                        alert("Fail !")
                    })
            };

        } else {
            // alert("请选择文件");
            swal({
                title: "Tips:",
                text: "请选择文件 !",
                icon: "info",
                timer: 4000,
            });
        };
    };

    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


}