// (function() {
//     'use strict';

angular.module('SunWave.pages.PollingManagement.PollingTask')
    .factory('PollingTaskService', PollingTaskService);

function PollingTaskService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/searchPoll',
            method: "POST",
            data: query
        });
    };
    var searchBatchQuery = function(query) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/pollTask/queryTask/findNeObjectslistBatchPage',
            method: "POST",
            data: query
        });
    };

    var searchBatchDesign = function(query) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/pollTask/queryTask/finddatchTaskSetByCon',
            method: "POST",
            data: query
        });
    };
    // var savePollTaskElements = function(duration, fileId, neIds, objSetParam, objSetParamValue, objectIdAlarm, objectIdAlarmEn, objectIdBase, objectIdRadio, tskFilter, tskIsuse, tskNexttime, tskPeriod, tskStyle, tskTaskname) {
    //     // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
    //     return $http({
    //         url: Url + '/sunwave-device-management/pollTask/task/savePollTaskElements',
    //         method: "POST",
    //         // fileId, neIds, objSetParam, objSetParamValue, objSetValueKey,
    //         //objectIdAlarm, objectIdAlarmEn,objectIdBase, objectIdRadio, tskFilter,
    //         //tskIsuse,tskPeriod,tskStyle,tskTaskname
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
    //             'tskTaskname': tskTaskname,

    //         }
    //     });
    // };
    var savePollTaskElements = function(data) {
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/savePollTaskElements',
            method: "POST",
            data: data
        });
    };

    // var modifyPollTaskElements = function(duration, fileId, neIds, objSetParam, objSetParamValue, objectIdAlarm, objectIdAlarmEn, objectIdBase, objectIdRadio, tskFilter, tskIsuse, tskNexttime, tskPeriod, tskStyle, tskTaskid, tskTaskname) {
    //     // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
    //     return $http({
    //         url: Url + '/sunwave-device-management/pollTask/task/modifyPollTaskElements',
    //         method: "POST",
    //         // fileId, neIds, objSetParam, objSetParamValue, objSetValueKey,
    //         //objectIdAlarm, objectIdAlarmEn,objectIdBase, objectIdRadio, tskFilter,
    //         //tskIsuse,tskPeriod,tskStyle,tskTaskname
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
    var modifyPollTaskElements = function(data) {
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/modifyPollTaskElements',
            method: "POST",
            data: data
        });
    };

    var findByTaskId = function(taskId) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/findByTaskId',
            method: "POST",
            params: {
                'taskId': taskId
            }
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

    var stateChangeTaskById = function(state, taskIds) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/pollTask/task/stateChangeTaskById',
            method: "POST",
            params: {
                'state': state,
                'taskIds': taskIds
            }
        });
    };

    var searchForPolling = function(query) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/searchForPolling',
            method: "POST",
            data: query
        });
    };

    //右边列表查询
    var findByIds = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/findByIds',
            method: "POST",
            data: JSON.stringify(ids),
            contentType: 'application/json;charset=utf-8',
            // params: {
            //     'ids': ids
            // }
        });
    };

    //params右边列表查询
    var findParamsByIds = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/pollTask/queryTask/findNeObjectslistBatchSelectedPage',
            method: "POST",
            // data: JSON.stringify(ids),
            // contentType: 'application/json;charset=utf-8',
            params: {
                'objIds': ids
            }
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchBatchQuery: function(query) {
            return searchBatchQuery(query);
        },
        searchBatchDesign: function(query) {
            return searchBatchDesign(query);
        },
        savePollTaskElements: function(data) {
            return savePollTaskElements(data);
        },
        modifyPollTaskElements: function(data) {
            return modifyPollTaskElements(data);
        },
        findByTaskId: function(taskId) {
            return findByTaskId(taskId);
        },
        deleteItem: function(state, tskTaskid) {
            return deleteItem(state, tskTaskid);
        },
        stateChangeTaskById: function(state, taskIds) {
            return stateChangeTaskById(state, taskIds);
        },
        searchForPolling: function(query) {
            return searchForPolling(query);
        },
        findByIds: function(ids) {
            return findByIds(ids);
        },
        findParamsByIds: function(ids) {
            return findParamsByIds(ids);
        }

    };


}
// })();