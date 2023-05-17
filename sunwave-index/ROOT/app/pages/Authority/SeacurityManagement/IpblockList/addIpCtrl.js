/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.Authority.SeacurityManagement.IpblockList', [])
    .controller('addIpCtrl', addIpCtrl);

function addIpCtrl($rootScope, $scope, isAdd, transmitModalItems, IpblockListService, $uibModalInstance, messageAlertService) {

    $scope.transmitModalItems = transmitModalItems;

    $scope.modal = {
        beginIp: "",
        endIp: ""
    };

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        // $scope.title = 'Add';
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
        $scope.isView = true;
    } else if ($scope.isAdd == 'Modify') {
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '编辑'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.isView = true;
        $scope.modal = $scope.transmitModalItems;
    } else {
        // $scope.title = "View";
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        };
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
                    if (response.code == 200 && response.error == undefined) {
                        // alert('Success!');
                        messageAlertService.successFun('success');
                        $scope.close(newItems);
                    } else {
                        // alert('Failed!');
                        messageAlertService.successFun('failed', response.msg);
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
                    if (response.code == 200 && response.error == undefined) {
                        // alert('Success!');
                        messageAlertService.successFun('success');
                        $scope.close(newItems);
                    } else {
                        // alert('Failed!');
                        messageAlertService.successFun('failed', response.msg);
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