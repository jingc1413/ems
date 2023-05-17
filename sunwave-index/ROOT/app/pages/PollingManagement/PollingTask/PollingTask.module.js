(function() {
    'use strict';

    angular.module('SunWave.pages.PollingManagement.PollingTask', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('PollingManagement.PollingTask', {
                url: '/PollingTask',
                templateUrl: 'app/pages/PollingManagement/PollingTask/PollingTask.html',
                title: 'Polling Task',
                controller: 'PollingTaskCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/PollingManagement/PollingTask/PollingTaskCtrl.js',
                                'app/pages/PollingManagement/PollingTask/PollingTaskService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'libs/css/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
                                'libs/jquery/bootstrap-switch/dist/js/bootstrap-switch.js',
                                'app/theme/inputs/baSwitcher/baSwitcher.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();