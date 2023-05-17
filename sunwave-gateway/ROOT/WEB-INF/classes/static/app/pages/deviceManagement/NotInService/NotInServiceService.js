angular.module('SunWave.pages.deviceManagement.NotInService')
    .factory('NotInServiceService', NotInServiceService);

function NotInServiceService($http) {

    var searchContent = function(query) {
        // return $http.post('app/pages/LogManagement/deviceLog/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/searchMonitor',
            method: "POST",
            data: query
        });
    };
    var searchModalContent = function() {
        return $http.post('app/pages/AlarmManagement/currentAlarm/test.json');
    };
    var getCityAndCounty = function() {
        return $http.post('app/pages/deviceManagement/deviceList/test.json');
    };
    var deleteItem = function(neids) {
        // return $http.post('app/pages/LogManagement/deviceLog/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/deleteDeviceLogic',
            method: "POST",
            params: {
                "neIds": neids
            }
        });
    };
    var checkElementIntegrity = function(neids) {
        // return $http.post('app/pages/LogManagement/deviceLog/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/checkElementIntegrity',
            method: "POST",
            params: {
                "neIds": neids
            }
        });
    };
    // var updateStatus = function(neids) {
    //     // return $http.post('app/pages/LogManagement/deviceLog/test.json');
    //     return $http({
    //         url: Url + '/sunwave-device-management/device/neElement/updateStatus',
    //         method: "POST",
    //         data: neids
    //     });
    // };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchModalContent: function() {
            return searchModalContent();
        },
        getCityAndCounty: function() {
            return getCityAndCounty();
        },
        deleteItem: function(neids) {
            return deleteItem(neids);
        },
        checkElementIntegrity: function(neids) {
            return checkElementIntegrity(neids);
        },
        // updateStatus: function(devicestatus, neIds, toFlag) {
        //     return deleteItem(devicestatus, neIds, toFlag);
        // }
    };
}