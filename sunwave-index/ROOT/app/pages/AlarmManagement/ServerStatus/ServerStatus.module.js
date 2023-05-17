(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmManagement.ServerStatus', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmManagement.ServerStatus', {
                url: '/ServerStatus',
                templateUrl: 'app/pages/AlarmManagement/ServerStatus/ServerStatus.html',
                title: 'Server Status',
                controller: 'ServerStatusCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmManagement/ServerStatus/ServerStatusCtrl.js',
                                'app/pages/AlarmManagement/ServerStatus/ServerStatusService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();