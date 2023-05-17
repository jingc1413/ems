angular.module('SunWave.pages.sysManagement.CPEconfigManagement')
    .factory('configManagementService', configManagementService);

function configManagementService($http) {
    // var Url = 'http://10.7.7.126:18088';
    //查询
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            url: Url + '/sunwave-cpe/api/template/getProperties',
            method: "POST",
            data: query
        });
    };

    //Add
    var AddContent = function(info, items) {
        //console.log(items);
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            url: Url + '/sunwave-cpe/api/template/configurationProperties',
            method: "POST",
            data: {
                "proList": items,
                "teDescribe": info.teDescribe,
                "teName": info.teName,
                "modelName": info.modelName,
            }
        });
    };

    var ModifyContent = function(info, items) {
        //console.log(items);
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            url: Url + '/sunwave-cpe/api/template/modifyAttribute',
            method: "POST",
            data: {
                "cpList": items,
                "teDescribe": info.teDescribe,
                "teName": info.teName,
                "id": info.id,
                "modelName": info.modelName
            }
        });
    };

    var deleteItem = function(params) {
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            url: Url + '/sunwave-cpe/api/template/batchDeletion',
            method: "POST",
            data: {
                "groupIdList": params
            }
        });
    };

    var searchAllModelName = function(query) {
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            url: Url + '/sunwave-cpe/api/monitoringType/getModelNames',
            method: "POST",
            data: query
        });
    };

    var searchNdmPathById = function(id) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoringType/getParamOfModel?modelId=' + id,
            method: "GET",
        });

    };

    return {
        searchNdmPathById: function(id) {
            return searchNdmPathById(id);
        },
        searchAllModelName: function(query) {
            return searchAllModelName(query);
        },
        searchContent: function(query) {
            return searchContent(query);
        },
        deleteItem: function(params) {
            return deleteItem(params);
        },
        AddContent: function(info, items) {
            return AddContent(info, items);
        },
        ModifyContent: function(info, items) {
            return ModifyContent(info, items);
        }
    };
}