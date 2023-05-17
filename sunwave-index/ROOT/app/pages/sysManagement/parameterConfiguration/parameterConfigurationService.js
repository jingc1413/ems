// (function() {
//     'use strict';

angular.module('SunWave.pages.sysManagement.sysParameter')
    .factory('parameterConfigurationService', parameterConfigurationService);

function parameterConfigurationService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistconfig/search',
            method: "POST",
            data: query
        });
    };

    var searchCol = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistconfig/col',
            method: "POST",
            data: query
        });
    };

    var paramList = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistconfig/findAllNeObjectslistConfigs',
            method: "POST",
            data: query
        });
    };

    var editContent = function(item) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json', item);
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistconfig/modifyNeObjectslistConfig',
            method: "POST",
            // headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // "Content-Type":"application/json"
            // "Access-Control-Allow-Origin": "*"
            // headers: { 'Content-Type': undefined },
            // },
            data: item
        });
    };
    var addContent = function(item) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json', item);
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistconfig/saveNeObjectslistConfig',
            method: "POST",
            // headers: { 'Content-Type': undefined },
            data: item
        });
    };
    var deleteItems = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/objectslistconfig/deleteNeObjectslistConfigByIds',
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            data: ids
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchCol: function(query) {
            return searchCol(query);
        },
        paramList: function() {
            return paramList();
        },
        editContent: function(item) {
            return editContent(item);
        },
        addContent: function(item) {
            return addContent(item);
        },
        deleteItems: function(ids) {
            return deleteItems(ids);
        }
    };
}
// })();