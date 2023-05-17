(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.currentAlarm', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmManagement.currentAlarm', {
                url: '/currentAlarm',
                params: { "levelId": null, 'searchConditionSelected': null },
                templateUrl: 'app/pages/AlarmManagement/currentAlarm/currentAlarm.html',
                title: 'Current Alarm',
                controller: 'currentAlarmCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmManagement/currentAlarm/currentAlarmCtrl.js',
                                'app/pages/Authority/area/areaService.js',
                                // 'assets/js/wui-date.js',

                                'app/pages/AlarmManagement/currentAlarm/currentAlarmService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js',
                                'app/pages/top/topService.js',
                                'app/pages/AlarmConfiguration/AlarmLevel/AlarmLevelService.js',

                            ]
                        });
                    }
                }
            })
    }

})();