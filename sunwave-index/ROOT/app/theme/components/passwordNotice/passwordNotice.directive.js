/**
 * Auto expand textarea field
 */
(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('passwordNotice', passwordNotice);

    /** @ngInject */
    function passwordNotice($uibModal) {
        return {
            restrict: 'E',
            // templateUrl: 'app/theme/components/passwordNotice/passwordNotice.html',
            // controller: 'passwordNoticeCtrl',
            link: function($scope, elem) {
                $scope.$on('toMyAlert', function(event, data) {
                    $scope.rules = data;
                    // $scope.rules.isPasswordRemind = '0';
                    if ($scope.rules.isPasswordRemind == '0') {
                        // $scope.isReminder = true;
                        // $scope.isModify = true;
                        $scope.openModal = function() {
                            // $scope.firstLogFlag = true;
                            var modalInstance = $uibModal.open({
                                animation: true,
                                backdrop: 'static',
                                keyboard: false,
                                templateUrl: 'app/theme/components/passwordNotice/passwordNotice.html',
                                controller: 'passwordNoticeCtrl',
                                size: "md",
                                resolve: {
                                    // checkedItems: function() {
                                    //     return $scope.checkedItems;
                                    // },
                                    deps: ['$ocLazyLoad',
                                        function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                'app/theme/components/passwordNotice/passwordNoticeCtrl.js',
                                            ]);
                                        }
                                    ]
                                }
                            });

                            modalInstance.result.then(function(newItems) {
                                //console.log(newItems);
                                // $scope.apply();
                            }, function(newItems) {
                                //console.log(newItems);
                            });
                        };

                        $scope.openModal();
                    }
                });
                // $scope.closeAlert = function() {
                //     $scope.isReminder = false;
                // };
                // setTimeout(function() {
                //     $scope.closeAlert();
                // }, 5000);


            }
        };
    }

})();