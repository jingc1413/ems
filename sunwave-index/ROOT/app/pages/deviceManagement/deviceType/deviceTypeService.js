angular.module('SunWave.pages.deviceManagement.deviceType')
    .factory('deviceTypeService', deviceTypeService);

function deviceTypeService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-device-management/device/type/search',
            method: "POST",
            data: query
        });
    };
    var addContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/type/saveNeDevicetype',
            method: "POST",
            data: items
        });
    };
    var editContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/type/modifyNeDevicetype',
            method: "POST",
            data: items
        });
    };
    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/type/deleteNeDevicetype',
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
        }
    };
}