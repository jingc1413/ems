// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmConfiguration.AlarmMask')
    .factory('AlarmMaskService', AlarmMaskService);

function AlarmMaskService($http) {
    // alert('service')
    /*查询*/

    var getAlarmMaskTree = function() {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/getAlarmMaskTree',
            method: "POST"
                // data:query

        });
    };
    var maskTreeSave = function(ids) {
        // return $http.post('app/pages/sysManagement/sysAnnouncement/test.json');
        return $http({
            url: Url + '/sunwave-alarm-management/alarm/almalarm/updateAlarmMaskConfigs',
            method: "POST",
            params: {
                'ids': ids
            }

        });
    };

    return {
        getAlarmMaskTree: function() {
            return getAlarmMaskTree();
        },
        maskTreeSave: function(ids) {
            return maskTreeSave(ids);
        }
    };
}
// })();