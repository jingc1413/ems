(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.HWLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.HWLog', {
                url: '/HWLog',
                templateUrl: 'app/pages/LogManagement/HWLog/HWLog.html',
                title: 'HW Log',
                controller: 'HWLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/HWLog/HWLogCtrl.js',
                                'app/pages/LogManagement/HWLog/HWLogService.js'
                            ]
                        });
                    }
                }
            })
    }

})();