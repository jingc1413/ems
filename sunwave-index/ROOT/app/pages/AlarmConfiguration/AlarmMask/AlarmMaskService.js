// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmConfiguration.AlarmMask')
    .factory('AlarmMaskService', AlarmMaskService);

function AlarmMaskService($http) {
    // alert('service')
    /*查询*/

    var getAlarmMaskTree = function() {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/getAlarmMaskTree',
            method: "POST"
                // data:query

        });
    };
    var maskTreeSave = function(ids) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/updateAlarmMaskConfigs',
            method: "POST",
            params: {
                'ids': ids
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
    var searchContent = function(query) {
        // return $http.post('app/pages/PollingManagement/PollingTask/test.json',query);
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/masktask/search',
            method: "POST",
            data: query
        });
    };
    // var searchAlarmList = function() {
    //     return $http({
    //         url: Url + '/sunwave-alarm-management/alarm/almalarm/findAll',
    //         method: "POST"
    //     });
    // };

    var searchAlarmList = function(query) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/search',
            method: "POST",
            data: query
        });
    };

    var addContent = function(data) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/masktask/saveAlmMasktask',
            method: "POST",
            data: data
        });
    };
    var modifyContent = function(data) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/masktask/modifyAlmMasktask',
            method: "POST",
            data: data
        });
    };
    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/masktask/deleteAlmMasktaskByIds',
            method: "POST",
            data: ids
        });
    };

    var findAlmMasktaskById = function(ids) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/masktask/findAlmMasktaskById',
            method: "POST",
            params: {
                'id': ids
            }
        });
    };

    return {
        getAlarmMaskTree: function() {
            return getAlarmMaskTree();
        },
        maskTreeSave: function(ids) {
            return maskTreeSave(ids);
        },
        searchForPolling: function(query) {
            return searchForPolling(query);
        },
        searchContent: function(query) {
            return searchContent(query);
        },
        searchAlarmList: function(query) {
            return searchAlarmList(query);
        },
        addContent: function(data) {
            return addContent(data);
        },
        modifyContent: function(data) {
            return modifyContent(data);
        },
        deleteItem: function(ids) {
            return deleteItem(ids);
        },
        findAlmMasktaskById: function(ids) {
            return findAlmMasktaskById(ids);
        }

    };
}
// })();