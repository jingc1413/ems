(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.CPEdeviceGroup', [
            'SunWave.pages.deviceManagement.CPEdeviceGroup.groupManagement'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider.state('deviceManagement.CPEdeviceGroup', {
            url: '/CPEdeviceGroup',
            template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            title: 'CPEdeviceGroup',
            sidebarMeta: {
                icon: 'fa fa-users',
                order: 3,
            },
        });
    }

})();