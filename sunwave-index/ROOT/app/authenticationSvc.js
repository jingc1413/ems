angular.module('SunWave').factory("authenticationSvc", function($rootScope, $http, $httpParamSerializer, $q, $window, authService, $state) {

    var userInfo;
    var getItem;

    function init() {
        //console.log('init userInfo');
        if ($window.sessionStorage["userInfo"]) {
            //console.log('get userInfo from sessionStorage with userInfo:')

            // getItem = $window.sessionStorage.getItem('userInfo');
            // userInfo = JSON.parse(getItem);
            // userInfo = $.parseJSON(userInfo);
            userInfo = $window.sessionStorage.getItem('userInfo');

            //console.log(userInfo)
        }
    }

    init();

    function getUserInfo() {
        //console.log("====getUserInfo with userInfo===")
        var userInfo = $window.sessionStorage.getItem('userInfo');
        //console.log(userInfo);
        return userInfo;
    };

    //验证码初始化
    function getInitKey() {
        return $http({
            url: Url + '/uaa/loginPermit/getVerificationCode',
            method: "GET",
            // headers: {
            //     Accept: 'application/javascript; charset=utf-8',
            //     'Content-Type': 'application/javascript; charset=utf-8',
            //     'Access-Control-Allow-Origin': '*',
            // },
            // dataType: 'jsonp',
            // params: {
            //     "key": $rootScope.user.verificationKey
            // }
        }).success(function(res) {
            $rootScope.yzm_value = res.data.value;
            $rootScope.user.verificationKey = res.data.oauth_key;
            //console.log('?????????????????????????auth里：' + $rootScope.user.verificationKey);

        })
    };

    // function getKey() {
    //     return $http({
    //         url: Url + '/uaa/loginPermit/reflushVerificationCode',
    //         method: "GET",
    //         // headers: {
    //         //     Accept: 'application/javascript; charset=utf-8',
    //         //     'Content-Type': 'application/javascript; charset=utf-8',
    //         //     'Access-Control-Allow-Origin': '*',
    //         // },
    //         // dataType: 'jsonp',
    //         params: {
    //             "key": $rootScope.user.verificationKey
    //         }
    //     }).success(function(res) {
    //         $rootScope.yzm_value = res.data.value;
    //         $rootScope.user.verificationKey = res.data.oauth_key;
    //     })
    // };

    function login(userName, password, verificationCode, verificationKey, $scope) {
        //console.log('login========')


        var deferred = $q.defer();
        var data = {
            username: userName,
            password: password,
            verificationCode: verificationCode,
            verificationKey: verificationKey,
            grant_type: "password",
        };

        // var encodedString = btoa("webApp:123456");
        $http({
            method: 'POST',
            url: Url + '/uaa/oauth/token',
            // url: "http://10.7.3.249:9060/oauth/token",
            // headers: {
            //     // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
            //     "Authorization": 'Basic ' + encodedString,
            // },
            data: $httpParamSerializer(data)

        }).then(function successCallback(response) {
                //console.log('===login success with response====')
                //console.log(response)

                if (response == undefined || response.status != 200) {
                    deferred.reject("验证失败");
                } else {

                    //console.log(response);
                    userInfo = {
                        accessToken: response.data.access_token,
                        refleshToken: response.data.refresh_token,
                        userName: userName
                    };
                    // $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                    // user = JSON.parse($window.sessionStorage["userInfo"]);
                    $window.sessionStorage.setItem('userInfo', userInfo.userName);
                    $window.sessionStorage.setItem('refresh_token', userInfo.refleshToken);
                    $window.sessionStorage.setItem('access_token', userInfo.accessToken);
                    // $state.go("dashboard");


                    deferred.resolve(userInfo);
                }
            },
            function errorCallback(response) {
                // 请求失败执行代码
                $http({
                    method: 'POST',
                    url: Url + '/uaa/oauth/token',
                    // url: "http://10.7.3.249:9060/oauth/token",
                    // headers: {
                    //     // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
                    //     "Authorization": 'Basic ' + encodedString,
                    // },
                    data: $httpParamSerializer(data)

                }).success(function(err) {});


                //console.log('===login error with response====')
                //console.log(response)
            });


        return deferred.promise;
    }

    function logout() {
        //console.log("=====Enter into logout====");
        var deferred = $q.defer();
        $http({
            method: "Post",
            url: Url + '/uaa/exit',
            headers: {
                "access_token": $window.sessionStorage.getItem('access_token')
            }
        }).then(function(result) {
            //console.log("=====logout success====");
            $window.sessionStorage.removeItem('userInfo');
            authService.clearAllToken();

            // $window.sessionStorage.removeItem('access_token');
            // $window.sessionStorage.removeItem('refresh_token');
            userInfo = null;
            deferred.resolve(result);
        }, function(error) {
            //console.log('===logout error with response====');
            //console.log(error)
            deferred.reject(error);
        });

        // clearUserInfo();

        return deferred.promise;
    }

    // 清除用户信息
    function clearUserInfo() {
        $window.sessionStorage["userInfo"] = null;
        userInfo = null;
    }

    return {
        getUserInfo: getUserInfo,
        getInitKey: getInitKey,
        login: login,
        logout: logout,
        clearUserInfo: clearUserInfo

    };
});