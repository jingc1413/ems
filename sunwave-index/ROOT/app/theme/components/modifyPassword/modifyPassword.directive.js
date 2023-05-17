(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .directive('passwordModify', passwordModify);

    /** @ngInject */
    function passwordModify($uibModal) {
        return {
            restrict: 'E',
            // templateUrl: 'app/theme/components/modifyPassword/modifyPassword.html',
            // controller: 'modifyPasswordCtrl',
            link: function($scope, elem) {
                $scope.$on('toMyAlert', function(event, data) {
                    $scope.rules = data;
                    $scope.isMustModifyPassword = $scope.rules.isMustModifyPassword;
                    if ($scope.isMustModifyPassword == "0") {
                        // $scope.isModify = true;
                        $scope.openPasswordModifyModal = function() {
                            $scope.firstLogFlag = true;
                            $scope.mustModifyFlag = false;
                            var modalInstance = $uibModal.open({
                                animation: true,
                                backdrop: 'static',
                                keyboard: false,
                                templateUrl: 'app/theme/components/modifyPassword/modifyPassword.html',
                                controller: 'modifyPasswordCtrl',
                                size: "lg",
                                resolve: {
                                    mustModifyFlag: function() {
                                        return $scope.mustModifyFlag;
                                    },
                                    firstLogFlag: function() {
                                        return $scope.firstLogFlag;
                                    },
                                    // checkedItems: function() {
                                    //     return $scope.checkedItems;
                                    // },
                                    // NotInServiceService: function() {
                                    //     return NotInServiceService;
                                    // },
                                    deps: ['$ocLazyLoad',
                                        function($ocLazyLoad) {
                                            return $ocLazyLoad.load([
                                                'app/theme/components/modifyPassword/modifyPasswordCtrl.js',
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

                        $scope.openPasswordModifyModal();
                    }

                });
                // $scope.close = function() {
                //     $scope.isModify = false;
                // };
            }
        };
    }

})();