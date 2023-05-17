(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagement', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider.state('deviceManagement.CPEdeviceGroup.groupManagement', {
            url: '/groupManagement',
            templateUrl: 'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/groupManagement.html',
            title: 'groupManagement',
            controller: 'groupManagementCtrl',
            sidebarMeta: {
                order: 0,
            },
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/groupManagementService.js',
                        'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/groupManagementCtrl.js'
                    ]);
                }
            },
        });
        $stateProvider.state('deviceManagement.CPEdeviceGroup.groupManagement.devices', {
            url: "/devices",
            views: {
                "about@deviceManagement.CPEdeviceGroup.groupManagement": {
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/Authorized.html',
                    controller: 'AuthorizedCtrl',
                    // params: { 'name': "1" },
                    sidebarMeta: {
                        order: 0,
                    },
                }
            },
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedCtrl.js',
                            'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js',
                        ]
                    });
                }
            },
            params: { 'groupId': null },
        }).state("deviceManagement.CPEdeviceGroup.groupManagement.properties", {
            url: "/properties",
            views: {
                "about@deviceManagement.CPEdeviceGroup.groupManagement": {
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/groupProp.html',
                    controller: 'groupPropCtrl',
                    // params: { 'name': "1" },
                    sidebarMeta: {
                        order: 0,
                    },

                }
            },
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/groupPropCtrl.js',
                        ]
                    });
                }
            },
            params: { 'groupId': null },

        }).state("deviceManagement.CPEdeviceGroup.groupManagement.minitoring", {
            url: "/minitoring",
            views: {
                "about@deviceManagement.CPEdeviceGroup.groupManagement": {
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/groupMinitoring.html',
                    controller: 'groupMinitoringCtrl',
                    // params: { 'name': "1" },
                    // sidebarMeta: {
                    //     order: 0,
                    // },

                }
            },
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/groupMinitoringCtrl.js',

                        ]
                    });
                }
            },
            params: { 'groupId': null },

        }).state("deviceManagement.CPEdeviceGroup.groupManagement.Firmwave", {
            url: "/Firmwave",
            views: {
                "about@deviceManagement.CPEdeviceGroup.groupManagement": {
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/Firmwave.html',
                    controller: 'FirmwaveCtrl',
                    // params: { 'name': "1" },
                    sidebarMeta: {
                        order: 0,
                    },

                }
            },
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/FirmwaveCtrl.js',

                        ]
                    });
                }
            },
            params: { 'groupId': null },

        }).state("deviceManagement.CPEdeviceGroup.groupManagement.restore", {
            url: "/restore",
            views: {
                "about@deviceManagement.CPEdeviceGroup.groupManagement": {
                    templateUrl: 'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/restore.html',
                    controller: 'restoreCtrl',
                    // params: { 'name': "1" },
                    sidebarMeta: {
                        order: 0,
                    },

                }
            },
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/pages/deviceManagement/CPEdeviceGroup/groupManagement/restoreCtrl.js',

                        ]
                    });
                }
            },
            params: { 'groupId': null },

        }).state("deviceManagement.CPEdeviceGroup.groupManagement.log", {
            url: "/log",
            views: {
                "about@deviceManagement.CPEdeviceGroup.groupManagement": {
                    templateUrl: 'app/pages/LogManagement/CPElogManagement/logManagement.html',
                    controller: 'logManagementCtrl',
                    // params: { 'name': "1" },
                    sidebarMeta: {
                        order: 0,
                    },

                }
            },
            resolve: {
                lazyLoad: function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/pages/LogManagement/CPElogManagement/logManagementCtrl.js',
                            'app/pages/LogManagement/CPElogManagement/logManagementService.js'
                        ]
                    });
                }
            },
            params: { 'groupId': null },

        })
    }

})();