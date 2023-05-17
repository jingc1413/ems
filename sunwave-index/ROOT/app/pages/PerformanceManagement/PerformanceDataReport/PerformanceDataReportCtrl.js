angular.module('SunWave.pages.PerformanceManagement.PerformanceDataReport', [])
    .controller('PerformanceDataReportCtrl', PerformanceDataReportCtrl);

function PerformanceDataReportCtrl($scope, $uibModal, $state, PerformanceDataReportService) {



    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    $scope.query = { //查询信息
        id: null,
        pageIndex: 0,
        pageSize: 6,
        name: "",
        keyword: ""

    };

    $scope.clearAll = function() {
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        $scope.checkbox.select_all = false;
    };

    $scope.checkbox = {
        select_all: "",
    };

    var searchForm = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        $scope.clearAll();
        PerformanceDataReportService.searchForm($scope.query)
            .success(function(response) {
                // $scope.paginationConf.totalItems = response.data.totalElements;
                $scope.items = response.data.content
            })
            .error(function(err) {
                console.info(err);
            });
    };
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

    //Add
    $scope.addItem = function() {
        $scope.isAdd = "Add";
        $scope.openDialog();
    };


    //Modify
    $scope.toModifyItem = function() {
        if ($scope.checked.length == 1) {
            $scope.isAdd = "Modify";
            $scope.openDialog($scope.checkedItems[0]);
        };
    };

    $scope.openDialog = function(item) {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/PerformanceManagement/PerformanceDataReport/addModal.html',
            controller: 'addModalCtrl',
            size: 'md',
            resolve: {
                PerformanceDataReportService: function() {
                    return PerformanceDataReportService;
                },
                item: function() {
                    return item;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/PerformanceManagement/PerformanceDataReport/addModalCtrl.js']);
                    }
                ]
            }
        });

        //点击保存后执行
        // $scope.items = [];
        modalInstance.result.then(function(newItems) {
            $scope.checked = []; //选中的IDs
            $scope.checkedItems = []; //选中的对象数组
            $scope.checkbox.select_all = false;
            searchForm();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //delete Item
    $scope.deleteItem = function() {
        PerformanceDataReportService.deleteItem($scope.checked)
            .success(function(response) {
                if (response.code == 200) {
                    swal({
                        title: "Tips:",
                        text: "Success !",
                        icon: "success",
                        timer: 4000,
                    });
                    searchForm();
                    $scope.checked = []; //选中的ID
                    $scope.checkedItems = []; //选中的对象数组
                }
            })
            .error(function(err) {
                console.info(err);
            });
    }

    $scope.toViewReport = function(item) {
        //console.log(item.id)
        $state.go("PerformanceManagement.dataReportForm", { 'id': item.id });
    };
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);
}