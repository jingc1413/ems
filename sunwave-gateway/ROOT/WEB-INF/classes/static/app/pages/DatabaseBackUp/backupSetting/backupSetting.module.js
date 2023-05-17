(function() {
    'use strict';

    angular.module('SunWave.pages.DatabaseBackUp.backupSetting', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('DatabaseBackUp.backupSetting', {
                url: '/backupSetting',
                templateUrl: 'app/pages/DatabaseBackUp/backupSetting/backup.html',
                title: 'Database Backup',
                controller: 'backupSettingCtrl',
                sidebarMeta: {
                    icon: 'fa fa-hdd-o',
                    order: 100,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/DatabaseBackUp/backupSetting/backupSettingController.js',
                                'app/pages/DatabaseBackUp/backupSetting/backupSettingService.js'
                            ]
                        });
                    }
                }
            })
    }

})();