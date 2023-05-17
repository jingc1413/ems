(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.CPEmonitorManagement', [
            'SunWave.pages.reportManagement.CPEmonitorManagement.monitorTemplate',
            'SunWave.pages.reportManagement.CPEmonitorManagement.model'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('reportManagement.CPEmonitorManagement', {
                url: '/CPEmonitorManagement',
                title: 'CPEmonitorManagement',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                sidebarMeta: {
                    icon: 'fa fa-video-camera',
                    order: 1232,
                },
            })
    }

})();