(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEMonitoringDetails', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.CPEdeviceManagement.CPEMonitoringDetails', { //路由
                url: '/MonitoringDetails',
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/MonitoringDetails/monitoringdetails.html',
                title: 'MonitoringDetails',
                controller: 'monitoringdetailsCtrl',
                // sidebarMeta: {
                //     order: 0,
                // },
                params: {
                    'item': null,
                    'neNeid': null,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/MonitoringDetails/monitoringdetailsCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/MonitoringDetails/monitoringdetailsService.js',
                            ]
                        });
                    }
                }
            })
    }

})();