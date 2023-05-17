// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.alarmTransferLog')
.factory('alarmTransferLogService', alarmTransferLogService);

function alarmTransferLogService($http) {
/*查询*/

var searchContent = function(query) {
    // return $http.post('app/pages/LogManagement/alarmTransferLog/test.json',query);
    return $http({
        url: Url + '/sunwave-log-management/log/almAlarmTransferLog/search',
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