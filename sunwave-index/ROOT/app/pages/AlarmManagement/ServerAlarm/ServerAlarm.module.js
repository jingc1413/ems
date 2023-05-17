(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.ServerAlarm', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmManagement.ServerAlarm', {
                url: '/ServerAlarm',
                templateUrl: 'app/pages/AlarmManagement/ServerAlarm/ServerAlarm.html',
                title: 'Server Alarm',
                controller: 'ServerAlarmCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmManagement/ServerAlarm/ServerAlarmCtrl.js',
                                'app/pages/AlarmManagement/ServerAlarm/ServerAlarmService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();