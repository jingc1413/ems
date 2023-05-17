// (function() {
//     'use strict';

angular.module('SunWave.pages.reportManagement.deviceInformationReport')
.factory('deviceInformationReportService', deviceInformationReportService);

function deviceInformationReportService($http) {
/*查询*/

var searchTree = function () {
    return $http.post('app/pages/reportManagement/deviceInformationReport/test.json');
};

return {
    searchTree: function() {
        return searchTree();
    }
};


}
// })();