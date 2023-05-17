angular.module('SunWave.pages.Authority.safeManage')
    .factory('safeManageService', safeManageService);

function safeManageService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-authority/authority/blackIp/search',
            method: "POST",
            data: query
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
    }



    return {
        search: function(query) {
            return search(query);
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
        }
    };
}