angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails')
    .factory('deviceDetailsService', deviceDetailsService);

function deviceDetailsService($http) {
    //查询
    var searchDeviceDetails = function(id) {
        // // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-cpe/api/neElement/deviceDetails/' + id,
            // url: 'app/pages/deviceManagement/deviceDetails/test.json',
            method: "POST"
        });
    };

    //
    var searchMonitoringDetails = function(params, query) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/getAllMonitoringOfDevice?neId=' + params,
            method: "POST",
            data: query
        });
    };

    var searchCharValue = function(params) {
        return $http({
            url: Url + '/sunwave-cpe/api/monitoring/getMonitoringDetail',
            method: "POST",
            data: {
                'neId': 1
            }

        });
    };

    //overView 散点图获取数据
    var visitingReason = function(neId) {
        return $http({
            method: 'GET',
            url: Url + '/sunwave-cpe/api/neElement/deviceDetails/visitingReason/' + neId
        })
    };

    //重启
    var reboot = function(neNeId) {
        //console.log("请求重启设备" + neNeId);
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/rebootDevice',
            method: "POST",
            data: {
                'neIdList': neNeId
            }
        });
    };
    //恢复出厂设置
    var recovery = function(neNeId) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/factoryReset',
            method: "POST",
            data: {
                'neIdList': neNeId
            }
        });
    };

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
    //升级
    var upgradeDevice = function(neNeId, fileId) {
        return $http({
            //url: Url + '/sunwave-cpe/api/firmwareUpdate/FirmwareUpdate',
            // url: 'http://10.7.6.246:8088/api/firmwareUpdate/FirmwareUpdate',
            url: Url + '/sunwave-cpe/api/firmwareUpdate/FirmwareUpdate',
            method: "POST",
            data: {
                "neIdList": neNeId,
                "fileId": fileId
            }
        });
    };
    //上传
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

    //下载文件
    var downloadFile = function(logName) {
        return $http({
            method: 'GET',
            url: Url + '/sunwave-cpe/api/neLog/downloadFile/' + logName,
            // data: { fileName: name },
            // responseType: 'arraybuffer'
            responseType: "blob"
        })
    };

    var searchLogFile = function(query) {
        return $http({
            method: 'POST',
            url: Url + '/sunwave-cpe/api/neLog/getNeLog',
            data: query
        })
    }

    //查询配置模板
    var searchConfig = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/template/getProperties',
            method: "POST",
            data: query
        });
    };

    //选择配置模板
    var deviceConfig = function(params, neNeId, domain) {
        //console.log(params + neNeId);
        return $http({
            url: Url + '/sunwave-cpe/api/template/applyTemplate/' + params + '/' + domain + '/' + neNeId,
            method: "POST",
        });
    };

    //查询设备IP
    var searchDeviceIP = function(id) {
        return $http({
            url: Url + '/sunwave-cpe/api/neElementParam/getDeviceIp/' + id,
            // url: 'http://10.7.2.18:8080/api/neElementParam/getDeviceIp/' + id,
            method: "POST",
        });
    }

    //修改设备IP
    var modifyDeviceIP = function(neId, item) {
        return $http({
            url: Url + '/sunwave-cpe/api/neElementParam/configurationIp/' + neId,
            // url: 'http://10.7.2.18:8080/api/neElementParam/configurationIp/' + neId,
            method: "POST",
            data: item
        });
    }


    return {
        searchDeviceDetails: function(id) {
            return searchDeviceDetails(id);
        },
        searchMonitoringDetails: function(params, query) {
            return searchMonitoringDetails(params, query);
        },
        searchCharValue: function(params) {
            return searchCharValue(params);
        },
        uploadFile: function(form, func) {
            return uploadFile(form, func)
        },
        visitingReason: function(neId) {
            return visitingReason(neId)
        },
        reboot: function(neNeId) {
            return reboot(neNeId)
        },
        recovery: function(neNeId) {
            return recovery(neNeId)
        },
        searchFile: function(query) {
            return searchFile(query);
        },
        upgradeDevice: function(neNeId, fileId) {
            return upgradeDevice(neNeId, fileId);
        },
        searchConfig: function(query) {
            return searchConfig(query);
        },
        deviceConfig: function(params, neNeId, domain) {
            return deviceConfig(params, neNeId, domain);
        },
        searchDeviceIP: function(id) {
            return searchDeviceIP(id);
        },
        modifyDeviceIP: function(neId, item) {
            return modifyDeviceIP(neId, item)
        },
        downloadFile: function(logName) {
            return downloadFile(logName)
        },
        searchLogFile: function(query) {
            return searchLogFile(query)
        }
    };
}