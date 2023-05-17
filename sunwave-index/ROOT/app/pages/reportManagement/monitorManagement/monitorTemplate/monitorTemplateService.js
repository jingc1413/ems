angular.module('SunWave.pages.reportManagement.CPEmonitorManagement.monitorTemplate')
    .factory('monitorTemplateService', monitorTemplateService);

function monitorTemplateService($http) {
    // var Url = 'http://10.7.7.126:18088'

    var getMonitoringTypes = function() {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringTypes',
            method: "GET"
        });
    }

    var getMonitoringItems = function(id) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringItems?typeId=' + id,
            method: "GET"
        });
    };

    var addMonitoringTask = function(task) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/addMonitoringTask',
            method: "POST",
            data: task
        });
    };

    var modifyMonitoringTask = function(task) {
        return $http({
            // url: Url + '/api/monitoring/modifyMonitoringTask',
            url: Url + "/sunwave-cpe/api/monitoring/modifyMonitoringTask",
            method: "POST",
            data: task
        });
    };

    var getMonitoringTask = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringTask',
            method: "POST",
            data: query
        });

    };

    var deleteMonitoringTask = function(items) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/deleteMonitoringTask',
            method: "POST",
            data: items
        });
    }

    var getMonitoringDetails = function(id) {
        return $http({
            // url: Url + '/api/monitoring/getMonitoringTask',
            url: Url + "/sunwave-cpe/api/monitoring/getTaskAllInfos?taskId=" + id,
            method: "GET",
            // data: {

            // }
        });
    };

    var searchGroup = function(ids) {
        return $http({
            url: Url + '/sunwave-cpe/api/deviceGroup/getGroup',
            method: "POST",
            data: {
                "groupIdList": ids,
            }
        });
    };

    var searchAllGroup = function() {
        return $http({
            url: Url + '/sunwave-cpe/api/deviceGroup/queryGroup',
            method: "POST",
        });
    };

    return {
        searchAllGroup: function() {
            return searchAllGroup();
        },
        getMonitoringTask: function(query) {
            return getMonitoringTask(query);
        },
        getMonitoringTypes: function() {
            return getMonitoringTypes();
        },
        searchGroup: function(ids) {
            return searchGroup(ids);
        },
        deleteMonitoringTask: function(items) {
            return deleteMonitoringTask(items);
        },
        getMonitoringDetails: function(id) {
            return getMonitoringDetails(id);
        },
        getMonitoringItems: function(id) {
            return getMonitoringItems(id);
        },
        addMonitoringTask: function(task) {
            return addMonitoringTask(task);
        },
        modifyMonitoringTask: function(task) {
            return modifyMonitoringTask(task);
        },
    };


}