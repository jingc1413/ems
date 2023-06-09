(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.deviceList')
        .directive('myDir', myDir);

    alert('11111');

    function myDir($document) {
        return {
            restrict: 'AECM',
            require: "ngModel",
            link: function(scope, element, attrs, ctrl) {
                var startX = 0,
                    startY = 0,
                    x = 0,
                    y = 0;
                element = angular.element(document.getElementsByClassName("modal-dialog"));
                element.css({
                    position: 'relative',
                    cursor: 'move'
                });

                element.on('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }
            }
        };
    }

})();