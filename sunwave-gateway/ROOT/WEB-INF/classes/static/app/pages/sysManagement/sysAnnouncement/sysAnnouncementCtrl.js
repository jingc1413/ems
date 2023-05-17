(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.sysAnnouncement', [])
        .controller('sysAnnouncementCtrl', sysAnnouncementCtrl);

    function sysAnnouncementCtrl($scope, sysAnnouncementService, $uibModal, $log) {

        $scope.query = { //查询条件
            pageIndex: 0,
            pageSize: 10,
            afficheTitle: "",
            affichePulish: ""
        };
        $scope.xx = {
            select_all: ""
        }

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            // console.log("$scope.query.Name"+$scope.query.Name);
            sysAnnouncementService.searchContent($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;


                })
                .error(function(err) {
                    console.info(err);
                });
        };

        // for (let i = 0; i < $scope.items.length; i++) {
        //     $scope.items[i].afficheInvalidate = $scope.items[i].afficheInvalidate.substring(0, 10);
        //     $scope.items[i].inputTime = $scope.items[i].inputTime.substring(0, 10);
        // }



        $scope.reset = function() {
            $scope.query.afficheTitle = '';
            $scope.query.affichePulish = '';
        };
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.afficheId);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.items, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                var index = $scope.checked.indexOf(i.afficheId);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.afficheId);
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
            console.log($scope.checkedItems);
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 200,
            pagesLength: 200,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        $scope.openAddDialog = function() {
            //$scope.selectElement = item;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/sysManagement/sysAnnouncement/sysAnnouncementModal.html',
                controller: 'sysAnnouncementModalCtrl',
                size: 'md',
                resolve: {
                    transmitModalItems: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/sysManagement/sysAnnouncement/sysAnnouncementModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                // // $scope.items.push(newItems);
                $scope.search();
            }, function(newItems) {
                console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.aaa = "search();"

        /**添加**/
        $scope.toAddItem = function() {
            $scope.transmitModalItems = null;
            $scope.isAdd = 'Add';
            $scope.openAddDialog();

        };
        /* 完全删除，从数据库删除 */
        $scope.deleteItem = function() {

            if ($scope.checked == undefined || $scope.checked.length == 0) {
                alert('Must Select One!')
            } else {
                var result = confirm('Are U Sure To Delete?');
                if (result) {
                    sysAnnouncementService.deleteItems($scope.checked).success(function(response) {
                        if (response.data == true) {
                            alert('Delete Success!');
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            // $scope.removeAllSelectItemFromArray();
                            $scope.search();

                        } else {
                            alert('Delete Failed.' + response.data);
                        }
                    });
                }
            }
        };
        $scope.removeAllSelectItemFromArray = function() {
            angular.forEach($scope.checked, function(checkId) {
                var keepGoing = true;
                angular.forEach($scope.items, function(item, index, array) {
                    if (keepGoing) {
                        if (item.id == checkId) {
                            $scope.items.splice(index, 1);
                            keepGoing = false;
                        }
                    }

                });
            });
            $scope.checked = [];
            $scope.checkedItems = [];
        };

        /**修改**/
        $scope.toModifyItem = function() {

            if ($scope.checked.length == 0) {
                alert("Must Select One!");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only Select One!");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'Modify';
                $scope.openAddDialog();

            }

        };
        /**查看**/
        $scope.toShowItem = function() {
            if ($scope.checked.length == 0) {
                alert("Must Select One!");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only Select One!");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'View';
                $scope.openAddDialog();

            }

        };

    }
})();