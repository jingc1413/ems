(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.generationSettings', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.generalSettings', {
                url: '/general Settings',
                templateUrl: 'app/pages/AlarmConfiguration/generalSettings/generalSettings.html',
                title: 'General Settings',
                controller: 'generalSettingsCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/generalSettings/generalSettingsCtrl.js',
                                'app/pages/AlarmConfiguration/generalSettings/generalSettingsService.js'
                            ]
                        });
                    }
                }
            })
    }

})();