angular.module('SunWave.pages.map')
    .factory('mapService', mapService);

function mapService($http) {

    var searchAllDevice = function() {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/findAllNelement',
            method: "POST"
        });
    };

    var getDeviceByLats = function(lat1, lat2, lon1, lon2) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/searchByLonLat',
            method: "POST",
            params: {
                'lat1': lat1,
                'lat2': lat2,
                'lon1': lon1,
                'lon2': lon2
            }
        });
    };
    var searchDevice = function(query) {
        return $http({
            url: Url + '/sunwave-device-management/device/neElement/findMapNeElement',
            method: "POST",
            data: query
        });
    };



    return {
        searchAllDevice: function() {
            return searchAllDevice();
        },
        getDeviceByLats: function(lat1, lat2, lon1, lon2) {
            return getDeviceByLats(lat1, lat2, lon1, lon2);
        },
        searchDevice: function(query) {
            return searchDevice(query);
        }
    };
}