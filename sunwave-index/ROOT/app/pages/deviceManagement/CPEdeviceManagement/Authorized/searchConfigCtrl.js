angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('searchConfigCtrl', searchConfigCtrl);

function searchConfigCtrl($rootScope, $scope, $uibModal, AuthorizedService, $uibModalInstance, items, $state, ) {
    $scope.deviceId = items;
    $scope.title = "Choose Param"
    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    $scope.isSave = true;
    $scope.xx = {
        select_all: ""
    }

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 6,
        name: "",
        keyword: "",
    };

    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 3,
        pagesLength: 3,
        perPageOptions: [1, 3] //[15, 20, 30, 50, 100, 200]

    };


    $scope.param = {
        groupName: "",
        description: ""
    }

    $scope.checkGroupItem = {
        "AllgroupId": [],
        "groupItems": []
    }
    $scope.AllgroupId = [];

    $scope.items = []

    var searchForm = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        AuthorizedService.searchConfig($scope.query)
            .success(function(response) {
                //console.log(response);
                $scope.items = response.content;
                $scope.paginationConf.totalItems = response.totalElements;
            })
            .error(function(err) {
                console.info(err);
            });

    };
    // searchForm();

    $scope.search = function() {
        searchForm();
    }

    $scope.m = [];
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    $scope.selectAll = function() {
        if ($scope.xx.select_all) {
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
        if ($scope.checked.length > 0) {
            $scope.isSave = false;
        } else {
            $scope.isSave = true;
        };
    };

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
            $scope.xx.select_all = true;
        } else {
            $scope.xx.select_all = false;
        }
        //console.log($scope.checkedItems);
        if ($scope.checked.length > 0) {
            $scope.isSave = false;
        } else {
            $scope.isSave = true;
        };
    };


    $scope.add = function() {
        $state.go("SunWave.pages.sysManagement.CPEconfigManagement");
    }


    $scope.save = function(item) {
        // var deviceids = [];
        if (window.confirm("Are you sure ?")) {
            var domain = 'device'
                // deviceids.push($scope.deviceId);
            AuthorizedService.deviceConfig(item.id, $scope.deviceId, domain)
                .success(function(response) {
                    //console.log(response);
                    alert("Success !")
                    $scope.close();
                })
                .error(function(err) {
                    console.info(err);
                });
        };
    };

    $scope.view = function(item) {
        $scope.isAdd = "view";
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/sysManagement/CPEconfigManagement/tempalteEdit.html',
            controller: 'tempalteEditCtrl',
            size: 'md',
            resolve: {
                item: function() {
                    return item;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/sysManagement/CPEconfigManagement/tempalteEditCtrl.js',
                                'app/pages/sysManagement/CPEconfigManagement/configManagementService.js',
                            ]
                        });
                    }
                ]
            }
        });

        //点击保存后执行
        // $scope.items = [];
        modalInstance.result.then(function(newItems) {
            $scope.close();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.close = function(newItems) {

        $uibModalInstance.close(newItems);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

}