angular.module('SunWave.pages.AlarmConfiguration.AlarmForward')
    .factory('AlarmForwardService', AlarmForwardService);

function AlarmForwardService($http) {

    //查询
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            //url:'app/pages/AlarmConfiguration/AlarmForward/test.json',
            method: "POST",
            data: query
        });
    };
    //searchById
    var searchById = function(id) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        //console.log(id);
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmforward/findAlarmForwardById',
            //url:'app/pages/AlarmConfiguration/AlarmForward/test.json',
            method: "POST",
            'id': id
        });
    };

    //Add
    var addContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/addAlarmForward',
            url: Url + '/sunwave-alarm-management/alarm/alarmforward/addAlarmForward',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            data: items
        });
    };
    var getConditions = function() {
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/findAll',
            method: "POST"
        })
    };

    //删除
    var deleteItem = function(ids) {
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/deleteAlarmForward',
            url: Url + '/sunwave-alarm-management/alarm/alarmforward/deleteAlarmForwards',
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

    //修改
    var editContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/alarmforward/modifyAlarmForward',
            //url: Url + '/sunwave-alarm-management/alarm/alarmforward/modifyAlarmForward',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            data: items
        });
    };


    //查找所有公司
    var findAll = function() {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-application-platform/api/company/all',
            method: "GET",
        });
    };
    //all levels
    var searchDeviceLevel = function() {
        // return $http.post('app/pages/deviceManagement/deviceList/test.json',query);
        return $http({
            url: Url + '/sunwave-device-management/device/level/findAll',
            method: "POST",
        });
    };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        searchById: function(id) {
            return searchById(id);
        },
        addContent: function(items) {
            return addContent(items);
        },
        deleteItem: function(ids) {
            return deleteItem(ids);
        },
        editContent: function(items) {
            return editContent(items);
        },
        findAll: function() {
            return findAll();
        },
        getConditions: function() {
            return getConditions();
        },
        searchDeviceLevel: function() {
            return searchDeviceLevel();
        }
    };
}