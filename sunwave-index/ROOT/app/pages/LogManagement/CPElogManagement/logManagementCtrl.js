(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.CPElogManagement')
        .controller('logManagementCtrl', logManagementCtrl);

    /** @ngInject */
    function logManagementCtrl($scope, $uibModal, $stateParams, logManagementService) {
        $scope.checkbox = {
            select_all: ""
        };
        $scope.groupId = $stateParams.groupId;

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 15,
            id: "",
            manufacturer: "",
            isDone: null,
            serialNumber: "",

        };

        $scope.query1 = { //查询信息            
            manufacturer: null,
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

        var searchManufacturer = function() {
            $scope.ManufacturerItems = ['All'];
            logManagementService.searchManufacturer()
                .success(function(response) {
                    // $scope.$apply(function() {
                    var items = [];
                    items = response.data;
                    for (let index = 0; index < items.length; index++) {
                        const element = items[index];
                        $scope.ManufacturerItems.push(element);
                    }
                    // $scope.ManufacturerItems = response.data;
                    $scope.query1.manufacturer = $scope.ManufacturerItems[0];
                    // });
                })
                .error(function(err) {
                    console.info(err);
                });
        };


        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            if ($scope.query1.manufacturer == 'All') {
                $scope.query.manufacturer = null;
            } else {
                $scope.query.manufacturer = $scope.query1.manufacturer;
            };
            if ($scope.query.isDone == "1") {
                $scope.query.isDone = 1;
            } else if ($scope.query.isDone == "0") {
                $scope.query.isDone = 0;
            } else {
                $scope.query.isDone = null;
            };
            if ($scope.groupId == null) {
                logManagementService.searchContent($scope.query)
                    .success(function(response) {
                        $scope.paginationConf.totalItems = response.totalElements
                        var Logitems = response.content;
                        for (let index = 0; index < Logitems.length; index++) {
                            const element = Logitems[index];
                            if (element.isDone) {
                                Logitems[index].isDone = "Upgrade Complete";
                            } else {
                                Logitems[index].isDone = "Upgrading";
                            }
                        };
                        $scope.items = Logitems;
                        if ($scope.query.isDone == 1) {
                            $scope.query.isDone = "1";
                        } else if ($scope.query.isDone == 0) {
                            $scope.query.isDone = "0";
                        } else {
                            $scope.query.isDone = null;
                        };
                        searchManufacturer();
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            } else {
                $scope.query.id = $scope.groupId;
                logManagementService.searchContentByGroupId($scope.query)
                    .success(function(response) {
                        $scope.paginationConf.totalItems = response.totalElements
                        $scope.items = response.content;
                        if ($scope.query.isDone == 1) {
                            $scope.query.isDone = "1";
                        } else if ($scope.query.isDone == 0) {
                            $scope.query.isDone = "0";
                        } else {
                            $scope.query.isDone = null;
                        };
                        searchManufacturer();
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            };

        };

        $scope.search = function() {
            searchForm();
        };

        $scope.reset = function() {
            $scope.query.manufacturer = '';
            $scope.query.isDone = null;
            $scope.serialNumber = ""
        };

        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


    }

})();