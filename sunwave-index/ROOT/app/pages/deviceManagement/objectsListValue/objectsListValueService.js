angular.module('SunWave.pages.deviceManagement.objectsListValue')
    .factory('objectsListValueService', objectsListValueService);

function objectsListValueService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistValue/search',
            method: "POST",
            data: query
        });
    };
    var addContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistValue/addObjectsValue',
            method: "POST",
            data: items
        });
    };
    var editContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistValue/modifyObjectsValue',
            method: "POST",
            data: items
        });
    };
    var authorizeTree = function(needItems) {
        return $http({
            //现在是编辑接口
            url: Url + '/sunwave-device-management/device/objectslistValue/modifyObjectsValue',
            method: "POST",
            params: {
                'needItems': needItems
            }
        });
    };
    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistValue/deleteObjectsValue',
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
        authorizeTree: function(needItems) {
            return authorizeTree(needItems);
        }
    };
}