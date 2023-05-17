angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEMonitoringDetails')
    .factory('monitoringdetailsService', monitoringdetailsService);

function monitoringdetailsService($http) {
    //查询
    var searchCharValue = function(params) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringDetail',
            method: "POST",
            data: params

        });
    }

    var getAllMonitoringItemOfTask = function(params) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringItemOfTask',
            method: 'POST',
            data: params
        })
    }


    return {
        searchCharValue: function(params) {
            return searchCharValue(params);
        },
        getAllMonitoringItemOfTask: function(params) {
            return getAllMonitoringItemOfTask(params)
        }
    };
}