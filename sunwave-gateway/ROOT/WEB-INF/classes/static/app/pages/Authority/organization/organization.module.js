(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.organization', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.organization', {
                url: '/organization',
                templateUrl: 'app/pages/Authority/organization/organization.html',
                title: 'Menu Management',
                controller: 'organizationCtrl',
                sidebarMeta: {
                    order: 1,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/Authority/organization/organizationCtrl.js',
                            'app/pages/Authority/organization/organizationService.js',
                        ]);
                    }
                }
            })
    }

})();