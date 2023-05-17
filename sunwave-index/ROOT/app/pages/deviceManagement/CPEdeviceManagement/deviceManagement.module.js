(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement', [
            'SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice',
            // 'SunWave.pages.deviceManagement.CPEdeviceManagement.Favourite',
            // 'SunWave.pages.deviceManagement.CPEdeviceManagement.Unauthorized',
            'SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdeviceDetails',
            'SunWave.pages.deviceManagement.CPEdeviceManagement.CPEMonitoringDetails'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('deviceManagement.CPEdeviceManagement', {
                url: '/CPEdeviceManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'CPEdeviceManagement',
                sidebarMeta: {
                    icon: 'fa fa-hdd-o',
                    order: 99,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/deviceDetails/deviceDetailsService.js',
                            ]
                        });
                    }
                }
            })
            // $urlRouterProvider.when('/sys','/sys/announcement');
    }

})();