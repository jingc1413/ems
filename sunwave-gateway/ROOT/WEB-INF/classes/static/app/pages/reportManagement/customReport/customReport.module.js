(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.customReport', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reportManagement.customReport', {
                url: '/customReport',
                templateUrl: 'app/pages/reportManagement/customReport/customReport.html',
                title: 'Custom Report',
                controller: 'customReportCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/reportManagement/customReport/customReportCtrl.js',
                                'app/pages/reportManagement/customReport/customReportService.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js'

                            ]
                        });
                    }
                }
            })
    }

})();