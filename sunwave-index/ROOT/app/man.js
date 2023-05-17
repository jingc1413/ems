(function() {
    'use strict';

    /* Controllers */


    angular.module('SunWave')
        .controller('AppCtrl', ['$rootScope', '$translate', '$state', 'authenticationSvc', '$scope', '$window', '$http', '$interval', '$location', '$q', '$timeout',

            function($rootScope, $translate, $state, authenticationSvc, $scope, $window, $http, $interval, $location, $q, $timeout) {
                // add 'ie' classes to html
                var isIE = !!navigator.userAgent.match(/MSIE/i);
                isIE && angular.element($window.document.body).addClass('ie');
                isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

                // config
                $scope.app = {
                    name: 'SUNWAVE CROSSFIRE EMS',
                    version: '1.0',
                    // for chart colors
                    // Url: "http://10.7.3.249:9051",
                    settings: {
                        navbarHeaderColor: 'default-navTop',
                        asideColor: 'default-aside',
                        asideFolded: false,

                    }
                };
                var firstLogFlag = true;
                $rootScope.yzm_value = '';
                $rootScope.user = {
                    username: "",
                    password: "",
                    verificationCode: "",
                    verificationKey: ""
                };


                //锁屏
                var count = 0;
                $rootScope.outTime = 10; //分钟
                var outtime = $window.sessionStorage.getItem('outTime');
                if (outtime != null && outtime != undefined) {
                    $rootScope.outTime = outtime;
                } else {};
                // window.setInterval(go, 1000);
                var setLockScreen;
                var setAlarm;
                var setServerStatus;


                function go() {
                    var lockFlag_s = $window.sessionStorage.getItem('lockFlag');
                    if (lockFlag_s == 'false') {
                        count++;
                        if (count == $rootScope.outTime * 60) {
                            // alert("您因长时间未进行操作导致页面过期");
                            //console.log('锁屏了');
                            $scope.$broadcast("toLockPage", $rootScope.user.password);
                        }
                    } else {
                        return
                    }

                };
                var x;
                var y;
                //监听鼠标
                document.onmousemove = function(event) {
                    var x1 = event.clientX;
                    var y1 = event.clientY;
                    if (x != x1 || y != y1) {
                        count = 0;
                    }
                    x = x1;
                    y = y1;
                };

                //监听键盘
                document.onkeydown = function() {
                    count = 0;
                };
                setLockScreen = $interval(() => { go() }, 1000);


                // $rootScope.loading = false;



                // $scope.exitFun = function() {
                // window.addEventListener("beforeunload", $scope.listenClose, false);

                // window.onbeforeunload = function(event) {
                //     event.returnValue = "我在这写点东西...";
                // };

                // window.onunload = function(event) { return confirm("确定离开此页面吗？"); }

                // function beforeUnloadHandler(event) {
                //     // event.returnValue = "要离开吗？";
                //     var n = window.event.screenX - window.screenLeft;
                //     //获取浏览器界面可活动的窗口宽度（50是右上角关闭按钮的宽度）
                //     var b = n > document.documentElement.scrollWidth - 50;
                //     //window.event.clientY表示事件的y值（鼠标）
                //     //window.event.altKey表示是否按下列alt键（alt+F4）
                //     if (b && window.event.clientY < 0 || window.event.altKey) {
                //         alert("是关闭而非刷新");
                //         window.event.returnValue = "是否要离开此页面？";
                //     } else {
                //         alert("是刷新而非关闭");
                //     }

                // };

                // window.onbeforeunload = function() {
                //     alert("===onbeforeunload===");
                //     if (event.clientX > document.body.clientWidth && event.clientY < 0 || event.altKey) {
                //         alert("你关闭了浏览器");
                //     } else {
                //         alert("你正在刷新页面");
                //     }
                // };

                function beforeOnunload() {
                    alert('关闭页面啦');
                    // $scope.logout();
                };


                // window.addEventListener('beforeunload', beforeUnloadHandler, true);

                // window.addEventListener('beforeunload', beforeUnloadHandler);
                window.addEventListener('beforeunload', beforeOnunload);
                // function unListen() {
                //     window.removeEventListener('beforeunload', $scope.listenClose, false);
                // }

                // window.addEventListener("beforeunload", function(event) {
                //     event.returnValue = "";
                // }, false);

                // $scope.listenClose = function(e) {
                //     if (confirm('sure?')) {

                //         // var href = window.location.href;
                //         // window.open(href, "_self", "");
                //         // location.replace("about:blank");
                //         // window.close();
                //         $scope.logout();
                //     }

                //     // (e || window.event).returnValue = confirmationMessage;

                //     // return confirmationMessage;

                // };
                // };





                //getWebsocket
                var myVar;
                $scope.getWebsocket = function() {
                    $rootScope.websocket = null;
                    var userno = $rootScope.user.username;
                    // 判断当前浏览器是否支持WebSocket
                    if ('WebSocket' in window) {
                        $rootScope.websocket = new WebSocket("ws://10.7.3.249:9054/websocket/" + userno);
                    } else {
                        alert('Current browser Not support websocket')
                    }

                    // 连接发生错误的回调方法
                    $rootScope.websocket.onerror = function() {
                        //console.log("WebSocket连接发生错误");
                    };
                    // function toDo() {
                    //     if ($rootScope.user.username != "" && $rootScope.user.username != null) {
                    //         $rootScope.websocket.send($rootScope.user.username);
                    //         //console.log('send -------' + $rootScope.user.username);

                    //     } else {}
                    // };


                    // 连接成功建立的回调方法
                    $rootScope.websocket.onopen = function() {
                        //console.log("WebSocket连接成功");
                        // myTimer();
                        // myVar();
                        myVar = setInterval(() => { myTimer() }, 10000);

                        var myTimer = function() {
                            if ($rootScope.user.username != "" && $rootScope.user.username != null) {
                                if ($rootScope.authenticated == true) {
                                    $rootScope.websocket.send($rootScope.user.username);
                                    //console.log('send -------' + $rootScope.user.username);
                                } else {}

                            } else {}
                        };
                        myTimer();
                        // myVar();
                        // window.setInterval(toDo, 10000);
                        // myInterval();
                    };

                    function myStopFunction() {
                        window.clearInterval(myVar);
                    };

                    // 接收到消息的回调方法
                    $rootScope.websocket.onmessage = function(event) {
                        //deviceDetailNameModal里的接收消息
                        $rootScope.webSocketDeviceParamsData = JSON.parse(event.data);
                        //console.log($rootScope.webSocketDeviceParamsData);
                        return $rootScope.webSocketDeviceParamsData;
                    }

                    // 连接关闭的回调方法
                    $rootScope.websocket.onclose = function() {

                        if ($rootScope.authenticated == true) {
                            if ('WebSocket' in window) {
                                $rootScope.websocket = new WebSocket("ws://10.7.3.249:9054/websocket/" + userno);
                            } else {
                                alert('Current browser Not support websocket')
                            }
                        }

                        // setMessageInnerHTML("WebSocket连接关闭");
                    }

                    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                    window.onbeforeunload = function() {
                        closeWebSocket();
                    }

                    // 将消息显示在网页上
                    function setMessageInnerHTML(sendMessage) {
                        // document.getElementById('message').innerHTML += sendMessage + '<br/>';
                    }

                    // 关闭WebSocket连接
                    function closeWebSocket() {
                        websocket.close();
                    }

                    return {
                        myStopFunction: myStopFunction
                            // closeWebSocket: closeWebSocket
                    }

                };
                // $scope.getWebsocket();
                // 登出

                $rootScope.signOut = function() {
                    if (confirm('Exit will lose unsaved information. Are you sure you want to exit?')) {
                        var getWebsocketFun = $scope.getWebsocket();
                        getWebsocketFun.myStopFunction();
                        authenticationSvc.logout().then(function successCallback(response) {
                            $scope.$broadcast('processSignOut', function() {

                            });
                            // $scope.$on('to-parent', function(event, data) {
                            //     //console.log('ParentCtrl', event.name); //父级能得到值
                            // });
                            $location.path("/");
                            //console.log('signout成功，前往登录页....');
                            //console.log(response);
                            clearInterval(setLockScreen);
                            // $window.sessionStorage.removeItem('lockFlag');
                            $window.sessionStorage.clear();

                            $rootScope.authenticated = false;
                            $rootScope.user = {
                                username: "",
                                password: "",
                                verificationCode: "",
                                verificationKey: ""
                            };
                            $interval.cancel(setAlarm);
                            $interval.cancel(setServerStatus);
                            if (firstLogFlag == false) {
                                $scope.getKey();
                            };

                            //console.log($rootScope.authenticated);
                            // $state.go("dashboard");
                        }, function errorCallback(response) {
                            // 请求失败执行代码
                            $rootScope.authenticated = false;
                            // //console.log(response())
                        });
                    }
                }
                $rootScope.logout = function() {

                    // websocket.close();
                    // clearInterval(myVar);
                    var getWebsocketFun = $scope.getWebsocket();
                    getWebsocketFun.myStopFunction();
                    authenticationSvc.logout().then(function successCallback(response) {
                        $scope.$broadcast('processSignOut', function() {

                        });
                        // $scope.$on('to-parent', function(event, data) {
                        //     //console.log('ParentCtrl', event.name); //父级能得到值
                        // });
                        $location.path("/");
                        //console.log('logout成功，前往登录页....');
                        //console.log(response);
                        // $window.sessionStorage.removeItem('lockFlag');
                        $window.sessionStorage.clear();

                        $rootScope.authenticated = false;
                        $rootScope.user = {
                            username: "",
                            password: "",
                            verificationCode: "",
                            verificationKey: ""
                        };
                        $interval.cancel(setAlarm);
                        $interval.cancel(setServerStatus);
                        if (firstLogFlag == false) {
                            $scope.getKey();
                        };

                        //console.log($rootScope.authenticated);
                        // $state.go("dashboard");
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                        $rootScope.authenticated = false;
                        // //console.log(response())
                    });
                };


                //登陆用户状态判断
                var user = $window.sessionStorage.getItem('userInfo');
                if (user != undefined) {
                    $rootScope.user.username = user;
                } else {
                    // alert('用户已登出');
                    $rootScope.logout();
                }


                // // 初始化vConsole
                // window.vConsole = new window.VConsole({
                //     defaultPlugins: ['system', 'network', 'element', 'storage', 'performance'], // 可以在此设定要默认加载的面板
                //     maxLogNumber: 1000,
                //     onReady: function() {
                //         //console.log('vConsole is ready.');
                //     },
                //     onClearLog: function() {
                //         //console.log('on clearLog');
                //     }
                // });

                //规则初始化
                $scope.initRule = function() {
                    return $http({
                        url: Url + '/sunwave-authority/authority/sysRule/initPage',
                        method: "POST"
                    }).success(function(res) {
                        $scope.rules = res.data;
                        $scope.$broadcast("toMyAlert", $scope.rules);
                        $scope.isM = $scope.rules.isMustModifyPassword;
                    }), $scope.isM;
                };

                // $scope.openPasswordModifyModal = function() {

                //     var modalInstance = $uibModal.open({
                //         animation: true,
                //         templateUrl: 'app/theme/components/modifyPassword/modifyPassword.html',
                //         controller: 'modifyPasswordCtrl',
                //         size: "lg",
                //         resolve: {
                //             // checkedItems: function() {
                //             //     return $scope.checkedItems;
                //             // },
                //             // NotInServiceService: function() {
                //             //     return NotInServiceService;
                //             // },
                //             deps: ['$ocLazyLoad',
                //                 function($ocLazyLoad) {
                //                     return $ocLazyLoad.load([
                //                         'app/theme/components/modifyPassword/modifyPasswordCtrl.js',
                //                     ]);
                //                 }
                //             ]
                //         }
                //     });

                //     modalInstance.result.then(function(newItems) {
                //         //console.log(newItems);
                //         $scope.apply();
                //     }, function(newItems) {
                //         //console.log(newItems);
                //     });
                // };
                //菜单

                // $scope.searchMenuTree = function() {

                //     $http({
                //         url: Url + '/sunwave-authority/authority/sysMenu/initFrontMenuTree',
                //         method: "POST"
                //     }).success(function(response) {
                //         //console.log(response);
                //         $rootScope.menuItems = response.data;
                //         $rootScope.defaultSidebarState = $rootScope.menuItems[0].stateRef;

                //     }).error(function(err) {
                //         //console.log(err)
                //     });
                // };
                //加载serverStatus
                $scope.serverStatus = function() {
                    $http({
                        method: 'POST',
                        url: Url + '/sunwave-log-management/log/neComputer2/findTop10'
                    }).success(function(data, status, headers, config) {
                        $scope.servers = data.data;
                        $scope.$broadcast("toTopServerStatus", $scope.servers);
                    }).error(function(data, status, headers, config) {
                        //console.log(data);
                    });
                    setServerStatus = $interval(function() {
                        return $http({
                            method: 'POST',
                            url: Url + '/sunwave-log-management/log/neComputer2/findTop10'
                        }).success(function(data, status, headers, config) {
                            $scope.servers = data.data;
                            $scope.$broadcast("toTopServerStatus", $scope.servers);
                        }).error(function(data, status, headers, config) {
                            //console.log(data);
                        });
                    }, 180000);

                };
                //加载告警
                $scope.searchAlarms = function() {
                    $http({
                        method: 'POST',
                        url: Url + '/sunwave-alarm-management/alarm/alarmlog/findNewAlarmInfos'
                            // url: 'app/json/test.json'
                    }).success(function(data, status, headers, config) {
                        $scope.alarms = data.data;
                        $scope.$broadcast("toTopAlarm", $scope.alarms);
                    }).error(function(data, status, headers, config) {
                        //console.log(data);
                    });
                    setAlarm = $interval(function() {
                        return $http({
                            method: 'POST',
                            url: Url + '/sunwave-alarm-management/alarm/alarmlog/findNewAlarmInfos'
                                // url: 'app/json/test.json'
                        }).success(function(data, status, headers, config) {
                            $scope.alarms = data.data;
                            $scope.$broadcast("toTopAlarm", $scope.alarms);
                        }).error(function(data, status, headers, config) {
                            //console.log(data);
                        });
                    }, 180000);
                };




                //-------------------------------------------------------
                // $scope.asyncGreet = function(name) {
                //     var deferred = $q.defer();
                //     $timeout(function() {
                //         $http({
                //             method: 'POST',
                //             url: Url + '/sunwave-alarm-management/alarm/alarmlog/findNewAlarmInfos'
                //                 // url: 'app/json/test.json'
                //         }).success(function(res) {
                //             if (res.data != null) {
                //                 deferred.resolve('Hello,' + name + '!');
                //             } else {
                //                 deferred.reject('Greet' + name + 'is not allowed.');
                //             }
                //         })
                //     }, 5000);
                //     return deferred.promise;
                // };

                // var promise = $scope.asyncGreet('张三');
                // promise.then(function(greeting) {
                //     alert('Success: ' + greeting);
                // }, function(reason) {
                //     alert('Failed: ' + reason);
                // }, function(update) {
                //     alert('Got notification: ' + update);
                // });
                //-----------------------------------------------------------





                //加载菜单
                $scope.getSidebarData = function() {
                    return $http({
                        url: Url + '/sunwave-authority/authority/sysMenu/initFrontMenuTree',
                        method: "POST",
                        cache: false
                    }).success(function(response) {
                        //console.log(response);
                        $scope.menuItems = response.data;
                        $scope.$broadcast("toSidebar", $scope.menuItems);

                    }).error(function(err) {
                        //console.log(err)
                    });
                };

                //加密
                var compileStr = function(code) {
                    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
                    for (var i = 1; i < code.length; i++) {
                        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
                    }
                    return escape(c);
                };

                // 登录
                $scope.login = function() {
                    //console.log('begin login================');
                    authenticationSvc.login($rootScope.user.username, $rootScope.user.password, $rootScope.user.verificationCode, $rootScope.user.verificationKey).then(function successCallback(response) {

                        //console.log(response);
                        //console.log('登录成功,准备跳往首页....')
                        firstLogFlag = false;

                        //console.log($rootScope.authenticated);
                        $scope.getWebsocket();


                        $scope.lockFlag = false;
                        $window.sessionStorage.removeItem('lockFlag');
                        $window.sessionStorage.setItem('lockFlag', $scope.lockFlag);
                        var staffPassword = compileStr($rootScope.user.password);
                        $window.sessionStorage.setItem('psdFromMain', staffPassword);
                        setLockScreen = $interval(() => { go() }, 1000);
                        $scope.$broadcast("toDashboard", 'data');
                        // $scope.setLockScreen = window.setInterval(go, 1000);


                        $state.go("dashboard");
                        // $scope.$broadcast("toSidebar", 'data');
                        $scope.getSidebarData();
                        $rootScope.authenticated = true;

                        $scope.searchAlarms();
                        $scope.serverStatus();
                        // $scope.searchMenuTree();
                        $scope.isM = $scope.initRule();

                        // $window.location.reload();
                    }, function errorCallback(response) {
                        // 请求失败执行代码

                        if (response == '验证失败') {
                            $rootScope.authenticated = false;
                            $scope.getKey();
                        } else if (response == 4001) {
                            $rootScope.authenticated = false;
                        } else {
                            $rootScope.authenticated = false;
                        }
                    });
                };

                // function initFun() {
                //     if ($rootScope.authenticated) {
                //         $scope.getWebsocket();
                //         // $scope.alarmStatus();
                //         // if ($scope.alarmF == true) {
                //         $scope.searchAlarms();
                //         // } else {

                //         // }

                //         $scope.isM = $scope.initRule();
                //     }
                // };


                if ($rootScope.user.username) {
                    // $scope.getKey();

                    $scope.getWebsocket();
                    $scope.getSidebarData();
                    $scope.searchAlarms();
                    $scope.serverStatus();
                    $scope.isM = $scope.initRule();
                };


                //是否需要告警 true为需要
                $scope.alarmStatus = function() {
                    $http({
                        url: Url + '/sunwave-alarm-management/alarm/alarmlog/getTodayNewAlarmStatus',
                        method: "POST"
                    }).success(function(res) {
                        if (res.data == true) {
                            $scope.alarmF = true;
                            return true
                        } else {
                            $scope.alarmF = false;
                            return false
                        }

                    });
                };


                //verificationKey,verificationCode
                // $scope.description = "获取验证码";
                // var second = 59;
                // var timeHandler;


                //验证码初始化
                $scope.getInitKey = function() {
                    if ($rootScope.user.username != undefined) {
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
                            if (res.code == 100) {
                                alert('Without authorization,cannot use! Machine code:' +
                                    res.msg)
                            };
                            $rootScope.yzm_value = res.data.value;
                            $rootScope.user.verificationKey = res.data.oauth_key;
                        })
                    } else {
                        return
                    }

                };
                $scope.getInitKey();

                //刷新验证码
                $scope.getKey = function() {
                    if ($rootScope.user.username != undefined) {
                        return $http({
                            url: Url + '/uaa/loginPermit/reflushVerificationCode',
                            method: "GET",
                            // headers: {
                            //     Accept: 'application/javascript; charset=utf-8',
                            //     'Content-Type': 'application/javascript; charset=utf-8',
                            //     'Access-Control-Allow-Origin': '*',
                            // },
                            // dataType: 'jsonp',
                            params: {
                                "key": $rootScope.user.verificationKey
                            }
                        }).success(function(res) {
                            if (res.code == 100) {
                                alert('Without authorization,cannot use! Machine code:' + res.msg)
                            };
                            $rootScope.yzm_value = res.data.value;
                            $rootScope.user.verificationKey = res.data.oauth_key;
                        })
                    } else {
                        return
                    }

                };
                // $scope.getKey();


                $scope.sendVerification = function() {

                    $scope.getKey();


                    //     // timeHandler = $interval(function() {
                    //     //     if (second <= 0) {
                    //     //         $interval.cancel(timeHandler);
                    //     //         second = 59;
                    //     //         $scope.description = '获取验证码';
                    //     //     } else {
                    //     //         $scope.description = second + '秒后重发';
                    //     //         second--;
                    //     //     }
                    //     // }, 1000, 100);

                };
                // $scope.loginmsg = "";
                // $scope.send = false;
                // // $http.post('http://localhost:9030/uaa/loginPermit/reflushVerificationCode' + $scope.seller.phone, { verificationType: 1 }).then(function(response) {
                // //     var req = response.data;
                // //     if (!req.success)
                // //         $scope.authError = req.error;
                // // }, function(x) {
                // //     $scope.authError = response.data.error;
                // // });
                // var cd = 60;
                // var toDo = function() {
                //     $scope.send = true;
                //     cd--;
                //     if (cd < 0) {
                //         cd = "";
                //         $scope.send = false;
                //     }
                //     $scope.countDown = "重新获取 " + cd;
                // };
                // $interval(toDo, 1000, 60);




                $scope.lang = { isopen: false };
                $scope.langs = { en: 'English', de_DE: 'German', it_IT: 'Italian', cn: "中文" };
                $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
                $rootScope.language = $window.sessionStorage.getItem('language');

                $scope.setLang = function(langKey, $event) {
                    // set the current lang
                    $scope.selectLang = $scope.langs[langKey];
                    // You can change the language during runtime
                    $translate.use(langKey);
                    $scope.lang.isopen = true;
                    switch (langKey) {
                        case 'cn':
                            $scope.tipLanguage = 'chinese';
                            $scope.$broadcast("changeLanguage", $scope.tipLanguage);
                            $rootScope.language = 'chinese';
                            $window.sessionStorage.setItem('language', 'chinese');

                            break;
                        case 'en':
                            $scope.tipLanguage = 'english';
                            $scope.$broadcast("changeLanguage", $scope.tipLanguage);
                            $rootScope.language = 'english';
                            $window.sessionStorage.setItem('language', 'english');
                            break;

                        default:
                            break;
                    };
                    $http({
                        url: Url + '/sunwave-authority/authority/sysRule/changeLanguage',
                        method: "POST",

                        params: {
                            "language": $scope.tipLanguage
                        }
                    }).success(function(res) {
                        alert(res.msg);
                    })
                };

                function isSmartDevice($window) {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                };



            }
        ]);

})();