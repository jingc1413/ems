(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.ftpConfig', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('upgradeManagement.ftpConfig', {
                url: '/ftpConfig',
                templateUrl: 'app/pages/upgradeManagement/ftpConfig/ftpConfig.html',
                title: 'FTP Server Config',
                controller: 'ftpConfigCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/upgradeManagement/ftpConfig/ftpConfigCtrl.js',
                            'app/pages/upgradeManagement/ftpConfig/ftpConfigService.js',
                            'app/theme/components/messageAlert/messageAlert.service.js'
                        ]);
                    }
                }
            })
    }

})();