(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('SettingsCtrl', SettingsCtrl);

    /** @ngInject */
    function SettingsCtrl($scope) {

        angular.element('.slide-out-div').tabSlideOut({
            tabHandle: '.handle', //class of the element that will be your tab
            pathToTabImage: '', //path to the image for the tab (optionaly can be set using css)
            imageHeight: '28px', //height of tab image
            imageWidth: '28px', //width of tab image
            tabLocation: 'right', //side of screen where tab lives, top, right, bottom, or left
            speed: 300, //speed of animation
            action: 'click', //options: 'click' or 'hover', action to trigger animation
            topPos: '200px', //position from the top
            fixedPosition: true //options: true makes it stick(fixed position) on scroll
        });

        $scope.colorsTopNav = [{
                theme: "default-navTop",
                active: true
            },
            {
                theme: "emerald",
                active: false
            },
            {
                theme: "peter-river",
                active: false
            },
            {
                theme: "midnight-blue",
                active: false
            },
            {
                theme: "alizarin",
                active: false
            },
        ];
        $scope.colorsSideBar = [{
                theme: "default-aside",
                active: true
            },
            {
                theme: "madison",
                active: false
            }
        ];

        $scope.check = function(item, array) {
            for (var i = 0; i < array.length; i++) {
                if (angular.equals(item, array[i])) {
                    item.active = true;
                } else {
                    array[i].active = false;
                }

            }
        };
    }
})();