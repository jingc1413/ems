// (function() {
//     'use strict';

angular.module('SunWave.pages.deviceManagement.deviceRecover')
    .factory('deviceRecoverService', deviceRecoverService);

function deviceRecoverService($http) {
    // alert('service')
    /*查询*/

    var searchContent = function(query) {
        // return $http.post('app/pages/LogManagement/deviceLog/test.json');
        return $http({
            url: Url + '/sunwave-device-management/device/neElementdelete/search',
            method: "POST",
            data: query
        });
    };
    var physicalDele = function(neIds) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElementdelete/physicsDeleteElement',
            method: "POST",
            params:{
                'neIds':neIds
            }
        });
    };
    var startRecover = function(bConfirmed1,bConfirmed2,neIds) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElementdelete/resumeRepeater',
            method: "POST",
            params:{
                'bConfirmed1':bConfirmed1,
                'bConfirmed2':bConfirmed2,
                'neIds':neIds
            }
        });
    };
    // var searchModalContent = function() {
    //     return $http.post('app/pages/AlarmManagement/currentAlarm/test.json');
    // };
    // var getCityAndCounty = function() {
    //     return $http.post('app/pages/deviceManagement/deviceList/test.json');
    // };
    // var getItem = function (id) {
    //     return $http.post('app/pages/AlarmManagement/currentAlarm/test.json',id);
    // };

    return {
        searchContent: function(query) {
            return searchContent(query);
        },
        physicalDele: function(neIds) {
            return physicalDele(neIds);
        },
        startRecover: function(bConfirmed1,bConfirmed2,neIds) {
            return startRecover(bConfirmed1,bConfirmed2,neIds);
        }
        // searchModalContent: function() {
        //     return searchModalContent();
        // },
        // getCityAndCounty: function() {
        //     return getCityAndCounty();
        // },
        // getItem: function (id) {
        //     return getItem(id);
        // }
    };
}
// })();