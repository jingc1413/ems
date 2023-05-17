(function() {
    'use strict';

    angular.module('SunWave.pages.PerformanceManagement.PerformanceDataReport', [])
        .controller('addModalCtrl', addModalCtrl);

    function addModalCtrl($rootScope, $scope, isAdd, $uibModalInstance, $filter, PerformanceDataReportService, item) {

        var setting = {

            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            check: {
                enable: false
            },
            check: {
                enable: true,
                chkboxType: { "Y": "ps", "N": "ps" }
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            edit: {
                // enable: true
            },
            callback: {
                // beforeEditName:editNode,
                // onClick:clickNode,
                onCheck: zTreeOnCheck,
                onClick: clickNode,
                // beforeRemove:removeNode
            }
        };

        var init = function() {
            var zNodes = [{
                paramId: null,
                name: "指标分类",
                children: []
            }];
            PerformanceDataReportService.searchManu()
                .success(function(response) {
                    // $scope.paginationConf.totalItems = response.totalElements;
                    //console.log(response);
                    zNodes[0].children = response.data;
                    for (let index1 = 0; index1 < zNodes[0].children.length; index1++) {
                        for (let index = 0; index < zNodes[0].children[index1].children.length; index++) {
                            zNodes[0].children[index1].children[index].name = zNodes[0].children[index1].children[index].indexName;
                            zNodes[0].children[index1].children[index].children = zNodes[0].children[index1].children[index].performanceItems
                            for (let index2 = 0; index2 < zNodes[0].children[index1].children[index].performanceItems.length; index2++) {
                                zNodes[0].children[index1].children[index].performanceItems[index2].name = zNodes[0].children[index1].children[index].performanceItems[index2].kpiName;
                            };
                        };

                    }
                    //console.log(zNodes);
                    $.fn.zTree.init($("#AuthorizeTree1"), setting, zNodes);

                })
                .error(function(err) {
                    console.info(err);
                });

            PerformanceDataReportService.searchManu()
                .success(function(response) {
                    //console.log(response)
                    $scope.ManufactuerItem = response.data;
                    if (isAdd == "Modify") {
                        for (let index = 0; index < $scope.ManufactuerItem.length; index++) {
                            const element = $scope.ManufactuerItem[index].id;
                            if (item.manufactureId == element) {
                                $scope.selectIndexItem = $scope.ManufactuerItem[index];
                            }
                        };
                        //console.log(item);
                        $scope.modal = angular.copy(item);
                        $scope.chooseSelect = angular.copy(item.list);
                    } else {
                        $scope.selectIndexItem = $scope.ManufactuerItem[0]
                    }
                })
                .error(function(err) {
                    console.info(err);
                });


        };


        $scope.selectTreeNode = [];
        //tree checked
        function zTreeOnCheck(event, treeId, treeNode) {
            $scope.treeNode = treeNode;
            //console.log(treeNode);
            var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree1");
            let list = treeObj.getCheckedNodes(true);
            if ($scope.selectTreeNode.length = 0) {
                for (let index = 0; index < list.length; index++) {
                    const element = {
                        id: "",
                        name: ""
                    };
                    element.id = list[index].id;
                    element.name = list[index].name;
                    if (list[index].isParent == false) {
                        $scope.selectTreeNode.push(element);
                    }

                }
            } else {
                var isExit = false;
                for (let index = 0; index < list.length; index++) {
                    const element = {
                        id: "",
                        kpiName: ""
                    };
                    element.id = list[index].id;
                    element.kpiName = list[index].name;
                    for (let index = 0; index < $scope.selectTreeNode.length; index++) {
                        const element1 = $scope.selectTreeNode[index];
                        if (element.id == element1.id) {
                            isExit = true;
                        } else {
                            isExit = false;
                        }
                    };
                    if (list[index].isParent == false) {
                        $scope.selectTreeNode.push(element);
                    }
                }
            };

            //console.log($scope.selectTreeNode);

        };


        function clickNode(event, treeId, treeNode) {
            var isExit = false;
            //console.log(treeNode);
            $scope.t = treeNode.t;
            $scope.id = treeNode.id;
            var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree1");
            zTree.updateNode(treeNode);

        };


        $scope.query = { //查询设备
            pageIndex: 0,
            pageSize: 10,
            keyword: "",
            areaIds: "",
            neCompanyid: "",
            neSitelevelid: "",
            neDevicestatusid: "",
            neDevicetypeid: "",
            neName: "",
            neRepeaterid: "",
            rightElementIds: ""
        };


        $scope.xx = {
            select_all: "",
            select_all2: ""
        };




        //----------------------------------前台条件查询-------------------------------------//

        //前台查询条件
        $scope.query2 = {
            neDevicetypeid: "",
            neDevicestatusid: "",
            neRepeaterid16: "",
            neName: "",
            coCompanyid: "",
            areaNames: ""
        };

        $scope.deviceTypeShow2 = true;

        //----------------------------------前台条件查询 end-------------------------------------//


        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 10,
            perPageOptions: [5, 10, 20, 30, 40, 50]

        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', init);



        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.neNeid);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.rows, function(i) {
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
            angular.forEach($scope.rows, function(i) {
                var index = $scope.checked.indexOf(i.neNeid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.neNeid);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.rows.length == $scope.checked.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            //console.log($scope.checkedItems);
        };


        // -----------------------------第二个-------------------------------------

        $scope.m = [];
        $scope.checked2 = []; //选中的ID
        $scope.checkedItems2 = []; //选中的对象数组

        $scope.selectAll2 = function() {
            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            if ($scope.xx.select_all2) {
                $scope.checked2 = [];
                $scope.checkedItems2 = [];
                angular.forEach($scope.chooseSelect, function(i) {
                    i.checked = true;
                    $scope.checked2.push(i.id);
                    $scope.checkedItems2.push(i);
                });
            } else {
                angular.forEach($scope.chooseSelect, function(i) {
                    i.checked = false;
                    $scope.checked2 = [];
                    $scope.checkedItems2 = [];
                });
            }
            //console.log($scope.checked2);
        };
        $scope.selectOne2 = function() {
            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            angular.forEach($scope.chooseSelect, function(i) {
                var index = $scope.checked2.indexOf(i.id);
                if (i.checked && index == -1) {
                    $scope.checked2.push(i.id);
                    $scope.checkedItems2.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked2.splice(index, 1);
                    $scope.checkedItems2.splice(index, 1);
                };
            });


            if ($scope.chooseSelect.length == $scope.checked2.length) {
                $scope.xx.select_all2 = true;
            } else {
                $scope.xx.select_all2 = false;
            }
            //console.log($scope.checkedItems2);
        };

        //   --------------------------------第二个end------------------------------
        $scope.chooseSelect = [];
        $scope.doubleSelectToRight = function() {
            // angular.copy(item)
            var isExit = false;
            if ($scope.chooseSelect.length == 0) {
                $scope.chooseSelect = angular.copy($scope.selectTreeNode);
            } else {
                for (let index = 0; index < $scope.selectTreeNode.length; index++) {
                    const element = $scope.selectTreeNode[index];
                    for (let index = 0; index < $scope.chooseSelect.length; index++) {
                        const element1 = $scope.chooseSelect[index];
                        if (element1.id == element.id) {
                            isExit = true;
                            break;
                        } else {
                            isExit = false;
                        };
                    };
                    if (isExit == false) {
                        $scope.chooseSelect.push(element);
                    }
                }
            };
            //console.log($scope.chooseSelect);
        };
        $scope.doubleSelectToLeft = function() {
            //console.log($scope.checked2);
            //console.log($scope.chooseSelect);
            for (let index = 0; index < $scope.checked2.length; index++) {
                const element = $scope.checked2[index];
                for (let index2 = 0; index2 < $scope.chooseSelect.length; index2++) {
                    const element2 = $scope.chooseSelect[index2].id;
                    if (element == element2) {
                        $scope.chooseSelect.splice(index2, 1);
                    }
                }

            };
            if ($scope.chooseSelect.length == $scope.checked2.length) {
                $scope.xx.select_all2 = true;
            } else {
                $scope.xx.select_all2 = false;
            }
        };

        //save
        $scope.save = function() {
            if (isAdd == "Add") {
                $scope.modal.manufactureId = "";
                $scope.modal.ids = [];
                $scope.modal.manufactureId = $scope.selectIndexItem.id;
                for (let index = 0; index < $scope.chooseSelect.length; index++) {
                    const element = $scope.chooseSelect[index].id;
                    $scope.modal.ids.push(element);
                };
                //console.log($scope.modal);
                PerformanceDataReportService.addItem($scope.modal)
                    .success(function(response) {
                        //console.log(response)
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                        $scope.close()
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            } else {
                $scope.modal.manufactureId = "";
                $scope.modal.ids = [];
                $scope.modal.manufactureId = $scope.selectIndexItem.id;
                for (let index = 0; index < $scope.chooseSelect.length; index++) {
                    const element = $scope.chooseSelect[index].id;
                    $scope.modal.ids.push(element);
                };
                $scope.modal.list = [];
                //console.log($scope.modal);
                PerformanceDataReportService.modifyItem($scope.modal)
                    .success(function(response) {
                        //console.log(response)
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                        $scope.close()
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            }

        }

        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();