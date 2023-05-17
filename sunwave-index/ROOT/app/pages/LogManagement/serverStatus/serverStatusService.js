// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.serverStatus')
    .factory('serverStatusService', serverStatusService);

function serverStatusService($http) {
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/LogManagement/serverStatus/test.json',query);
        return $http({
            url: Url + '/sunwave-log-management/log/neComputer2/search',
            method: "POST",
            data: query
        });
    };
    var searchIn = function(query) {
        return $http({
            url: Url + '/sunwave-log-management/log/almSystemLog2/search',
            method: "POST",
            data: query
        });
    }

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchIn: function(query) {
            return searchIn(query);
        }
    };


}
// })();