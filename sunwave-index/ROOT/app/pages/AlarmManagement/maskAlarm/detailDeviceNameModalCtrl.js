/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmManagement.maskAlarm', [])
    .controller('detailDeviceNameModalCtrl', detailDeviceNameModalCtrl);

function detailDeviceNameModalCtrl($scope,maskAlarmService) {


    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };
    //查询
    var searchForm = function() {

        maskAlarmService.searchModalContent()
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