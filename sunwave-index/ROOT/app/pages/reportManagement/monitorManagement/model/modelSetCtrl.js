angular.module('SunWave.pages.reportManagement.CPEmonitorManagement.model', [])
    .controller('modelSetCtrl', modelSetCtrl);

function modelSetCtrl($rootScope, $scope, $uibModalInstance, modelService, monitor, $translate) {
    $scope.tempdatas = $scope.datas; //下拉框选项副本
    $scope.hidden = false; //选择框是否隐藏
    // $scope.searchField = ''; //文本框数据
    $scope.ndmPathItem = ''; //
    $scope.isShow = false;
    // $scope.selectItem.ndmPath = "";
    $scope.isEdit = false; //是否有编辑
    $scope.query = { //查询信息
        pageIndex: 1,
        pageSize: 15,
        name: "",
        keyword: ""
    };
    $scope.modelId = monitor.id;
    $scope.items = [];
    var searchModelName = function() {
        modelService.getMonitoringTypes($scope.query)
            .success(function(response) {
                $scope.items = response.content;
                $scope.searchNdmPath($scope.items[0]);
            })
            .error(function(err) {
                console.info(err);
            });
    };

    searchModelName();

    $scope.searchNdmPath = function(item) {
        $scope.isShow = true;
        // $scope.modelId = item.id;
        $scope.monitorPath = item.monitoringItems;
        modelService.getNdmPath($scope.modelId, $scope.monitorPath)
            .success(function(response) {
                for (let index = 0; index < $scope.monitorPath.length; index++) {
                    const element = $scope.monitorPath[index].id;
                    for (let index1 = 0; index1 < response.length; index1++) {
                        const element1 = response[index1].itemId;
                        if (element == element1) {
                            $scope.monitorPath[index].ndmPath = response[index1].paramName;
                            $scope.monitorPath[index].ndmId = response[index1].id
                        }
                    }
                }
            })
            .error(function(err) {
                console.info(err);
            });
    };

    $scope.addItems = [];
    $scope.valueChange = function(i) {
        // $scope.isEdit = true;
        $scope.selectItem = i;
    }
    $scope.valueChange1 = function(i) {
        //console.log(i);
        $scope.isEdit = true;
        $scope.selectItem.ndmPath = i;
    }

    $scope.save = function() {
        // var truthBeTold = window.confirm("Are you sure ?");
        swal({
            title: "Waring",
            // text: $translate.instant('deviceManagement.CPEdevice.Group.alert_Close_Confirm'),
            text: "Are you sure ?",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: true,
            },
        }).then(function(isOk) {
            if (isOk) {
                if ($scope.modelId != null) {
                    var items = [];
                    //console.log($scope.selectItem);
                    for (let index = 0; index < $scope.monitorPath.length; index++) {
                        const element = $scope.monitorPath[index];
                        var item = {
                            itemId: "",
                            paramName: "",
                            id: ""
                        }

                        item.itemId = element.id;
                        item.paramName = element.ndmPath;
                        item.id = element.ndmId;
                        items.push(item);
                    }
                    modelService.saveNDMPath($scope.modelId, items)
                        .success(function(response) {
                            if (response == true) {
                                // alert("success !");
                                swal({
                                    title: "Tips:",
                                    text: "Success !",
                                    icon: "success",
                                    timer: 4000,
                                });
                                $scope.isEdit = false;
                            }
                        })
                        .error(function(err) {
                            console.info(err);
                        });
                } else {

                };
            };
        });
    }

    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    /*是否确认关闭页面*/
    $scope.closeWindow = function() {
        // var truthBeTold = window.confirm("After closing,your chenges will not be saved, Are you sure ?");
        // if (truthBeTold) {
        $scope.close();
        // } else {

        // }
    };

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
                // for (let index = 0; index < response.length; index++) {
                //     if (response[index].writable) {
                //         $scope.datas.push(response[index]);
                //     };

                // };
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
    searchAllNdmPath();


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


    // $scope.$watch(
    //     'inValue_display', searchForm);

};