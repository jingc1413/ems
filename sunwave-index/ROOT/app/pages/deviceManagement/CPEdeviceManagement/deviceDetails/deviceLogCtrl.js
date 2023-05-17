angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
    .controller('deviceLogCtrl', deviceLogCtrl);

function deviceLogCtrl($rootScope, $scope, $filter, deviceDetailsService, $log, $stateParams, $uibModal) {
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
        beginTime: null,
        endTime: null,
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
        beginTime: "",
        endTime: ""

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
        $scope.query.neId = $scope.neNeid;
        deviceDetailsService.searchLogFile($scope.query)
            .success(function(response) {
                $scope.paginationConf.totalItems = response.totalElements
                $scope.items = response.content;
            })
            .error(function(err) {
                console.info(err);
                // alert("Fail !")
                swal({
                    title: "Tips:",
                    text: "Fail  !",
                    icon: "error",
                    timer: 4000,
                });
            });
    };
    $scope.searchByTime = function() {
        //console.log($scope.query);
    };

    $scope.selectAll = function() {
        if ($scope.checkbox.select_all == true) {
            angular.forEach($scope.items, function(i) {
                i.checked = true;
                $scope.checked.push(i.logName);
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

    $scope.selectOne = function() {
        $scope.checked = [];
        $scope.checkedItems = [];
        angular.forEach($scope.items, function(i) {
            var index = $scope.checked.indexOf(i.logName);
            if (i.checked && index == -1) {
                $scope.checked.push(i.logName);
                $scope.checkedItems.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checked.splice(index, 1);
                $scope.checkedItems.splice(index, 1);
            };
        });
        if ($scope.items.length == $scope.checked.length) {
            $scope.checkbox.select_all = true;
        } else {
            $scope.checkbox.select_all = false;
        }
    };

    $scope.clearAll = function() {
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
    };

    $scope.downloadFile = function() {
        if ($scope.checkedItems.length < 1) {
            // alert("Please select one !");
            swal({
                title: "Tips:",
                text: "Please select one  !",
                icon: "info",
                timer: 4000,
            });
        } else {
            for (let index = 0; index < $scope.checkedItems.length; index++) {
                const item = $scope.checkedItems[index];
                deviceDetailsService.downloadFile(item.logName)
                    .success(
                        function(data, status, headers) {
                            if (status == 200) {
                                headers = headers();
                                var contentType = headers['content-type'];
                                var fileName = item.logName;
                                var linkElement = document.createElement('a');
                                try {
                                    var blob = new Blob([data], { type: contentType });
                                    var url = window.URL.createObjectURL(blob);
                                    // linkElement.download = fileName;
                                    linkElement.setAttribute('href', url);
                                    linkElement.setAttribute("download", fileName);
                                    var clickEvent = new MouseEvent("click", {
                                        "view": window,
                                        "bubbles": true,
                                        "cancelable": false
                                    });
                                    linkElement.dispatchEvent(clickEvent);
                                } catch (ex) {
                                    //console.log(ex);
                                }
                            }
                        })
                    // function(response, status, headers, config, statusText) {
                    //     // headers = headers();
                    //     var fileName = item.logName;
                    //     // var fileNameUnicode = headers("Content-Disposition").split("filename*=")[1];
                    //     // if (fileNameUnicode) { //当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
                    //     //     fileName = decodeURIComponent(fileNameUnicode.split("''")[1]);
                    //     // };
                    //     var blob = response.data;
                    //     if ('msSaveOrOpenBlob' in navigator) { //IE导出
                    //         window.navigator.msSaveOrOpenBlob(blob, fileName);
                    //     } else {
                    //         var reader = new FileReader();
                    //         reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
                    //         reader.onload = function(e) {
                    //             // 转换完成，创建一个a标签用于下载
                    //             var a = document.createElement('a');
                    //             a.download = fileName;
                    //             a.href = e.target.result;
                    //             $("body").append(a);
                    //             a.click();
                    //             $(a).remove();
                    //         };
                    //     };
                    // })
                    .error(function(data) {
                        //console.log(data);
                    });
            };
        }


    };

    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


}