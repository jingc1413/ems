(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.monitorType', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sysManagement.monitorType', {
                url: '/monitorType',
                title: 'monitorType Management',
                templateUrl: 'app/pages/sysManagement/monitorType/monitorType.html',
                controller: 'monitorTypeCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/sysManagement/monitorType/monitorTypeCtrl.js',
                            'app/pages/sysManagement/monitorType/monitorTypeService.js',
                            'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                        ]);
                    }
                }
            })
    }

})();