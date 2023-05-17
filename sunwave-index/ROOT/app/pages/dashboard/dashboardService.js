angular.module('SunWave.pages.dashboard')
    .factory('dashboardService', dashboardService);

function dashboardService($http) {
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/upgradefile/search',
            method: "POST",
            data: query
        });
    };
    var alarmInfoLevelCalculate = function() {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/alarmInfoLevelCalculate',
            method: "POST",
            // data: query
        });
    };

    //首页数量
    var initFrontNums = function() {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/initFrontNums',
            method: "POST"
        });
    };
    var alarmInfoLevelCalculate = function() {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmlog/alarmInfoLevelCalculate',
            method: "POST"
        });
    };


    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        alarmInfoLevelCalculate: function() {
            return alarmInfoLevelCalculate();
        },
        initFrontNums: function() {
            return initFrontNums();
        },
        alarmInfoLevelCalculate: function() {
            return alarmInfoLevelCalculate();
        }
    };


}