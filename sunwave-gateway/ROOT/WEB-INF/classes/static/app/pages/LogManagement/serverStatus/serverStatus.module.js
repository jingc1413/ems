(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.serverStatus', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.serverStatus', {
                url: '/serverStatus',
                templateUrl: 'app/pages/LogManagement/serverStatus/serverStatus.html',
                title: 'Server Status',
                controller: 'serverStatusCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/serverStatus/serverStatusCtrl.js',
                                'app/pages/LogManagement/serverStatus/serverStatusService.js'
                                // 'assets/js/wui-date.js'
                            ]
                        });
                    }
                }
            })
    }

})();