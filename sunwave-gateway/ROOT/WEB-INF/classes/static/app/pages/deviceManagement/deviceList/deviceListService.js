// (function() {
//     'use strict';

angular.module('SunWave.pages.deviceManagement.deviceList')
    .factory('deviceListService', deviceListService);

function deviceListService($http) {

    var searchContent = function(query) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/search',
            method: "POST",
            data: query
        });
    };

    var searchDeviceType = function() {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/type/findAll',
            method: "POST",
            // data:query
        });
    };

    var addNe = function(items) {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/addElements',
            method: "POST",
            data: items
        });
    };
    var editNe = function(items) {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/modifyElements',
            method: "POST",
            data: items
        });
    };

    var searchDeviceLevel = function() {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/level/findAll',
            method: "POST",
        });
    };

    var deviceStatuss = function() {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/status/findAll',
            method: "POST",
            // data:query
        });
    };
    //findAll
    var findAll = function() {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-application-platform/api/company/all',
            method: "GET",
        });
    };
    var obtainBasicInfo = function(neid, type) {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/obtainBasicInfo',
            method: "POST",
            params: {
                'neId': neid,
                'type': type
            }
        });
    };
    var obtainAlarmInfo = function(neid) {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/obtainAlarmInfo',
            method: "POST",
            params: {
                'neId': neid
            }
        });
    };
    var obtainRadioInfo = function(neid, type) {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/obtainRadioInfo',
            method: "POST",
            params: {
                'neId': neid,
                'type': type
            }
        });
    };
    var queryDevice = function(comWindowId, devicetypeId, neDeviceIP, neDevicePort, neId, neQryCommtypeId, neQryRepeaterId) {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/queryDevice',
            method: "POST",
            params: {
                'comWindowId': comWindowId,
                'devicetypeId': devicetypeId,
                'neDeviceIP': neDeviceIP,
                'neDevicePort': neDevicePort,
                'neId': neId,
                'neQryCommtypeId': neQryCommtypeId,
                'neQryRepeaterId': neQryRepeaterId
            }
        });
    };

    var getStatus = function() {
        return $http({
            url: Url + '/sunwave-device-management/device/status/findAll',
            method: "POST",
            // data: queryItems
        });
    };
    //设备状态转移
    var updateStatus = function(devicestatus, neIds, toFlag) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/updateStatus',
            method: "POST",
            params: {
                'devicestatus': devicestatus,
                'neIds': neIds,
                'toFlag': toFlag
            }
        });
    };
    //转移后删除
    var deleteDeviceLogic = function(neIds) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/deleteDeviceLogic',
            method: "POST",
            params: {
                'neIds': neIds
            }
        });
    };
    //检验状态转移前是否存在告警
    var checkAlmMaskByNeIds = function(flagNum, neIds) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/checkAlmMaskByNeIds',
            method: "POST",
            params: {
                'flagNum': flagNum,
                'neIds': neIds
            }
        });
    };

    //导出
    var exportList = function(query) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/export',
            method: "POST",
            headers: {
                'responseType': 'arraybuffer'
            },
            data: query
        });
    };

    //queryBase
    var queryBase = function(neId, objids, windowId) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/queryParams',
            method: "POST",
            params: {
                'neId': neId,
                'objids': objids,
                'windowId': windowId
            }
        });
    };
    //setBase
    var setBase = function(neId, objValues, objids, qryNumber, windowId) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/sendSetParams',
            method: "POST",
            params: {
                'neId': neId,
                'objValues': objValues,
                'objids': objids,
                'qryNumber': qryNumber,
                'windowId': windowId
            }
        });
    };
    //monitorBase
    var monitorBase = function(neId, objids, windowId) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/queryParams',
            method: "POST",
            params: {
                'neId': neId,
                'objids': objids,
                'windowId': windowId
            }
        });
    };

    //commtype获取
    var getCommtype = function() {
        return $http({
            url: Url + '/sunwave-device-management/device/sysCommtype/findAll',
            method: "POST"
        });
    };

    //type all
    var searchDeviceTypeAll = function() {
        return $http({
            url: Url + '/sunwave-device-management/device/typeclassify/findAll',
            method: "POST"
        });
    };

    // var checkElementIntegrity = function(ids) {
    //     return $http({
    //         url: Url + '/sunwave-device-management/device/neElement/checkElementIntegrity',
    //         method: "POST",
    //         params: {
    //             'neId': ids
    //         }
    //     });
    // }

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchDeviceType: function() {
            return searchDeviceType();
        },
        addNe: function(items) {
            return addNe(items);
        },
        editNe: function(items) {
            return editNe(items);
        },
        deviceStatuss: function() {
            return deviceStatuss();
        },
        searchDeviceLevel: function() {
            return searchDeviceLevel();
        },
        findAll: function() {
            return findAll();
        },
        obtainBasicInfo: function(neid, type) {
            return obtainBasicInfo(neid, type);
        },
        obtainAlarmInfo: function(neid) {
            return obtainAlarmInfo(neid);
        },
        obtainRadioInfo: function(neid, type) {
            return obtainRadioInfo(neid, type);
        },
        queryDevice: function(comWindowId, devicetypeId, neDeviceIP, neDevicePort, neId, neQryCommtypeId, neQryRepeaterId) {
            return queryDevice(comWindowId, devicetypeId, neDeviceIP, neDevicePort, neId, neQryCommtypeId, neQryRepeaterId);
        },
        getStatus: function() {
            return getStatus();
        },
        updateStatus: function(devicestatus, neIds, toFlag) {
            return updateStatus(devicestatus, neIds, toFlag);
        },
        deleteDeviceLogic: function(neIds) {
            return deleteDeviceLogic(neIds);
        },
        checkAlmMaskByNeIds: function(flagNum, neIds) {
            return checkAlmMaskByNeIds(flagNum, neIds);
        },
        exportList: function(query) {
            return exportList(query);
        },
        queryBase: function(neId, objids, windowId) {
            return queryBase(neId, objids, windowId);
        },
        setBase: function(neId, objValues, objids, qryNumber, windowId) {
            return setBase(neId, objValues, objids, qryNumber, windowId);
        },
        monitorBase: function(neId, objids, windowId) {
            return monitorBase(neId, objids, windowId);
        },
        getCommtype: function() {
            return getCommtype();
        },
        searchDeviceTypeAll: function() {
            return searchDeviceTypeAll();
        },
        // checkElementIntegrity: function(ids) {
        //     return checkElementIntegrity(ids);
        // }
    };
}
// })();