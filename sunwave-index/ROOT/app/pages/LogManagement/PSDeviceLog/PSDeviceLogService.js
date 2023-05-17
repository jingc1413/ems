angular.module('SunWave.pages.LogManagement.PSDeviceLog')
    .factory('PSDeviceLogService', PSDeviceLogService);

function PSDeviceLogService($http) {
    var searchLog = function(query) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/getNeElement',
            method: "POST",
            data: query
        });
    };

    //下载文件
    var downloadFile = function(logName) {
        return $http({
            method: 'GET',
            url: Url + '/sunwave-cpe/api/neLog/downloadFile/' + logName,
            // data: { fileName: name },
            responseType: 'arraybuffer'
                // responseType: "blob"
        })
    };

    var searchLogFile = function(query) {
        return $http({
            method: 'POST',
            url: Url + '/sunwave-cpe/api/neLog/getNeLog',
            data: query
        })
    };
    return {
        searchLog: function(query) {
            return searchLog(query);
        },
        downloadFile: function(logName) {
            return downloadFile(logName);
        },
        searchLogFile: function(query) {
            return searchLogFile(query);
        },
    }
}