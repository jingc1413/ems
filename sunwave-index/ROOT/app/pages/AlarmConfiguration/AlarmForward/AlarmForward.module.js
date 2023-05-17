(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmForward', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.AlarmForward', {
                url: '/AlarmForward',
                templateUrl: 'app/pages/AlarmConfiguration/AlarmForward/AlarmForward.html',
                title: 'Alarm Forward',
                controller: 'AlarmForwardCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/AlarmForward/AlarmForwardCtrl.js',
                                'app/pages/AlarmConfiguration/AlarmForward/AlarmForwardService.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();