(function() {
    'use strict';

    angular.module('SunWave.pages.upgradeManagement.upGradeFiles', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('upgradeManagement.upGradeFiles', {
                url: '/upGradeFiles',
                templateUrl: 'app/pages/upgradeManagement/upGradeFiles/upGradeFiles.html',
                title: 'Upgrade Files',
                controller: 'upGradeFilesCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/pages/upgradeManagement/upGradeFiles/upGradeFilesCtrl.js',
                            'app/pages/upgradeManagement/upGradeFiles/upGradeFilesService.js',
                            'app/pages/deviceManagement/deviceList/deviceListService.js',
                            'app/pages/upgradeManagement/ftpConfig/ftpConfigService.js',
                            'app/pages/upgradeManagement/ftpConfig/ftpConfigService.js'


                        ]);
                    }
                }
            })
    }

})();