angular.module('SunWave.pages.AlarmManagement.ServerAlarm')
    .factory('ServerAlarmService', ServerAlarmService);

function ServerAlarmService($http) {
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/search',
            method: "POST",
            data: query
        });
    };

    //修改
    var editContent = function(items) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/neComputer3/modifyNeComputer3',
            method: "POST",
            data: items
        });
    };
    //Add
    var addContent = function(items) {
        //return $http.post('app/pages/AlarmConfiguration/AlarmKindIds/test.json',items);
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/neComputer3/addNeComputer3',
            method: "POST",
            data: items
        });
    };

    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmkind/deleteAlarmKindByIds',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            // data:ids
            params: {
                'ids': ids
            }
        });
    };

    //判断所选择的告警是否可以做告警确认
    var checkAcknowledged = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/checkAckLog',
            method: "POST",
            params: {
                'ids': AlarmLogId
            }

        });
    };
    //告警确认
    var alarmConfirm = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/ackLog',
            method: "POST",
            params: {
                'ids': AlarmLogId
            }

        });
    };
    //告警取消确认判断
    var checkCancelConfirm = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/checkReactivedLog',
            method: "POST",
            params: {
                'ids': AlarmLogId
            }

        });
    };

    //告警取消
    var alarmCancel = function(AlarmLogId) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/reactivedLog',
            method: "POST",
            params: {
                'ids': AlarmLogId
            }

        });
    };
    //告警清除
    var clearAlarm = function(ids) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/clearLog',
            method: "POST",
            params: {
                'ids': ids
            }

        });
    };

    //告警清除判断
    var clearAlarmCheck = function(ids) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almSystemlog3/checkClearLog',
            method: "POST",
            params: {
                'ids': ids
            }

        });
    };

    return {
        search: function(query) { //创建
            return search(query);
        },

        editContent: function(items) {
            return editContent(items);
        },
        searchContent: function(query) {
            return searchContent(query);
        },
        addContent: function(items) {
            return addContent(items);
        },

        deleteItem: function(ids) {
            return deleteItem(ids);
        },
        checkAcknowledged: function(AlarmLogId) {
            return checkAcknowledged(AlarmLogId);
        },
        alarmConfirm: function(AlarmLogId) {
            return alarmConfirm(AlarmLogId);
        },
        checkCancelConfirm: function(AlarmLogId) {
            return checkCancelConfirm(AlarmLogId);
        },
        clearAlarm: function(ids) {
            return clearAlarm(ids);
        },
        alarmCancel: function(ids) {
            return alarmCancel(ids);
        },
        clearAlarmCheck: function(ids) {
            return clearAlarmCheck(ids);
        }
    };

}