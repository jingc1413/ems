(function() {
    'use strict';

    angular.module('SunWave.theme')
        .directive('max', max);

    // alert('11111');

    function max(id, event) {
        return {

            restrict: 'E',
            templateUrl: 'app/theme/directives/maxM.html',

            // require: "ngModel",
            link: function(scope, element, attrs, ctrl) {
                $scope.max = true;
                $scope.min = false;

                $scope.InitInterface = function(e, ele) {
                    if (window.screen) {
                        var mymodal = document.getElementById('mymodal');
                        $scope.wid = document.getElementById('mymodal').clientWidth;
                        $scope.hei = document.getElementById('mymodal').clientHeight;

                        $scope.myw = screen.availWidth;
                        $scope.myh = screen.availHeight;
                        window.moveTo(0, 0);
                        mymodal.style.width = $scope.myw + "px";
                        mymodal.style.height = $scope.myh + "px";
                        //偏移
                        mymodal.style.left = ($scope.wid - $scope.myw) / 2 + "px";
                        $scope.max = false;
                        $scope.min = true;
                    }
                };
                $scope.InitInterface2 = function(e, ele) {
                    if (window.screen) {
                        var mymodal = document.getElementById('mymodal');

                        $scope.myw = screen.availWidth;
                        $scope.myh = screen.availHeight;
                        // window.moveTo(0, 0);
                        mymodal.style.width = $scope.wid + "px";
                        mymodal.style.height = $scope.hei + "px";
                        mymodal.style.left = "0px";
                        $scope.min = false;
                        $scope.max = true;
                    }
                };
            }
        };
    }

})();