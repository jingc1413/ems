// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.sysLog')
    .factory('sysLogService', sysLogService);

function sysLogService($http) {
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/LogManagement/sysLog/test.json',query);
        return $http({
            url: Url + '/sunwave-log-management/log/sysLog/search',
            method: "POST",
            data: query
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        }
    };


}
// })();