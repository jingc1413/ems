(function() {
    'use strict';

    angular.module('SunWave.pages.PerformanceManagement', [
            'SunWave.pages.PerformanceManagement.PerformanceDataReport',
            'SunWave.pages.PerformanceManagement.FormulaLibrary',
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('PerformanceManagement', {
                url: '/PerformanceManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Performance Management',
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