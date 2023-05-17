(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.CPEconfigManagement', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sysManagement.CPEconfigManagement', {
                url: '/CPEconfigManagement',
                templateUrl: 'app/pages/sysManagement/CPEconfigManagement/configManagement.html',
                title: 'CPEconfigManagement',
                controller: 'configManagementCtrl',
                sidebarMeta: {
                    icon: 'ion-android-laptop',
                    order: 101,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/pages/sysManagement/CPEconfigManagement/configManagementCtrl.js',
                                    'app/pages/sysManagement/CPEconfigManagement/configManagementService.js'
                                ],
                            }

                        );
                    }
                },
            });
    };

})();