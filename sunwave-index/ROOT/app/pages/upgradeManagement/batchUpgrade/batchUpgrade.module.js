(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.batchUpgrade', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('upgradeManagement.batchUpgrade', {
                url: '/batchUpgrade',
                templateUrl: 'app/pages/upgradeManagement/batchUpgrade/batchUpgrade.html',
                title: 'Batch Upgrade',
                controller: 'batchUpgradeCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/upgradeManagement/batchUpgrade/batchUpgradeCtrl.js',
                                'app/pages/upgradeManagement/batchUpgrade/batchUpgradeService.js',
                                'app/pages/upgradeManagement/upGradeFiles/upGradeFilesService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/sysManagement/vendorManagement/vendorManagementService.js',
                                'app/pages/PollingManagement/PollingTask/PollingTaskService.js',
                                'app/pages/Authority/area/areaService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();