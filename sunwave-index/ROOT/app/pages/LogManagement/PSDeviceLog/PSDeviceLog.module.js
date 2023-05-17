(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.PSDeviceLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.PSDeviceLog', { //路由
                url: '/PSDeviceLog',
                templateUrl: 'app/pages/LogManagement/PSDeviceLog/PSDeviceLog.html',
                title: 'PSDeviceLog',
                controller: 'PSDeviceLogCtrl',
                // sidebarMeta: {
                //     order: 0,
                // },
                // params: {
                //     'item': null,
                //     'neNeid': null,
                // },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/PSDeviceLog/PSDeviceLogCtrl.js',
                                'app/pages/LogManagement/PSDeviceLog/PSDeviceLogService.js',
                            ]
                        });
                    }
                }
            })
    }

})();