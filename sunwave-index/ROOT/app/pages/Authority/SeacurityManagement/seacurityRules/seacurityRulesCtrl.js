(function() {
    'use strict';

    angular.module('SunWave.pages.Authority.SeacurityManagement.seacurityRules', [])
        .controller('seacurityRulesCtrl', seacurityRulesCtrl);

    function seacurityRulesCtrl($rootScope, $scope, seacurityRulesService, $uibModal, $log, messageAlertService) {


        $scope.log = {
            id: 0,
            isLoginMessage: "",
            isMustModifyPassword: true,
            isPassowrdRemind: true,
            loginFreeTime: 0,
            loginLockDuration: 0,
            loginMessageContent: "",
            loginRetryDuration: 0,
            loginRetryTimes: 0,
            passwordBigCharMaxLen: 0,
            passwordBigCharMinLen: 0,
            passwordMaxLen: 0,
            passwordMinLen: 0,
            passwordNumMaxLen: 0,
            passwordNumMinLen: 0,
            passwordRemindDay: 0,
            passwordSmallCharMaxLen: 0,
            passwordSmallCharMinLen: 0,
            passwordSpecialMaxLen: 0,
            passwordSpecialMinLen: 0,
            passwordValidityDay: 0,
            simplePassword: "",
            usernameMaxLen: 0,
            usernameMinLen: 0
        };
        $scope.loginRetryTimess = [{
            "id": 5,
            "name": "5"
        }, {
            "id": 10,
            "name": "10"
        }, {
            "id": 20,
            "name": "20"
        }, {
            "id": 30,
            "name": "30"
        }, {
            "id": 40,
            "name": "40"
        }, {
            "id": 50,
            "name": "50"
        }];

        $scope.logLongs = [{
            "id": 1,
            "name": "1"
        }, {
            "id": 3,
            "name": "3"
        }, {
            "id": 5,
            "name": "5"
        }, {
            "id": 15,
            "name": "15"
        }, {
            "id": 30,
            "name": "30"
        }, {
            "id": 60,
            "name": "60"
        }];

        $scope.logLockLongs = [{
            "id": 5,
            "name": "5"
        }, {
            "id": 15,
            "name": "15"
        }, {
            "id": 30,
            "name": "30"
        }, {
            "id": 60,
            "name": "60"
        }];

        $scope.freeLongs = [{
            "id": 15,
            "name": "15"
        }, {
            "id": 30,
            "name": "30"
        }, {
            "id": 60,
            "name": "60"
        }];

        $scope.isLoginMessages = [{
            "id": "0",
            "name": "Yes"
        }, {
            "id": "1",
            "name": "No"
        }];

        $scope.nameMins = [{
                //     "id": 0,
                //     "name": "0"
                // },

                "id": 4,
                "name": "4"
            },
            {
                "id": 5,
                "name": "5"
            },
            {
                "id": 6,
                "name": "6"
            },
            {
                "id": 7,
                "name": "7"
            },
            {
                "id": 8,
                "name": "8"
            },
            {
                "id": 10,
                "name": "10"
            },
            {
                "id": 12,
                "name": "12"
            }
        ];

        $scope.nameMaxs = [
            // {
            //         "id": 30,
            //         "name": "30"
            //     }, {
            //         "id": 25,
            //         "name": "25"
            //     },
            {
                "id": 4,
                "name": "4"
            }, {
                "id": 8,
                "name": "8"
            }, {
                "id": 10,
                "name": "10"
            }, {
                "id": 15,
                "name": "15"
            }, {
                "id": 20,
                "name": "20"
            }
        ];

        $scope.passwordMins = [
            // {
            //         "id": 0,
            //         "name": "0"
            //     },
            {
                "id": 8,
                "name": "8"
            }, {
                "id": 12,
                "name": "12"
            },
            {
                "id": 15,
                "name": "15"
            }, {
                "id": 20,
                "name": "20"
            }
            // , {
            //     "id": 30,
            //     "name": "30"
            // }
        ];

        $scope.passwordMaxs = [{
                "id": 8,
                "name": "8"
            }, {
                "id": 12,
                "name": "12"
            },
            {
                "id": 15,
                "name": "15"
            }, {
                "id": 20,
                "name": "20"
            }
            // , {
            //     "id": 30,
            //     "name": "30"
            // }
        ];

        $scope.characterNumMins = [{
                "id": 0,
                "name": 0
            }, {
                "id": 1,
                "name": "1"
            },
            {
                "id": 2,
                "name": "2"
            }, {
                "id": 3,
                "name": "3"
            }, {
                "id": 4,
                "name": "4"
            }, {
                "id": 5,
                "name": "5"
            }, {
                "id": 6,
                "name": "6"
            }
        ];

        $scope.characterNumMaxs = [{
                "id": 1,
                "name": "1"
            }, {
                "id": 2,
                "name": "2"
            },
            {
                "id": 3,
                "name": "3"
            }, {
                "id": 4,
                "name": "4"
            }, {
                "id": 5,
                "name": "5"
            }, {
                "id": 6,
                "name": "6"
            }, {
                "id": 7,
                "name": "7"
            },
            {
                "id": 8,
                "name": "8"
            }
        ];

        $scope.characterABCMins = [{
                "id": 0,
                "name": "0"
            }, {
                "id": 1,
                "name": "1"
            }, {
                "id": 2,
                "name": "2"
            },
            {
                "id": 3,
                "name": "3"
            }, {
                "id": 4,
                "name": "4"
            }, {
                "id": 5,
                "name": "5"
            }, {
                "id": 6,
                "name": "6"
            }
        ];

        $scope.characterABCMaxs = [{
                "id": 6,
                "name": "6"
            }, {
                "id": 7,
                "name": "7"
            },
            {
                "id": 8,
                "name": "8"
            }, {
                "id": 9,
                "name": "9"
            }, {
                "id": 10,
                "name": "10"
            }, {
                "id": 11,
                "name": "11"
            },
            {
                "id": 12,
                "name": "12"
            }
        ];
        $scope.characterMins = [{
                "id": 0,
                "name": "0"
            }, {
                "id": 1,
                "name": "1"
            }, {
                "id": 2,
                "name": "2"
            },
            {
                "id": 3,
                "name": "3"
            }, {
                "id": 4,
                "name": "4"
            }, {
                "id": 5,
                "name": "5"
            }, {
                "id": 6,
                "name": "6"
            }
        ];
        $scope.characterMaxs = [{
                "id": 6,
                "name": "6"
            }, {
                "id": 7,
                "name": "7"
            },
            {
                "id": 8,
                "name": "8"
            }, {
                "id": 9,
                "name": "9"
            }, {
                "id": 10,
                "name": "10"
            }, {
                "id": 11,
                "name": "11"
            }, {
                "id": 12,
                "name": "12"
            }
        ];

        $scope.specialCharactersMins = [{
                "id": 0,
                "name": "0"
            }, {
                "id": 1,
                "name": "1"
            }, {
                "id": 2,
                "name": "2"
            },
            {
                "id": 3,
                "name": "3"
            }, {
                "id": 4,
                "name": "4"
            }, {
                "id": 5,
                "name": "5"
            }, {
                "id": 6,
                "name": "6"
            }
        ];
        $scope.specialCharactersMaxs = [{
                "id": 6,
                "name": "6"
            }, {
                "id": 7,
                "name": "7"
            },
            {
                "id": 8,
                "name": "8"
            }, {
                "id": 9,
                "name": "9"
            }, {
                "id": 10,
                "name": "10"
            }, {
                "id": 11,
                "name": "11"
            },
            {
                "id": 12,
                "name": "12"
            }
        ];

        $scope.passwordValidityDays = [{
                "id": 15,
                "name": "15"
            }, {
                "id": 60,
                "name": "60"
            }, {
                "id": 90,
                "name": "90"
            }, {
                "id": 120,
                "name": "120"
            }, {
                "id": 180,
                "name": "180"
            },
            {
                "id": 360,
                "name": "360"
            }
        ];

        $scope.reminderDates = [{
            "id": 15,
            "name": "15"
        }, {
            "id": 30,
            "name": "30"
        }, {
            "id": 45,
            "name": "45"
        }, {
            "id": 60,
            "name": "60"
        }];

        $scope.conditions = [{
                "id": 0,
                "name": "BeginIP"
            },
            {
                "id": 1,
                "name": "EndIP"
            }
        ];

        $scope.query = { //查询条件
            beginIp: "",
            endIp: "",
            pageIndex: 0,
            pageSize: 15
        };
        $scope.xx = {
            select_all: ""
        };

        $scope.search = function() {
            searchForm();
        };

        //查询规则
        $scope.searchRuledata = function() {
            seacurityRulesService.findAll().success(function(res) {
                $scope.log = res.data;
                $scope.log.loginFreeTime = $scope.sToM($scope.log.loginFreeTime);
                $scope.log.loginLockDuration = $scope.sToM($scope.log.loginLockDuration);
                $scope.log.loginRetryDuration = $scope.sToM($scope.log.loginRetryDuration);

                $scope.ruleId = res.data.id;
                // $scope.log.isMustModifyPassword = res.data.isMustModifyPassword;
                if (res.data.isMustModifyPassword == "0") {
                    $scope.log.isMustModifyPassword = true;
                } else if (res.data.isMustModifyPassword == "1") {
                    $scope.log.isMustModifyPassword = false;
                };
                if (res.data.isPassowrdRemind == "0") {
                    $scope.log.isPassowrdRemind = true;
                } else if (res.data.isPassowrdRemind == "1") {
                    $scope.log.isPassowrdRemind = false;
                };
                // $scope.log.isPassowrdRemind = res.data.isPassowrdRemind;

            })
        };
        $scope.searchRuledata();

        //时间转换  sss=>m
        $scope.sToM = function(arg) {
            var output;
            if (arg instanceof Array) {
                output = new Array();
                for (var i = 0; i < arg.length; i++) {
                    output.push(Math.round((parseInt(arg[i] / 60) + arg[i] % 60 / 60) * 100) / 100000);
                }
            } else {
                output = Math.round((parseInt(arg / 60) + arg % 60 / 60) * 100) / 100000;
            }
            return output;
        };

        //时间转换  sss<=m
        $scope.MTos = function(arg) {
            var output;
            if (arg instanceof Array) {
                output = new Array();
                for (var i = 0; i < arg.length; i++) {
                    output.push(Math.round((parseInt(arg * 60 * 1000))));
                }
            } else {
                output = Math.round((parseInt(arg * 60 * 1000)));
            }
            return output;
        };


        // //查询ip
        // var searchForm = function() {
        //     $scope.query.pageIndex = $scope.paginationConf.currentPage;
        //     $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

        //     seacurityRulesService.search($scope.query)
        //         .success(function(response) {
        //             $scope.paginationConf.totalItems = response.data.totalElements;
        //             $scope.items = response.data.content;
        //             //console.log(response);
        //         })
        //         .error(function(err) {
        //             console.info(err);
        //         });

        // };

        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.id);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.items, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            //console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                var index = $scope.checked.indexOf(i.id);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.id);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.items.length == $scope.checked.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            //console.log($scope.checkedItems);
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };


        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        // $scope.$watch(
        //     'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        $scope.reset = function() {
            $scope.query.beginIp = "";
            $scope.query.beginIp = "";
        };

        $scope.isRemain = function(remind, value) {
            //判断是否密码过期提醒true
            if (remind == true) {
                value = 0;
            } else {
                value = 1;
            };

            return value;
        };


        $scope.reset = function() {
            $scope.log = {
                isLoginMessage: "",
                isMustModifyPassword: "",
                isPassowrdRemind: "",
                loginFreeTime: "",
                loginLockDuration: "",
                loginMessageContent: "",
                loginRetryDuration: "",
                loginRetryTimes: "",
                passwordBigCharMaxLen: "",
                passwordBigCharMinLen: "",
                passwordMaxLen: "",
                passwordMinLen: "",
                passwordNumMaxLen: "",
                passwordNumMinLen: "",
                passwordRemindDay: "",
                passwordSmallCharMaxLen: "",
                passwordSmallCharMinLen: "",
                passwordSpecialMaxLen: "",
                passwordSpecialMinLen: "",
                passwordValidityDay: "",
                simplePassword: "",
                usernameMaxLen: "",
                usernameMinLen: ""
            };
        };

        $scope.toModify = function() {
            if (confirm('Are U Sure Modify?')) {
                //保存修改规则
                // //console.log($scope.log);
                $scope.log.loginFreeTime = $scope.MTos($scope.log.loginFreeTime);
                $scope.log.loginLockDuration = $scope.MTos($scope.log.loginLockDuration);
                $scope.log.loginRetryDuration = $scope.MTos($scope.log.loginRetryDuration);
                if ($scope.log.isMustModifyPassword == true) {
                    $scope.log.isMustModifyPassword = "0";
                } else {
                    $scope.log.isMustModifyPassword = "1";
                };
                if ($scope.log.isPassowrdRemind == true) {
                    $scope.log.isPassowrdRemind = "0";
                } else if ($scope.log.isPassowrdRemind == false) {
                    $scope.log.isPassowrdRemind = "1";
                };
                if ($scope.log.loginMessageContent && $scope.log.simplePassword) {
                    if (($scope.log.loginMessageContent.length > 200) || ($scope.log.simplePassword.length > 200)) {
                        messageAlertService.lengthFun('');
                        return
                    }

                } else {
                    messageAlertService.lengthFun('');
                    return
                }
                seacurityRulesService.modifyRule($scope.log).success(function(res) {
                    if (res.data == true) {
                        // alert('Success!');
                        messageAlertService.successFun('success');
                        $scope.searchRuledata();
                    }
                })
            }
        };


    }
})();