/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.Authority.SeacurityManagement.seacurityRules', [])
    .controller('addIpCtrl', addIpCtrl);

function addIpCtrl($scope, isAdd, transmitModalItems, seacurityRulesService, $uibModalInstance) {

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
            seacurityRulesService.addContent(newItems)
                .success(function(response) {
                    // if (response.data == true) {
                    alert(response.msg);
                    $scope.close(newItems);
                    // } else {
                    //     alert(response.msg);
                    // }

                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'Modify') {
            newItems = $scope.modal;
            seacurityRulesService.modifyContent(newItems)
                .success(function(response) {
                    // if (response.data == true) {
                    alert(response.msg);
                    $scope.close(newItems);
                    // } else {
                    //     alert(response.msg);
                    // }

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