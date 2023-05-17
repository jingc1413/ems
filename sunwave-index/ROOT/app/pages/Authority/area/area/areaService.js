angular.module('SunWave.pages.Authority.area')
    .factory('areaService', areaService);

function areaService($http) {
    //条件查询
    var search = function(query) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/search',
            method: "POST",
            data: query
        });
        // return $http.post('app/pages/Authority/area/test2.json', query);

    };
    //查树 未选中
    var searchTree = function() {
        // return $http.post('app/pages/Authority/area/test.json', query);
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/findAllWithOutChecked',
            method: "POST",
            headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                //     // "Access-Control-Allow-Origin": "*"
            },
            // data:query
        });
    };
    //查树 未选中 权限
    var searchAuthTree = function() {
        // return $http.post('app/pages/Authority/area/test.json', query);
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/findAreaAllWithOutChecked',
            method: "POST",
            headers: { // "Access-Control-Allow-Origin": "*"
            },
            // data:query
        });
    };
    //根据areaId查子地区
    var getChildNameByAreaId = function(areaId) {
        // return $http.post('app/pages/Authority/area/test.json', id);
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/findSysAreaByPId',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            params: {
                'areaId': areaId
            }

        });
    };
    var getNameAndUpNameByAreaId = function(areaId) {
        // return $http.post('app/pages/Authority/area/test.json', id);
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/getNameAndUpNameByAreaId',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "Content-Type": "application/json"
                    // "Access-Control-Allow-Origin": "*"
            },
            params: {
                'areaId': areaId
            }

        });
    };
    //新增
    var addContent = function(items) {
        // return $http.post('app/pages/Authority/area/test.json',items);
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/addSysArea',
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
            url: Url + '/sunwave-authority/authority/sysArea/modifySysArea',
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
    var deleteAreas = function(items) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/removeSysArea',
            method: "POST",
            params: {
                'areaId': items
            }
        });
    };

    //findSysAreaById
    var findSysAreaById = function(id) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/findSysAreaById',
            method: "POST",
            params: {
                'id': id
            }
        });
    };
    //findPName
    var findPName = function(id) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysArea/getNameAndUpNameByAreaId',
            method: "POST",
            params: {
                'areaId': id
            }
        });
    };



    return {
        search: function(query) {
            return search(query);
        },
        searchTree: function() {
            return searchTree();
        },
        searchAuthTree: function() {
            return searchAuthTree();
        },
        getNameAndUpNameByAreaId: function(areaId) {
            return getNameAndUpNameByAreaId(areaId);
        },
        editContent: function(items) {
            return editContent(items);
        },
        addContent: function(items) {
            return addContent(items);
        },
        getChildNameByAreaId: function() {
            return getChildNameByAreaId();
        },

        deleteAreas: function(items) {
            return deleteAreas(items);
        },
        findSysAreaById: function(id) {
            return findSysAreaById(id);
        },
        findPName: function(id) {
            return findPName(id);
        }

    };
}