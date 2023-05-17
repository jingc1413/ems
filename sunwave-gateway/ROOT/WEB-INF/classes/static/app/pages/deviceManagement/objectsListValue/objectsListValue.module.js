(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.objectsListValue', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.objectsListValue', {
                url: '/objectsListValue',
                templateUrl: 'app/pages/deviceManagement/objectsListValue/objectsListValue.html',
                title: 'Objects Value',
                controller: 'objectsListValueCtrl',
                sidebarMeta: {
                    order: 2,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/deviceManagement/objectsListValue/objectsListValueCtrl.js',
                                'app/pages/deviceManagement/objectsListValue/objectsListValueService.js',
                            ]
                        });
                    }
                }
            })
    }

})();