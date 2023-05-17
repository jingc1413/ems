angular.module('SunWave.pages.upgradeManagement.batchUpgrade')
    .factory('batchUpgradeService', batchUpgradeService);

function batchUpgradeService($http) {

    var searchContent = function(query) {
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/searchUpgrade',
            method: "POST",
            data: query
        });
    };

    // var modifyPollTask = function(duration, fileId, neIds, objSetParam, objSetParamValue, objectIdAlarm, objectIdAlarmEn, objectIdBase, objectIdRadio, tskFilter, tskIsuse, tskNexttime, tskPeriod, tskStyle, tskTaskid, tskTaskname) {
    //     // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
    //     return $http({
    //         url: Url + '/sunwave-device-management/pollTask/task/modifyPollTask',
    //         method: "POST",
    //         // fileId, neIds, objSetParam, objSetParamValue, objSetValueKey,
    //         //objectIdAlarm, objectIdAlarmEn,objectIdBase, objectIdRadio, tskFilter,
    //         //tskIsuse,tskPeriod,tskStyle,tskTaskid ,tskTaskname
    //         params: {
    //             'duration': duration,
    //             'fileId': fileId,
    //             'neIds': neIds,
    //             'objSetParam': objSetParam,
    //             'objSetParamValue': objSetParamValue,
    //             // 'objSetValueKey': objSetValueKey,
    //             'objectIdAlarm': objectIdAlarm,
    //             'objectIdAlarmEn': objectIdAlarmEn,
    //             'objectIdBase': objectIdBase,
    //             'objectIdRadio': objectIdRadio,
    //             'tskFilter': tskFilter,
    //             'tskIsuse': tskIsuse,
    //             'tskNexttime': tskNexttime,
    //             'tskPeriod': tskPeriod,
    //             'tskStyle': tskStyle,
    //             'tskTaskid': tskTaskid,
    //             'tskTaskname': tskTaskname
    //         }
    //     });
    // };

    var modifyPollTask = function(data) {
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/modifyPollTask',
            method: "POST",
            data: data
        });
    };

    var deleteItem = function(state, tskTaskid) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/deleteManTask',
            method: "POST",
            params: {
                'state': state,
                'tskTaskids': tskTaskid
            }
        });
    };


    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        modifyPollTask: function(data) {
            return modifyPollTask(data);
        },
        deleteItem: function(state, tskTaskid) {
            return deleteItem(state, tskTaskid);
        }
    };


}