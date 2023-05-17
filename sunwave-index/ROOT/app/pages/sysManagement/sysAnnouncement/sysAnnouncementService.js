// (function() {
//     'use strict';

angular.module('SunWave.pages.sysManagement.sysAnnouncement')
    .factory('sysAnnouncementService', sysAnnouncementService);

function sysAnnouncementService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-application-platform/api/affiche/search',
            method: "POST",
            data: query
        });
    };
    var editContent = function(item) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json', item);
        return $http({
            url: Url + '/sunwave-application-platform/api/affiche/modify',
            method: "POST",
            // headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // "Content-Type":"application/json"
            // "Access-Control-Allow-Origin": "*"
            headers: { 'Content-Type': undefined },
            // },
            data: item
        });
    };
    var addContent = function(item) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json', item);
        return $http({
            url: Url + '/sunwave-application-platform/api/affiche/create',
            method: "POST",
            headers: { 'Content-Type': undefined },
            data: item
        });
    };
    var deleteItems = function(checked) {
        return $http({
            url: Url + '/sunwave-application-platform/api/affiche/delete',
            // method: "DELETE",
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(checked)
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        editContent: function(item) {
            return editContent(item);
        },
        addContent: function(item) {
            return addContent(item);
        },
        deleteItems: function(checked) {
            return deleteItems(checked);
        }
    };
}
// })();