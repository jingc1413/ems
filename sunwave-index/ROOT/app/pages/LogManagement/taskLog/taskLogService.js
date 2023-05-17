// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.taskLog')
.factory('taskLogService', taskLogService);

function taskLogService($http) {
/*查询*/

var search = function(query) {
    // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
    return $http({
        url: Url + '/sunwave-log-management/log/manTaskLog/search',
        method: "POST",
        data: query
    });
};

return {
    search: function(query) {
        return search(query);
    },
};


}
// })();