(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('buttonCtrl', buttonCtrl);

    /** @ngInject */
    function buttonCtrl($scope, $http) {
        // $scope.button1 = false;
        // $scope.button2 = false;
        // $scope.buttonData = [];
        // $scope.$on('toButton', function(event, data) {
        //     // alert(data);
        //     $scope.menuId = data;
        //     $scope.getButtons($scope.menuId);
        // });

        // $scope.getButtons = function(id) {
        //     $http({
        //         url: Url + "/sunwave-authority/authority/sysMenu/getMenuButtonById",
        //         method: "POST",
        //         params: {
        //             'menuId': id
        //         }
        //     }).success(function(res) {

        //         var buttonsArr1 = [];
        //         var buttonsArr2 = [];
        //         $scope.buttonData = res.data;
        //         // for (let i = 0; i < res.data.length; i++) {
        //         //     const element = res.data[i];

        //         //     if (element.dependents == '1') {

        //         //         buttonsArr1.push(element);
        //         //         $scope.buttonArr1 = buttonsArr1;
        //         //         $scope.button1 = true;
        //         //     } else if (element.dependents == '2') {
        //         //         buttonsArr2.push(element);
        //         //         $scope.buttonArr2 = buttonsArr2;
        //         //         $scope.button2 = true;


        //         //     } else {};


        //         // }
        //         // //console.log(res)


        //     }).error(function(err) {

        //     });
        // };
        // // this.btnData = $scope.buttonData;



    }
})();