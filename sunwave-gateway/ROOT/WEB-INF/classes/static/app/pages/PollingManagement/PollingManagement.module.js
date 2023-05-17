(function() {
    'use strict';

    angular.module('SunWave.pages.PollingManagement', [
            'SunWave.pages.PollingManagement.PollingTask',
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('PollingManagement', {
                url: '/PollingManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Polling Management',
                sidebarMeta: {
                    icon: 'fa fa-refresh',
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