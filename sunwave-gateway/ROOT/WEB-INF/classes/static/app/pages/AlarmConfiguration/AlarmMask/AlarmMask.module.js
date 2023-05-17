(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmMask', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.AlarmMask', {
                url: '/Alarm Mask',
                templateUrl: 'app/pages/AlarmConfiguration/AlarmMask/AlarmMask.html',
                title: 'Alarm Mask',
                controller: 'AlarmMaskCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/AlarmMask/AlarmMaskCtrl.js',
                                'app/pages/AlarmConfiguration/AlarmMask/AlarmMaskService.js'
                            ]
                        });
                    }
                }
            })
    }

})();