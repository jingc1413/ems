(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('pageTopCtrl', pageTopCtrl);

    /** @ngInject */
    function pageTopCtrl($scope, $uibModal) {

        $scope.openpdf = function() {
            window.open('/app/help.pdf');
        }
        $scope.openAbout = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/theme/components/pageTop/aboutModal.html',
                controller: 'aboutModalCtrl',
                size: "md",
                resolve: {
                    // checkedItems: function() {
                    //     return item;
                    // },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/theme/components/pageTop/aboutModalCtrl.js',
                                // 'app/pages/AlarmManagement/currentAlarm/currentAlarmModalCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                console.log(newItems);
            });
        }

        $scope.openPassword = function() {
            $scope.firstLogFlag = false;
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/theme/components/modifyPassword/modifyPassword.html',
                controller: 'modifyPasswordCtrl',
                size: "md",
                resolve: {
                    // checkedItems: function() {
                    //     return item;
                    // },
                    firstLogFlag: function() {
                        return $scope.firstLogFlag;
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
                console.log(newItems);
                // // $scope.items.push(newItems);
            }, function(newItems) {
                console.log(newItems);
            });
        }

    }
})();