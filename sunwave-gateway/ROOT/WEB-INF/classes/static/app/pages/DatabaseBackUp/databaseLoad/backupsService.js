// app.factory('js.modules.system.service.backupsService', ['$http', function($http) {

//     var saveBackups = function(systemBackups) {
//         return $http.post('API/system/backups', systemBackups);
//     };

//     var getbackupLoads = function(query) {
//         return $http.post('API/system/backups/search', query);
//     };

//     var executeDbLoad = function(id) {
//         return $http.post('API/system/backups/executeDbLoad', id);
//     };

//     var uploadExcel = function(file) {
//         var fd = new FormData();
//         fd.append("fileName", file);
//         var args = {
//             method: 'POST',
//             url: '/API/system/backups/uploadfile',
//             data: fd,
//             // params:{fileName:file},
//             headers: {
//                 'Content-Type': undefined
//             },
//             transformRequest: angular.identity
//         };
//         return $http(args);
//         /*return $http.post('/API/umaterial/goods/uploadExcel', file);*/
//     };

//     return {
//         uploadExcel: function(file) {
//             return uploadExcel(file);
//         },

//         saveBackups: function(systemBackups) { //设置备份信息
//             return saveBackups(systemBackups);
//         },

//         getbackupLoads: function(query) {
//             return getbackupLoads(query);
//         },

//         executeDbLoad: function(id) {
//             return executeDbLoad(id);
//         },

//     };
// }]);


angular.module('SunWave.pages.DatabaseBackUp.databaseLoad')
    .factory('backupsService', backupsService);

function backupsService($http) {
    var saveBackups = function(systemBackups) {
        return $http.post(Url + '/sunwave-dbbackups/API/system/backups', systemBackups);
    };

    var getbackupLoads = function(query) {
        return $http.post(Url + '/sunwave-dbbackups/API/system/backups/search', query);
    };

    var executeDbLoad = function(id) {
        return $http.post(Url + '/sunwave-dbbackups/API/system/backups/executeDbLoad', id);
    };

    var uploadExcel = function(file) {
        var fd = new FormData();
        fd.append("fileName", file);
        var args = {
            method: 'POST',
            url: Url + '/sunwave-dbbackups//API/system/backups/uploadfile',
            data: fd,
            // params:{fileName:file},
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };
        return $http(args);
        /*return $http.post('/API/umaterial/goods/uploadExcel', file);*/
    };

    return {
        uploadExcel: function(file) {
            return uploadExcel(file);
        },

        saveBackups: function(systemBackups) { //设置备份信息
            return saveBackups(systemBackups);
        },

        getbackupLoads: function(query) {
            return getbackupLoads(query);
        },

        executeDbLoad: function(id) {
            return executeDbLoad(id);
        },

    };
}