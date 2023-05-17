(function() {
    'use strict';

    // var url = ['SunWave.pages.LogManagement.deviceLog',
    //     'SunWave.pages.LogManagement.taskLog',
    //     // 'SunWave.pages.LogManagement.systemLog',
    //     'SunWave.pages.LogManagement.upgradeLog',
    //     'SunWave.pages.LogManagement.serverStatus',
    //     'SunWave.pages.LogManagement.heartbeatLog',
    //     'SunWave.pages.LogManagement.alarmTransferLog',
    //     'SunWave.pages.LogManagement.sysLog'
    // ];
    // var urlList = $rootScope.urlList;
    // $scope.$on('toRouteUrl', function(event, data) {
    //     $scope.data = data;
    // });

    angular.module('SunWave.pages.LogManagement.CPElogManagement', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('LogManagement.CPElogManagement', {
                url: '/CPElogManagement',
                title: 'CPE logManagement',
                templateUrl: 'app/pages/LogManagement/CPElogManagement/logManagement.html',
                controller: 'logManagementCtrl',
                sidebarMeta: {
                    icon: 'fa fa-file',
                    order: 600,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/LogManagement/CPElogManagement/logManagementCtrl.js',
                            'app/pages/LogManagement/CPElogManagement/logManagementService.js'

                        ]);
                    }
                }
            })
            // $urlRouterProvider.when('/sys','/sys/announcement');
    }

})();