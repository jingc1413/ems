angular.module('SunWave.pages.AlarmConfiguration.AlarmLevel')
    .factory('AlarmLevelService', AlarmLevelService);

function AlarmLevelService($http) {

    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlevel/search',
            method: "POST",
            data: query

        });
    };

    var findAll = function() {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlevel/findAll',
            method: "POST"
        });
    };
    var modifyContent = function(alarmLevel) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlevel/modifyAlarmLevel',
            method: "POST",
            data: alarmLevel

        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        findAll: function() {
            return findAll();
        },
        modifyContent: function(alarmLevel) {
            return modifyContent(alarmLevel);
        }
    };
}