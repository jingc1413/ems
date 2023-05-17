(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.vendorManagement', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sysManagement.vendorManagement', {
                url: '/vendorManagement',
                templateUrl: 'app/pages/sysManagement/vendorManagement/vendorManagement.html',
                title: 'Vendor Management',
                controller: 'vendorManagementCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/sysManagement/vendorManagement/vendorManagementCtrl.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js'
                            ]
                        });
                    }
                }
            })
    }

})();