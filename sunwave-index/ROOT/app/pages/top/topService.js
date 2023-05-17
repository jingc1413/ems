angular.module('SunWave.pages.top')
    .factory('topService', topService);

function topService($http) {
    var gettopData = function(neId) {
        // return $http.post('app/pages/top/test2.json');

        return $http({
            url: Url + '/sunwave-topological-map/map/findTopoData',
            method: "POST",
            params: {
                'neId': neId
            }
        });
    };
    var searchTree = function(treeQuery) {
        return $http({
            url: Url + '/sunwave-topological-map/map/findAreaTreeNeElements',
            method: "POST",
            data: treeQuery
        });
    };

    var getEleNames = function(elementName) {
        return $http({
            url: Url + '/sunwave-topological-map/map/findNeElementByElementName',
            method: "POST",
            params: {
                'elementName': elementName
            }
        });
    };


    return {
        gettopData: function(neId) {
            return gettopData(neId);
        },
        searchTree: function(treeQuery) {
            return searchTree(treeQuery);
        },
        getEleNames: function(elementName) {
            return getEleNames(elementName);
        }
    };


}