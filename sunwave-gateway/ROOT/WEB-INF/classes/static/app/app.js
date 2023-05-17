'use strict';

 var Url = 'http://10.7.3.249:9030';
//var Url = 'http://60.191.19.198:9030';


var app = angular.module('SunWave', [
    'tm.pagination',
    'buttonPermission',
    'wui.date',
    'ngAnimate',
    'ui.bootstrap',
    'ui.sortable',
    'ui.router',
    'ngTouch',
    'toastr',
    'ui.slimscroll',
    'oc.lazyLoad',
    // Modules
    'SunWave.theme',
    'SunWave.pages',
    'ngCookies',
    'ngStorage',
    'pascalprecht.translate'
]);

// app.factory('HttpInterceptor', ['$rootScope', '$window', '$location', '$q', '$injector',
//     function($rootScope, $window, $location, $q, $injector) {
//         var httpInterceptor = {
//             request: function(config) {
//                 // console.log('Enter into httpInterceptor with config');
//                 // console.log(config);
//                 var encodedString = btoa("webApp:123456");
//                 var user = $window.sessionStorage["userInfo"];
//                 var url = config.url;
//                 if (url.indexOf('/oauth/token') != -1) { //进行登录设置头
//                     config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;';
//                     config.headers['Authorization'] = 'Basic ' + encodedString;
//                 } else { //其他页面请求,头里增加token
//                     if (user) {
//                         var userInfo = JSON.parse(user);
//                         if (userInfo) {
//                             config.headers['Authorization'] = 'Bearer ' + userInfo.accessToken;
//                         }
//                     }
//                 }
//                 // console.log('Exist from httpInterceptor with config:')
//                 // console.log(config);
//                 return config || $q.when(config);
//             },
//             responseError: function(response) {
//                 // console.log('Error responseError');
//                 // console.log(response);
//                 var user = $window.sessionStorage["userInfo"];
//                 if (response.status == 401 || response.status == -1) { //无权限登录
//                     if (response.config.url.indexOf("/logout") != -1) {
//                         $window.sessionStorage["userInfo"] = null;
//                     } //清除用户信息
//                     $rootScope.authenticated = false;

//                     return $q.reject({ authenticated: false });;

//                 }
//                 return $q.reject(response);
//             }

//         };
//         return httpInterceptor;
//     }
// ]);
// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.interceptors.push('HttpInterceptor');
// }]);
//app.constant('HttpURL', 'http://10.7.3.249:9030');
