// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.systemLog')
.factory('systemLogService', systemLogService);

function systemLogService($http) {
/*查询*/

var searchContent = function(query) {
    // return $http.post('app/pages/LogManagement/systemLog/test.json',query);
    return $http({
        url: Url + '/sunwave-log-management/log/sysplSysOptLog/search',
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