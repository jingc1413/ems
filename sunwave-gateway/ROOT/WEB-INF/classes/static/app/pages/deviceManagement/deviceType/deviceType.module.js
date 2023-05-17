(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.deviceType', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.deviceType', {
                url: '/deviceType',
                templateUrl: 'app/pages/deviceManagement/deviceType/deviceType.html',
                title: 'Device Type',
                controller: 'deviceTypeCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/deviceType/deviceTypeCtrl.js',
                                'app/pages/deviceManagement/deviceType/deviceTypeService.js'
                            ]
                        });
                    }
                }
            })
    }

})();