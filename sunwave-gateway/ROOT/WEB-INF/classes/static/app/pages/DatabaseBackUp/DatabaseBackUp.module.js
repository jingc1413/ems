(function() {
    'use strict';

    angular.module('SunWave.pages.DatabaseBackUp', [
            'SunWave.pages.DatabaseBackUp.backupSetting',
            'SunWave.pages.DatabaseBackUp.databaseLoad'
        ])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('DatabaseBackUp', {
                url: '/DatabaseBackUp',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'DatabaseBackUp',
                // controller: 'DatabaseBackUpCtrl',
                sidebarMeta: {
                    icon: 'fa fa-hdd-o',
                    order: 3,
                },
                // resolve: {
                //     lazyLoad: function($ocLazyLoad) {
                //         return $ocLazyLoad.load([
                //             'app/pages/DatabaseBackUp/backupSettingController.js',

                //             'app/pages/DatabaseBackUp/databaseLoadController.js',
                //             'app/pages/DatabaseBackUp/backupService.js',

                //             'app/pages/DatabaseBackUp/backupSettingService.js',
                //         ]);
                //     }
                // }
            })
    }

})();