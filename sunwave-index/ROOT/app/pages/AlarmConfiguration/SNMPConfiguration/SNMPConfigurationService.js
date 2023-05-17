angular.module('SunWave.pages.AlarmConfiguration.SNMPConfiguration')
    .factory('SNMPConfigurationService', SNMPConfigurationService);

function SNMPConfigurationService($http) {
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/trapset/search',
            method: "POST",
            data: query
        });
    };

    //修改
    var editContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/trapset/modifyTrapSet',
            method: "POST",
            data: items
        });
    };
    //Add
    var addContent = function(items) {
        //return $http.post('app/pages/AlarmConfiguration/AlarmKindIds/test.json',items);
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/trapset/saveTrapSet',
            method: "POST",
            data: items
        });
    };

    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/trapset/deleteTrapSetByIds',
            method: "POST",
            // headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // "Content-Type": "application/json"
            // "Access-Control-Allow-Origin": "*"
            // },
            data: ids
                // params: {
                //     'ids': ids
                // }
        });
    };


    return {
        search: function(query) { //创建
            return search(query);
        },

        editContent: function(items) {
            return editContent(items);
        },
        searchContent: function(query) {
            return searchContent(query);
        },
        addContent: function(items) {
            return addContent(items);
        },

        deleteItem: function(ids) {
            return deleteItem(ids);
        }
    };

}