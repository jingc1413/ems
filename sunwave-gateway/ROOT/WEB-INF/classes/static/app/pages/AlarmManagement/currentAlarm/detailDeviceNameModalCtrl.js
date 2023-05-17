/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmManagement.currentAlarm', [])
    .controller('detailDeviceNameModalCtrl', detailDeviceNameModalCtrl);

function detailDeviceNameModalCtrl($scope,currentAlarmService) {


    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };
    //查询
    var searchForm = function() {

        currentAlarmService.searchModalContent()
        .success(function(response) {
            $scope.rows = response.contentModal;
        })
        .error(function(err){
            console.info(err);
        });

    };
    searchForm();

}
// });