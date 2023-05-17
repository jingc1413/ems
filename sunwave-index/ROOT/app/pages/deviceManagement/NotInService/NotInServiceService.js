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

    var getNeElementByFile = function(items) {
        return $http({
            url: Urltest + '/sunwave-device-management/device/neElement/getNeElementByFile',
            method: "POST",
            headers: { 'Content-Type': undefined },
            data: items
        });
    };


    var batchModify = function(items) {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            // url: Url + '/sunwave-device-management/device/neElement/modifyNeElementsBy2Id',
            url: Urltest + '/sunwave-device-management/device/neElement/modifyNeElementsBy2Id',
            method: "POST",
            data: items
        });
    };

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
        batchModify: function(items) {
            return batchModify(items);
        },
        getNeElementByFile: function(items) {
            return getNeElementByFile(items);
        }
    };
}