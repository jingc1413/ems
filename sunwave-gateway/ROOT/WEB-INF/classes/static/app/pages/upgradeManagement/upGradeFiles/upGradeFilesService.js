// (function() {
//     'use strict';

angular.module('SunWave.pages.upgradeManagement.upGradeFiles')
    .factory('upGradeFilesService', upGradeFilesService);

function upGradeFilesService($http) {
    // alert('service')
    /*查询*/
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/upgradefile/search',
            method: "POST",
            data: query
        });
    };
    var addContent = function(form) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/upgradefile/saveUpgradeFiles',
            method: "POST",
            headers: { 'Content-Type': undefined },
            data: form
        });
    };

    var editContent = function(form) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json', editjson);
        return $http({
            url: Url + '/sunwave-device-management/device/upgradefile/modifyUpgradeFiles',
            method: "POST",
            headers: { 'Content-Type': undefined },
            data: form
        });
    };
    var deleteItems = function(ids) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json', checked);
        return $http({
            url: Url + '/sunwave-device-management/device/upgradefile/deleteUpgradeFiles',
            method: "POST",
            params:{
                'ids':ids
            }
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        editContent: function(form) {
            return editContent(form);
        },
        addContent: function(form) {
            return addContent(form);
        },
        deleteItems: function(ids) {
            return deleteItems(ids);
        }
    };


}
// })();