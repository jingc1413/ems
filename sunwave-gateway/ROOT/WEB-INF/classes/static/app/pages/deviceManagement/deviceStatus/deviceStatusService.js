angular.module('SunWave.pages.deviceManagement.deviceStatus')
    .factory('deviceStatusService', deviceStatusService);

function deviceStatusService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-device-management/device/status/search',
            method: "POST",
            data: query
        });
    };
    var addContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/status/saveNeDevicestatus',
            method: "POST",
            data: items
        });
    };
    var editContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/status/modifyNeDevicestatus',
            method: "POST",
            data: items
        });
    };
    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/status/deleteNeDevicestatus',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };
    var checkIsDelete = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/status/checkIsDelete',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };


    return {
        search: function(query) {
            return search(query);
        },
        addContent: function(items) {
            return addContent(items);
        },
        editContent: function(items) {
            return editContent(items);
        },
        deleteItem: function(ids) {
            return deleteItem(ids);
        },
        checkIsDelete: function(ids) {
            return checkIsDelete(ids);
        }
    };
}