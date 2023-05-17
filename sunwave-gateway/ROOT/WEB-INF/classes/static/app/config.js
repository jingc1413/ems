angular.module('SunWave')

.constant('MODULE_CONFIG', [{
            name: 'xeditable',
            files: [
                '../libs/angular/angular-xeditable/dist/js/xeditable.js',
                '../libs/angular/angular-xeditable/dist/css/xeditable.css'
            ]
        },
        {
            name: 'angular-progress-button-styles',
            files: [
                '../libs/angular/angular-progress-button-styles/dist/angular-progress-button-styles.min.css',
                '../libs/angular/angular-progress-button-styles/dist/angular-progress-button-styles.min.js'
            ]
        },
        {
            name: 'smart-table',
            files: [
                '../libs/angular/angular-smart-table/dist/smart-table.js'
            ]
        },
        {
            name: 'ngJsTree',
            files: [
                '../libs/css/jstree/dist/themes/default/style.css',
                '../libs/angular/ng-js-tree/dist/ngJsTree.js'
            ]
        },
        {
            name: 'textAngular',
            files: [
                '../libs/angular/textAngular/dist/textAngular.css',
                '../libs/angular/textAngular/dist/textAngular.js',
                '../libs/angular/textAngular/dist/textAngularSetup.js'
            ]
        },
        {
            name: 'ui.select',
            files: [
                '../libs/css/angular-ui-select/dist/select.css',
                '../libs/angular/angular-ui-select/dist/select.js'
            ]
        }
    ])
    // oclazyload config
    .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: MODULE_CONFIG
        });
    }]);