angular.module('SunWave.pages.sysManagement.monitorType', [])
    .controller('tempalteEditCtrl', tempalteEditCtrl);

function tempalteEditCtrl($rootScope, $scope, $uibModalInstance, isAdd, monitorTypeService, monitorType) {

    $scope.title = isAdd; //标题 add modify view
    $scope.editCheck = false; //是否可修改keyvalue

    $scope.query = { //查询条件
        pageIndex: 0,
        pageSize: 15,
        userName: "",
        mobile: ""
    };

    $scope.info = {}
    $scope.items = [];

    //keyvalue
    $scope.params = {
        uiName: "",
        vdmPath: "",

    };

    //页面初始化
    var init = function() {
        if ($scope.title == "view") {
            $scope.info = monitorType;
            $scope.items = monitorType.monitoringItems;
            $scope.isAdd = false; //控制模板名是否可编辑
            $scope.isShow = false;
            $scope.editCheck = true;
            $scope.canCheck = true;
        } else if ($scope.title == "modify") {
            $scope.info = monitorType;
            $scope.items = monitorType.monitoringItems;
            $scope.description = monitorType.description;
            $scope.isAdd = false;
            $scope.isShow = true;
            $scope.editCheck = false;
            $scope.canCheck = false;
        } else {
            $scope.isAdd = true;
            $scope.isShow = true;
            $scope.editCheck = false;
            $scope.canCheck = false;
            $scope.info = {
                typeName: "",
                description: "",
            }
        }
    }
    init();

    $scope.checkbox = {
        select_all: ""
    }

    $scope.clearAll = function() {
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
    };

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 15,
        name: "",
        keyword: ""
    };
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 50,
        pagesLength: 50,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    //全选（取消全选
    $scope.selectAll = function() {
        if ($scope.checkbox.select_all == true) {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.items, function(i) {
                i.checked = true;
                $scope.checked.push(i.id);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.items, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        //console.log($scope.checked);

    };

    $scope.reset = function() {
        $scope.query.userName = '';
        $scope.query.mobile = '';

    };

    //单选
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


        if ($scope.items.length == $scope.checked.length) {
            $scope.checkbox.select_all = true;
        } else {
            $scope.checkbox.select_all = false;
        }
    };

    $scope.isEdit = false;
    //add params
    $scope.addParams = function() {
        var flag = true;
        if (isAdd == "modify") {
            for (let index = 0; index < $scope.items.length; index++) {
                const element = $scope.items[index].uiName;
                if (element == $scope.params.uiName) {
                    // alert("Parameters name is exit");
                    swal({
                        title: "Tips:",
                        text: "Parameters name is exit !",
                        icon: "info",
                        timer: 4000,
                    });
                    flag = false;
                    break;
                };

            };
            if (flag) {
                var i = $scope.params;
                // $scope.items.push(i);
                var items = [];
                items.push(i);
                $scope.isEdit = true;
                monitorTypeService.addParams(items, $scope.description, $scope.info.id)
                    .success(function(res) {
                        if (res.code == 200) {
                            // alert("Success !");
                            swal({
                                title: "Tips:",
                                text: "Success !",
                                icon: "success",
                                timer: 4000,
                            });
                            $scope.searchParams();
                        } else {
                            // alert(res.msg);
                            swal({
                                title: "Tips:",
                                text: res.msg,
                                icon: "error",
                                timer: 4000,
                            });
                        };
                    })
                    .error(function(err) {
                        console.info(err);
                    });
                $scope.params = {
                    uiName: "",
                    vdmPath: "",
                };
                $scope.checked = [];
                $scope.checkedItems = [];
            };

        } else {
            for (let index = 0; index < $scope.items.length; index++) {
                const element = $scope.items[index].uiName;
                if (element == $scope.params.uiName) {
                    // alert("Parameters name is exit");
                    swal({
                        title: "Tips:",
                        text: "Parameters name is exit !",
                        icon: "info",
                        timer: 4000,
                    });
                    flag = false;
                    break;
                };

            };
            if (flag) {
                var i = $scope.params;
                $scope.items.push(i);
                //console.log($scope.items);
                $scope.params = {
                    uiName: "",
                    vdmPath: "",
                };
            }
        }


    }

    //delete params
    $scope.deleteParam = function() {
        if ($scope.checkedItems.length > 0) {
            // var truthBeTold = window.confirm("Are you sure ?");
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
                    //console.log($scope.checked);
                    monitorTypeService.deleteParams($scope.checked)
                        .success(function(res) {
                            if (res.code == 200) {
                                // alert("Success !");
                                swal({
                                    title: "Tips:",
                                    text: "Success !",
                                    icon: "success",
                                    timer: 4000,
                                });
                                $scope.searchParams();
                                $scope.checked = [];
                                $scope.checkedItems = [];
                                if ($scope.items.length == $scope.checked.length && $scope.checked.length != 0) {
                                    $scope.checkbox.select_all = true;
                                } else {
                                    $scope.checkbox.select_all = false;
                                };

                                $scope.params = {
                                    uiName: "",
                                    vdmPath: "",
                                };
                            } else {
                                // alert(res.msg);
                                swal({
                                    title: "Tips:",
                                    text: res.msg,
                                    icon: "error",
                                    timer: 4000,
                                });
                            };
                        })
                        .error(function(err) {
                            console.info(err);
                        });
                    $scope.isEdit = true;
                };

            })

        } else {
            // alert("Select at least one item !");
            swal({
                title: "Tips:",
                text: "Select at least one item !",
                icon: "info",
                timer: 4000,
            });
        }

    };

    $scope.searchParams = function() {
        monitorTypeService.searchParams($scope.info.id)
            .success(function(res) {
                if (res.code == 200) {
                    $scope.items = res.data.monitoringItems
                } else {
                    // alert(res.msg);
                    swal({
                        title: "Tips:",
                        text: res.msg,
                        icon: "error",
                        timer: 4000,
                    });
                };
            })
            .error(function(err) {
                console.info(err);
            });
    }

    //物理排序
    $scope.oldOrder = "";
    $scope.orderFun = function(v) {
        if ($scope.oldOrder == "" || $scope.oldOrder == undefined) {
            $scope.oldOrder = v;
        }
        if ($scope.oldOrder == v) {
            $scope.oldOrder = "-" + v;
        } else {
            $scope.oldOrder = v;
        }
        $scope.order = $scope.oldOrder;
    };

    $scope.editValue = function(item) {
        $scope.editCheck = true;
        $scope.isEdit = true;
        var modalItem = item
        $scope.params = angular.copy($scope.params = angular.copy(modalItem))
    };

    $scope.saveEditValue = function() {
        $scope.editCheck = false;
        $scope.isEdit = true;
        monitorTypeService.modifyParams($scope.params)
            .success(function(res) {
                if (res.code == 200) {
                    // alert("Success !");
                    swal({
                        title: "Tips:",
                        text: "Success !",
                        icon: "success",
                        timer: 4000,
                    });
                    $scope.searchParams();
                } else {
                    // alert(res.msg);
                    swal({
                        title: "Tips:",
                        text: res.msg,
                        icon: "error",
                        timer: 4000,
                    });
                };
            })
            .error(function(err) {
                console.info(err);
            });
        $scope.params = {
            uiName: "",
            vdmPath: "",
        };
    }


    $scope.save = function() {
        //console.log($scope.items);
        var info = $scope.info;
        var item = $scope.items;
        if (isAdd == "modify") {
            monitorTypeService.ModifyContent(info)
                .success(function(res) {
                    if (res.code == 200) {
                        // alert("Success !");
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                        $uibModalInstance.close();
                    } else {
                        // alert(res.msg);
                        swal({
                            title: "Tips:",
                            text: res.msg,
                            icon: "error",
                            timer: 4000,
                        });
                    };
                })
                .error(function(err) {
                    console.info(err);
                });
        } else {
            if ($scope.items.length == 0) {
                // alert("Please add parameter");
                swal({
                    title: "Tips:",
                    text: "Please add parameter !",
                    icon: "info",
                    timer: 4000,
                });
            } else {
                var typeItem = {
                    typeName: info.typeName,
                    monitoringItems: item,
                    description: info.description
                };
                monitorTypeService.addMonitoringType(typeItem)
                    .success(function(response) {
                        if (response.code == 200) {
                            // alert("Success !");
                            swal({
                                title: "Tips:",
                                text: "Success !",
                                icon: "success",
                                timer: 4000,
                            });
                            $uibModalInstance.close();
                        } else {
                            // alert(response.msg)
                            swal({
                                title: "Tips:",
                                text: res.msg,
                                icon: "error",
                                timer: 4000,
                            });
                        };

                    })
                    .error(function(err) {
                        console.info(err);
                    });
            };
        };
    };


    $scope.close = function(item) {
        // ($scope.description != $scope.info.description) ? $scope.isEdit = true: $scope.isEdit = false;
        if ($scope.title == "view") {
            $uibModalInstance.close(item);
        } else if ($scope.title == "add") {
            if ($scope.info.typeName.length == 0 && $scope.info.description.length == 0 && $scope.params.uiName.length == 0 && $scope.params.vdmPath.length == 0 && $scope.items.length == 0) {
                $uibModalInstance.close(item);
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
                        if (isOk) { $uibModalInstance.close(item); }
                    })
                    // if (truthBeTold) {
                    //     $uibModalInstance.close(item);
                    // } else {

                // };
            };
        } else {
            if ($scope.isEdit) {
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
                    if (isOk) { $uibModalInstance.close(item); }
                });
            } else {
                $uibModalInstance.close(item);
            }

        }
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };




}