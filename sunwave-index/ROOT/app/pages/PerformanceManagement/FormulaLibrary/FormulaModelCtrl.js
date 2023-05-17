angular.module('SunWave.pages.PerformanceManagement.FormulaLibrary', [])
    .controller('FormulaModelCtrl', FormulaModelCtrl);

function FormulaModelCtrl($rootScope, $scope, $uibModalInstance, item, FormulaLibraryService, isAdd, id) {
    $scope.title = isAdd;
    $scope.indexItems = [];
    $scope.modal = {
        calculateExpression: "",
        indexId: "",
        statisticsMethod: "sum"
    };
    $scope.selectIndexItem = {
        id: ""
    }

    var init = function() {
        var setting = {
            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            check: {
                enable: true
            },
            check: {
                enable: false,
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
        var zNodes = [{
            paramId: null,
            name: "参数分类",
            children: []
        }];
        FormulaLibraryService.searchParam()
            .success(function(response) {
                // $scope.indexItems = response.data
                //console.log(response)
                zNodes[0].children[0] = response.data[0];
                zNodes[0].children[0].children = response.data[0].childrens;
                //console.log(zNodes);
                $.fn.zTree.init($("#FormulaTree"), setting, zNodes);
                //console.log($.fn.zTree.init($("#FormulaTree"), setting, zNodes))
            })
            .error(function(err) {
                console.info(err);
            });

        if ($scope.title == "Modify") {
            $scope.modal = angular.copy(item);
            $scope.selectIndexItem.id = angular.copy(id);
        } else {

        }
        searchIndexId();
    };


    //tree checked
    function zTreeOnCheck(event, treeId, treeNode) {
        $scope.treeNode = treeNode;

        //console.log(treeNode)
    };

    function clickNode(event, treeId, treeNode) {
        //console.log(treeNode);
        $scope.$apply(function() {
            $scope.modal.calculateExpression = $scope.modal.calculateExpression + treeNode.name;
        });
        //console.log($scope.modal.calculateExpression);
        $scope.t = treeNode.t;
        $scope.id = treeNode.id;
        var zTree = $.fn.zTree.getZTreeObj("FormulaTree");
        zTree.updateNode(treeNode);

    };

    $scope.searchID = function(event) {
        //console.log(event.target.id);
        // var id = '#' + event.target.id
        // //console.log(angular.element(id))
        // init();
    };

    $scope.search = function() {
        // init();
    };

    var searchIndexId = function() {
        FormulaLibraryService.searchManu()
            .success(function(response) {
                // $scope.paginationConf.totalItems = response.totalElements;
                //console.log(response);
                for (let index = 0; index < response.data.length; index++) {
                    const element = response.data[index];
                    for (let index = 0; index < element.children.length; index++) {
                        const element1 = element.children[index];
                        $scope.indexItems.push(element1);
                    }
                };
                $scope.selectIndexItem = $scope.indexItems[0]
            })
            .error(function(err) {
                console.info(err);
            });

        //console.log("111");
    }


    $scope.count = function(item) {
        //console.log(item);
        $scope.modal.calculateExpression = $scope.modal.calculateExpression + item
    };

    $scope.save = function() {
        if ($scope.title == "Add") {
            $scope.modal.indexId = $scope.selectIndexItem.id;
            //console.log($scope.modal);
            FormulaLibraryService.addItem($scope.modal)
                .success(function(response) {
                    // $scope.paginationConf.totalItems = response.totalElements;
                    if (response.code == 200) {
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                        $scope.close();
                    }
                })
                .error(function(err) {
                    console.info(err);
                });
        } else {
            $scope.modal.indexId = $scope.selectIndexItem.id;
            //console.log($scope.modal);
            FormulaLibraryService.editItem($scope.modal)
                .success(function(response) {
                    // $scope.paginationConf.totalItems = response.totalElements;
                    swal({
                        title: "Tips:",
                        text: "Success !",
                        icon: "success",
                        timer: 4000,
                    });
                    $scope.close();
                })
                .error(function(err) {
                    console.info(err);
                });
        }

    }

    $scope.close = function() {
        $uibModalInstance.close('cancel');
    };

    $scope.$watch(
        'title', init);

    // init();
}