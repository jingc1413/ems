(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('lockPageCtrl', lockPageCtrl);

    /** @ngInject */
    function lockPageCtrl($rootScope, $compile, $scope, $http, $window) {

        // var $html = $compile("<a href='' class='btn btn-success btn-rounded no-border' ng-click='goIndex();'><i class='fa fa-arrow-right'></i></a>")($scope);
        // $("#goindexBtn").append($html);
        $scope.isLock = false;
        $scope.psdInput = '';
        var lockFlag_s = $window.sessionStorage.getItem('lockFlag');
        if ($rootScope.authenticated == true) {
            if (lockFlag_s == 'true' || lockFlag_s == undefined) {
                $scope.isLock = true;
            };
        } else {
            return
        };

        // $scope.goIndex = function() {
        //     if ($scope.psdInput == $rootScope.user.password) {
        //         $scope.isLock = false;
        //         $scope.lockFlag = false;
        //         $window.sessionStorage.removeItem('lockFlag');
        //         $window.sessionStorage.setItem('lockFlag', $scope.lockFlag);

        //     } else {
        //         alert('Password Error!');
        //     }
        // }
    }
})();