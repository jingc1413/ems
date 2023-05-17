(function() {
    'use strict';

    angular.module('SunWave.pages.DatabaseBackUp.databaseLoad', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('DatabaseBackUp.databaseLoad', {
                url: '/databaseLoad',
                templateUrl: 'app/pages/DatabaseBackUp/databaseLoad/databaseload.html',
                title: 'Database Restore',
                controller: 'databaseLoadCtrl',
                sidebarMeta: {
                    icon: 'fa fa-hdd-o',
                    order: 100,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/DatabaseBackUp/databaseLoad/databaseLoadController.js',
                                'app/pages/DatabaseBackUp/databaseLoad/backupsService.js'
                            ]
                        });
                    }
                }
            })
    }

})();