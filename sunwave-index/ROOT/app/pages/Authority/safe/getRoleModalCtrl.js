angular.module('SunWave.pages.Authority.safe', ['SunWave.pages.Authority.role'])
    .controller('getRoleModalCtrl', getRoleModalCtrl);

function getRoleModalCtrl($scope, item, add, safeService, roleService, messageAlertService, $uibModalInstance) {

    $scope.xx = {
        select_all: ""
    };

    $scope.add = add;

    if ($scope.add == 'add') {
        // $scope.item = item;
        // $scope.sysroleSet = $scope.item.sysroleSet;
    } else if ($scope.add == 'authority' || $scope.add == 'modify') {
        $scope.item = item;
        $scope.sysroleSet = $scope.item.sysroleSet;
    };

    $scope.query = { //查询信息
        pageIndex: 0,
        pageSize: 10,
        name: "",
        keyword: "",
        status: 0
    };


    $scope.search = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

        if ($scope.add == 'add') {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            safeService.getAuthRoleList($scope.query).success(function(res) {
                $scope.paginationConf.totalItems = res.data.totalElements;
                $scope.rows = res.data.content;
                // $scope.rows = res.data;

            })

        } else {
            safeService.getAuthRoleList($scope.query).success(function(res) {
                $scope.paginationConf.totalItems = res.data.totalElements;
                $scope.rows = res.data.content;
                var o = 0;
                if ($scope.checkedItems) {
                    for (let index = 0; index < $scope.rows.length; index++) {
                        for (let i = 0; i < $scope.checkedItems.length; i++) {
                            if ($scope.checkedItems[i].id == $scope.rows[index].id) {
                                $scope.rows[index].checked = true;
                                o++;
                            }

                        }

                    }
                    if ($scope.rows.length == o) {
                        $scope.xx.select_all = true;

                    } else {
                        $scope.xx.select_all = false;

                    }

                }

            })
        }

    };

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    for (let j = 0; j < $scope.sysroleSet.length; j++) {
        $scope.checked.push($scope.sysroleSet[j].id);
        $scope.checkedItems.push($scope.sysroleSet[j]);
    };

    //全选（取消全选
    $scope.selectAll = function() {

        angular.forEach($scope.rows, function(i) {
            var index = $scope.checked.indexOf(i.id);
            if ($scope.xx.select_all == true) {

                if (index == -1) {
                    i.checked = true;
                    $scope.checked.push(i.id);
                    $scope.checkedItems.push(i);
                }
            } else {
                if (index !== -1) {
                    i.checked = false;
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                }
            }

        });
        // if ($scope.xx.select_all == true) {
        // $scope.checked = [];
        // $scope.checkedItems = [];
        //     angular.forEach($scope.rows, function(i) {
        //         i.checked = true;
        //         $scope.checked.push(i.id);
        //         $scope.checkedItems.push(i);
        //     });
        // } else {
        //     angular.forEach($scope.rows, function(i) {
        //         i.checked = false;
        //         $scope.checked.splice(i, 1);
        //         $scope.checkedItems.splice(i, 1);
        // $scope.checked = [];
        // $scope.checkedItems = [];
        // });
        // }
        //console.log($scope.checked);
    };
    //单选
    $scope.selectOne = function() {
        angular.forEach($scope.rows, function(i) {

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


        // if ($scope.rows.length == $scope.checked.length) {
        //     $scope.xx.select_all = true;
        // } else {
        //     $scope.xx.select_all = false;
        // }
        var k = 0;
        for (let i = 0; i < $scope.rows.length; i++) {
            if ($scope.rows[i].checked == true) {
                k++;
            }
            if (k == $scope.rows.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
        };

    }

    // 配置分页基本参数
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 10,
        pagesLength: 10,
        perPageOptions: [5, 10, 20, 30, 40, 50]

    };


    /*******************************************************************
     * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
     ******************************************************************/
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search);

    $scope.save = function() {

        // angular.forEach($scope.rows, function(i) {

        //     var index = $scope.checked.indexOf(i.id);
        //     if (i.checked && index == -1) {
        //         $scope.checked.push(i.id);
        //         $scope.checkedItems.push(i);
        //     };
        // });
        if ($scope.checkedItems.length == 0) {
            // alert('Must Select!')
            messageAlertService.alertFun('must');
        } else {
            if ($scope.add == 'add' || $scope.add == 'modify') {
                var newItems = {};
                newItems.sysroleSet = $scope.checkedItems;
                $uibModalInstance.close(newItems);
            } else if ($scope.add == 'authority') {

                var newItems = $scope.item;

                newItems.sysroleSet = $scope.checkedItems;
                safeService.editContent(newItems).success(function(res) {
                    if (res.error == null && res.error == undefined) {
                        // alert('Success!');
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert('Failed!')
                        messageAlertService.successFun('failed');
                    }
                }).error(function(err) {
                    //console.log(err)
                })
            }

        }
    };

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}