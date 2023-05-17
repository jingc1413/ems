(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.role', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.role', {
                url: '/role',
                templateUrl: 'app/pages/Authority/role/role.html',
                title: 'Role Management',
                controller: 'roleCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/role/roleCtrl.js',
                                'app/pages/Authority/role/roleService.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/pages/Authority/organization/organizationService.js'
                            ]
                        });
                    }
                }
            })
    }

})();