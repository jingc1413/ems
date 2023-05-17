angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagement')
    .factory('groupManagementService', groupManagementService);

function groupManagementService($http) {
    // var Url = 'http://10.7.7.126:18088'
    //查询
    var searchContent = function() {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            Url: '/sunwave-cpe/NeElement/selectDevic',
            method: "POST"
        });
    };

    //查询模型配置
    var searchConfig = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            url: Url + '/sunwave-cpe/api/template/getProperties',
            method: "POST",
            data: {
                "pageIndex": query.pageIndex,
                "pageSize": query.pageSize,
                "teName": query.keyword
            }
        });
    };

    //应用模型配置
    var groupConfig = function(groupId, paramsId, domain) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            // url: Url + '/sunwave-alarm-management/alarm/alarmforward/search',
            url: Url + '/sunwave-cpe/api/template/applyTemplate/' + paramsId + '/' + domain + '/' + groupId,
            method: "POST",
        });
    };


    var searchGroup = function(query) {

        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            crossDomain: true,
            // headers: {
            //     Accept: 'application/json; charset=utf-8',
            //     'Content-Type': 'application/json; charset=utf-8',
            //     'Access-Control-Allow-Origin': '*',
            // },
            // url: Url + '/sunwave-cpe/api/deviceGroup/queryGroup',
            url: Url + '/sunwave-cpe/api/deviceGroup/getDeviceGroup',
            //url:'app/pages/deviceManagement/Authorized/test.json',
            method: "POST",
            data: query

        });
        id
    };

    //查询组监控配置
    var searchMoniConfig = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringTask',
            method: "POST",
            data: {
                "pageIndex": query.pageIndex,
                "pageSize": query.pageSize,
                "keyword": query.keyword,

            }
        });
    };

    //应用监控配置
    var groupMonitoring = function(task) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/modifyMonitoringTask',
            method: "POST",
            data: task
                //  {
                //     "pageIndex": query.pageIndex,
                //     "pageSize": query.pageSize,
                //     "keyword": query.keyword,

            // }
        });

    }

    //查询文件
    var searchFile = function(query) {
        return $http({
            // url: 'http://localhost:8080/upload',
            url: Url + '/sunwave-cpe/API/remoteUpload/search',
            method: "POST",
            data: {
                "pageIndex": query.pageIndex,
                "pageSize": query.pageSize,
                "name": query.keyword
            }
        });
    };

    //上传文件
    var uploadFile = function(form, func) {
        //console.log(form.get("file"));
        // //console.log(neNeid + "Please")
        return $http({
            // url: 'http://localhost:8080/upload',
            url: Url + '/sunwave-cpe/API/remoteUpload/uploadFile',
            method: "POST",
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity,
            uploadEventHandlers: {
                progress: func
                    // function(e) {
                    //     //console.log("uploadFile" + e.loaded + "      " + e.total);
                    //     $rootScope.progress = e;
                    // }
            },
            data: form
        });
    };

    //选择文件对组所有设备进行升级
    var toUpgrade = function(id, fileId) {
        return $http({
            url: Url + '/sunwave-cpe/api/firmwareUpdate/groupDeviceUpdate',
            method: "POST",
            params: {
                "fileId": fileId,
                "id": id
            }
        });
    };

    //重启组内所有设备
    var reboot = function(groupId) {
        //console.log(groupId);
        return $http({
            // url: 'http://localhost:8080/upload',
            url: Url + '/sunwave-cpe/api/deviceGroup/rebootGroupDevice/' + groupId,
            method: "POST",
        });
    };

    //将组内所有设备恢复到出厂设置
    var recovery = function(groupId) {
        //console.log(groupId);
        return $http({
            // url: 'http://localhost:8080/upload',
            url: Url + '/sunwave-cpe/api/deviceGroup/groupFactoryReset/' + groupId,
            method: "POST",
        });
    };

    return {
        searchContent: function() {
            return searchContent();
        },
        searchGroup: function(query) {
            return searchGroup(query);
        },
        searchMoniConfig: function(query) {
            return searchMoniConfig(query);
        },
        searchConfig: function(query) {
            return searchConfig(query);
        },
        groupConfig: function(groupId, paramsId, domain) {
            return groupConfig(groupId, paramsId, domain);
        },
        groupMonitoring: function(task) {
            return groupMonitoring(task);
        },
        uploadFile: function(form, func) {
            return uploadFile(form, func);
        },
        searchFile: function(query) {
            return searchFile(query);
        },
        reboot: function(groupId) {
            return reboot(groupId);
        },
        recovery: function(groupId) {
            return recovery(groupId);
        },
        toUpgrade: function(fileId, id) {
            return toUpgrade(fileId, id);
        }
    };
}