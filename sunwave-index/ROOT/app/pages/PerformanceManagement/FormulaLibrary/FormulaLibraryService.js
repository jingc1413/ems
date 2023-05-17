angular.module('SunWave.pages.PerformanceManagement.FormulaLibrary')
    .factory('FormulaLibraryService', FormulaLibraryService);

function FormulaLibraryService($http) {

    var searchManu = function() {
        return $http({
            url: Url + '/sunwave-cpe/api/manufacture/getManufacturerTree',
            method: "POST",

        });
    };

    var getPerformanceItem = function(query) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceItem/getPerformanceItem',
            method: "POST",
            data: query

        });
    };

    var searchParam = function() {
        return $http({
            url: Url + '/sunwave-cpe/api/manufacture/parameterClassification',
            method: "POST",

        });
    };

    var addItem = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceItem/addPerformanceItem?indexId=' + item.indexId,
            method: "POST",
            data: item,

        });
    };

    var editItem = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceItem/modifyPerformanceItem?indexId=' + item.indexId,
            method: "POST",
            data: item,
        });
    };

    var deleteItem = function(items) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceItem/removePerformanceItem',
            method: "POST",
            data: items,
        });
    };

    //添加节点
    var addTreeNode = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceIndex/addPerformanceIndex',
            method: "POST",
            data: item,
        });
    };

    //修改节点
    var editTreeNode = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceIndex/modifyPerformanceIndex',
            method: "POST",
            data: item,
        });
    };

    //删除节点
    var deleteTreeNode = function(item) {
        return $http({
            url: Url + '/sunwave-cpe/api/performanceIndex/removePerformanceIndex',
            method: "POST",
            data: item,
        });
    };

    return {
        searchManu: function() {
            return searchManu();
        },
        searchParam: function() {
            return searchParam();
        },
        addItem: function(item) {
            return addItem(item);
        },
        editItem: function(item) {
            return editItem(item);
        },
        deleteItem: function(items) {
            return deleteItem(items);
        },
        getPerformanceItem: function(query) {
            return getPerformanceItem(query);
        },
        addTreeNode: function(item) {
            return addTreeNode(item);
        },
        editTreeNode: function(item) {
            return editTreeNode(item);
        },
        deleteTreeNode: function(item) {
            return deleteTreeNode(item);
        },


    }
}