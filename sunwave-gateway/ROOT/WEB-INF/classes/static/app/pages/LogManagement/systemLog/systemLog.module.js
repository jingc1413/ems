(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.systemLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.systemLog', {
                url: '/systemLog',
                templateUrl: 'app/pages/LogManagement/systemLog/systemLog.html',
                title: 'System Log',
                controller: 'systemLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/systemLog/systemLogCtrl.js',
                                'app/pages/LogManagement/systemLog/systemLogService.js'
                                // 'assets/js/wui-date.js'
                            ]
                        });
                    }
                }
            })
    }

})();