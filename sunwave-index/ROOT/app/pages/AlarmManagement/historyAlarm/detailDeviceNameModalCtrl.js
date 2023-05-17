/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmManagement.historyAlarm', [])
    .controller('detailDeviceNameModalCtrl', detailDeviceNameModalCtrl);

function detailDeviceNameModalCtrl($scope, historyAlarmService) {


    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };
    //查询
    var searchForm = function() {

        historyAlarmService.searchModalContent()
            .success(function(response) {
                $scope.rows = response.contentModal;
            })
            .error(function(err) {
                console.info(err);
            });

    };
    searchForm();

}
// });