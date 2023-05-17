angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagment', [])
    .controller('restoreCtrl', restoreCtrl);

function restoreCtrl($rootScope, $scope, $filter, $uibModal, $log, ) {
    //console.log("restoreCtrl");
    $scope.isAdd = false;

    $scope.value = {
        value: "",
        name: ""
    }

    $scope.items = [{
            value: "222222221",
            name: "2",
        },
        {
            value: "22222222235",
            name: "1",

        }
    ]

    $scope.count = 0; //已选择数量
    $scope.checked = []; //选中的ID
    $scope.checkedItems = []; //选中的对象数组
    $scope.checkbox = {
        select_all: false
    }


    $scope.selectAll = function() {
        if ($scope.checkbox.select_all == true) {
            angular.forEach($scope.items, function(i) {
                i.checked = true;
                $scope.checked.push(i.name);
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

    $scope.selectOne = function() {
        $scope.checked = [];
        $scope.checkedItems = [];
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
        //console.log($scope.checked.length);
        //console.log($scope.items.length)
        if ($scope.items.length == $scope.checked.length) {
            $scope.checkbox.select_all = true;
        } else {
            $scope.checkbox.select_all = false;
        }
    };

    $scope.clearAll = function() {
        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
    };

    $scope.add = function() {
        $scope.isAdd = true;
    };

    $scope.edit = function() {
        if ($scope.checkedItems.length == 1) {
            $scope.isAdd = true;
            $scope.value = $scope.checkedItems[0]
        } else {
            // alert("Please selete one !")
            swal({
                title: "Tips:",
                text: "Please selete one  !",
                icon: "info",
                timer: 4000,
            });
        }

    };

    $scope.save = function() {
        $scope.isAdd = false;
    };


    // $scope.$watch(
    //     'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);


}