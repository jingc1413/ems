// app.factory('js.modules.system.service.backupSettingService', ['$http', function($http) {

//     var updateBackupSetting = function(setting) {
//         return $http.post('/API/system/backupSetting', setting);
//     };

//     /*var deleteBackupSetting = function(ids){
// 	    	return $http({
// 				url : "/API/system/backupSetting",
// 				method : "DELETE"
// 			});
// 	    };*/

//     var getUpdateBackupSetting = function() {
//         return $http({
//             method: 'GET',
//             url: '/API/system/backupSetting'
//         });
//     };

//     var getSchemaTableNames = function() {
//         return $http({
//             method: 'GET',
//             url: '/API/system/table/search'
//         });
//     };

//     var download = function(setting) {
//         return $http.post('/API/system/backupSetting/download', setting);
//         /*return $http({
//         	method:'GET',
//         	params:setting,
//         	url:'/API/system/backupSetting'
//         }); */
//     };

//     return {
//         download: function(setting) {
//             return download(setting);
//         },

//         updateBackupSetting: function(setting) { //设置备份信息
//             return updateBackupSetting(setting);
//         },
//         getUpdateBackupSetting: function() {
//             return getUpdateBackupSetting();
//         },
//         /*,
//                 deleteBackupSetting : function(){
//                 	return deleteBackupSetting();
//                 },*/
//         getSchemaTableNames: function() {
//             return getSchemaTableNames();
//         }

//     };
// }]);

angular.module('SunWave.pages.DatabaseBackUp.backupSetting')
    .factory('backupSettingService', backupSettingService);

function backupSettingService($http) {
    var updateBackupSetting = function(setting) {
        return $http.post(Url + '/sunwave-dbbackups/API/system/backupSetting', setting);
    };

    /*var deleteBackupSetting = function(ids){
	    	return $http({
				url : "/API/system/backupSetting",
				method : "DELETE"
			});
	    };*/

    var getUpdateBackupSetting = function() {
        return $http({
            method: 'GET',
            url: Url + '/sunwave-dbbackups/API/system/backupSetting'
        });
    };

    var getSchemaTableNames = function() {
        return $http({
            method: 'GET',
            url: Url + '/sunwave-dbbackups/API/system/table/search'
        });
    };

    var download = function(setting) {
        return $http.post(Url + '/sunwave-dbbackups/API/system/backupSetting/download', setting);
        /*return $http({
        	method:'GET',
        	params:setting,
        	url:'/API/system/backupSetting'
        }); */
    };

    var getBackupSetting = function() {
        return $http({
            method: 'GET',
            url: Url + '/sunwave-dbbackups/API/system/backupSetting'
        });
    };
    var download = function(fileName) {
        return $http({
            method: 'GET',
            url: Url + '/API/system/backups/download',
            params: {
                'fileName': fileName
            }
        });
    };


    return {
        download: function(setting) {
            return download(setting);
        },

        updateBackupSetting: function(setting) { //设置备份信息
            return updateBackupSetting(setting);
        },
        getUpdateBackupSetting: function() {
            return getUpdateBackupSetting();
        },
        /*,
                deleteBackupSetting : function(){
                	return deleteBackupSetting();
                },*/
        getSchemaTableNames: function() {
            return getSchemaTableNames();
        },
        getBackupSetting: function() {
            return getBackupSetting();
        },
        download: function(fileName) {
            return download(fileName);
        }

    };

}