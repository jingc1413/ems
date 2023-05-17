(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.safe', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.safe', {
                url: '/safe',
                templateUrl: 'app/pages/Authority/safe/safe.html',
                title: 'User Management',
                controller: 'safeCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/safe/safeCtrl.js',
                                'app/pages/Authority/safe/safeService.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/pages/Authority/organization/organizationService.js',
                                'app/pages/Authority/role/roleService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js'
                            ]
                        });
                    }
                }
            })
    }

})();