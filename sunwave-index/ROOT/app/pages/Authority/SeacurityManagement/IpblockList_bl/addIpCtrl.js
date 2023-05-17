/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.Authority.SeacurityManagement.IpblockList_bl', [])
    .controller('addIpCtrl', addIpCtrl);

function addIpCtrl($scope, isAdd, transmitModalItems, IpblockListService, $uibModalInstance) {

    $scope.transmitModalItems = transmitModalItems;

    $scope.modal = {
        beginIp: "",
        endIp: ""
    };

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        $scope.title = 'Add';
        $scope.isView = true;
    } else if ($scope.isAdd == 'Modify') {
        $scope.title = "Modify";
        $scope.isView = true;
        $scope.modal = $scope.transmitModalItems;
    } else {
        $scope.title = "View";
        $scope.isView = false;
        $scope.modal = $scope.transmitModalItems;

    };

    $scope.save = function() {

        var newItems = {};
        newItems = $scope.modal;
        if ($scope.isAdd == 'Add') {
            IpblockListService.addContent(newItems)
                .success(function(response) {
                    // if (response.data == true) {
                    if (response.msg == '操作成功' && response.error == undefined) {
                        alert('Success!');
                        $scope.close(newItems);
                    } else {
                        alert('Failed!');
                        return
                    }

                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'Modify') {
            newItems = $scope.modal;
            IpblockListService.modifyContent(newItems)
                .success(function(response) {
                    if (response.msg == '操作成功' && response.error == undefined) {
                        alert('Success!');
                        $scope.close(newItems);
                    } else {
                        alert('Failed!');
                        return
                    }
                })
                .error(function(err) {
                    console.info(err);
                });

        }

    };


    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}