(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.dasLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.dasLog', {
                url: '/dasLog',
                templateUrl: 'app/pages/LogManagement/dasLog/dasLog.html',
                title: 'Das Log',
                controller: 'dasLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/dasLog/dasLogCtrl.js',
                                'app/pages/LogManagement/dasLog/dasLogService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();