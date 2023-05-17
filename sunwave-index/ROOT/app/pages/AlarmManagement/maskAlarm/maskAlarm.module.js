(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.maskAlarm', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmManagement.maskAlarm', {
                url: '/maskAlarm',
                templateUrl: 'app/pages/AlarmManagement/maskAlarm/maskAlarm.html',
                title: 'Mask Alarm',
                controller: 'maskAlarmCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                // 'assets/js/wui-date.js',
                                'app/pages/AlarmManagement/maskAlarm/maskAlarmCtrl.js',
                                'app/pages/Authority/area/areaService.js',

                                'app/pages/AlarmManagement/maskAlarm/maskAlarmService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js',
                                'app/pages/top/topService.js',
                                'app/pages/AlarmConfiguration/AlarmLevel/AlarmLevelService.js',
                                'app/pages/AlarmManagement/currentAlarm/currentAlarmService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();