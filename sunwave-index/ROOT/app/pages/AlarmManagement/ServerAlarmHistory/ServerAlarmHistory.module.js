(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.ServerAlarmHistory', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmManagement.ServerAlarmHistory', {
                url: '/ServerAlarmHistory',
                templateUrl: 'app/pages/AlarmManagement/ServerAlarmHistory/ServerAlarmHistory.html',
                title: 'Server Alarm History',
                controller: 'ServerAlarmHistoryCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmManagement/ServerAlarmHistory/ServerAlarmHistoryCtrl.js',
                                'app/pages/AlarmManagement/ServerAlarmHistory/ServerAlarmHistoryService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();