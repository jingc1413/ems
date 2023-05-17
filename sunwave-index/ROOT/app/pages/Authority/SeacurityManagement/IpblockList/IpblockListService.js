angular.module('SunWave.pages.Authority.SeacurityManagement.IpblockList')
    .factory('IpblockListService', IpblockListService);

function IpblockListService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-authority/authority/blackIp/search',
            method: "POST",
            data: query
        });

    };
    var search2 = function() {
        return $http({
            url: Url + '/gateway/blocklist/findAll',
            method: "POST",
            // data: query
        });

    };
    var initRule = function() {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRule/initPage',
            method: "POST"
        });

    };
    //查询all规则
    var findAll = function() {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRule/findAll',
            method: "POST"
        });
    };
    var modifyRule = function(sysRule) {
        return $http({
            // url: Url + '/sunwave-authority/authority/sysRule/findAll',
            // method: "POST"
            url: Url + '/sunwave-authority/authority/sysRule/modifyRule',
            method: "POST",
            data: sysRule
        });
    };

    //addIP
    var addContent = function(sysBlackIp) {
        return $http({
            url: Url + '/sunwave-authority/authority/blackIp/saveSysBlackIp',
            method: "POST",
            data: sysBlackIp
        });
    };

    //modifyIP
    var modifyContent = function(sysBlackIp) {
        return $http({
            url: Url + '/sunwave-authority/authority/blackIp/modifySysBlackIp',
            method: "POST",
            data: sysBlackIp
        });
    };

    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-authority/authority/blackIp/removeSysBlackIps',
            method: "POST",

            params: {
                'ids': ids
            }
        });
    };
    var deleteItem_black = function(ids) {
        return $http({
            url: Url + '/gateway/blocklist/removeIps',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };



    return {
        search: function(query) {
            return search(query);
        },
        search2: function() {
            return search2();
        },
        initRule: function() {
            return initRule();
        },
        findAll: function() {
            return findAll();
        },
        modifyRule: function(sysRule) {
            return modifyRule(sysRule);
        },
        addContent: function(sysBlackIp) {
            return addContent(sysBlackIp);
        },
        modifyContent: function(sysBlackIp) {
            return modifyContent(sysBlackIp);
        },
        deleteItem: function(ids) {
            return deleteItem(ids);
        },
        deleteItem_black: function(ids) {
            return deleteItem_black(ids);
        }
    };
}