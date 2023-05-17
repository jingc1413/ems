angular.module('SunWave.pages.AlarmManagement.ServerStatus')
    .factory('ServerStatusService', ServerStatusService);

function ServerStatusService($http) {
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/neComputer3/search',
            method: "POST",
            data: query
        });
    };

    //修改
    var editContent = function(items) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/neComputer3/modifyNeComputer3',
            method: "POST",
            data: items
        });
    };
    //Add
    var addContent = function(items) {
        //return $http.post('app/pages/AlarmConfiguration/AlarmKindIds/test.json',items);
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/neComputer3/addNeComputer3',
            method: "POST",
            data: items
        });
    };

    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/neComputer3/deleteNeComputer3',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            // data:ids
            params: {
                'ids': ids
            }
        });
    };

    var findAll = function() {
        // return $http.post('app/pages/AlarmConfiguration/AlarmConfig/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmkind/findAll',
            method: "POST"

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
        },
        findAll: function() {
            return findAll();
        }
    };

}