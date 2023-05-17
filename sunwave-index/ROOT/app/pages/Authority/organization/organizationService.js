// (function() {
//     'use strict';

angular.module('SunWave.pages.Authority.organization')
    .factory('organizationService', organizationService);

function organizationService($http) {
    // alert('service')
    /*查询*/

    var searchRight = function(id) {
        return $http.post('app/pages/Authority/organization/test.json', id);
    };
    var searchContent = function() {
        return $http({
            url: Url + '/sunwave-authority/authority/sysMenu/findAllMenuTree',
            method: "POST",
            // data:query
        });
        // return $http.post('app/pages/Authority/area/test2.json', query);

    };
    var editContent = function(treeNode) {
        // return $http.post('app/pages/Authority/organization/test.json',treeNode);
        return $http({
            url: Url + '/sunwave-authority/authority/sysMenu/modifySysMenu',
            method: "POST",
            data: treeNode
        });
    };
    var addContent = function(treeNode) {
        // return $http.post('app/pages/Authority/organization/test.json',treeNode);
        return $http({
            url: Url + '/sunwave-authority/authority/sysMenu/add',
            method: "POST",
            data: treeNode
        });
    };
    var searchNodeById = function(id) {
        return $http({
            url: Url + '/sunwave-authority/authority/sysMenu/findSysMenuById',
            method: "POST",
            params: {
                'id': id
            }
        });
    };
    var clickNode = function(pId) {
        return $http.post('app/pages/Authority/organization/test.json', pId);
    };
    var removeTreeNode = function(treeNode) {
        // return $http.post('app/pages/Authority/organization/test.json',treeNodeId);
        //删除
        return $http({
            url: Url + '/sunwave-authority/authority/sysMenu/removeSysMenu',
            method: "POST",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // "Content-Type":"application/json"
                // "Access-Control-Allow-Origin": "*"
            },
            // params: {
            //     'sysMenu':treeNode
            // }
            data: treeNode
        });
    };

    return {
        searchContent: function() {
            return searchContent();
        },
        editContent: function(treeNode) {
            return editContent(treeNode);
        },
        addContent: function(treeNode) {
            return addContent(treeNode);
        },
        searchNodeById: function(id) {
            return searchNodeById(id);
        },
        searchRight: function(id) {
            return searchRight(id);
        },
        clickNode: function(pId) {
            return clickNode(pId);
        },
        removeTreeNode: function(treeNode) {
            return removeTreeNode(treeNode);
        }
    };


}
// })();