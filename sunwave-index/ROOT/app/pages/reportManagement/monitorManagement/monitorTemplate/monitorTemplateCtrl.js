(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.CPEmonitorManagement.monitorTemplate')
        .controller('monitorTemplateCtrl', monitorTemplateCtrl);

    /** @ngInject */
    function monitorTemplateCtrl($scope, $state, monitorTemplateService, $filter, $translate) {
        $scope.checkbox = {
            select_all: false,
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

        $scope.count = 0; //已选择数量
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 15,
            pagesLength: 15,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            monitorTemplateService.getMonitoringTask($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.totalElements
                        //console.log("33" + $scope.paginationConf.totalItems)
                    $scope.items = response.content;

                })
                .error(function(err) {
                    console.info(err);
                });
        };
        //search by taskName
        $scope.search = function() {
            searchForm();
        }

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


        //add
        $scope.toAddItem = function() {

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
            if ($scope.items.length == $scope.checked.length) {
                $scope.checkbox.select_all = true;
            } else {
                $scope.checkbox.select_all = false;
            }
        };

        $scope.add = function() {
            $state.go("reportManagement.CPEmonitorManagement.editMonitoring");
        };

        $scope.edit = function() {
            if ($scope.checked.length == 1) {
                $state.go("reportManagement.CPEmonitorManagement.editMonitoring", { 'taskId': $scope.checked[0], 'isAdd': 'edit' });
            } else {
                // alert("Please select one !");
                swal({
                    title: "Tips:",
                    text: "Please select one !",
                    icon: "info",
                    timer: 4000,
                });
            };

        };

        $scope.editItem = function(item) {
            $state.go("reportManagement.CPEmonitorManagement.editMonitoring", { 'taskId': item.id, 'isAdd': 'edit' });
        };

        $scope.viewItem = function(item) {
            $state.go("reportManagement.CPEmonitorManagement.editMonitoring", { 'taskId': item.id, 'isAdd': 'view' });
        };

        $scope.delete = function() {
            // var truthBeTold = window.confirm("Are you sure ?");
            if ($scope.checked.length >= 1) {
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
                        monitorTemplateService.deleteMonitoringTask($scope.checked)
                            .success(function(response) {
                                if (response.code == 200) {
                                    // alert(response.msg);
                                    swal({
                                        title: "Tips:",
                                        text: response.msg,
                                        icon: "success",
                                        timer: 4000,
                                    });
                                    searchForm();
                                    $scope.checked = [];
                                    $scope.checkedItems = [];
                                    $scope.checkbox.select_all = false;
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
                            });
                    }
                })
            } else {
                // alert("Please select one !");
                swal({
                    title: "Tips:",
                    text: "Please select one !",
                    icon: "info",
                    timer: 4000,
                });
            };



        };

        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


    }

})();