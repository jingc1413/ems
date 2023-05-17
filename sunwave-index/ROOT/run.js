angular.module('SunWave').run(["$rootScope", "$state", "$location", "authenticationSvc", function($rootScope, $state, $location, authenticationSvc) {
    $rootScope.$on("$routeChangeSuccess", function(userInfo) {
        console.log('====routeChangeSuccess===')
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
        console.log('====Enter info routeChangeError===')
        if (eventObj.authenticated === false) {
            console.log('not authenticated and ready go login page');
            $location.path("#/login");
        }
    });
    //var isLoaded = false;

    $rootScope.$on("$locationChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
        //监听url变化，在变化后做想要的处理
        var userInfo = authenticationSvc.getUserInfo();

        $rootScope.authenticated = false;
        // console.log('===============================')
        // console.log(toState.url);
        if (toState.url == '/') { //前往首页
            // console.log('goto  login----');
            if (userInfo != undefined) {
                $rootScope.authenticated = true;
                $location.path("dashboard");
                // $scope.$apply();
            } else {
                $rootScope.authenticated = false;
                $rootScope.user = {
                    username: "",
                    password: "",
                    verificationCode: "",
                    verificationKey: ""
                };
                console.log('?????????????????????????run else里：' + $rootScope.user.verificationKey);

            }


        } else {
            // console.log('not goto login');
            if (userInfo == undefined) {

                $location.path("/");
                $rootScope.authenticated = false;
                // $rootScope.user = {
                //     username: "",
                //     password: "",
                //     verificationCode: "",
                //     verificationKey: ""
                // };
                // authenticationSvc.logout();
                //if (!isLoaded) {
                //  isLoaded = true;
                authenticationSvc.getInitKey();
                // }
                console.log('?????????????????????????run里：' + $rootScope.user.verificationKey);
            } else {
                $rootScope.authenticated = true;

            }
        }
    });



    // 页面跳转时， 如没有账号信息， 则跳往登录页面
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        // console.log('====Enter info StateChangeStart with userInfo===')
        var userInfo = authenticationSvc.getUserInfo();
        $rootScope.authenticated = false;
        // console.log('===============================')
        // console.log(toState.url);
        if (toState.url == '/') { //前往首页
            // console.log('goto  login----');
            if (userInfo != undefined) {
                $rootScope.authenticated = true;
                $location.path("dashboard");
                // $scope.$apply();
            } else {
                $rootScope.authenticated = false;
            }

        } else {
            // console.log('not goto login');
            if (userInfo == undefined) {
                $rootScope.authenticated = false;
                $location.path("/");
                $rootScope.user = {
                    username: "",
                    password: "",
                    verificationCode: "",
                    verificationKey: ""
                };
                authenticationSvc.getInitKey();

            } else {
                $rootScope.authenticated = true;
            }
        }

    });
}]);