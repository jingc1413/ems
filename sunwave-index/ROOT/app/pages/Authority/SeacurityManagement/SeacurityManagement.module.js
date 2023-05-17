(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.SeacurityManagement', [
            'SunWave.pages.Authority.SeacurityManagement.IpblockList',
            'SunWave.pages.Authority.SeacurityManagement.IpblockList_bl',
            'SunWave.pages.Authority.SeacurityManagement.seacurityRules'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('Authority.SeacurityManagement', {
                url: '/SeacurityManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Seacurity Management',
                sidebarMeta: {
                    icon: 'fa fa-adjust',
                    order: 2,
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