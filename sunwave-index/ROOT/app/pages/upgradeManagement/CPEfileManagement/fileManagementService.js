angular.module('SunWave.pages.upgradeManagement.CPEfileManagement')
    .factory('fileManagementService', fileManagementService);

function fileManagementService($rootScope, $http) {
    var searchContent = function(query) {
        return $http({
            // url: 'http://localhost:8080/upload',
            url: Url + '/sunwave-cpe/API/remoteUpload/search',
            method: "POST",
            data: query
        });
    };

    var toModifyItem = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/API/remoteUpload/modifyUploadFile',
            method: "POST",
            data: item
        });

    };
    var searchDevice = function(query) {
        return $http({
            // url: Url + '/sunwave-cpe/device/neElement/findMapNeElement',
            // method: "POST",
            // data: query
        });
    };

    var uploadFile = function(form, func) {
        //console.log(form.get("file"));
        return $http({
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
    }

    var deleteItem = function(items) {
        return $http({
            url: Url + '/sunwave-cpe/API/remoteUpload/batchDeleteItems',
            method: "DELETE",
            params: {
                "ids": items
            }
        });
    };

    var searchManufacturer = function() {
        return $http({
            url: Url + '/sunwave-cpe/api/neElement/getManufacturer',
            method: "POST",
        });
    };

    return {
        uploadFile: function(form, func) {
            return uploadFile(form, func);
        },
        searchContent: function(query) {
            return searchContent(query);
        },
        searchDevice: function(query) {
            return searchDevice(query);
        },
        toModifyItem: function(query) {
            return toModifyItem(query);
        },
        deleteItem: function(items) {
            return deleteItem(items);
        },
        searchManufacturer: function() {
            return searchManufacturer();
        }
    };
}