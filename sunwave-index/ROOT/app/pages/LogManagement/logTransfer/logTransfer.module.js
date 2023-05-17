(function() {
    'use strict';

    angular.module('SunWave.pages.LogManagement.logTransfer', [])
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('LogManagement.logTransfer', {
                url: '/logTransfer',
                templateUrl: 'app/pages/LogManagement/logTransfer/logTransfer.html',
                title: 'logTransfer',
                controller: 'logTransferCtrl',
                sidebarMeta: {
                    order: 0,
                },
                resolve: {
                    lazyLoad: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/pages/LogManagement/logTransfer/logTransferCtrl.js',
                                'app/pages/LogManagement/logTransfer/logTransferService.js',
                                'app/theme/components/messageAlert/messageAlert.service.js',
                                // '../libs/css/bootstrap-select/dist/css/bootstrap-select.css',
                                // '../libs/jquery/bootstrap-select/dist/js/bootstrap-select.js',
                                '../libs/angular/angular-ui-select/dist/angularjs-dropdown-multiselect.min.js',
                                // 'app/pages/LogManagement/logTransfer/selectpicker.directive.js'
                            ]
                        });
                    }
                }
            })
    }

})();