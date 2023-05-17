(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.deviceLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.deviceLog', {
                url: '/deviceLog',
                templateUrl: 'app/pages/LogManagement/deviceLog/deviceLog.html',
                title: 'Device Log',
                controller: 'deviceLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/deviceLog/deviceLogCtrl.js',
                                'app/pages/LogManagement/deviceLog/deviceLogService.js'
                            ]
                        });
                    }
                }
            })
    }

})();