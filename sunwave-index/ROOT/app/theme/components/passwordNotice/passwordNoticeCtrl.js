(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('passwordNoticeCtrl', passwordNoticeCtrl);

    /** @ngInject */
    function passwordNoticeCtrl($scope, $uibModalInstance, $uibModal) {
        $scope.close = function(changedNodes) {

            $uibModalInstance.close(changedNodes);

        };

        $scope.modifyPassword = function() {
            $scope.firstLogFlag = true;
            $scope.mustModifyFlag = true;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/theme/components/modifyPassword/modifyPassword.html',
                controller: 'modifyPasswordCtrl',
                size: "md",
                resolve: {
                    firstLogFlag: function() {
                        return $scope.firstLogFlag;
                    },
                    mustModifyFlag: function() {
                        return $scope.mustModifyFlag;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/theme/components/modifyPassword/modifyPasswordCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                //console.log(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                //console.log(newItems);
            });
        }
    }
})();