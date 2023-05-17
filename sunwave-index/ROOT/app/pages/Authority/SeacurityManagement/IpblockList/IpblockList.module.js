(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.SeacurityManagement.IpblockList', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.SeacurityManagement.IpblockList', {
                url: '/SeacurityManagement/IpblockList',
                templateUrl: 'app/pages/Authority/SeacurityManagement/IpblockList/IpblockList.html',
                title: 'IP BlockList',
                controller: 'IpblockListCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/SeacurityManagement/IpblockList/IpblockListCtrl.js',
                                'app/pages/Authority/SeacurityManagement/IpblockList/IpblockListService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();