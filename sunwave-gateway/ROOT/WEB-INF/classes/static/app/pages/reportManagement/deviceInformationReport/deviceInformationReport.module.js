(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.deviceInformationReport', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reportManagement.deviceInformationReport', {
                url: '/deviceInformationReport',
                templateUrl: 'app/pages/reportManagement/deviceInformationReport/deviceInformationReport.html',
                title: 'Device Information',
                controller: 'deviceInformationReportCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/reportManagement/deviceInformationReport/deviceInformationReportCtrl.js',
                                'app/pages/reportManagement/deviceInformationReport/deviceInformationReportService.js',
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