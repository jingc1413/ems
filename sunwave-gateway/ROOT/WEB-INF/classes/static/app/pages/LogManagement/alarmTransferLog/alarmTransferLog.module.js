(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.alarmTransferLog', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.alarmTransferLog', {
                url: '/alarmTransferLog',
                templateUrl: 'app/pages/LogManagement/alarmTransferLog/alarmTransferLog.html',
                title: 'Alarmtransfer Log',
                controller: 'alarmTransferLogCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/alarmTransferLog/alarmTransferLogCtrl.js',
                                'app/pages/LogManagement/alarmTransferLog/alarmTransferLogService.js',
                                // 'assets/js/wui-date.js'
                            ]
                        });
                    }
                }
            })
    }

})();