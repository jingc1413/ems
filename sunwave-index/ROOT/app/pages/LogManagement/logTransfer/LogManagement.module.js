(function() {
    'use strict';

    var url = [
        'SunWave.pages.LogManagement.deviceLog',
        'SunWave.pages.LogManagement.taskLog',
        // 'SunWave.pages.LogManagement.systemLog',
        'SunWave.pages.LogManagement.upgradeLog',
        'SunWave.pages.LogManagement.serverStatus',
        'SunWave.pages.LogManagement.heartbeatLog',
        'SunWave.pages.LogManagement.alarmTransferLog',
        'SunWave.pages.LogManagement.sysLog',
        'SunWave.pages.LogManagement.CPElogManagement',
        'SunWave.pages.LogManagement.PSDeviceLog',
        'SunWave.pages.LogManagement.logTransfer',
        'SunWave.pages.LogManagement.dasLog',
        'SunWave.pages.LogManagement.HWLog'
    ];
    // var urlList = $rootScope.urlList;
    // $scope.$on('toRouteUrl', function(event, data) {
    //     $scope.data = data;
    // });

    angular.module('SunWave.pages.LogManagement', url)
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('LogManagement', {
                url: '/LogManagement',
                template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                // controller: 'TablesPageCtrl',
                title: 'Log Management',
                sidebarMeta: {
                    icon: 'fa fa-calendar',
                    order: 100,
                },
                //   resolve: {
                //     lazyLoad: function($ocLazyLoad) {
                //         return $ocLazyLoad.load([

                //         ]);
                //     }
                // }
            })
            // $urlRouterProvider.when('/sys','/sys/announcement');
    }

})();