angular.module('SunWave.pages.LogManagement.PSDeviceLog')
    .controller('PSDeviceLogCtrl', PSDeviceLogCtrl);

function PSDeviceLogCtrl($rootScope, $scope, $uibModal, $http, PSDeviceLogService) {

    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 6,
        name: "",
        keyword: "",
        teName: ""
    };

    $scope.checkbox = {
        select_all: ""
    };
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组
    //全选（取消全选
    $scope.selectAll = function() {
        $scope.checked = [];
        $scope.checkedItems = [];
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


    //单选
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
        //console.log($scope.checkedItems);
        if ($scope.items.length == $scope.checked.length) {
            $scope.checkbox.select_all = true;
        } else {
            $scope.checkbox.select_all = false;
        }
    };

    var searchForm = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        PSDeviceLogService.searchLogFile($scope.query)
            .success(function(response) {
                $scope.items = response.content
            })
    };
    searchForm();

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
                PSDeviceLogService.downloadFile(item.logName)
                    // .success(
                    //     function(data, status, headers, response) {
                    //         //console.log(data)
                    //         //console.log(response);
                    //         if (status == 200) {
                    //             headers = headers();
                    //             var contentType = headers['content-type'];
                    //             var fileName = item.logName;
                    //             var linkElement = document.createElement('a');
                    //             try {
                    //                 // var blob = new Blob([data], { type: contentType });
                    //                 var url = window.URL.createObjectURL(data);
                    //                 linkElement.setAttribute('href', url);
                    //                 linkElement.setAttribute("download", fileName);
                    //                 var clickEvent = new MouseEvent("click", {
                    //                     "view": window,
                    //                     "bubbles": true,
                    //                     "cancelable": false
                    //                 });
                    //                 linkElement.dispatchEvent(clickEvent);
                    //             } catch (ex) {
                    //                 //console.log(ex);
                    //             }
                    //         }
                    //     })
                    // .error(function(data) {
                    //     //console.log(data);
                    // });
                    .then(function(response) {
                        //console.log(response);
                        if (response.status == 200) {
                            headers = response.headers();
                            var contentType = headers['content-type'];
                            var fileName = item.logName;
                            var linkElement = document.createElement('a');
                            try {
                                var blob = new Blob([response.data], { type: contentType });
                                var url = window.URL.createObjectURL(blob);
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
            };
        }


    };
}