/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.serverStatus', [])
    .controller('detailHostNameModalCtrl', detailHostNameModalCtrl);

function detailHostNameModalCtrl($scope, serverStatusService, checkedItems) {

    $scope.checkedItems = checkedItems;

    $scope.title = "SystemAlarm Log";

    $scope.checkbox = {
        select_all: "",
    }

    // $scope.item = {
    //     hostname: "",
    //     item: "",
    //     status: "",
    //     updatetime: "",
    //     modulename: "",
    //     id: "",
    //     message: ""
    // };
    $scope.query = { //查询条件
        pageIndex: 0,
        pageSize: 10,
        endTime: "",
        startTime: "",
        serverName: $scope.checkedItems.hostname
    };


    $scope.search = function() {
        serverStatusService.searchIn($scope.query).success(function(res) {
            $scope.items = res.data.content;
        })
    };

    // 配置分页基本参数
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 50,
        pagesLength: 50,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    /***************************************************************
    当页码和页面记录数发生变化时监控后台查询
    如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
    ***************************************************************/
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search);


    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}
// });