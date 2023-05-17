(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement', [
            'SunWave.pages.sysManagement.sysAnnouncement',
            'SunWave.pages.sysManagement.vendorManagement'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('sysManagement', {
                url: '/sysManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'System Management',
                sidebarMeta: {
                    icon: 'ion-android-laptop',
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