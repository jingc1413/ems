angular.module('SunWave.pages.sysManagement.CPEconfigManagement', [])
    .controller('tempalteEditCtrl', tempalteEditCtrl);

function tempalteEditCtrl($rootScope, $scope, $filter, $uibModal, $uibModalInstance, item, isAdd, configManagementService) {

    $scope.title = isAdd; //标题 add modify view
    $scope.editCheck = false; //是否可修改keyvalue
    $scope.isClose = false;

    $scope.query = { //查询条件
        pageIndex: 1,
        pageSize: 15,
        userName: "",
        mobile: ""
    };

    $scope.info = {}
    $scope.items = [];
    $scope.modelItem = {};
    $scope.ModelNameData = [];

    //keyvalue
    $scope.params = {
        proName: "",
        proValue: "",
        proType: "",
    };

    $scope.editparams = {
        proName: "",
        proValue: "",
        proType: "",
    };

    $scope.selectItem = {
        ndmPath: null,
        type: null
    }

    var searchForm = function() {
        configManagementService.searchNdmPathById($scope.modelItem.id)
            .success(function(response) {
                for (let index = 0; index < response.length; index++) {
                    if (response[index].writable) {
                        $scope.datas.push(response[index]);
                    };
                };
                $scope.params.proName = $scope.datas[0].paramName;
                $scope.params.proType = $scope.datas[0].type;
                $scope.selectItem.ndmPath = $scope.params.proName;
                for (let index = 0; index < $scope.datas.length; index++) {
                    const element = $scope.datas[index].paramName;
                    const type = $scope.datas[index].type;
                    const item = {
                        name: element,
                        type: type
                    };
                    $scope.dataList.push(item);

                };
                $scope.initList = $scope.dataList;
            })
            .error(function(err) {
                console.info(err);
            });
    };

    $scope.datas = [];
    $scope.searchNdmPathById = function() {
        if ($scope.items.length == 0) {
            searchForm();
        } else {
            var truthBeTold = window.confirm("If you want to reselect the model, the previously added parameter will be invalid.Are you sure ?");
            if (truthBeTold) {
                $scope.items = [];
                searchForm();
            } else {
                $scope.modelItem = $scope.selectModel;
            }
        }

    };

    // $scope.searchNdmPathByIdModify = function() {
    //     if ($scope.items.length == 0) {
    //         $scope.selectModel = $scope.modelItem;
    //         searchForm();
    //     } else {
    //         var truthBeTold = window.confirm("If you want to reselect the model, the previously added parameter will be invalid.Are you sure ?");
    //         if (truthBeTold) {
    //             $scope.items = [];
    //             searchForm();
    //         } else {
    //             $scope.modelItem = $scope.selectModel;
    //         }
    //     }
    // };

    //查询model
    var searchAllModel = function() {
        configManagementService.searchAllModelName($scope.query)
            .success(function(response) {
                //console.log(response);
                $scope.ModelNameData = response.content;
                if ($scope.info.modelName != null) {
                    for (let index = 0; index < $scope.ModelNameData.length; index++) {
                        const element = $scope.ModelNameData[index].modelName;
                        if (element == $scope.info.modelName) {
                            $scope.modelItem = $scope.ModelNameData[index];
                            $scope.selectModel = $scope.modelItem;
                        }

                    }
                } else {
                    $scope.modelItem = $scope.ModelNameData[0];
                    $scope.selectModel = $scope.modelItem;
                };
                if ($scope.title == "add") {
                    $scope.searchNdmPathById();
                } else if ($scope.title == "modify") {
                    searchForm();
                };

            })
            .error(function(err) {
                console.info(err);
            });
    }

    //页面初始化
    var init = function() {
        if ($scope.title == "view") {
            $scope.info = item;
            $scope.items = item.cpList;
            $scope.isAdd = false; //控制模板名是否可编辑
            $scope.isShow = false;
            $scope.editCheck = true;
            $scope.canCheck = true;
            searchAllModel();
        } else if ($scope.title == "modify") {
            $scope.info = item;
            $scope.items = item.cpList;
            $scope.isAdd = false;
            $scope.isShow = true;
            $scope.editCheck = false;
            $scope.canCheck = false;
            searchAllModel();
        } else {
            $scope.isAdd = true;
            $scope.isShow = true;
            $scope.editCheck = false;
            $scope.canCheck = false;
            searchAllModel();
        };
        //console.log($scope.info)

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
        pageSize: 1500,
        name: "",
        keyword: ""
    };
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
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
                $scope.checked.push(i.proName);
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

            var index = $scope.checked.indexOf(i.proName);

            if (i.checked && index == -1) {
                $scope.checked.push(i.proName);

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

    //add params
    $scope.addParams = function() {
        if ($scope.isSave == true) {
            // alert("The parameter path is incorrect, please select again !");
            swal({
                title: "Tips:",
                text: "The parameter path is incorrect, please select again !",
                icon: "info",
                timer: 4000,
            })
        } else {
            var flag = true;
            for (let index = 0; index < $scope.items.length; index++) {
                const element = $scope.items[index].proName;
                if (element == $scope.selectItem.ndmPath) {
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
                if (null == $scope.selectItem.ndmPath) {
                    $scope.params.proName = $scope.datas[0].paramName;
                } else {
                    $scope.params.proName = $scope.selectItem.ndmPath;
                };
                var i = $scope.params;
                switch (i.proType) {
                    case "STRING":
                        $scope.items.push(i);
                        $scope.params = {
                            proName: $scope.datas[0].paramName,
                            proValue: "",
                            proType: $scope.datas[0].type,
                        };
                        break;
                    case "BOOLEAN":
                        if (i.proValue == 'true' || i.proValue == 'false') {
                            $scope.items.push(i);
                            $scope.params = {
                                proName: $scope.datas[0].paramName,
                                proValue: "",
                                proType: $scope.datas[0].type,
                            };

                        } else {
                            // alert("The value must be of boolean type ！")
                            swal({
                                title: "Tips:",
                                text: "The value must be of boolean type ！",
                                icon: "info",
                                timer: 4000,
                            });
                        }
                        break;
                    case "INT":
                        $scope.items.push(i);
                        $scope.params = {
                            proName: $scope.datas[0].paramName,
                            proValue: "",
                            proType: $scope.datas[0].type,
                        };
                        break;
                    case "INT1":
                        $scope.items.push(i);
                        $scope.params = {
                            proName: $scope.datas[0].paramName,
                            proValue: "",
                            proType: $scope.datas[0].type,
                        };
                        break;
                    case "UNSIGNED_INT":
                        $scope.items.push(i);
                        $scope.params = {
                            proName: $scope.datas[0].paramName,
                            proValue: "",
                            proType: $scope.datas[0].type,
                        };
                        break;
                    case "DATATIME":
                        $scope.items.push(i);
                        $scope.params = {
                            proName: $scope.datas[0].paramName,
                            proValue: "",
                            proType: $scope.datas[0].type,
                        };
                        break;
                    case "BASE64":
                        $scope.items.push(i);
                        $scope.params = {
                            proName: $scope.datas[0].paramName,
                            proValue: "",
                            proType: $scope.datas[0].type,
                        };
                        break;
                    default:
                        break;
                };
                $scope.isClose = true;

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
                    for (let index = 0; index < $scope.checkedItems.length; index++) {
                        const element1 = $scope.checkedItems[index].proName;
                        for (let index1 = 0; index1 < $scope.items.length; index1++) {
                            const element2 = $scope.items[index1].proName;
                            if (element1 == element2) {
                                $scope.$apply(function() {
                                    $scope.items.splice(index1, 1);
                                    if ($scope.items.length == $scope.checked.length && $scope.checked.length != 0) {
                                        $scope.checkbox.select_all = true;
                                    } else {
                                        $scope.checkbox.select_all = false;
                                    };
                                    swal({
                                        title: "Tips:",
                                        text: "Success !",
                                        icon: "success",
                                        timer: 4000,
                                    });
                                })
                            };
                        };
                    };
                    $scope.isClose = true;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                    if ($scope.items.length == $scope.checked.length && $scope.checked.length != 0) {
                        $scope.checkbox.select_all = true;
                    } else {
                        $scope.checkbox.select_all = false;
                    };
                    $scope.params = {
                        proName: $scope.datas[0].paramName,
                        proValue: "",
                        proType: $scope.datas[0].type,
                    };
                }
            });
        } else {
            // alert("Select at least one item !");
            swal({
                title: "Tips:",
                text: "Select at least one item !",
                icon: "info",
                timer: 4000,
            });
        };
        $scope.editCheck = false;
    };


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
        var modalItem = item
            // $scope.editparams = angular.copy($scope.params = angular.copy(modalItem));
        $scope.editparams = angular.copy(modalItem);


    };

    $scope.saveEditValue = function() {
        $scope.editCheck = false;
        for (let index = 0; index < $scope.items.length; index++) {
            const element = $scope.items[index].proName;
            if ($scope.editparams.proName == element) {
                $scope.items[index].proValue = $scope.editparams.proValue;
                $scope.items[index].proType = $scope.editparams.proType;
            };

        };
        $scope.isClose = true;
        $scope.editparams = {
            proName: "",
            proValue: "",
            proType: "STRING",
        };

        $scope.params.proName = $scope.datas[0].paramName;

    }


    $scope.save = function() {
        //console.log($scope.items);
        $scope.info.modelName = $scope.modelItem.modelName;
        var info = $scope.info;
        var item = $scope.items;
        if (isAdd == "modify") {
            if ($scope.items.length == 0) {
                swal({
                    title: "Tips:",
                    text: "Please add parameter !",
                    icon: "info",
                    timer: 4000,
                });
            } else {
                configManagementService.ModifyContent(info, item)
                    .success(function(response) {
                        if (response.code == 200) {
                            swal({
                                title: "Tips:",
                                text: response.msg,
                                icon: "success",
                                timer: 4000,
                            });
                            // alert("Success !")
                            $uibModalInstance.close();
                        } else {
                            // alert(response.msg);
                            swal({
                                title: "Tips:",
                                text: response.msg,
                                icon: "info",
                                timer: 4000,
                            });
                        }
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            };

        } else {
            if ($scope.items.length == 0) {
                // alert("Please add parameter");
                swal({
                    title: "Tips:",
                    text: "Please add parameter",
                    icon: "info",
                    timer: 4000,
                });
            } else {
                configManagementService.AddContent(info, item)
                    .success(function(response) {
                        if (response.code == 200) {
                            // alert("Success !")
                            swal({
                                title: "Tips:",
                                text: response.msg,
                                icon: "success",
                                timer: 4000,
                            });
                            $uibModalInstance.close();
                        } else {
                            // alert(response.msg)
                            swal({
                                title: "Tips:",
                                text: response.msg,
                                icon: "info",
                                timer: 4000,
                            });
                        };
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            };
        }



    };


    $scope.close = function() {
        if ($scope.title == "view") {
            $uibModalInstance.close();
        } else if ($scope.isClose == false) {
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
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addItems = [];
    $scope.valueChange = function(i) {
        //console.log(i)
        $scope.selectItem = i;
    }
    $scope.valueChange1 = function(i) {
        //console.log(i);
        $scope.isSave = false;
        $scope.selectItem.ndmPath = i.name;
        $scope.selectItem.type = i.type;
        $scope.params.proType = i.type;
        $scope.editparams.proType = i.type;

    }

    $scope.datas = [];
    $scope.dataList = [];
    var searchAllNdmPath = function() {
        modelService.searchAllNdmPath($scope.modelId)
            .success(function(response) {
                // var item = response;
                // for (let index = 0; index < item.length; index++) {
                //     const element = item[index].paramName;
                //     $scope.datas.push(element);
                // }
                $scope.datas = response;
                for (let index = 0; index < $scope.datas.length; index++) {
                    const element = $scope.datas[index].paramName;
                    const item = {
                        name: element
                    };
                    $scope.dataList.push(item);
                };
                $scope.initList = $scope.dataList;
            })
            .error(function(err) {
                console.info(err);
            });
    };
    // searchAllNdmPath();


    $scope.inValue = '';
    $scope.isSave = false;
    $scope.inValue_display = '';
    $scope.getValue = function(value) {
        $scope.inValue_display = value;
    }
    $scope.$on('selectInput', function(evt, inputObj) {

        if ('select-input-mark' == inputObj.inputId) {

            $scope.inValue = '';

            $scope.inValue_display = inputObj.inputText;
            $scope.selectItem.ndmPath = $scope.inValue_display;
            // for (let index = 0; index < array.length; index++) {
            //     const element = array[index];

            // }
            $scope.fuzzyQuery();

        }

    });

    $scope.fuzzyQuery = function() {
        $scope.dataList = [];
        angular.forEach($scope.initList, function(item) {
            if (-1 != item.name.indexOf($scope.inValue_display)) {
                $scope.dataList.push(item);
            };

        });
        if ($scope.dataList.length == 0) {
            $scope.dataList = $scope.initList;
            $scope.isSave = true;
        } else {
            $scope.isSave = false;
        }
        // $scope.initList = $scope.dataList;

    };


}