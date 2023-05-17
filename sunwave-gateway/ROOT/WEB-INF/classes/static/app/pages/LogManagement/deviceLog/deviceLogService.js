// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.deviceLog')
.factory('deviceLogService', deviceLogService);

function deviceLogService($http) {
/*查询*/

var searchContent = function(query) {
    // return $http.post('app/pages/LogManagement/deviceLog/test.json',query);
    return $http({
        url: Url + '/sunwave-log-management/log/ManEleqryLog/search',
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