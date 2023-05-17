(function() {
    'use strict';

    angular.module('SunWave.pages.PerformanceManagement.FormulaLibrary', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('PerformanceManagement.FormulaLibrary', {
                url: '/FormulaLibrary',
                templateUrl: 'app/pages/PerformanceManagement/FormulaLibrary/FormulaLibrary.html',
                title: 'Formula Library',
                controller: 'FormulaLibraryCtrl',
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/PerformanceManagement/FormulaLibrary/FormulaLibraryCtrl.js',
                                'app/pages/PerformanceManagement/FormulaLibrary/FormulaLibraryService.js'
                            ]
                        });
                    }
                }
            })
            // $urlRouterProvider.when('/sys','/sys/announcement');
    }

})();