(function() {
    'use strict';
    // angular.module('SunWave', []);
    angular.module('SunWave')
        .factory('authService', authService);
    angular.module('SunWave')
        .factory('AuthInterceptor', AuthInterceptor);

    function authService($window) {
        return {
            getToken: function() {
                return $window.sessionStorage.getItem('access_token');
            },
            getRefreshToken: function() {
                return $window.sessionStorage.getItem('refresh_token');
            },
            setRefreshToken: function(token) {
                $window.sessionStorage.setItem('refresh_token', token);
            },
            setToken: function(token) {
                $window.sessionStorage.setItem('access_token', token);
            },

            clearAllToken: function() {
                $window.sessionStorage.removeItem('access_token');
                $window.sessionStorage.removeItem('refresh_token');
                $window.sessionStorage.removeItem('userInfo');
                $window.sessionStorage.removeItem('menuId');
            },
            clearUserInfo: function() {
                $window.sessionStorage.removeItem('userInfo');
            },
            clearToken: function() {
                $window.sessionStorage.removeItem('access_token');
            },
            isLoggedIn: function() {
                if ($window.sessionStorage.getItem('access_token') === null) {
                    return false;
                } else {
                    return true;
                }
            },
            toLogin: function() {
                $window.location.href = '/#/'
                    // $window.location.href = "http://" + $window.location.host + "/tprt/login";
            }
        }
    }

    function AuthInterceptor($q, $injector, $httpParamSerializer, authService) {
        var inFlightAuthRequest = null;
        // var api_refresh_token = '';
        var api_refresh_token = Url + '/uaa/oauth/token'
        return {
            request: function(config) {
                // //console.log('AuthInterceptor:')
                config.headers = config.headers || {};

                //console.log(config.url)
                if (config.url == api_refresh_token) { // 请求token
                    // //console.log("================")
                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;';
                    var encodedString = btoa("webApp:123456");
                    config.headers['Authorization'] = 'Basic ' + encodedString;
                } else {
                    if (authService.getToken()) { //有token，则在头部里增加token
                        config.headers.Authorization = 'Bearer ' + authService.getToken();
                    }
                }

                return config;
            },
            responseError: function(response) {
                //console.log('responseError');
                //console.log(response.config.url)
                if (response.config.url == api_refresh_token) {
                    alert(response.data.error_description);
                    authService.clearAllToken();
                    authService.toLogin();
                } else {
                    switch (response.status) {
                        case 401:
                            //console.log('is 401==============')
                            //console.log(authService.getRefreshToken())
                            if (authService.getRefreshToken() == null) {
                                //console.log('is 4001==============');

                                authService.clearAllToken();

                                authService.toLogin();
                                break;
                            } else {

                                var deferred = $q.defer();
                                var encodedString = btoa("webApp:123456");
                                authService.clearToken();
                                authService.clearUserInfo();

                                if (!inFlightAuthRequest) {
                                    //console.log('========1');
                                    var config = {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
                                            'Authorization': 'Basic ' + encodedString
                                        }
                                    };
                                    var data = {
                                        'refresh_token': authService.getRefreshToken(),
                                        'grant_type': "refresh_token",
                                    };
                                    inFlightAuthRequest = $injector.get("$http").post(
                                        api_refresh_token,
                                        $httpParamSerializer(data),
                                        config
                                    );
                                }
                                inFlightAuthRequest.then(function(r) {

                                    if (r == undefined) {
                                        authService.clearAllToken();
                                        authService.toLogin();
                                    } else {
                                        //console.log('========2');
                                        inFlightAuthRequest = null;
                                        // //console.log(JSON.stringify(r));
                                        //console.log('return====')
                                        //console.log(r)
                                        authService.setToken(r.data.access_token);
                                        authService.setRefreshToken(r.data.refresh_token)
                                        $injector.get("$http")(response.config).then(function(resp) {
                                            deferred.resolve(resp);
                                            //console.log('========3');
                                        }, function(resp) {
                                            deferred.reject(resp);
                                        });
                                    }

                                }, function(error) {
                                    inFlightAuthRequest = null;
                                    deferred.reject();
                                    authService.clearAllToken();
                                    authService.toLogin();
                                    return;
                                });
                                return deferred.promise;
                                break;
                                // case -1:
                                //     $q.reject(response);
                                //     authService.clearAllToken();
                                //     authService.toLogin();
                                //     $rootScope.authenticated = true;
                                //     break;
                            };
                        case 4001:
                            //console.log('is 4001==============');
                        case -1:
                            $q.reject(response);
                            authService.clearAllToken();
                            authService.toLogin();

                            break;

                        default:
                            return $q.reject(response);
                            break;
                    }
                    return response || $q.when(response);
                }
            }
        }
    }

})();

angular.module('SunWave').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);