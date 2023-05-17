angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagment', [])
    .controller('FirmwaveCtrl', FirmwaveCtrl);

function FirmwaveCtrl($rootScope, $scope, $filter, groupManagementService, $log, $stateParams, $uibModal) {
    $scope.isAdd = false;
    $scope.groupId = $stateParams.groupId;
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
        groupManagementService.searchFile($scope.query)
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
    $scope.toUpgrade = function(item) {
        // var truthBeTold = window.confirm("Are you sure  ?")
        swal({
            title: "Waring",
            text: "Are you sure  ?",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then(function(isOk) {
            if (isOk) {
                groupManagementService.toUpgrade($scope.groupId, item.id)
                    .success(function(response) {
                        // alert("Success !");
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
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
    $scope.progressPercentage = 0;
    $scope.save = function() {
        if (document.getElementById("fileUpload").files.length > 0) {
            var form = new FormData();
            var file = document.getElementById("fileUpload").files[0];
            var fileName = document.getElementById("fileUpload").files[0].name;
            form.append("file", file);
            form.append('version', $scope.modal.version);
            form.append('remark', $scope.modal.remark);
            form.append('manufacturer', $scope.modal.manufacturer);
            form.append('name', fileName)
                //console.log(form.get("file"));
                //console.log(form);
            groupManagementService.uploadFile(form, function(e) {
                    // //console.log('enter into')
                    // //console.log(e);
                    $scope.progressPercentage = parseInt(100.0 * e.loaded / e.total);
                    if ($scope.progressPercentage == 100) {
                        alert("Success !");
                        $scope.close();
                    }
                })
                .success(function(response) {
                    alert("Success !");
                    searchForm();
                })
                .error(function(err) {
                    console.info(err);
                    alert("Fail !")
                });
        } else {
            alert("请选择文件 ！");
        }

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

    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


}