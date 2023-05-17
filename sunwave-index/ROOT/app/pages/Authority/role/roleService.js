angular.module('SunWave.pages.Authority.role')
    .factory('roleService', roleService);

function roleService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/search',
            method: "POST",
            data: query
        });

    };

    var getNameAndUpNameByAreaId = function(id) {
        return $http.post('app/pages/Authority/area/test.json', id);

    };
    //
    var getAreaTree = function() {
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/findAreaAllWithOutChecked',
            method: "POST",
        });

    };
    var getMenuTree = function() {
        return $http({
            // url: Url + '/sunwave-authority/authority/sysMenu/findAllMenuTree',
            url: Url + '/sunwave-authority/authority/sysMenu/getAuthMenuList',
            method: "POST",
        });

    };
    //修改
    var editContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/modifySysRole',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            data: items
        });
    };
    //Add
    var addContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/saveSysRole',
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
    var deleteItem = function(ids) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/removeSysRoles',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            // data:ids
            params: {
                'roleIds': ids
            }
        });
    };
    var checkSysUser = function(roleIds) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/checkSysUser',
            method: "POST",
            params: {
                'roleIds': roleIds
            }
        });
    };
    var openRole = function(roleIds, statusId) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/modifyStatus',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            // data:ids
            params: {
                'roleIds': roleIds,
                'statusId': statusId
            }
        });
    };
    var checkStatus = function(ids) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/checkStatus',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            // data:ids
            params: {
                'roleIds': ids
            }
        });
    };
    var isRoleExist = function(name) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/isRoleExist',
            method: "POST",
            params: {
                'roleName': name
            }
        });
    };
    var checkHasRoleAuth = function(ids) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/checkHasRoleAuth',
            method: "POST",
            params: {
                'ids': ids
            }
        });
    };
    var copySysRole = function(roleId, roleName) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysRole/copySysRole',
            method: "POST",
            params: {
                'roleId': roleId,
                'roleName': roleName
            }
        });
    };



    return {
        search: function(query) { //创建
            return search(query);
        },

        getAreaTree: function() {
            return getAreaTree();
        },
        getMenuTree: function() {
            return getMenuTree();
        },
        getNameAndUpNameByAreaId: function(id) { //创建
            return getNameAndUpNameByAreaId(id);
        },
        editContent: function(items) {
            return editContent(items);
        },
        addContent: function(items) {
            return addContent(items);
        },
        deleteItem: function(ids) {
            return deleteItem(ids);
        },
        checkSysUser: function(roleIds) {
            return checkSysUser(roleIds);
        },
        openRole: function(roleIds, statusId) {
            return openRole(roleIds, statusId);
        },
        checkStatus: function(ids) {
            return checkStatus(ids);
        },
        isRoleExist: function(name) {
            return isRoleExist(name);
        },
        checkHasRoleAuth: function(ids) {
            return checkHasRoleAuth(ids);
        },
        copySysRole: function(roleId, roleName) {
            return copySysRole(roleId, roleName);
        }
    };
}