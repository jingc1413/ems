(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.SeacurityManagement.IpblockList_bl', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.SeacurityManagement.IpblockList_bl', {
                url: '/SeacurityManagement/IpblockList_bl',
                templateUrl: 'app/pages/Authority/SeacurityManagement/IpblockList_bl/IpblockList_bl.html',
                title: 'Delete IP BlockList',
                controller: 'IpblockList_blCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/SeacurityManagement/IpblockList_bl/IpblockList_blCtrl.js',
                                'app/pages/Authority/SeacurityManagement/IpblockList_bl/IpblockList_blService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();