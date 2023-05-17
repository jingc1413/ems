// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmManagement.maskAlarm')
    .factory('maskAlarmService', maskAlarmService);

function maskAlarmService($http) {

    var searchContent = function(query) {
        // return $http.post('app/pages/AlarmManagement/currentAlarm/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlogMask/search',
            method: "POST",
            data: query
        });
    };
    var searchModalContent = function() {
        return $http.post('app/pages/AlarmManagement/currentAlarm/test.json');
    };
    var getItem = function(id) {
        return $http.post('app/pages/AlarmManagement/currentAlarm/test.json', id);
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchModalContent: function() {
            return searchModalContent();
        },
        getItem: function(id) {
            return getItem(id);
        }
    };
}
// })();