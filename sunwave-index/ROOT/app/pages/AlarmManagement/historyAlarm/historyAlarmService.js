// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmManagement.historyAlarm')
    .factory('historyAlarmService', historyAlarmService);

function historyAlarmService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/AlarmManagement/currentAlarm/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlogHistory/search',
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