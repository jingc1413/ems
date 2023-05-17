angular.module('SunWave.pages.Authority.safe', ['SunWave.pages.Authority.role'])
    .controller('getRoleModalCtrl', getRoleModalCtrl);

function getRoleModalCtrl($scope, item, add, safeService, roleService, $uibModalInstance) {

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
        keyword: ""
    };


    $scope.search = function() {
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

        if ($scope.add == 'add') {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            safeService.getAuthRoleList($scope.query).success(function(res) {
                $scope.paginationConf.totalItems = res.data.totalElements;
                // $scope.rows = res.data.content;
                $scope.rows = res.data;
            })

        } else {
            safeService.getAuthRoleList($scope.query).success(function(res) {
                $scope.paginationConf.totalItems = res.data.totalElements;

                //将传进来的item选中
                // $scope.beforRows = res.data.content;
                $scope.beforRows = res.data;
                for (let i = 0; i < $scope.beforRows.length; i++) {
                    for (let j = 0; j < $scope.sysroleSet.length; j++) {
                        if ($scope.sysroleSet[j].id == $scope.beforRows[i].id) {
                            $scope.beforRows[i].checked = true;
                        }
                    }
                };
                $scope.rows = $scope.beforRows;
            })
        }

    };

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    //全选（取消全选
    $scope.selectAll = function() {
        if ($scope.xx.select_all == true) {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                i.checked = true;
                $scope.checked.push(i.id);
                $scope.checkedItems.push(i);
            });
        } else {
            angular.forEach($scope.rows, function(i) {
                i.checked = false;
                $scope.checked = [];
                $scope.checkedItems = [];
            });
        }
        console.log($scope.checked);
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
        console.log($scope.checkedItems);


        if ($scope.rows.length == $scope.checked.length) {
            $scope.xx.select_all = true;
        } else {
            $scope.xx.select_all = false;
        }
    };

    // 配置分页基本参数
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [10, 20, 30, 40, 50]

    };


    /*******************************************************************
     * 当页码和页面记录数发生变化时监控后台查询 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
     ******************************************************************/
    $scope.$watch(
        'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.search());

    $scope.save = function() {

        if ($scope.checkedItems.length == 0) {
            alert('Must Select!')
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
                        alert('Success!');
                        $scope.close();
                    } else {
                        alert('Failed!')
                    }
                }).error(function(err) {
                    console.log(err)
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