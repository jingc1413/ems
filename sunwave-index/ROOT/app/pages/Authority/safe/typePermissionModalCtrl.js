angular.module('SunWave.pages.Authority.safe', ['SunWave.pages.Authority.role'])
    .controller('typePermissionModalCtrl', typePermissionModalCtrl);

function typePermissionModalCtrl($scope, item, safeService, messageAlertService, $uibModalInstance, deviceListService) {

    $scope.xx = {
        select_all: ""
    };

    $scope.title = 'Device Type Authorization';

    $scope.query = { //查询信息

    };

    $scope.item = item;


    $scope.search = function() {
        // $scope.query.pageIndex = $scope.paginationConf.currentPage;
        // $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        deviceListService.searchDeviceType().success(function(res) {
            // $scope.paginationConf.totalItems = res.data.totalElements;
            // $scope.rows = res.data.content;
            $scope.rows = res.data;
            for (let i = 0; i < $scope.rows.length; i++) {
                const row = $scope.rows[i];
                for (let j = 0; j < $scope.item.neDevicetypeSet.length; j++) {
                    const item = $scope.item.neDevicetypeSet[j];
                    if (row.dtpDevicetypeid == item.dtpDevicetypeid) {
                        row.checked = true;
                        if ($scope.item.neDevicetypeSet.length == $scope.rows.length) {
                            $scope.xx.select_all = true;
                        }
                    }
                }
            }
        })
    };
    $scope.search();

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
                $scope.checked.push(i.dtpDevicetypeid);
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
    //单选
    $scope.selectOne = function() {
        angular.forEach($scope.rows, function(i) {

            var index = $scope.checked.indexOf(i.dtpDevicetypeid);
            if (i.checked && index == -1) {
                $scope.checked.push(i.dtpDevicetypeid);
                $scope.checkedItems.push(i);
            } else if (!i.checked && index !== -1) {
                $scope.checked.splice(index, 1);
                $scope.checkedItems.splice(index, 1);
            };
        });
        //console.log($scope.checkedItems);


        if ($scope.rows.length == $scope.checked.length) {
            $scope.xx.select_all = true;
        } else {
            $scope.xx.select_all = false;
        }
    };

    $scope.save = function() {
        let flag = false;
        for (let i = 0; i < $scope.rows.length; i++) {
            const el = $scope.rows[i];
            if (el.checked == true) {
                $scope.checked.push(el.dtpDevicetypeid);
                $scope.checkedItems.push(el);
                flag = true;
            }
        };
        if (flag == 0) {
            // alert('Must Select!')
            messageAlertService.alertFun('must');
        } else {
            var newItems = {};
            newItems = item;
            newItems.neDevicetypeSet = $scope.checkedItems;
            safeService.editContent(newItems).success(function(res) {
                if (res.error == undefined) {
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

    };

    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}