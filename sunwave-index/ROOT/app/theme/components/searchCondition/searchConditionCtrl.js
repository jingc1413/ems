(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('searchConditionCtrl', searchConditionCtrl);

    /** @ngInject */
    function searchConditionCtrl($scope, deviceListService) {

        //查询条件 下拉框 and Input的初始化
        $scope.deviceTypeShow = false;
        $scope.deviceStatusShow = false;
        $scope.vendorShow = false;
        $scope.deviceLevelShow = false;
        $scope.deviceTypeAllShow = false;
        $scope.devNameIdVers = true;

        $scope.device = {
            coCompanyid: "",
            neDevicetypeid: "",
            neDevicestatusid: "",
            neSitelevelid: "",
            dtcDevicetypeclassifyid: ""
        };

        $scope.switchSearchCondition = function() {

            switch ($scope.searchCondition) {
                case "0":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    $scope.query.neRepeaterid = $scope.conditionValue;
                    break;
                case "1":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = true;
                    $scope.query.neName = $scope.conditionValue;
                    break;
                case "2":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = true;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neCompanyid = $scope.device.coCompanyid;
                    break;
                case "3":
                    $scope.deviceTypeShow = true;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neDevicetypeid = $scope.device.neDevicetypeid;
                    break;
                case "4":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = true;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neDevicestatusid = $scope.device.neDevicestatusid;
                    break;
                case "5":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = true;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = false;
                    $scope.query.neSitelevelid = $scope.device.neSitelevelid;
                    break;
                case "6":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.deviceTypeAllShow = false;
                    $scope.devNameIdVers = true;
                    $scope.query.neVer = $scope.conditionValue;
                    break;
                case "7":
                    $scope.deviceTypeShow = false;
                    $scope.deviceStatusShow = false;
                    $scope.vendorShow = false;
                    $scope.deviceLevelShow = false;
                    $scope.devNameIdVers = false;
                    $scope.deviceTypeAllShow = true;
                    $scope.query.dtcDevicetypeclassifyid = $scope.device.neDevicetypeAllid;
                    break;
                default:
                    $scope.query.keyword = "";
            }
        };


        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };
        //type all
        $scope.searchDeviceTypeAll = function() {
            deviceListService.searchDeviceTypeAll().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.devTypeAlls = res.data;
            })
        };

        //status
        $scope.deviceStatuss = function() {
            deviceListService.deviceStatuss().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.devStatuss = res.data;
            })
        };
        //level
        $scope.searchDeviceLevel = function() {
            deviceListService.searchDeviceLevel().success(function(res) {
                // //console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceLevels = res.data;
            })
        };

        //vendor
        $scope.getVendorName = function() {
            deviceListService.findAll().success(function(res) {
                $scope.vNames = res.data;
            })
        };

        $scope.searchDeviceType();
        $scope.searchDeviceTypeAll();
        $scope.searchDeviceLevel();
        $scope.deviceStatuss();
        $scope.getVendorName();

    }
})();