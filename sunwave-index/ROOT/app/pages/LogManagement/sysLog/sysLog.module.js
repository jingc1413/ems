(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.sysLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.sysLog', {
                url: '/sysLog',
                templateUrl: 'app/pages/LogManagement/sysLog/sysLog.html',
                title: 'System Log',
                controller: 'sysLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/sysLog/sysLogCtrl.js',
                                'app/pages/LogManagement/sysLog/sysLogService.js'
                            ]
                        });
                    }
                }
            })
    }

})();