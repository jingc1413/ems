(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmKind', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('AlarmConfiguration.AlarmKind', {
                url: '/AlarmKind',
                templateUrl: 'app/pages/AlarmConfiguration/AlarmKind/AlarmKind.html',
                title: 'Alarm Kind',
                controller: 'AlarmKindCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/AlarmConfiguration/AlarmKind/AlarmKindCtrl.js',
                                'app/pages/AlarmConfiguration/AlarmKind/AlarmKindService.js'
                            ]
                        });
                    }
                }
            })
    }

})();