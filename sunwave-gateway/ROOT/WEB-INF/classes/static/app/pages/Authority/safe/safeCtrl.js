(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.safe', [])
        .controller('safeCtrl', safeCtrl);

    function safeCtrl($rootScope, $scope, safeService, $uibModal, $log) {

        $scope.checkbox = {
            select_all: "",
        }

        $scope.name = "";
        // $scope.absUrl = $location.url();
        $scope.selectedItem = "";

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
        };

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 10,
            name: ''
        };




        $scope.count = 0; //已选择数量
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
            console.log($scope.checked);
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
            console.log($scope.checkedItems);


            if ($scope.items.length == $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
        };

        $scope.search = function() {
            getForm();
        };
        /*查询*/
        var getForm = function() { //查询
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll(); //清空数组
            safeService.search($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    console.log(response);
                    $scope.items = response.data.content;
                })
                .error(function(err) {
                    console.info(err);
                });
        };

        var getNameAndUpNameBysafeId = function() {
            safeService.getNameAndUpNameBysafeId().success(function(response) {
                $scope.items = response.data;
            })
        }

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 200,
            pagesLength: 200,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        //判断是否当前用户
        var decid_flag = false;
        $scope.decideUserFun = (item) => {
            if (item.length > 1) {
                for (let index = 0; index < item.length; index++) {
                    const element = item[index];
                    if (element.username == $rootScope.user.userName) {
                        alert('The record contains this login user,you cannot modify your own permissions!');
                        return
                    } else {
                        decid_flag = true;
                    }
                }
            } else if (item.length == 1) {
                if (item[0].username == $rootScope.user.username) {
                    decid_flag = false;
                    alert('you cannot modify your own permissions!');
                } else {
                    decid_flag = true;
                };
            } else {
                return false;
            }

            return decid_flag;
        };
        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "Add";
            $scope.openEditAreaDialog();
        };
        //modify
        $scope.toModifyItem = function() {

            if ($scope.checkedItems.length != 1) {
                alert('Must Select One And Only Select One!')
            } else {
                $scope.isAdd = "Modify";
                $scope.openEditAreaDialog();
            }
        };
        //delete
        $scope.toDeleteItem = function() {
            for (let i = 0; i < $scope.checkedItems.length; i++) {
                if ($scope.checkedItems[i].id == '46' || $scope.checkedItems[i].id == '48' || $scope.checkedItems[i].id == '0') {
                    alert('Management And SuperManagement Can Not Delete!')
                    return
                };
            }
            if ($scope.checked.length == 0) {
                alert("Must select One");
                return;
            } else {
                $scope.decideUserFun($scope.checkedItems);
                if (decid_flag == true) {
                    if (confirm("Are you sure to delete?")) {
                        // console.log($scope.checkedItems);
                        safeService.deleteItem($scope.checked).success(function(response) {
                            if (response.data == true) {
                                alert("Success!");
                                $scope.search();
                            } else {
                                alert("Failed!" + response.msg);
                            }
                        });
                    }
                } else {
                    return
                }

            }



        };
        //getAreaTree
        $scope.getAreaTree = function() {
            if ($scope.checkedItems.length != 1) {
                alert('Must Select One And Only Select One!');
            } else {
                $scope.decideUserFun($scope.checkedItems);
                if (decid_flag == true) {
                    $scope.isArea = 'Area';
                    $scope.add = 'authority';
                    $scope.openGetTreeModal();
                } else {
                    return
                }
            }
        };
        //modify password
        $scope.toModifyPassword = function() {
            if ($scope.checked.length == 0) {
                alert("Please select a user to modify first");
                return;
            } else if ($scope.checked.length != 1) {
                alert('Only select one')
            } else {
                $scope.decideUserFun($scope.checkedItems);
                if (decid_flag == true) {
                    if (confirm("Are you sure you want to change the password?")) {
                        $scope.openModifyPasswordModal();
                    }
                } else {
                    return
                }

            }
        };

        //启用
        $scope.openRole = function() {
            if ($scope.checked.length == 0) {
                alert("Please select the user to be enabled first.");
                return;
            } else {

                $scope.decideUserFun($scope.checkedItems);
                if (decid_flag == true) {
                    var statusId = [];
                    var userIds = [];
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].checked == true) {
                            userIds[userIds.length] = $scope.items[i].id;
                            statusId[statusId.length] = $scope.items[i].status;
                        }
                    };
                    for (var i = 0; i < statusId.length; i++) {
                        if (statusId[i] != 1) {
                            alert('The selected user status is inconsistent or has been enabled. Please select again！');
                            return
                        }
                    };
                    if (confirm("Are U Sure?")) {
                        safeService.modifyStatus(0, userIds).success(function(res) {
                            if (res.data == true) {
                                alert('success!');
                                $scope.search();
                            } else {
                                alert('Failed!')
                            }
                        })
                    };

                } else {
                    return
                }
            }
        };

        //停用
        $scope.stopRole = function() {
            if ($scope.checked.length == 0) {
                alert("Please select the user to be disabled first");
                return;
            } else {

                $scope.decideUserFun($scope.checkedItems);
                if (decid_flag == true) {
                    var statusId = [];
                    var userIds = [];
                    for (var i = 0; i < $scope.items.length; i++) {
                        if ($scope.items[i].checked == true) {
                            userIds[userIds.length] = $scope.items[i].id;
                            statusId[statusId.length] = $scope.items[i].status;
                        }
                    };
                    for (var i = 0; i < statusId.length; i++) {
                        if (statusId[i] != 0) {
                            alert('The selected user status is inconsistent or disabled. Please re select！');
                            return
                        };
                    };
                    if (confirm("Are U Sure?")) {
                        safeService.modifyStatus(1, userIds).success(function(res) {
                            if (res.data == true) {
                                alert('success!');
                                $scope.search();
                            } else {
                                alert('Failed!')
                            }
                        })
                    };
                } else {
                    return
                }
            }
        };

        //role授权
        $scope.getRole = function() {

            $scope.add = 'authority';

            if ($scope.checkedItems.length != 1) {
                alert('Must Select One And Only Select One!');
            } else {
                $scope.decideUserFun($scope.checkedItems);
                if (decid_flag == true) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        backdrop: "static",
                        templateUrl: 'app/pages/Authority/safe/getRoleModal.html',
                        controller: 'getRoleModalCtrl',
                        size: 'md',
                        resolve: {
                            item: function() {
                                return $scope.checkedItems[0];
                            },
                            safeService: function() {
                                return safeService;
                            },
                            add: function() {
                                return $scope.add;
                            },
                            deps: ['$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load(['app/pages/Authority/safe/getRoleModalCtrl.js']);
                                }
                            ]
                        }
                    });

                    modalInstance.result.then(function(newPassword) {
                        console.log(newPassword);
                        $scope.checked = [];
                        $scope.checkedItems = [];
                        $scope.search();
                    }, function(newPassword) {
                        console.log(newPassword);
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                } else {
                    return
                }
            }

        };
        //reset
        $scope.reset = function() {
            $scope.query = { //Search条件
                pageIndex: 0,
                pageSize: 10,
                name: ''
            };
        };

        $scope.openModifyPasswordModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/safe/passwordModal.html',
                controller: 'passwordModalCtrl',
                size: 'md',
                resolve: {
                    item: function() {
                        return $scope.checkedItems[0];
                    },
                    safeService: function() {
                        return safeService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/safe/passwordModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function() {
                console.log();
                // $scope.search();
            }, function(newPassword) {
                console.log(newPassword);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //授权area
        $scope.openGetTreeModal = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/safe/areaTreeModal.html',
                controller: 'areaTreeModalCtrl',
                size: 'md',
                resolve: {
                    isArea: function() {
                        return $scope.isArea;
                    },
                    safeService: function() {
                        return safeService;
                    },
                    user: function() {
                        return $scope.checkedItems[0];
                    },
                    add: function() {
                        return $scope.add;
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/safe/areaTreeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(treeNode) {
                console.log(treeNode);
            }, function(treeCheckedNode) {
                console.log(treeCheckedNode);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //排序
        $scope.oldOrder = "";
        $scope.orderFun = function(v) {
            if ($scope.oldOrder == "" || $scope.oldOrder == undefined) {
                $scope.oldOrder = v;
            }
            if ($scope.oldOrder == v) {
                $scope.oldOrder = "-" + v;
            } else {
                $scope.oldOrder = v;
            }
            $scope.order = $scope.oldOrder;
        };

        /*******************************************************************
         * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ******************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage',
            getForm);

        //修改 Add modal
        $scope.openEditAreaDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/safe/safeModal.html',
                controller: 'safeModalCtrl',
                size: 'md',
                resolve: {
                    item: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    safeService: function() {
                        return safeService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/safe/safeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                $scope.search();
            }, function() {
                console.log();
                $log.info('Modal dismissed at: ' + new Date());
                $scope.search();
            });
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


    }
})();