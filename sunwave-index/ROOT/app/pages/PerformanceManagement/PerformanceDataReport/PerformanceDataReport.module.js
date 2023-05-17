(function() {
    'use strict';

    angular.module('SunWave.pages.PerformanceManagement.PerformanceDataReport', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('PerformanceManagement.PerformanceDataReport', {
                url: '/PerformanceDataReport',
                templateUrl: 'app/pages/PerformanceManagement/PerformanceDataReport/PerformanceDataReport.html',
                title: 'Performance Data Report',
                controller: 'PerformanceDataReportCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/PerformanceManagement/PerformanceDataReport/PerformanceDataReportCtrl.js',
                                'app/pages/PerformanceManagement/PerformanceDataReport/PerformanceDataReportService.js'
                            ]
                        });
                    }
                }
            })
            .state('PerformanceManagement.dataReportForm', {
                url: '/dataReportForm',
                title: 'dataReportForm',
                templateUrl: 'app/pages/PerformanceManagement/PerformanceDataReport/dataReportForm.html',
                controller: 'dataReportFormCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/PerformanceManagement/PerformanceDataReport/dataReportFormCtrl.js',
                                'app/pages/PerformanceManagement/PerformanceDataReport/PerformanceDataReportService.js'
                            ]
                        });
                    }
                },
                params: { 'id': null, },
            })
    }

})();