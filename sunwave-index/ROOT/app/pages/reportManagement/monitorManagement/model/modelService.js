angular.module('SunWave.pages.reportManagement.CPEmonitorManagement.model')
    .factory('modelService', modelService);

function modelService($http) {
    // var Url = 'http://10.7.7.126:18088'

    var getModelNames = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoringType/getModelNames',
            method: "POST",
            data: query
        });
    }

    var getMonitoringItems = function(id) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringItems?typeId=' + id,
            method: "GET"
        });
    };

    var addMonitoringType = function(task) {
        return $http({
            // url: Url + '/sunwave-cpe/api/monitoring/addMonitoringTask',
            url: Url + '/sunwave-cpe/api/monitoringType/addMonitoringType',
            method: "POST",
            data: task
        });
    };

    var getMonitoringTypes = function(query) {
        return $http({
            // url: Url + '/api/monitoring/modifyMonitoringTask',
            //url: Url + "/sunwave-cpe/monitoringType/getMonitoringTypes",
            url: Url + "/sunwave-cpe/api/monitoringType/getMonitoringTypes",
            method: "POST",
            data: query
        });
    };

    var searchAllNdmPath = function(id) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoringType/getParamOfModel?modelId=' + id,
            method: "GET",
        });

    };

    //deleteMonitoringTypes
    var deleteMonitoringTypes = function(items) {
        return $http({
            // url: Url + '/sunwave-cpe/api/monitoring/getMonitoringTask',
            url: Url + '/sunwave-cpe/api/monitoringType/deleteMonitoringType',
            method: "POST",
            data: items
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

    var getNdmPath = function(id, items) {
        return $http({
            // url: Url + '/sunwave-cpe/api/deviceGroup/getGroup',
            url: Url + '/sunwave-cpe/api/monitoringType/getMonitoringItemsOfModelInType?modelId=' + id,
            method: "POST",
            data: items

        });
    };

    var saveNDMPath = function(id, items) {
        return $http({
            // url: Url + '/sunwave-cpe/api/deviceGroup/getGroup',
            url: Url + '/sunwave-cpe/api/monitoringType/addMonitoringItemsOfModelInType?modelId=' + id,
            method: "POST",
            data: items

        });
    }


    return {
        // gettopData: function(neId) {
        //     return gettopData(neId);
        // },
        getMonitoringType: function(query) {
            return getMonitoringType(query);
        },
        getMonitoringTypes: function(query) {
            return getMonitoringTypes(query);
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
        addMonitoringType: function(task) {
            return addMonitoringType(task);
        },
        modifyMonitoringTask: function(task) {
            return modifyMonitoringTask(task);
        },
        getModelNames: function(query) {
            return getModelNames(query);
        },
        getNdmPath: function(id, items) {
            return getNdmPath(id, items);
        },
        saveNDMPath: function(id, items) {
            return saveNDMPath(id, items);
        },
        deleteMonitoringTypes: function(items) {
            return deleteMonitoringTypes(items);
        },
        searchAllNdmPath: function(id) {
            return searchAllNdmPath(id)
        }
    };


}