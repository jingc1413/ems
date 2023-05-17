(function() {
    'use strict';

    angular.module('SunWave.pages.sysManagement.sysParameter', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('sysManagement.sysParameter', {
                url: '/sysParameter',
                templateUrl: 'app/pages/sysManagement/parameterConfiguration/parameterConfiguration.html',
                title: 'parameter Configuration',
                controller: 'parameterConfigurationCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/sysManagement/parameterConfiguration/parameterConfigurationCtrl.js',
                                'app/pages/sysManagement/parameterConfiguration/parameterConfigurationService.js',
                                'app/pages/deviceManagement/deviceList/deviceListService.js',
                                'app/pages/AlarmConfiguration/AlarmForward/AlarmForwardService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();