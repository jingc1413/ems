// (function() {
//     'use strict';

angular.module('SunWave.pages.reportManagement.performanceReport')
    .factory('performanceReportService', performanceReportService);

function performanceReportService($http) {
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/LogManagement/deviceLog/test.json',query);
        return $http({
            url: Url + '/sunwave-report-management/performance/search',
            method: "POST",
            data: query
        });
    };
    var searchDatchtask = function(query) {
        // return $http.post('app/pages/LogManagement/deviceLog/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/objectslist/performance',
            method: "POST",
            data: query
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchDatchtask: function(query) {
            return searchDatchtask(query);
        }
    };


}
// })();