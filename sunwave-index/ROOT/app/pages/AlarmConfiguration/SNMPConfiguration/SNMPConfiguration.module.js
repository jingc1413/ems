(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.SNMPConfiguration', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.SNMPConfiguration', {
                url: '/SNMPConfiguration',
                templateUrl: 'app/pages/AlarmConfiguration/SNMPConfiguration/SNMPConfiguration.html',
                title: 'SNMPConfiguration',
                controller: 'SNMPConfigurationCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/SNMPConfiguration/SNMPConfigurationCtrl.js',
                                'app/pages/AlarmConfiguration/SNMPConfiguration/SNMPConfigurationService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();