(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.deviceStatus', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.deviceStatus', {
                url: '/deviceStatus',
                templateUrl: 'app/pages/deviceManagement/deviceStatus/deviceStatus.html',
                title: 'Device Status',
                controller: 'deviceStatusCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/deviceStatus/deviceStatusCtrl.js',
                                'app/pages/deviceManagement/deviceStatus/deviceStatusService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'


                            ]
                        });
                    }
                }
            })
    }

})();