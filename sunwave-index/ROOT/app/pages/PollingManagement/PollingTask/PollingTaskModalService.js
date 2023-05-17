// (function() {
//     'use strict';

angular.module('SunWave.pages.PollingManagement.PollingTask')
    .factory('PollingTaskModalService', PollingTaskModalService);

function PollingTaskModalService($http) {

    var searchContent = function(postData) {
        return $http.post('app/pages/PollingManagement/PollingTask/modaltest.json', postData);
    };
    var getStatusAndType = function() {
        return $http.post('app/pages/PollingManagement/PollingTask/modaltest.json');
    };

    return {
        searchContent: function(postData) {
            return searchContent(postData);
        },
        getStatusAndType: function() {
            return getStatusAndType();
        },
    };


}
// })();