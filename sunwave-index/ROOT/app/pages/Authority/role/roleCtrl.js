(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.role', [])
        .controller('roleCtrl', roleCtrl);

    function roleCtrl($scope, roleService, $uibModal, $log, $http, messageAlertService) {

        $scope.checkbox = {
            select_all: "",
        }

        $scope.clearAll = function() {
            $scope.m = [];
            $scope.checked = []; //选中的ID
            $scope.checkedItems = []; //选中的对象数组
            $scope.checkbox.select_all = false;
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

        /*查询*/
        var getForm = function() { //查询
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            $scope.clearAll(); //清空数组
            roleService.search($scope.query)
                .success(function(response) {
                    $scope.paginationConf.totalItems = response.data.totalElements;
                    $scope.items = response.data.content;
                })
                .error(function(err) {
                    console.info(err);
                });
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        //查询表格
        $scope.search = function() {
            getForm();
        };

        //getMenuTree
        $scope.getMenuTree = function() {
            if ($scope.checkedItems.length != 1) {
                // alert('Must Select One And Only Select One!')
                messageAlertService.alertFun('must');
            } else {
                roleService.checkHasRoleAuth($scope.checkedItems[0].id).success(function(res) {
                    if (res.data == true) {
                        $scope.isArea = 'Menu';
                        $scope.openGetTreeModal();
                    } else {
                        // alert('The User has no authority!')
                        messageAlertService.authorityFun('no');
                    }
                });
            }
        };

        //授权tree
        $scope.openGetTreeModal = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/role/areaTreeModal.html',
                controller: 'areaTreeModalCtrl_role',
                size: 'md',
                resolve: {
                    isArea: function() {
                        return $scope.isArea;
                    },
                    roleService: function() {
                        return roleService;
                    },
                    role: function() {
                        return $scope.checkedItems[0];
                    },

                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/role/areaTreeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(treeNode) {
                // //console.log(treeNode);
                $scope.checkedItems = [];
                $scope.checked = [];
                $scope.items = [];

                $scope.search();
                // $scope.checkedItems = [];
                // $scope.checked = [];
                // $scope.items = [];
                // $scope.search();
                // $scope.$apply();
            }, function(treeCheckedNode) {
                // //console.log(treeCheckedNode);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        //物理排序
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

        // 修改角色
        $scope.toModify = function() {
            if ($scope.checked.length != 1) {
                // alert("Please Select One.");
                messageAlertService.alertFun('must');
            } else {
                $scope.isAdd = 'Modify';
                $scope.openEditDialog();
            };
        };

        //checkSysUser

        // $scope.checkSysUser = function() {

        // };

        //copy role
        $scope.copyRole = function() {
            if ($scope.checked.length != 1) {
                alert("Please select one and only select one!");
            } else {
                $scope.isAdd = 'copy';
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: "static",
                    templateUrl: 'app/pages/Authority/role/copyRoleModal.html',
                    controller: 'copyRoleModalCtrl',
                    size: 'md',
                    resolve: {
                        role: function() {
                            return $scope.checkedItems[0];
                        },
                        roleService: function() {
                            return roleService;
                        },
                        deps: ['$ocLazyLoad',
                            function($ocLazyLoad) {
                                return $ocLazyLoad.load(['app/pages/Authority/role/copyRoleModalCtrl.js']);
                            }
                        ]
                    }
                });

                //点击保存后执行

                modalInstance.result.then(function(newItems) {
                    // alert(newItems);
                    // // $scope.items.push(newItems);
                    $scope.checkedItems = [];
                    $scope.checked = [];
                    $scope.search();
                }, function(newItems) {
                    // //console.log(newItems);
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }

        //delete  需要优化！！！！
        $scope.deleteItem = function() {
            if ($scope.checked.length == 0) {
                // alert("Must Select one");
                messageAlertService.alertFun('must');
                return;
            } else {
                let idArr = [];
                for (let i = 0; i < $scope.checked.length; i++) {
                    const check = $scope.checked[i];
                    idArr.push(check);
                };
                let roleId_need = idArr.toString();

                //检验
                roleService.checkHasRoleAuth(roleId_need).success(function(res) {
                    if (res.data == true) {
                        roleService.checkSysUser(roleId_need).success(function(res) {
                            if (res.data == true) {
                                if (messageAlertService.confirmFun('sure')) {
                                    // //console.log($scope.checkedItems);
                                    roleService.deleteItem($scope.checked).success(function(response) {
                                        if (response.data == true && response.msg == '操作成功') {
                                            // alert('Success!');
                                            messageAlertService.successFun('success');
                                            $scope.checked = [];
                                            $scope.checkedItems = [];
                                            $scope.search();
                                        } else {
                                            // alert('Failed!');
                                            messageAlertService.successFun('failed');
                                            $scope.checked = [];
                                            $scope.checkedItems = [];
                                            $scope.search();
                                        }
                                    });

                                }
                            } else if (res.data == false) {
                                if (messageAlertService.roleFun('under')) {
                                    roleService.deleteItem(roleId_need).success(function(response) {
                                        if (response.data == true && response.msg == '操作成功') {
                                            // alert('Success!');
                                            messageAlertService.successFun('success');
                                            $scope.checked = [];
                                            $scope.checkedItems = [];
                                            $scope.search();
                                        } else {
                                            // alert(response.msg);
                                            messageAlertService.successFun('failed');
                                            $scope.checked = [];
                                            $scope.checkedItems = [];
                                            $scope.search();
                                        }
                                    });
                                } else {
                                    return
                                }
                            } else {
                                // alert('res.msg')
                                messageAlertService.successFun('failed');
                            }
                        });
                    } else {
                        // alert('The User has no authority!')
                        messageAlertService.authorityFun('no');
                    }
                })
            }
        };



        //add
        $scope.toAddItem = function() {
            $scope.isAdd = "Add";
            $scope.openEditDialog();
        };

        //getAreaTree
        $scope.getAreaTree = function() {
            if ($scope.checkedItems.length != 1) {
                // alert('Must Select One And Only Select One!')
                messageAlertService.alertFun('must');
            } else {

                roleService.checkHasRoleAuth($scope.checkedItems[0].id).success(function(res) {
                    if (res.data == true) {
                        $scope.isArea = 'Area';
                        $scope.openGetTreeModal();
                    } else {
                        // alert('The User has no authority!')
                        messageAlertService.authorityFun('no');
                    }

                });
            }
        };

        //启用
        $scope.openRole = function() {

            if ($scope.checked.length == 0) {
                // alert("Must Select One!");
                messageAlertService.alertFun('must');
                return;
            } else {
                //检验
                roleService.checkHasRoleAuth($scope.checkedItems[0].id).success(function(res) {
                    if (res.data == true) {
                        var roleIds = [];
                        var statusId = [];
                        for (var i = 0; i < $scope.items.length; i++) {
                            if ($scope.items[i].checked == true) {
                                roleIds[roleIds.length] = $scope.items[i].id;
                                statusId[statusId.length] = $scope.items[i].status;
                            }
                        };
                        if (messageAlertService.confirmFun('sure')) {
                            roleService.checkStatus(roleIds, statusId).success(function(response) {
                                if (response.data == true) {
                                    if (statusId == "0") {
                                        // alert("The selected role is already enabled!");
                                        messageAlertService.roleSelectFun('enabled');
                                    } else {
                                        statusId = "0";
                                        roleService.openRole(roleIds, statusId).success(function(res) {
                                            if (res.data == true) {
                                                // alert("Success！");
                                                messageAlertService.successFun('success');
                                                $scope.checkedItems = [];
                                                $scope.checked = [];
                                                $scope.search();
                                            } else {
                                                // alert("Failed! Please contact the administrator!");
                                                messageAlertService.successFun('failed');
                                            }
                                        });
                                    }
                                } else {
                                    // alert("Enable failed. The selected record cannot contain both enable and disable roles！");
                                    messageAlertService.roleSelectFun('failed');
                                }
                            });
                        }
                    } else {
                        // alert('The User has no authority!')
                        messageAlertService.authorityFun('no');
                    }

                })

            }
        };

        //停用
        $scope.stopRole = function() {

            if ($scope.checked.length == 0) {
                // alert("Must Select One");
                messageAlertService.alertFun('must');
                return;
            } else {
                //检验
                roleService.checkHasRoleAuth($scope.checkedItems[0].id).success(function(res) {
                    if (res.data == true) {
                        var roleIds = [];
                        var statusId = [];
                        for (var i = 0; i < $scope.items.length; i++) {
                            if ($scope.items[i].checked == true) {
                                roleIds[roleIds.length] = $scope.items[i].id;
                                statusId[statusId.length] = $scope.items[i].status;
                            }
                        };
                        if (messageAlertService.confirmFun('sure')) {
                            roleService.checkStatus(roleIds).success(function(response) {
                                if (response.data == true) {
                                    if (statusId == "1") {
                                        // alert("The selected role has been deactivated!");
                                        messageAlertService.roleSelectFun('');
                                    } else {
                                        statusId = "1";
                                        roleService.openRole(roleIds, statusId).success(function(res) {
                                            if (res.data == true) {
                                                // alert("Success!");
                                                messageAlertService.successFun('success');
                                                $scope.checkedItems = [];
                                                $scope.checked = [];
                                                $scope.search();
                                            } else {
                                                // alert("Failed! Please contact the administrator";
                                                messageAlertService.successFun('failed');
                                            }
                                        });
                                    }
                                } else {
                                    // alert("Deactivation failed. The selected record cannot contain both enable and disable roles！");
                                    messageAlertService.roleSelectFun('failed');
                                }
                            });
                        }
                    } else {
                        // alert('The User has no authority!')
                        messageAlertService.authorityFun('no');
                    }
                })
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

        //修改modal
        $scope.openEditDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/role/roleModal.html',
                controller: 'roleModalCtrl',
                size: 'md',
                resolve: {
                    role: function() {
                        return $scope.checkedItems[0];
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    roleService: function() {
                        return roleService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/Authority/role/roleModalCtrl.js']);
                        }
                    ]
                }
            });

            //点击保存后执行

            modalInstance.result.then(function(newItems) {
                // alert(newItems);
                // // $scope.items.push(newItems);
                $scope.checkedItems = [];
                $scope.checked = [];
                $scope.search();
            }, function(newItems) {
                // //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        /*******************************************************************
         * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
         ******************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage',
            getForm);


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