(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.CPEfileManagement', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('upgradeManagement.CPEfileManagement', {
                url: '/CPEfileManagement',
                title: 'CPEfileManagement',
                templateUrl: 'app/pages/upgradeManagement/CPEfileManagement/fileManagement.html',
                controller: 'fileManagementCtrl',
                sidebarMeta: {
                    icon: 'fa fa-file',
                    order: 600,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/upgradeManagement/CPEfileManagement/fileManagementCtrl.js',
                            'app/pages/upgradeManagement/CPEfileManagement/fileManagementService.js'

                        ]);
                    }
                }
            });
    }

})();