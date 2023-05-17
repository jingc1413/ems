(function() {
    'use strict';

    angular.module('SunWave.pages.login', [])
        .controller('LoginController', loginController);

    function loginController($scope, $http, $state, $location, authenticationSvc) {
        // alert('login');

        $scope.user = {
            username: "",
            password: ""
        }

        $scope.login = function() {
            console.log('begin login================');
            authenticationSvc.login($scope.user.username, $scope.user.password).then(function successCallback(response) {
                // console.log('username'+$scope.user.username);
                console.log('登录成功,准备跳往首页....')
                $rootScope.userInfo = response;
                console.log("看这里---" + $rootScope.userInfo)
                $state.go("dashboard");
                // $location.path("/dashboard");
                $scope.$apply();

            });



        }

        $scope.getUserInfo = function() {
            $http({
                method: 'POST',
                url: Url + "/uaa/user",
                // headers: {
                //     // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
                //     "Authorization": 'Basic ' + encodedString,
                // },
                // data: data

            }).then(function successCallback(response) {
                console.log(response)

            })
        }

    }
})();