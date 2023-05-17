(function() {
    'use strict';

    angular.module('SunWave.pages.login', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/pages/login/login.html',
                title: '登陆',
                sidebarMeta: {
                    icon: 'ion-ios-home',
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/login/login.js',
                            // 'app/pages/dashboard/dashboardRightPie/dashboardRightPie.directive.js',
                            // //   'app/pages/dashboard/trafficChart/trafficChart.directive.js',
                            // 'app/pages/dashboard/dashboardRightPie/dashboardRightPie.js',
                            //   'app/pages/dashboard/dashboardTable/DashboardTable.js',
                        ]);
                    },

                }
            });
    }

})();