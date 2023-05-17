// (function() {
//     'use strict';

angular.module('SunWave.pages.sysManagement.vendorManagement')
    .factory('vendorManagementService', vendorManagementService);

function vendorManagementService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-application-platform/api/company/search',
            method: "POST",
            data: query
        });
    };
    var addContent = function(items) {
        return $http({
            url: Url + '/sunwave-application-platform/api/company/create',
            method: "POST",
            data: items
        });
    };
    var editContent = function(items) {
        return $http({
            url: Url + '/sunwave-application-platform/api/company/modify',
            method: "PUT",
            data: items
        });
    };
    var deleteItems = function(checked) {
        return $http({
            url: Url + '/sunwave-application-platform/api/company/delete',
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(checked)
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
        deleteItems: function(checked) {
            return deleteItems(checked);
        },
        findAll: function() {
            return findAll();
        }
    };


}
// })();