angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice')
    .factory('AuthorizedService', AuthorizedService);

function AuthorizedService($http) {
    //查询
    var searchDevice = function(query) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/getNeElement',
            method: "POST",
            data: query
        });
    };

    //查询模型树
    var searchModelTree = function(neNeId) {
        //console.log("查询模型树" + neNeId)
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElementParam/getModelTree/' + neNeId,
            method: "POST",
            data: {
                'neId': neNeId
            }

        });
    };


    //查询组
    var searchGroups = function(query) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/deviceGroup/getDeviceGroup',
            method: "POST",
            data: query

        });
    };

    //添加组
    var addGroups = function(p) {
        return $http({
            crossDomain: true,

            url: Url + '/sunwave-cpe/api/deviceGroup/newGroup',
            method: "POST",
            data: {
                'description': p.description,
                'groupName': p.groupName,
            }


        });
    };

    //删除组
    var deleteItem = function(p) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/deviceGroup/removeGroup/' + p.id,
            method: "POST",

        });
    };

    //修改组信息
    var editGroup = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/deviceGroup/modifyGroup',
            method: "POST",
            data: item
        });
    };

    //设备分组
    var equipmentGrouping = function(groupIdList, neIdList) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/deviceGroup/equipmentGrouping',
            method: "POST",
            data: {
                "groupIdList": groupIdList,
                "neIdList": neIdList
            }

        });
    };

    //设备移出组
    var removeDeviceFromGroup = function(groupId, checkedItem) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/deviceGroup/removeGroupDevice/' + groupId,
            method: "POST",
            data: {
                "neIdList": checkedItem
            }
        });
    }

    //重启
    var reboot = function(e) {
        //console.log("请求重启设备" + e);
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/rebootDevice',
            method: "POST",
            data: {
                'neIdList': e
            }
        });
    };
    //恢复出厂设置
    var recovery = function(e1) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/factoryReset',
            method: "POST",
            data: {
                'neIdList': e1
            }
        });
    };

    var saveModalValue = function(params, neNeId) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/parameterChange',
            method: "POST",
            params: {
                'neId': neNeId,
                'paramId': params.paramId,
                'paramValue': params.newValue,
            }
        });
    };

    //刷新模型树参量值
    var refreshModelValue = function(neId, paramIds) {
        //console.log(neId + paramIds)
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElementParam/refreshParameterOfDevice?neId=' + neId,
            method: "POST",
            data: paramIds,

        });
    };

    //查询设备是否在线
    var searchState = function(summary) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/onlineStatus/' + summary,
            method: "POST",
        });

    };

    var searchBy = function(search) {
        return $http({
            crossDomain: true,
            url: Url + '/sunwave-cpe/api/neElement/search',
            method: "POST",
            data: {
                'pageIndex': search.pageIndex,
                'pageSize': search.pageSize,
                "deviceIp": search.searchValue,
                "manufacturer": search.searchValue1,
                "id": query.groupId,
            }
        });

    }

    //Upload upgrade file
    var uploadFile = function(form) {
        //console.log(form.get("file"));
        return $http({
            url: Url + '/sunwave-cpe/API/remoteUpload/uploadFile',
            method: "POST",
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity,
            data: form
        });
    }

    //
    var searchFile = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/API/remoteUpload/search',
            method: "POST",
            data: query
        });
    };

    //查询配置模板
    var searchConfig = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/template/getProperties',
            method: "POST",
            data: {
                "pageIndex": query.pageIndex,
                "pageSize": query.pageSize,
                "teName": query.keyword
            }
        });
    }

    //选择配置模板
    var deviceConfig = function(params, neNeId, domain) {
        //console.log(params + neNeId);
        return $http({
            url: Url + '/sunwave-cpe/api/template/applyTemplate/' + params + '/' + domain + '/' + neNeId,
            method: "POST",
        });
    };

    //升级设备
    var upgrade = function(neNeId, fileId) {
        return $http({
            url: Url + '/sunwave-cpe/api/firmwareUpdate/FirmwareUpdate',
            method: "POST",
            data: {
                "neIdList": neNeId,
                "fileId": fileId
            }
        });
    };

    var searchManufacturer = function() {
        return $http({
            url: Url + '/sunwave-cpe/api/neElement/getManufacturer',
            method: "POST",
        });
    }

    return {
        searchModelTree: function(neNeId) {
            return searchModelTree(neNeId);
        },
        searchDevice: function(query) {
            return searchDevice(query);
        },
        reboot: function(e) {
            return reboot(e);
        },
        searchFile: function(manufacturer) {
            return searchFile(manufacturer);
        },
        saveModalValue: function(params, neNeId) {
            return saveModalValue(params, neNeId);
        },
        searchState: function(summary) {
            return searchState(summary);
        },
        uploadFile: function(form) {
            return uploadFile(form);
        },
        searchBy: function(search) {
            return searchBy(search);
        },
        recovery: function(e1) {
            return recovery(e1);
        },
        searchGroups: function(query) {
            return searchGroups(query);
        },
        addGroups: function(p) {
            return addGroups(p);
        },
        deleteItem: function(p) {
            return deleteItem(p);
        },
        editGroup: function(item) {
            return editGroup(item);
        },
        refreshModelValue: function(neId, paramIds) {
            return refreshModelValue(neId, paramIds);
        },
        searchConfig: function(query) {
            return searchConfig(query);
        },
        equipmentGrouping: function(groupIdList, neIdList) {
            return equipmentGrouping(groupIdList, neIdList);
        },
        deviceConfig: function(params, neNeId, domain) {
            return deviceConfig(params, neNeId, domain);
        },
        upgrade: function(neNeId, fileId) {
            return upgrade(neNeId, fileId);
        },
        removeDeviceFromGroup: function(groupId, checkedItem) {
            return removeDeviceFromGroup(groupId, checkedItem)
        },
        searchManufacturer: function() {
            return searchManufacturer()
        }

    };
}