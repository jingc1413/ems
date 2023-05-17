(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmConfig', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.AlarmConfig', {
                url: '/AlarmConfig',
                templateUrl: 'app/pages/AlarmConfiguration/AlarmConfig/AlarmConfig.html',
                title: 'Alarm Config',
                controller: 'AlarmConfigCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/AlarmConfig/AlarmConfigCtrl.js',
                                'app/pages/AlarmConfiguration/AlarmConfig/AlarmConfigService.js',
                                'app/pages/AlarmConfiguration/AlarmLevel/AlarmLevelService.js',
                                'app/pages/AlarmConfiguration/AlarmKind/AlarmKindService.js'

                            ]
                        });
                    }
                }
            })
    }

})();