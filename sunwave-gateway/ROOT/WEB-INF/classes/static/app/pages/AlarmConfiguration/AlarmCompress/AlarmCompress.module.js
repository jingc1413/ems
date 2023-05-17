(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmCompress', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.AlarmCompress', {
                url: '/Alarm Compress',
                templateUrl: 'app/pages/AlarmConfiguration/AlarmCompress/AlarmCompress.html',
                title: 'Alarm Compress',
                controller: 'AlarmCompressCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/AlarmCompress/AlarmCompressCtrl.js',
                                // 'app/pages/AlarmConfiguration/AlarmCompress/AlarmCompressService.js'
                            ]
                        });
                    }
                }
            })
    }

})();