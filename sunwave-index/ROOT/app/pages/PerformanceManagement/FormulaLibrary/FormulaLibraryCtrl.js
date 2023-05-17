angular.module('SunWave.pages.PerformanceManagement.FormulaLibrary', [])
    .controller('FormulaLibraryCtrl', FormulaLibraryCtrl);

function FormulaLibraryCtrl($rootScope, $scope, $uibModal, FormulaLibraryService) {

    $scope.checkbox = {
        select_all: ""
    }

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
            // chkboxType: { "Y": "ps", "N": "ps" }
            chkboxType: { "Y": "", "N": "" }
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        edit: {
            // enable: true,
            // removeTitle: "Delete",
            // renameTitle: "Modify",
            // addTitle: "Add"
        },
        callback: {
            // beforeEditName:editNode,
            // onClick:clickNode,
            onCheck: zTreeOnCheck,
            onClick: clickNode,
            // beforeRemove:removeNode
        }
    };
    $scope.query = { //查询信息
        id: null,
        pageIndex: 0,
        pageSize: 6,
        name: "",
        keyword: "",
    };


    var init = function() {
        var zNodes = [{
            paramId: null,
            name: "指标分类",
            id: "3",
            children: [

            ]
        }];
        FormulaLibraryService.searchManu()
            .success(function(response) {
                // $scope.paginationConf.totalItems = response.totalElements;
                //console.log(response)
                zNodes[0].children = response.data;
                for (let index1 = 0; index1 < zNodes[0].children.length; index1++) {
                    for (let index = 0; index < zNodes[0].children[index1].children.length; index++) {
                        zNodes[0].children[index1].children[index].name = zNodes[0].children[index1].children[index].indexName;
                    };

                }
                $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
            })
            .error(function(err) {
                console.info(err);
            });
        // //console.log(zNodes);
        // var treeObj1 = $.fn.zTree.init($("#AuthorizeTree"), setting, zNodes);
        // var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree");
        // //console.log(treeObj);
        // //console.log(treeObj1);

    };
    init();

    //tree checked
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;
        $scope.id = treeNode.id;
        //console.log(treeNode)
    };

    function clickNode(event, treeId, treeNode) {
        //console.log(treeNode);
        $scope.treeNode = treeNode;
        $scope.t = treeNode.t;
        $scope.id = treeNode.id;
        if (treeNode.isParent) {

        } else {
            var zTree = $.fn.zTree.getZTreeObj("AuthorizeTree");
            zTree.updateNode(treeNode);
            $scope.query.id = treeNode.id;
            $scope.searchForm();
        }

    };
    $scope.searchForm = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        FormulaLibraryService.getPerformanceItem($scope.query)
            .success(function(response) {
                $scope.paginationConf.totalItems = response.data.totalElements;
                //console.log(response);
                $scope.items = response.data.content
            })
            .error(function(err) {
                console.info(err);
            });
    }


    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };


    $scope.checked = [];
    $scope.checkedItems = [];
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

    $scope.reset = function() {
        $scope.query.version = '';
        $scope.query1.manufacturer = 'All';
    };

    //Add
    $scope.addItem = function() {
        $scope.isAdd = "Add";
        $scope.openEditDialog();
    };

    //modify
    $scope.toModifyItem = function() {
        $scope.isAdd = "Modify";
        //console.log($scope.id);
        if ($scope.checkedItems.length == 1) {
            $scope.openEditDialog($scope.checkedItems[0]);
        } else {
            // alert("Please select one !")
            swal({
                title: "Tips:",
                text: "Please select one !",
                icon: "info",
                timer: 4000,
            });
        };

    };

    //Delete
    $scope.deleteItem = function() {
        //console.log($scope.checked);
        FormulaLibraryService.deleteItem($scope.checked)
            .success(function(response) {
                // $scope.paginationConf.totalItems = response.totalElements;
                //console.log(response);
            })
            .error(function(err) {
                console.info(err);
            });
    }

    $scope.openEditDialog = function(item) {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/PerformanceManagement/FormulaLibrary/FormulaModel.html',
            controller: 'FormulaModelCtrl',
            size: 'md',
            resolve: {
                FormulaLibraryService: function() {
                    return FormulaLibraryService;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                item: function() {
                    return item;
                },
                id: function() {
                    return $scope.id;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/PerformanceManagement/FormulaLibrary/FormulaModelCtrl.js']);
                    }
                ]
            }
        });

        //点击保存后执行
        // $scope.items = [];
        modalInstance.result.then(function(newItems) {
            // $scope.checked = []; //选中的IDs
            // $scope.checkedItems = []; //选中的对象数组
            // $scope.checkbox.select_all = false;
            // searchForm();
            $scope.searchForm();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addNode = function() {
        $scope.isAdd2 = "Add"
        if ($scope.treeNode.isParent) {
            $scope.openEditDialog2();
        } else {
            swal({
                title: "Tips:",
                text: "Please select a parent node !",
                icon: "info",
                timer: 4000,
            });
        }

    };
    $scope.modifyNode = function() {
        $scope.isAdd2 = "Modify";
        if ($scope.treeNode.isParent == false) {
            $scope.openEditDialog2($scope.treeNode);
        } else {
            swal({
                title: "Tips:",
                text: "Please select a child node !",
                icon: "info",
                timer: 4000,
            });
        }

    };
    $scope.selectTreeNode = [];
    $scope.deleteNode = function() {
        var treeObj = $.fn.zTree.getZTreeObj("AuthorizeTree");
        let list = treeObj.getCheckedNodes(true);
        //console.log(list);
        if ($scope.selectTreeNode.length = 0) {
            for (let index = 0; index < list.length; index++) {
                const element = list[index].id;
                if (list[index].isParent == false) {
                    $scope.selectTreeNode.push(element);
                }

            }
        } else {
            var isExit = false;
            for (let index = 0; index < list.length; index++) {
                const element = list[index].id;
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
        FormulaLibraryService.deleteTreeNode($scope.selectTreeNode)
            .success(function(response) {
                if (response.code == 200) {
                    swal({
                        title: "Tips:",
                        text: "Success !",
                        icon: "success",
                        timer: 4000,
                    });
                    init();
                }
            })
            .error(function(err) {
                console.info(err);
            });

    };

    $scope.openEditDialog2 = function(item) {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/PerformanceManagement/FormulaLibrary/TreeModel.html',
            controller: 'TreeModelCtrl',
            size: 'md',
            resolve: {
                FormulaLibraryService: function() {
                    return FormulaLibraryService;
                },
                isAdd: function() {
                    return $scope.isAdd2;
                },
                item: function() {
                    return item;
                },
                Id: function() {
                    return $scope.id;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/PerformanceManagement/FormulaLibrary/TreeModelCtrl.js']);
                    }
                ]
            }
        });

        //点击保存后执行
        // $scope.items = [];
        modalInstance.result.then(function(newItems) {
            // $scope.checked = []; //选中的IDs
            // $scope.checkedItems = []; //选中的对象数组
            // $scope.checkbox.select_all = false;
            // searchForm();
            init();
        }, function(newItems) {
            //console.log(newItems);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

}