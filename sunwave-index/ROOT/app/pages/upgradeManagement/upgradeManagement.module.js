(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement', [
            'SunWave.pages.upgradeManagement.batchUpgrade',
            'SunWave.pages.upgradeManagement.upGradeFiles',
            'SunWave.pages.upgradeManagement.ftpConfig'
            // 'SunWave.pages.upgradeManagement.CPEfileManagement',
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('upgradeManagement', {
                url: '/upgradeManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Upgrade Management',
                title_chinese: '升级管理',
                sidebarMeta: {
                    icon: 'fa fa-arrow-circle-up',
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