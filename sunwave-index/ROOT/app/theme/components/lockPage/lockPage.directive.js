/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('lockPage', lockPage);

    /** @ngInject */
    function lockPage($rootScope, $window, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/lockPage/lockPage.html',
            controller: 'lockPageCtrl',
            link: function($scope, elem) {
                // var lockFlag = false;

                var lockShowFun = function() {
                    let lockFlag = true;
                    // $timeout(function() {
                    $scope.isLock = true;
                    // });
                    // $scope.isLock = true;
                    $scope.psdInput = '';
                    $window.sessionStorage.setItem('lockFlag', lockFlag);
                    // $scope.$apply();

                    return lockFlag;
                };


                //解码
                var uncompileStr = function(code) {
                    code = unescape(code);
                    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
                    for (var i = 1; i < code.length; i++) {
                        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
                    }
                    return c;
                };
                $scope.$on('toLockPage', function(event, data) {
                    lockShowFun();
                    $scope.psdFromMain = data;
                });
                $scope.goIndex = function() {
                    let psd = $window.sessionStorage.getItem('psdFromMain');
                    let unpsd = uncompileStr(psd);
                    if ($scope.psdInput == unpsd) {
                        $scope.isLock = false;
                        $scope.lockFlag = false;
                        $window.sessionStorage.removeItem('lockFlag');
                        $window.sessionStorage.setItem('lockFlag', $scope.lockFlag);

                    } else {
                        alert('Password Error!');
                    }
                }
            }
        };
    }

})();