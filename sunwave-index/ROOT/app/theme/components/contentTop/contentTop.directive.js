(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('contentTop', contentTop);

    /** @ngInject */
    function contentTop($rootScope, $location, $state) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/contentTop/contentTop.html',
            link: function($scope) {

                $scope.goDashboard = function() {
                    window.sessionStorage.setItem('menuTitle', 'Homepage');
                    $scope.activePageTitle = 'Homepage';
                };
                $scope.$watch(function() {
                    // $scope.activePageTitle = $state.current.title;
                    // if ($rootScope.menuTitle == 'Homepage' || $rootScope.menuTitle_chinese == '首页') {
                    //     $scope.activePageTitle = '';
                    //     return
                    // };
                    if ($rootScope.language === 'chinese') {
                        // $scope.activePageTitle = $state.current.menuTitle_chinese;
                        $scope.activePageTitle = window.sessionStorage.getItem('menuTitle_chinese');
                        if ($scope.activePageTitle == 'undefined') {
                            // $scope.activePageTitle = '';
                        };
                    } else if ($rootScope.language === 'english') {
                        // $scope.activePageTitle = $rootScope.menuTitle;
                        $scope.activePageTitle = window.sessionStorage.getItem('menuTitle');
                        if ($scope.activePageTitle && $scope.activePageTitle != 'Homepage') {

                        } else {
                            // $scope.activePageTitle = ''
                        };
                    } else {}
                });
            }
        };
    }

})();