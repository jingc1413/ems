(function() {
    'use strict';
    // angular.module('SunWave.pages.dashboard', []).constant('HomepageTitle', '33333');
    angular.module('SunWave.pages.login_select', [])
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
            .state('login_select', {
                url: '/login_select',
                controller: 'login_selectCtrl',
                templateUrl: 'app/pages/login_select/login_select.html',
                // title: 'Homepage',
                // title_chinese: '首页',
                sidebarMeta: {
                    icon: 'ion-ios-home',
                    order: 0,
                },
                // controller:'dashboardCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/login_select/login_selectCtrl.js'
                        ]);
                    }
                }
            });
    }

})();