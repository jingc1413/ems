angular.module('SunWave.pages.PerformanceManagement.PerformanceDataReport')
    .factory('PerformanceDataReportService', PerformanceDataReportService);

function PerformanceDataReportService($http) {
    var searchManu = function() {
        return $http({
            url: Url + '/sunwave-cpe/api/manufacture/getManufacturerTree',
            method: "POST",

        });
    };


    var searchForm = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceStatement/getPerformanceStatement',
            method: "POST",
            data: query
        });
    };

    var addItem = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceStatement/addPerformanceStatement',
            method: "POST",
            data: item
        });
    };
    var modifyItem = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceStatement/modifyPerformanceStatement',
            method: "POST",
            data: item
        });
    };

    var deleteItem = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceStatement/removePerformanceStatement',
            method: "POST",
            data: item
        });
    };

    var searchReport = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/perforStatemDataGrade/getPerforStatemDataGrade',
            method: "POST",
            data: query
        });
    };

    //查询设备序列号

    var searchSerialNumber = function() {
        return $http({
            url: Url + '/sunwave-cpe/api/perforStatemDataGrade/getSerialNumber',
            method: "POST",
        });
    };

    return {
        searchManu: function() {
            return searchManu();
        },
        searchForm: function(query) {
            return searchForm(query);
        },
        addItem: function(item) {
            return addItem(item);
        },
        modifyItem: function(item) {
            return modifyItem(item);
        },
        deleteItem: function(item) {
            return deleteItem(item);
        },
        searchReport: function(query) {
            return searchReport(query);
        },
        searchSerialNumber: function() {
            return searchSerialNumber();
        }
    }
}