(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.safeManage', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.safeManage', {
                url: '/safeManage',
                templateUrl: 'app/pages/Authority/safeManage/safeManage.html',
                title: 'Seacurity Management',
                controller: 'safeManageCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/safeManage/safeManageCtrl.js',
                                'app/pages/Authority/safeManage/safeManageService.js'
                            ]
                        });
                    }
                }
            })
    }

})();