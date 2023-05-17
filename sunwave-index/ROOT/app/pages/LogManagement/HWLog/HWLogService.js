// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.HWLog')
    .factory('HWLogService', HWLogService);

function HWLogService($http) {
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/LogManagement/HWLog/test.json',query);
        return $http({
            url: Url + '/sunwave-log-management/log/HWLog/search',
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