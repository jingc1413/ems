(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement', [
            'SunWave.pages.AlarmManagement.currentAlarm',
            'SunWave.pages.AlarmManagement.historyAlarm',
            'SunWave.pages.AlarmManagement.maskAlarm',
            'SunWave.pages.AlarmManagement.ServerStatus',
            'SunWave.pages.AlarmManagement.ServerAlarm',
            'SunWave.pages.AlarmManagement.ServerAlarmHistory'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('AlarmManagement', {
                url: '/AlarmManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Alarm Management',
                sidebarMeta: {
                    icon: 'fa fa-bell',
                    order: 100,
                },
                // resolve: {
                //   lazyLoad: function($ocLazyLoad) {
                //       return $ocLazyLoad.load([
                //         'app/pages/sysManagement/sysAnnouncement/sysAnnouncementCtrl.js',
                //         'app/pages/sysManagement/sysAnnouncement/sysAnnouncementService.js'
                //       ]);
                //   }
                //}
            })
            // $urlRouterProvider.when('/sys','/sys/announcement');
    }

})();