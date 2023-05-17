// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmConfiguration.generationSettings')
    .factory('generationService', generationService);

function generationService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function() {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/getGeneralSettings',
            method: "POST"
        });
    };
    var modifyGeneralSettings = function(compress, forward, forwardTime, mask) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/modifyGeneralSettings',
            method: "POST",
            params: {
                'compress': compress,
                'forward': forward,
                'forwardTime': forwardTime,
                'mask': mask
            }
        });
    };

    return {
        searchContent: function() {
            return searchContent();
        },
        modifyGeneralSettings: function(compress, forward, forwardTime, mask) {
            return modifyGeneralSettings(compress, forward, forwardTime, mask);
        }
    };
}


// })();