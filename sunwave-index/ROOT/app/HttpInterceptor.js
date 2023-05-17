(function() {
    'use strict';
    // angular.module('SunWave', []);
    angular.module('SunWave')
        .factory('authService', authService);
    angular.module('SunWave')
        .factory('AuthInterceptor', AuthInterceptor);
    angular.module('SunWave')
        .factory('setupUibModal', setupUibModal);

    function authService($window, $rootScope) {
        //249需要
        if (Url.indexOf('http' == -1 || 'https' == -1)) {
            Url = $window.location.protocol + '//' + $window.location.hostname + Url;
            webSocketUrl = $window.location.hostname + webSocketUrl;
            webSocketUrl2 = $window.location.hostname + webSocketUrl2;
        };
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
                $window.sessionStorage.removeItem('lockFlag');
                $window.sessionStorage.removeItem('menuId');
                $window.sessionStorage.removeItem('userInfo');
                $window.sessionStorage.removeItem('psdFromMain');
            },
            clearUserInfo: function() {
                // $window.sessionStorage.removeItem('userInfo');
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
                $window.location.href = '/#/';
                $rootScope.authenticated = false;
                // $window.location.href = "http://" + $window.location.host + "/tprt/login";
            }
        }
    }

    function AuthInterceptor($rootScope, $q, $injector, $httpParamSerializer, authService) {
        var inFlightAuthRequest = null;
        var firstAlertFlag = true;

        // var api_refresh_token = '';
        var api_refresh_token = Url + '/uaa/oauth/token'
            // var api_refresh_token = '/oauth/token';
        if (api_refresh_token == null || api_refresh_token == '') {
            alert('No Access!');
            authService.clearAllToken();
            authService.toLogin();
        }
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
                //console.log(response.config.url);

                // console.info("-------------------------------");
                // console.info(response);

                if (response.config.url == api_refresh_token) {
                    // //console.log(JSON.stringify(response));

                    alert(response.data.error_description);
                    authService.clearAllToken();
                    // $rootScope.logout();
                    authService.toLogin();

                    // $scope.$broadcast('processSignOut');
                    // $rootScope.authenticated = false;
                    // $rootScope.user = {
                    //     username: "",
                    //     password: "",
                    //     verificationCode: "",
                    //     verificationKey: ""
                    // };
                } else {
                    angular.element('.modal-dialog').detach();
                    angular.element('.modal-backdrop').detach();
                    angular.element('.modal').remove();
                    switch (response.status) {
                        case 401:
                            //console.log('is 401==============')
                            //console.log(authService.getRefreshToken())
                            if (authService.getRefreshToken() == null) {
                                if (firstAlertFlag == true && (!response.data.error)) {
                                    alert(response.data);
                                    firstAlertFlag = false;
                                };
                                authService.clearAllToken();
                                // var aa = angular.element("modal-dialog");
                                // angular.element("modal-backdrop").css("display", "none");
                                authService.toLogin();
                                break;
                            } else {

                                var deferred = $q.defer();
                                var encodedString = btoa("webApp:123456");
                                authService.clearToken();
                                authService.clearUserInfo();
                                // console.info(inFlightAuthRequest);
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
                                    // console.info(r);
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
                                    // console.info("errorrrrrrrrrrrrrrr");
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
                        case 40001:
                            //console.log('is 40001==============');
                            alert('Service call failed')
                        case -1:
                            // $q.reject(response);
                            authService.clearAllToken();
                            authService.toLogin();

                            break;

                        case 403:
                            alert('Access is denied!');
                            $rootScope.logout();
                            // authService.clearAllToken();
                            authService.toLogin();
                            break;
                        case 500:
                           alert('Loading failed, please refresh the page or contact the administrator!');
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

    function setupUibModal($rootScope, $uibModalStack) {
        $rootScope.$on('$locationChangeStart', handleLocationChange);

        function handleLocationChange() {
            $uibModalStack.dismissAll();
        }
    }

})();

angular.module('SunWave').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);