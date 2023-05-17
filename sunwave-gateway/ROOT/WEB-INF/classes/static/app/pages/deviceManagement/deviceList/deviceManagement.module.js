(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement', [
            'SunWave.pages.deviceManagement.deviceList',
            'SunWave.pages.deviceManagement.NotInService',
            'SunWave.pages.deviceManagement.deviceRecover',
            'SunWave.pages.deviceManagement.objectsList',
            'SunWave.pages.deviceManagement.objectsListValue',
            'SunWave.pages.deviceManagement.deviceStatus',
            'SunWave.pages.deviceManagement.deviceType'

        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('deviceManagement', {
                url: '/deviceManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Device Management',
                sidebarMeta: {
                    icon: 'fa fa-hdd-o',
                    order: 100,
                },
                //   resolve: {
                //     lazyLoad: function($ocLazyLoad) {
                //         return $ocLazyLoad.load([

                //         ]);
                //     }
                // }
            })
            // $urlRouterProvider.when('/sys','/sys/announcement');
    }

})();