(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.area', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.area', {
                url: '/area',
                templateUrl: 'app/pages/Authority/area/area.html',
                title: 'Area Management',
                controller: 'areaCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/area/areaCtrl.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();