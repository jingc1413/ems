(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration', [
            // 'SunWave.pages.AlarmConfiguration.AlarmCompress',
            'SunWave.pages.AlarmConfiguration.AlarmConfig',
            'SunWave.pages.AlarmConfiguration.AlarmKind',
            'SunWave.pages.AlarmConfiguration.AlarmLevel',
            'SunWave.pages.AlarmConfiguration.AlarmMask',
            'SunWave.pages.AlarmConfiguration.generationSettings',
            'SunWave.pages.AlarmConfiguration.AlarmForward'

        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('AlarmConfiguration', {
                url: '/AlarmConfiguration',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Alarm Configuration',
                sidebarMeta: {
                    icon: 'fa fa-wrench',
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