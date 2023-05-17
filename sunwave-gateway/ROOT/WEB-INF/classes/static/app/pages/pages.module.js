(function() {
    'use strict';

    angular.module('SunWave.pages', [
            'SunWave.pages.dashboard',
            'SunWave.pages.sysManagement',
            'SunWave.pages.Authority',
            'SunWave.pages.deviceManagement',
            'SunWave.pages.upgradeManagement',
            'SunWave.pages.PollingManagement',
            'SunWave.pages.AlarmManagement',
            'SunWave.pages.AlarmConfiguration',
            'SunWave.pages.LogManagement',
            'SunWave.pages.reportManagement',
            // 'SunWave.pages.profile',
            'SunWave.pages.map',
            'SunWave.pages.top',
            'SunWave.pages.DatabaseBackUp',
            // 'SunWave.pages.SeacurityManagement'
            // 'SunWave.pages.login',
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/');

        // baSidebarServiceProvider.addStaticItem({
        //     title: 'other',
        //     icon: 'ion-ios-browsers-outline',
        //     subMenu: [
        //         // {
        //         //     title: '登陆',
        //         //     fixedHref: 'auth.html',
        //         //     blank: true
        //         // },
        //         // {
        //         //     title: '注册',
        //         //     fixedHref: 'reg.html',
        //         //     blank: true
        //         // },
        //         {
        //             title: 'Profile',
        //             stateRef: 'profile'
        //         }, {
        //             title: '404',
        //             fixedHref: '404.html',
        //             blank: true
        //         }
        //     ]
        // });
    }

})();