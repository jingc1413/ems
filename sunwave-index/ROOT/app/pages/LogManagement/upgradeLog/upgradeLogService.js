// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.upgradeLog')
.factory('upgradeLogService', upgradeLogService);

function upgradeLogService($http) {
/*查询*/

var searchContent = function(query) {
    // return $http.post('app/pages/LogManagement/upgradeLog/test.json',query);
    return $http({
        url: Url + '/sunwave-log-management/log/smFirmwareupdatelogM/search',
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