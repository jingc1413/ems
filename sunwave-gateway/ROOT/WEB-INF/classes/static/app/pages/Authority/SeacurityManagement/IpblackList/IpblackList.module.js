(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.SeacurityManagement.IpblackList', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.SeacurityManagement.IpblackList', {
                url: '/SeacurityManagement/IpblackList',
                templateUrl: 'app/pages/Authority/SeacurityManagement/IpblackList/IpblackList.html',
                title: 'IP Blacklist',
                controller: 'IpblackListCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/SeacurityManagement/IpblackList/IpblackListCtrl.js',
                                'app/pages/Authority/SeacurityManagement/IpblackList/IpblackListService.js'
                            ]
                        });
                    }
                }
            })
    }

})();