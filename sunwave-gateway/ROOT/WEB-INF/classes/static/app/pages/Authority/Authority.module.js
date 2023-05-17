(function() {
    'use strict';

    angular.module('SunWave.pages.Authority', [
            'SunWave.pages.Authority.organization',
            'SunWave.pages.Authority.area',
            'SunWave.pages.Authority.safe',
            'SunWave.pages.Authority.role',
            // 'SunWave.pages.Authority.safeManage',
            'SunWave.pages.Authority.SeacurityManagement',
            'SunWave.pages.Authority.SeacurityManagement.IpblackList',
            'SunWave.pages.Authority.SeacurityManagement.seacurityRules'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('Authority', {
                url: '/Authority',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Authority Management',
                sidebarMeta: {
                    icon: 'fa fa-user',
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