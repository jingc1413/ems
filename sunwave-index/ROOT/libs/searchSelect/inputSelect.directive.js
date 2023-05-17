angular.module('SunWave')
    .directive('inputSelect', [function() {
        return {

            link: function(scope, element, attr) {

                element.on('click', function(evt) {

                    evt.target.parentElement.previousElementSibling.value = evt.target.textContent;

                    scope.inValue = evt.target.textContent;

                    if (evt.target.parentElement.getElementsByClassName('item-bg').length) {

                        angular.element(evt.target.parentElement.getElementsByClassName('item-bg')[0]).removeClass('item-bg');

                    }

                    angular.element(evt.target).addClass('item-bg');

                    angular.element(evt.target.parentElement).addClass('hidden-cls');

                    return true;

                });

            }

        };
    }]);