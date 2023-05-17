(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.upgradeLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.upgradeLog', {
                url: '/upgradeLog',
                templateUrl: 'app/pages/LogManagement/upgradeLog/upgradeLog.html',
                title: 'Upgrade Log',
                controller: 'upgradeLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/upgradeLog/upgradeLogCtrl.js',
                                'app/pages/LogManagement/upgradeLog/upgradeLogService.js'
                                // 'assets/js/wui-date.js'
                            ]
                        });
                    }
                }
            })
    }

})();