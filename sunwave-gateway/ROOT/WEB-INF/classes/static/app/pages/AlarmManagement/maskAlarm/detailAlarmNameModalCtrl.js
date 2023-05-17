
angular.module('SunWave.pages.AlarmManagement.maskAlarm', [])
.controller('detailAlarmNameModalCtrl', detailAlarmNameModalCtrl);

function detailAlarmNameModalCtrl($scope,transmitModalItems) {

$scope.modal={
    AlarmName:"",
    AlarmLevel:"",
    AlarmTimes:"",
    AlarmTime:"",
    AlarmDurations:"",
    DeviceID:"",
    DeviceSubID:"",
    DeviceName:"",
    VendorName:"",
    City:"",
    County:"",
    DeviceLevel:"",
    AlarmStatus:"",
    AlarmType:"",
    DeviceStatus:""
}

console.log('modal的id是'+transmitModalItems.id);
$scope.modal = transmitModalItems;

$scope.close = function(transmitModalItems) {
    $uibModalInstance.close(selectAlarmNameDetail);
};
//查询
// var searchForm = function() {

//     historyAlarmService.searchModalAlarmNameContent()
//     .success(function(response) {
//         $scope.rows = response.AlarmNameModalContent;
//     })
//     .error(function(err){
//         console.info(err);
//     });

// };
// searchForm();

}