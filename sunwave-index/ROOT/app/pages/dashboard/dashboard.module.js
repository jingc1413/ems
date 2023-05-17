(function() {
    'use strict';
    // angular.module('SunWave.pages.dashboard', []).constant('HomepageTitle', '33333');
    angular.module('SunWave.pages.dashboard', [])
        .config(routeConfig)

    // var app = angular.module('myApp', []);



    // var HomepageTitle = '1121';
    // if ($rootScope.language == 'chinese') {
    //     var HomepageTitle = 'ccccc';
    // } else {
    //     var HomepageTitle = 'eee';
    // };

    /** @ngInject */
    function routeConfig($stateProvider) {

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: 'dashboardCtrl',
                templateUrl: 'app/pages/dashboard/dashboard.html',
                // title: 'Homepage',
                // title_chinese: '首页',
                sidebarMeta: {
                    icon: 'ion-ios-home',
                    order: 0,
                },
                // controller:'dashboardCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [

                                'app/pages/dashboard/dashboardCtrl.js',
                                'app/pages/dashboard/dashboardRightPie/dashboardRightPie.js',
                                'app/pages/dashboard/dashboardWidgets/dashboardWidgets.directive.js',
                                'app/pages/dashboard/dashboardRightPie/dashboardRightPie.directive.js',
                                'app/pages/dashboard/dashboardService.js',

                                // 'app/pages/dashboard/deviceStatus/deviceStatusCtrl.js',
                                // 'app/pages/dashboard/deviceStatus/deviceStatus.directive.js'
                            ]
                        });
                    }
                }
            });
    }

})();