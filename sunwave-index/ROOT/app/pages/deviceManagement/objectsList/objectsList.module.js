(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.objectsList', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('deviceManagement.objectsList', {
                url: '/objectsList',
                templateUrl: 'app/pages/deviceManagement/objectsList/objectsList.html',
                title: 'Objects List',
                controller: 'objectsListCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [

                                'app/pages/deviceManagement/objectsList/objectsListCtrl.js',
                                'app/pages/deviceManagement/objectsList/objectsListService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js'
                            ]
                        });
                    }
                }
            })
    }

})();