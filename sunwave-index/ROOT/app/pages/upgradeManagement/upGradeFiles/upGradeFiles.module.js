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
                title: 'UpgradeManagement > Upgrade Files',
                title_chinese: '升级管理 > 升级文件',
                controller: 'upGradeFilesCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/upgradeManagement/upGradeFiles/upGradeFilesCtrl.js',
                                'app/pages/upgradeManagement/upGradeFiles/upGradeFilesService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/upgradeManagement/ftpConfig/ftpConfigService.js',
                                'app/pages/upgradeManagement/ftpConfig/ftpConfigService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();