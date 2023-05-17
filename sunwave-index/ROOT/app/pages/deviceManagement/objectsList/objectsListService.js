angular.module('SunWave.pages.deviceManagement.objectsList')
    .factory('objectsListService', objectsListService);

function objectsListService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslist/search',
            method: "POST",
            data: query
        });
    };
    var addContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslist/addNeObject',
            method: "POST",
            data: items
        });
    };
    var editContent = function(items) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslist/modifyNeObject',
            method: "POST",
            data: items
        });
    };
    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslist/removeNeObjects',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };
    //check objId exist
    var checkObjIdExist = function(objId) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslist/checkObjIdExist',
            method: "POST",
            params: {
                'objId': objId
            }
        });
    };
    //check objs is used
    var checkNeObjectsIsUsed = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslist/checkNeObjectsIsUsed',
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
        checkObjIdExist: function(objId) {
            return checkObjIdExist(objId);
        },
        checkNeObjectsIsUsed: function(ids) {
            return checkNeObjectsIsUsed(ids);
        },
    };
}