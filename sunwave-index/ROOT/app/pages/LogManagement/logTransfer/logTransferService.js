angular.module('SunWave.pages.LogManagement.logTransfer')
    .factory('logTransferService', logTransferService);

function logTransferService($http) {
    var searchContent = function(query) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-log-management/log/transfer/search',
            method: "POST",
            data: query
        });
    };

    //修改
    var editContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-log-management/log/transfer/modifySftpTask',
            method: "POST",
            data: items
        });
    };
    //Add
    var addContent = function(items) {
        //return $http.post('app/pages/AlarmConfiguration/AlarmKindIds/test.json',items);
        return $http({
            url: Url + '/sunwave-log-management/log/transfer/saveSftpTask',
            method: "POST",
            data: items
        });
    };

    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-log-management/log/transfer/deleteSftpTaskByIds',
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