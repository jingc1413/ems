(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.performanceReport', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reportManagement.performanceReport', {
                url: '/performanceReport',
                templateUrl: 'app/pages/reportManagement/performanceReport/performanceReport.html',
                title: 'Performance Report',
                controller: 'performanceReportCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/reportManagement/performanceReport/performanceReportCtrl.js',
                                'app/pages/reportManagement/performanceReport/performanceReportService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();