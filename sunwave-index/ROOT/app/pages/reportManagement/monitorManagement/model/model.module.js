(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.CPEmonitorManagement.model', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reportManagement.CPEmonitorManagement.model', {
                url: '/model',
                title: 'model Management',
                templateUrl: 'app/pages/reportManagement/monitorManagement/model/model.html',
                controller: 'modelCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/reportManagement/monitorManagement/model/modelCtrl.js',
                            'app/pages/reportManagement/monitorManagement/model/modelService.js',
                            'app/pages/deviceManagement/CPEdeviceManagement/Authorized/AuthorizedService.js'
                        ]);
                    }
                }
            })
    }

})();