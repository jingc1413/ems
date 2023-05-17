(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.SeacurityManagement.seacurityRules', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('Authority.SeacurityManagement.seacurityRules', {
                url: '/SeacurityManagement/seacurityRules',
                templateUrl: 'app/pages/Authority/SeacurityManagement/seacurityRules/seacurityRules.html',
                title: 'Seacurity Rules',
                controller: 'seacurityRulesCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/Authority/SeacurityManagement/seacurityRules/seacurityRulesCtrl.js',
                                'app/pages/Authority/SeacurityManagement/seacurityRules/seacurityRulesService.js'
                            ]
                        });
                    }
                }
            })
    }

})();