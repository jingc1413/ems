(function () {
'use strict';

angular.module('SunWave.pages.deviceManagement.deviceMaintenance', [
    'SunWave.pages.deviceManagement.deviceMaintenance.deviceList',
])
    .config(routeConfig);

/** @ngInject */
function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('deviceMaintenance', {
            url: '/deviceMaintenance',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            // controller: 'TablesPageCtrl',
            title: 'Menu Level ',
            icon: 'fa fa-sitemap',
            subMenu: [{
                title: 'Menu Level 1.1',
                disabled: true
            }, {
                title: 'Menu Level 1.2',
                subMenu: [{
                    title: 'Menu Level 2.1',
                    disabled: true
                }]
            }]
        })
    // $urlRouterProvider.when('/sys','/sys/announcement');
}

})();
