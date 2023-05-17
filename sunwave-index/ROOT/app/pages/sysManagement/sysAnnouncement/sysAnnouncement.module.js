(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.sysAnnouncement', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sysManagement.sysAnnouncement', {
                url: '/sysAnnouncement',
                templateUrl: 'app/pages/sysManagement/sysAnnouncement/sysAnnouncement.html',
                title: 'System Announcement',
                controller: 'sysAnnouncementCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/sysManagement/sysAnnouncement/sysAnnouncementCtrl.js',
                                'app/pages/sysManagement/sysAnnouncement/sysAnnouncementService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();