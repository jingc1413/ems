(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmLevel', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.AlarmLevel', {
                url: '/AlarmLevel',
                templateUrl: 'app/pages/AlarmConfiguration/AlarmLevel/AlarmLevel.html',
                title: 'Alarm Level',
                controller: 'AlarmLevelCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/AlarmLevel/AlarmLevelCtrl.js',
                                'app/pages/AlarmConfiguration/AlarmLevel/AlarmLevelService.js',
                                // 'assets/css/colpick.css'
                                'app/theme/components/messageAlert/messageAlert.service.js'

                            ]
                        });
                    }
                }
            })
    }

})();