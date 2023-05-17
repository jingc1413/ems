(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.CPEmonitorManagement.monitorTemplate', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reportManagement.CPEmonitorManagement.monitorTemplate', {
                url: '/monitorTemplate',
                title: 'monitorTemplate',
                templateUrl: 'app/pages/reportManagement/monitorManagement/monitorTemplate/monitorTemplate.html',
                controller: 'monitorTemplateCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/reportManagement/monitorManagement/monitorTemplate/monitorTemplateCtrl.js',
                                'app/pages/reportManagement/monitorManagement/monitorTemplate/monitorTemplateService.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                            ]
                        });
                    }

                }
            })
            .state('reportManagement.CPEmonitorManagement.editMonitoring', {
                url: '/editMonitoring',
                title: 'editMonitoring',
                templateUrl: 'app/pages/reportManagement/monitorManagement/monitorTemplate/editMonitoring.html',
                controller: 'editMonitoringCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/reportManagement/monitorManagement/monitorTemplate/editMonitoringCtrl.js',
                                'app/pages/reportManagement/monitorManagement/monitorTemplate/monitorTemplateService.js',
                                'app/pages/reportManagement/monitorManagement/monitorTemplate/monitorTemplateCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                            ]
                        });
                    }
                },
                params: { 'taskId': null, 'isAdd': null },
            })
    }

})();