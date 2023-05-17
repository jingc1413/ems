(function() {
    'use strict';

    angular.module('SunWave.pages.top', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('top', {
                url: '/top',
                templateUrl: 'app/pages/top/top.html',
                title: 'Topology Map',
                sidebarMeta: {
                    icon: 'fa fa-sitemap',
                    order: 0,
                },
                controller: 'topCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'assets/js/echarts.min.js',
                                'app/pages/top/topCtrl.js',
                                'app/pages/top/topService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js',
                                'app/pages/Authority/area/areaService.js',
                                // '../../../libs/css/bootstrap-select/dist/css/bootstrap-select.css',
                                // '../../../libs/css/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
                                // '../../../libs/jquery/bootstrap-select/dist/js/bootstrap-select.js',
                                // 'app/pages/top/selectpicker.directive.js',
                                // 'app/pages/top/GroupSelectpickerOptions.js',
                            ]
                        });
                    }
                }
            });
    }

})();