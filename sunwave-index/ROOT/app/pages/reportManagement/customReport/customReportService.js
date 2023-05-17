angular.module('SunWave.pages.reportManagement.customReport')
    .factory('customReportService', customReportService);

function customReportService($http) {
    var searchReportList = function() {
        return $http({
            url: Url + '/sunwave-report-management/report/search',
            // url: 'http://127.0.0.1:9057/report/search',
            method: "POST",
            // data: items
        });
    };
    var addReportList = function(items) {
        return $http({
            url: Url + '/sunwave-report-management/report/save',
            // url: 'http://127.0.0.1:9057/report/save',
            method: "POST",
            data: items
        });
    };
    var editReportList = function(items) {
        return $http({
            url: Url + '/sunwave-report-management/report/save',
            // url: 'http://127.0.0.1:9057/report/save',
            method: "POST",
            data: items
        });
    };
    var searchCol = function(query) {
        return $http({
            url: Url + '/sunwave-report-management/report/col',
            // url: 'http://127.0.0.1:9057/report/col',
            method: "POST",
            data: query
        });
    };
    //删除
    var deleteItem = function(columnIds) {
        return $http({
            url: Url + '/sunwave-report-management/report/delete',
            // method: "DELETE",
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "Content-Type": "application/json"
            },
            // "Access-Control-Allow-Origin": "*"
            data: columnIds
        });
    };
    var selectCols = function(id) {
        return $http({
            url: Url + '/sunwave-report-management/report/col/selected',
            method: "POST",
            data: {
                'userDefinedId': id
            }
            // params: {
            //     'userDefinedId': id
            // }
        });
    };


    return {
        searchReportList: function() {
            return searchReportList();
        },
        addReportList: function(items) {
            return addReportList(items);
        },
        editReportList: function(items) {
            return editReportList(items);
        },
        searchCol: function(query) {
            return searchCol(query);
        },
        deleteItem: function(columnIds) {
            return deleteItem(columnIds);
        },
        selectCols: function(id) {
            return selectCols(id);
        }
    };


}