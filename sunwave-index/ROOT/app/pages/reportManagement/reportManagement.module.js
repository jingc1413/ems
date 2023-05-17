(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement', [
            'SunWave.pages.reportManagement.performanceReport',
            'SunWave.pages.reportManagement.customReport',
            'SunWave.pages.reportManagement.deviceInformationReport'
            // 'SunWave.pages.reportManagement.CPEmonitorManagement'

        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('reportManagement', {
                url: '/reportManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Report Management',
                sidebarMeta: {
                    icon: 'fa fa-list',
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