(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.deviceList', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.deviceList', {
                url: '/deviceList',
                templateUrl: 'app/pages/deviceManagement/deviceList/deviceList.html',
                title: 'Device List',
                controller: 'deviceListCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/deviceList/deviceListCtrl.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'assets/js/echarts.min.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js',
                                'app/pages/top/topService.js'

                            ]
                        });
                    }
                }
            })
    }

})();