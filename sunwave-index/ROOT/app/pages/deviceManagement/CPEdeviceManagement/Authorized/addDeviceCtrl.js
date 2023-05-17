angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('addDeviceCtrl', addDeviceCtrl);

function addDeviceCtrl($rootScope, $scope, $filter, $uibModalInstance, $uibModal, $log, ) {

    $scope.title = "Add new device"

    $scope.modal = {
        logLevel: 0,
        time: 0
    }

    $scope.items = [{
            name: "sunwave.mt.test1"

        },
        {
            name: "sunwave.mt.test2"
        }
    ]



    $scope.checkbox = {
        select_all: ""
    }
    $scope.m = [];
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组

    $scope.selectOne = function() {
        //console.log
        angular.forEach($scope.items, function(i) {

            var index = $scope.checked.indexOf(i.name);

            if (i.checked && index == -1) {
                $scope.checked.push(i.name);

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


    $scope.selectItems = [];

    $scope.addSelect = function(a) {
        //console.log(a);
        $scope.$tabSetStatus.activeTab = 0;
        $scope.selectItems = $scope.checkedItems;
        //console.log($scope.selectItems)
    }

    $scope.removeSelect = function() {
        $scope.selectItems = [];
    }

    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.isWarn = true;
    $scope.selectPeriod = function() {
        var peroid = $scope.modal.logLevel;
        if (peroid == '0') {
            $scope.isWarn = true;
        } else {
            $scope.isWarn = false;
        }
    };

}