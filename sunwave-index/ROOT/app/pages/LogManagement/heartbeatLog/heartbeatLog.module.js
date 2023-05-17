(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.heartbeatLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.heartbeatLog', {
                url: '/heartbeatLog',
                templateUrl: 'app/pages/LogManagement/heartbeatLog/heartbeatLog.html',
                title: 'Heartbeat Log',
                controller: 'heartbeatLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/heartbeatLog/heartbeatLogCtrl.js',
                                'app/pages/LogManagement/heartbeatLog/heartbeatLogService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();