angular.module('SunWave.theme.components')
    .factory('serverStatusModalService', serverStatusModalService);

function serverStatusModalService($http) {

    var findNecomputerById = function(id) {
        // return $http.post('app/pages/sysManagement/vendorManagement/test.json');
        return $http({
            url: Url + '/sunwave-log-management/log/neComputer2/findNecomputerById',
            method: "POST",
            params: {
                'id': id
            }
        });
    };
    var confirmNeComputer = function(id) {
        return $http({
            url: Url + '/sunwave-log-management/log/neComputer2/confirmNeComputer',
            method: "POST",
            params: {
                'id': id
            }
        });
    };

    return {
        findNecomputerById: function(id) {
            return findNecomputerById(id);
        },
        confirmNeComputer: function(id) {
            return confirmNeComputer(id);
        }
    };


}