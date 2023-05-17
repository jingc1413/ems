// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.dasLog')
    .factory('dasLogService', dasLogService);

function dasLogService($http) {
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/LogManagement/dasLog/test.json',query);
        return $http({
            url: Url + '/sunwave-log-management/log/deviceReportLog/searchReportLog',
            method: "POST",
            data: query
        });
    };

    var downloadLog = function(fullPath, isOnLine) {
        return $http({
            url: Url + '/sunwave-log-management/log/deviceReportLog/downloadReportLog',
            method: "POST",
            params: {
                'fullPath': fullPath,
                'isOnLine': isOnLine
            }
        });
    };

    var deleteLog = function(fullPaths) {
        return $http({
            url: Url + '/sunwave-log-management/log/deviceReportLog/deleteReportLog',
            method: "POST",
            params: {
                'fullPaths': fullPaths
            }
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        downloadLog: function(fullPath, isOnLine) {
            return downloadLog(fullPath, isOnLine);
        },
        deleteLog: function(fullPaths) {
            return deleteLog(fullPaths);
        }
    };


}