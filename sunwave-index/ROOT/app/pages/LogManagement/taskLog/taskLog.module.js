(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.taskLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.taskLog', {
                url: '/taskLog',
                templateUrl: 'app/pages/LogManagement/taskLog/taskLog.html',
                title: 'Task Log',
                controller: 'taskLogCtrl',
                sidebarMeta: {
                    order: 5,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/taskLog/taskLogCtrl.js',
                                'app/pages/LogManagement/taskLog/taskLogService.js'
                                // 'assets/js/wui-date.js'
                            ]
                        });
                    }
                }
            })
    }

})();