(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.historyAlarm', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmManagement.historyAlarm', {
                url: '/historyAlarm',
                templateUrl: 'app/pages/AlarmManagement/historyAlarm/historyAlarm.html',
                title: 'History Alarm',
                controller: 'historyAlarmCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                // 'assets/js/wui-date.js',
                                'app/pages/AlarmManagement/historyAlarm/historyAlarmCtrl.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/pages/AlarmManagement/historyAlarm/historyAlarmService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js',
                                'app/pages/top/topService.js',
                                'app/pages/AlarmConfiguration/AlarmLevel/AlarmLevelService.js',
                                'app/pages/AlarmManagement/currentAlarm/currentAlarmService.js'
                            ]
                        });
                    }]
                }
            })
    }

})();