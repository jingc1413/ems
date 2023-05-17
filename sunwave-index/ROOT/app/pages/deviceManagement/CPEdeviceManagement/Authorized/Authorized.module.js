(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.CPEdeviceManagement.CPEdevice', { //路由
                url: '/CPEdevice',
                templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/Authorized.html',
                title: 'CPEdevice',
                controller: 'AuthorizedCtrl',
                params: { 'Status': null },
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedCtrl.js',
                                'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                            ]
                        });
                    }
                }
            })
    }

})();