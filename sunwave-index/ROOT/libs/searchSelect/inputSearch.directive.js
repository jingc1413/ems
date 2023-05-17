angular.module('SunWave')
    .directive('inputSearch', [function() {
        return {

            link: function(scope, element, attr) {

                var isFocus = true;

                var isOver = false;

                element.on('focus', function() {

                    angular.element(this.nextElementSibling).removeClass('hidden-cls');

                })

                element.on('keydown', function(evt) {

                    if (!this.nextElementSibling.children.length) {

                        return false;

                    }

                    if (isFocus) {

                        var currentLi = this.parentElement.getElementsByClassName('item-bg')[0];

                        if (38 == evt.keyCode && currentLi && currentLi.previousElementSibling) { //向上

                            var currentLi = this.parentElement.getElementsByClassName('item-bg')[0],

                                liHeight = currentLi ? currentLi.clientHeight : '',

                                offTop = liHeight;

                            angular.element(currentLi).removeClass('item-bg');

                            angular.element(currentLi.previousElementSibling).addClass('item-bg');



                            for (var i = 0, len = this.nextElementSibling.children.length; i < len; i++) {

                                if (this.nextElementSibling.children[i] == currentLi) {

                                    break;

                                }

                                offTop = offTop + liHeight;

                            }

                            offTop = Math.max(0, offTop - 2 * liHeight);

                            if (this.nextElementSibling.scrollTop > offTop) {

                                this.nextElementSibling.scrollTop = offTop;

                            }

                        } else if (40 == evt.keyCode) { //向下

                            var currentLi = this.parentElement.getElementsByClassName('item-bg')[0],

                                liHeight = currentLi ? currentLi.clientHeight : '',

                                offTop = liHeight;

                            if (!currentLi) {

                                angular.element(this.nextElementSibling.firstElementChild).addClass('item-bg');

                                return true;

                            }

                            if (currentLi.nextElementSibling) {

                                angular.element(currentLi).removeClass('item-bg');

                                angular.element(currentLi.nextElementSibling).addClass('item-bg');

                            }



                            for (var i = 0, len = this.nextElementSibling.children.length; i < len; i++) {

                                if (this.nextElementSibling.children[i] == currentLi) {

                                    break;

                                }

                                offTop = offTop + liHeight;

                            }

                            if (this.nextElementSibling.scrollTop > offTop) {

                                return false;

                            }

                            if (this.nextElementSibling.clientHeight < offTop && this.nextElementSibling.scrollTop + this.nextElementSibling.clientHeight - liHeight < offTop) {

                                this.nextElementSibling.scrollTop = offTop - this.nextElementSibling.clientHeight + liHeight;

                            }



                        } else if (13 == evt.keyCode && currentLi) {

                            var isHidden = angular.element(evt.target.nextElementSibling).hasClass('hidden-cls');

                            if (isHidden) {

                                angular.element(evt.target.nextElementSibling).removeClass('hidden-cls');

                            } else {

                                evt.target.value = currentLi.innerText;

                                angular.element(currentLi.parentElement).addClass('hidden-cls');

                                scope.inValue = evt.target.value;

                            }

                        }

                    }

                })

                element.on('input', function(evt) {

                    if (angular.element(this.nextElementSibling).hasClass('hidden-cls')) {

                        angular.element(this.nextElementSibling).removeClass('hidden-cls')

                    }

                    if (this.nextElementSibling.children.length) {

                        angular.element(this.nextElementSibling.getElementsByClassName('item-bg')[0]).removeClass('item-bg');

                        angular.element(this.nextElementSibling.children[0]).addClass('item-bg');

                    }

                    scope.$emit('selectInput', {

                        inputId: evt.target.id,

                        inputText: evt.target.value

                    });

                });

                angular.element(element[0].nextElementSibling).on('mousemove', function() {

                    isOver = true;

                })

                angular.element(element[0].nextElementSibling).on('mouseleave', function() {

                    isOver = false;

                })

                element.on('blur', function(evt) {

                    if (!isOver) {

                        angular.element(this.nextElementSibling).addClass('hidden-cls');

                    }

                });

            }

        };
    }]);