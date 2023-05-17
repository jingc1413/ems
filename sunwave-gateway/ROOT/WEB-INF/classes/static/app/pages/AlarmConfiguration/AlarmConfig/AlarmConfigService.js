// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmConfiguration.AlarmConfig')
    .factory('AlarmConfigService', AlarmConfigService);

function AlarmConfigService($http) {

    var searchContent = function(query) {
        // return $http.post('app/pages/AlarmConfiguration/AlarmConfig/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/search',
            method: "POST",
            data: query

        });
    };
    // var getAlarmLevel = function() {
    //     // return $http.post('app/pages/AlarmConfiguration/AlarmConfig/test.json');
    //     return $http({
    //         url: Url + '/sunwave-alarm-management/alarm/alarmlevel/findAll',
    //         method: "POST"

    //     });
    // };

    // var getAlarmKind = function() {
    //     // return $http.post('app/pages/AlarmConfiguration/AlarmConfig/test.json');
    //     return $http({
    //         url: Url + '/sunwave-alarm-management/alarm/alarmkind/findAll',
    //         method: "POST"

    //     });
    // };
    var editContent = function(almAlarm) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/modifyAlmAlarm',
            method: "POST",
            data: almAlarm

        });
    }

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        // getAlarmLevel: function() {
        //     return getAlarmLevel();
        // },
        // getAlarmKind: function() {
        //     return getAlarmKind();
        // },
        editContent: function(almAlarm) {
            return editContent(almAlarm);
        }
    };
}
// })();