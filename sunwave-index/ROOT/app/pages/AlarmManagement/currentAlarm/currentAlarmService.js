// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmManagement.currentAlarm')
    .factory('currentAlarmService', currentAlarmService);

function currentAlarmService($http) {
    // alert('service')
    /*查询*/
    var searchContent = function(query) {
        // return $http.post('app/pages/AlarmManagement/currentAlarm/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/search',
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
    //判断所选择的告警是否可以做告警确认
    var checkAcknowledged = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/checkAcknowledged',
            method: "POST",
            params: {
                'algAlarmlogids': AlarmLogId
            }

        });
    };
    //告警确认
    var alarmConfirm = function(AlarmLogId, AlarmStatus) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/alarmConfirm',
            method: "POST",
            params: {
                'algAlarmlogids': AlarmLogId,
                'algAlarmstatusId': AlarmStatus,
            }

        });
    };
    //告警取消确认判断
    var checkCancelConfirm = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/checkCancelConfirm',
            method: "POST",
            params: {
                'algAlarmlogids': AlarmLogId
            }

        });
    };
    //取消确认
    var cancelConfirm = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/cancelConfirm',
            method: "POST",
            params: {
                'algAlarmlogids': AlarmLogId
            }

        });
    };
    //清除check
    var checkClear = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/checkClear',
            method: "POST",
            params: {
                'algAlarmlogids': AlarmLogId
            }

        });
    };

    //mask告警清除
    var clearMask = function(AlarmLogId, AlarmStatus) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlogMask/alarmOperate',
            method: "POST",
            params: {
                'algAlarmlogids': AlarmLogId,
                'algAlarmstatusId': AlarmStatus,
            }

        });
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
        },
        checkAcknowledged: function(AlarmLogId) {
            return checkAcknowledged(AlarmLogId);
        },
        alarmConfirm: function(AlarmLogId, AlarmStatus) {
            return alarmConfirm(AlarmLogId, AlarmStatus);
        },
        checkCancelConfirm: function(AlarmLogId) {
            return checkCancelConfirm(AlarmLogId);
        },
        cancelConfirm: function(AlarmLogId) {
            return cancelConfirm(AlarmLogId);
        },
        checkClear: function(AlarmLogId) {
            return checkClear(AlarmLogId);
        },
        clearMask: function(AlarmLogId, AlarmStatus) {
            return clearMask(AlarmLogId, AlarmStatus);
        }
    };
}
// })();