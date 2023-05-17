// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.heartbeatLog')
.factory('heartbeatLogService', heartbeatLogService);

function heartbeatLogService($http) {
/*查询*/

var searchContent = function(query) {
    // return $http.post('app/pages/LogManagement/heartbeatLog/test.json',query);
    return $http({
        url: Url + '/sunwave-log-management/log/manLinkLog/search',
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