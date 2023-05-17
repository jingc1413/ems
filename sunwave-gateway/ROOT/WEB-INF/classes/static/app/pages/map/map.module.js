(function() {
    'use strict';

    angular.module('SunWave.pages.map', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('map', {
                url: '/map',
                templateUrl: 'app/pages/map/map.html',
                title: 'Map',
                sidebarMeta: {
                    icon: 'fa fa-globe',
                    order: 0,
                },
                controller: 'mapCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/map/mapCtrl.js',
                                'app/pages/map/mapService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/top/topService.js',

                                // 'assets/v6.3.1-dist/ol.js'
                            ]
                        });
                    }
                }
            });
    }

})();