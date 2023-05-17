angular.module('SunWave.pages.Authority.safe')
    .factory('safeService', safeService);

function safeService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/search',
            method: "POST",
            data: query
        });
        // return $http.post('app/pages/Authority/area/test2.json', query);

    };

    //新增
    var addContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/createSysUser',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            data: items
        });
    };
    //修改
    var editContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/modifySysUser',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            data: items
        });
    };
    //删除
    var deleteItem = function(userIds) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/removeSysUser',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            params: {
                'userIds': userIds
            }
        });
    };
    //check password
    var checkDbPassword = function(password) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/checkDbPassword',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            params: {
                'password': password
            }
        });
    };
    //change password
    var changePassword = function(password) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/changePassword',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            params: {
                'password': password
            }
        });
    };
    var getLoginUser = function(userName) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/getLoginUser',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            params: {
                'userName': userName
            }
        });
    };

    var modifyStatus = function(statusId, userIds) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/modifySysUserStatus',
            method: "POST",
            params: {
                'statusId': statusId,
                'userIds': userIds
            }
        });
    };

    var getAuthRoleList = function(query) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/getAuthRoleList',
            method: "POST",
            data: query
        });

    };
    var checkUserName = function(userName) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/checkUserName',
            method: "POST",
            params: {
                'userName': userName
            }
        });

    };
    var resetPassword = function(password, userId) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysUser/resetPassword',
            method: "POST",
            params: {
                'password': password,
                'userId': userId
            }
        });

    };


    return {
        search: function(query) {
            return search(query);
        },
        editContent: function(items) {
            return editContent(items);
        },
        addContent: function(items) {
            return addContent(items);
        },
        deleteItem: function(userIds) {
            return deleteItem(userIds);
        },
        checkDbPassword: function(password) {
            return checkDbPassword(password);
        },
        changePassword: function(password) {
            return changePassword(password);
        },
        getLoginUser: function(userName) {
            return getLoginUser(userName);
        },
        modifyStatus: function(statusId, userIds) {
            return modifyStatus(statusId, userIds);
        },
        getAuthRoleList: function(query) {
            return getAuthRoleList(query);
        },
        checkUserName: function(userName) {
            return checkUserName(userName);
        },
        resetPassword: function(password, userId) {
            return resetPassword(password, userId);
        }

    };
}