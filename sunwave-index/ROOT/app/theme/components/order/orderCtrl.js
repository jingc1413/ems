(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('orderCtrl', orderCtrl);

    /** @ngInject */
    function orderCtrl($scope) {

        //console.log($scope.orderName);

        //排序
        $scope.faDown = true;
        $scope.faUp = false;


        // var name = $scope.orderName;
        $scope.orderFun = function(orderName) {
            if ($scope.faUp == true) {
                $scope.orderDesc = 'desc';
            } else if ($scope.faDown == true) {
                $scope.orderDesc = 'asc';
            } else {
                return
            };
            // //console.log(orderName);
            orderName = $scope.orderName;
            $scope.query.orderDesc = $scope.orderDesc;
            $scope.query.orderName = orderName;
            $scope.faDown = !$scope.faDown;
            $scope.faUp = !$scope.faUp;
            $scope.search();
        };

    }
})();