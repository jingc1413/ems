(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmMask', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.AlarmMask', {
                url: '/Alarm Mask',
                templateUrl: 'app/pages/AlarmConfiguration/AlarmMask/AlarmMask_m.html',
                title: 'Alarm Mask',
                controller: 'AlarmMask_mCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/AlarmMask/AlarmMask_mCtrl.js',
                                'app/pages/AlarmConfiguration/AlarmMask/AlarmMaskService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'libs/css/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
                                'libs/jquery/bootstrap-switch/dist/js/bootstrap-switch.js',
                                'app/theme/inputs/baSwitcher/baSwitcher.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/pages/PollingManagement/PollingTask/PollingTaskService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();