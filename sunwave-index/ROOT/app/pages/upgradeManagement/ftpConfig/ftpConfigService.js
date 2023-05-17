// (function() {
//     'use strict';

angular.module('SunWave.pages.upgradeManagement.ftpConfig')
    .factory('ftpConfigService', ftpConfigService);

function ftpConfigService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/ftpconfig/search',
            method: "POST",
            data: query
        });
    };
    var addContent = function(items) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/ftpconfig/saveUpFtpServerConfig',
            method: "POST",
            data: items
        });
    };
    var editContent = function(items) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/ftpconfig/modifyUpFtpServerConfig',
            method: "POST",
            data: items
        });
    };
    var deleteItems = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/ftpconfig/deleteUpFtpServerConfigs',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };
    var checkModify = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/upgradefile/checkModify',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };

    var checkDelete = function(ids) {
        return $http({
            url: Url + '/sunwave-device-management/device/ftpconfig/checkDelete',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        addContent: function(items) {
            return addContent(items);
        },
        editContent: function(items) {
            return editContent(items);
        },
        deleteItems: function(ids) {
            return deleteItems(ids);
        },
        checkModify: function(ids) {
            return checkModify(ids);
        },
        checkDelete: function(ids) {
            return checkDelete(ids);
        }
    };


}
// })();