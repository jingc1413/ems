(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.deviceRecover', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.deviceRecover', {
                url: '/deviceRecover',
                templateUrl: 'app/pages/deviceManagement/deviceRecover/deviceRecover.html',
                title: 'Device Recovery',
                controller: 'deviceRecoverCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/deviceRecover/deviceRecoverCtrl.js',
                                'app/pages/deviceManagement/deviceRecover/deviceRecoverService.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();