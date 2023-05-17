(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider.state('deviceManagement.CPEdeviceManagement.CPEdeviceDetails', { //路由
                url: '/CPEdeviceDetails',
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetails.html',
                title: 'deviceDetails',
                controller: 'deviceDetailsCtrl',
                sidebarMeta: {
                    order: 0,
                },
                params: { args: {} },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',

                        ]);
                    }
                }
            }).state('deviceManagement.CPEdeviceManagement.CPEdeviceDetails.monitor', {
                url: "/monitor",
                views: {
                    "devices@deviceManagement.CPEdeviceManagement.CPEdeviceDetails": {
                        templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/monitoring.html',
                        controller: 'monitoringCtrl',
                    }
                },
                params: { 'Id': null },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/monitoringCtrl.js',
                                // 'app/pages/deviceManagement/deviceManagement/deviceDetails/deviceDetailsService.js',
                            ]
                        });
                    }
                },

            }).state('deviceManagement.CPEdeviceManagement.CPEdeviceDetails.mainte', {
                url: "/mainte",
                views: {
                    "devices@deviceManagement.CPEdeviceManagement.CPEdeviceDetails": {
                        templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/maintenance.html',
                        controller: 'maintenanceCtrl',
                    }
                },
                params: { 'Id': null },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/maintenanceCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsService.js',
                            ]
                        });
                    }
                }
            }).state('deviceManagement.CPEdeviceManagement.CPEdeviceDetails.config', {
                url: "/config",
                views: {
                    "devices@deviceManagement.CPEdeviceManagement.CPEdeviceDetails": {
                        templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/configuration.html',
                        controller: 'configurationCtrl',
                    }
                },
                params: {
                    'Id': null,
                    'modelName': null
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/configurationCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsService.js',
                            ]
                        });
                    }
                }
            }).state('deviceManagement.CPEdeviceManagement.CPEdeviceDetails.overview', {
                url: "/overview",
                views: {
                    "devices@deviceManagement.CPEdeviceManagement.CPEdeviceDetails": {
                        templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/overview.html',
                        controller: 'overviewCtrl',
                    }
                },
                params: { 'Id': null },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/overviewCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsService.js',
                            ]
                        });
                    }
                }
            })
            .state("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.uploadFile", {
                url: "/uploadFile",
                views: {
                    "devices@deviceManagement.CPEdeviceManagement.CPEdeviceDetails": {
                        templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/uploadFile.html',
                        controller: 'uploadFileCtrl',
                    }
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/uploadFileCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsService.js',
                            ]
                        });
                    }
                },
                params: { 'Id': null },

            })
            .state("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.dataModel", {
                url: "/dataModel",
                views: {
                    "devices@deviceManagement.CPEdeviceManagement.CPEdeviceDetails": {
                        templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/dataModel.html',
                        controller: 'dataModelCtrl',
                    }
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/dataModelCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                            ]
                        });
                    }
                },
                params: {
                    'Id': null,
                    'OnlineStatus': null
                },

            })
            .state("deviceManagement.CPEdeviceManagement.CPEdeviceDetails.deviceLog", {
                url: "/deviceLog",
                views: {
                    "devices@deviceManagement.CPEdeviceManagement.CPEdeviceDetails": {
                        templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceLog.html',
                        controller: 'deviceLogCtrl',
                    }
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceLogCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                            ]
                        });
                    }
                },
                params: { 'Id': null },

            })
    }

})();