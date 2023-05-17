(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.NotInService', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.NotInService', {
                url: '/NotInService',
                templateUrl: 'app/pages/deviceManagement/NotInService/NotInService.html',
                title: 'Not In Service',
                controller: 'NotInServiceCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/NotInService/NotInServiceCtrl.js',
                                'app/pages/deviceManagement/NotInService/NotInServiceService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/pages/top/topService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                                // 'assets/js/wui-date.js',
                            ]
                        });
                    }
                }
            })
    }

})();