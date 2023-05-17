(function() {
    'use strict';

    angular.module('SunWave.pages.DatabaseBackUp.backupSetting', [])
        .controller('backupSettingCtrl', backupSettingCtrl);

    function backupSettingCtrl($scope, backupSettingService) {

        $scope.openDatePick = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.period = {
            week: "*",
            month: "?",
            day: "?",
            hour: null,
            minute: null
        }

        $scope.submit = { //提交信息
            beginTime: "",
            period: "",
            /*backupTables:"",*/
            tables: "",
            type: "auto",
            onlineBack: false,
            binlogBack: false,
            path: ""
        };

        $scope.hm = {
            backtime: null,
            tables: null,
            onlineBack: false,
            binlogBack: false,
            backupPath: null,
        }

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker'
        };

        backupSettingService.getUpdateBackupSetting().success(function(response) {
            $scope.backupSetting = response;
            if ($scope.backupSetting != null) {
                $scope.submit.path = $scope.backupSetting.path;
                $scope.hm.backupPath = $scope.backupSetting.path;
            }

        });

        /*backupSettingService.getSchemaTableNames().success(function(response) {
        	$scope.tables = response;
        	console.log($scope.tables);
        });*/

        /*$scope.tables = [{
        		{tableName:"ne_element",name:"网元数据"},{tableName:"alm_alarmlog",name:"告警信息"}
        }];*/
        $scope.tables = [{ tableName: "ne_element", name: "NEs Information" }, { tableName: "alm_alarmlog", name: "Alarm Information" }];


        /*$scope.submit = {  //提交信息
        		beginTime : "",
        		period : ""
        	};	*/





        /*$scope.months = [{id : 0,name : '每月'},{id : 1,name : '每1月份'},{id : 2,name : '每2月份'},{id : 3,name : '每3月份'},{id : 4,name : '每4月份'},
                         {id : 5,name : '每5月份'},{id : 6,name : '每6月份'},{id : 7,name : '每7月份'},{id : 8,name : '每8月份'},{id : 9,name : '每9月份'},
                         {id : 10,name : '每10月份'},{id : 11,name : '每11月份'},{id : 12,name : '每12月份'}];*/
        /*Day-of-Week(每周)：可以用数字1-7表示（1 ＝ 星期日）或用字符口串“SUN, MON, TUE, WED, THU, FRI and SAT”表示*/
        $scope.weeks = [{ id: 2, name: 'Every Monday' }, { id: 3, name: 'Every Tuesday' }, { id: 4, name: 'Every Wednesday' }, { id: 5, name: 'Every Thursday' },
            { id: 6, name: 'Every Friday' }, { id: 7, name: 'Every Saturday' }, { id: 1, name: 'Every Sunday' }
        ];
        $scope.hours = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4' }, { id: 5, name: '5' }, { id: 6, name: '6' }, { id: 7, name: '7' }, { id: 8, name: '8' }, { id: 9, name: '9' }, { id: 10, name: '10' }, { id: 11, name: '11' }, { id: 12, name: '12' }, { id: 13, name: '13' }, { id: 14, name: '14' }, { id: 25, name: '16' }, { id: 15, name: '15' }, { id: 16, name: '16' }, { id: 17, name: '17' }, { id: 18, name: '18' }, { id: 19, name: '19' }, { id: 20, name: '20' }, { id: 21, name: '21' }, { id: 22, name: '22' }, { id: 23, name: '23' }, { id: 24, name: '24' }];
        // $scope.minutes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
        $scope.minutes = [{ id: 1, name: '1' }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4' }, { id: 5, name: '5' }, { id: 6, name: '6' }, { id: 7, name: '7' }, { id: 8, name: '8' }, { id: 9, name: '9' }, { id: 10, name: '10' }, { id: 11, name: '11' }, { id: 12, name: '12' }, { id: 13, name: '13' }, { id: 14, name: '14' }, { id: 25, name: '16' }, { id: 15, name: '15' }, { id: 16, name: '16' }, { id: 17, name: '17' }, { id: 18, name: '18' }, { id: 19, name: '19' }, { id: 20, name: '20' }, { id: 21, name: '21' }, { id: 22, name: '22' }, { id: 23, name: '23' }, { id: 24, name: '24' }, { id: 25, name: '25' }, { id: 26, name: '26' }, { id: 27, name: '27' }, { id: 28, name: '28' }, { id: 29, name: '29' }, { id: 30, name: '30' }, { id: 31, name: '31' }, { id: 32, name: '32' }, { id: 33, name: '33' }, { id: 34, name: '34' }, { id: 35, name: '35' }, { id: 36, name: '36' }, { id: 37, name: '37' }, { id: 38, name: '38' }, { id: 39, name: '39' }, { id: 40, name: '40' }, { id: 41, name: '41' }, { id: 42, name: '42' }, { id: 43, name: '43' }, { id: 44, name: '44' }, { id: 45, name: '45' }, { id: 46, name: '46' }, { id: 44, name: '44' }, { id: 44, name: '44' }, { id: 44, name: '44' }, { id: 44, name: '44' }, { id: 47, name: '47' }, { id: 48, name: '48' }, { id: 49, name: '49' }, { id: 50, name: '50' }, { id: 51, name: '51' }, { id: 52, name: '52' }, { id: 53, name: '53' }, { id: 54, name: '54' }, { id: 55, name: '55' }, { id: 56, name: '56' }, { id: 57, name: '57' }, { id: 58, name: '58' }, { id: 59, name: '59' }];

        /*$scope.submit.beginTime = "2017-09-22 01:12:13";
        $scope.submit.period = "1";*/
        /*$scope.submit.path = "D:\\backupTest";*/

        $scope.makeExpress = function() {
            /*格式: [秒] [分] [小时] [日] [月] [周] [年]*/
            $scope.express = "0 " + $scope.period.minute + " " + $scope.period.hour + " ? * " + $scope.period.week;
            $scope.submit.period = $scope.express;
            $scope.submit.minute = null;
            $scope.submit.week = null;
            $scope.submit.hour = null;
            angular.forEach($scope.period.minute, function(val, key) {
                $scope.submit.minute = $scope.submit.minute + "," + val;
            });
            angular.forEach($scope.period.week, function(val, key) {
                $scope.submit.week = $scope.submit.week + "," + val;
            });
            angular.forEach($scope.period.hour, function(val, key) {
                $scope.submit.hour = $scope.submit.hour + "," + val;
            });

            if ($scope.backtables != null) {
                $scope.submit.tables = $scope.backtables;
                // angular.forEach($scope.backtables, function(val, key) {
                //     if ($scope.submit.tables == null) {
                //         $scope.submit.tables = val;
                //     } else {
                //         $scope.submit.tables = $scope.submit.tables + " " + val;
                //     }
                //     /*$scope.submit.tables = $scope.submit.tables+" "+val;*/
                // });
                /*$scope.submit.tables = $scope.backtables;*/
            } else {
                $scope.submit.tables = null;
            }

            /*	$scope.submit.minute =angular.fromJson($scope.period.minute);
            	$scope.submit.hour =angular.fromJson($scope.period.hour);
            	$scope.submit.week =angular.fromJson($scope.period.week);*/
        };



        $scope.getBackupSetting = () => {
            backupSettingService.getBackupSetting().success((res) => {
                if (res) {
                    let getPeriod = res.period;
                    for (let i = 0; i < getPeriod.length; i++) {
                        //分
                        $scope.period.minute = Number(getPeriod[2]);
                        //时
                        $scope.period.hour = Number(getPeriod[4]);
                        //周
                        $scope.period.week = Number(getPeriod[10]);
                    };
                    //content
                    $scope.backtables = res.tables;
                    //radio
                    $scope.submit.onlineBack = res.onlineBack;
                    $scope.submit.binlogBack = res.binlogBack;
                }
            })
        };
        $scope.getBackupSetting();

        $scope.submitForm = function(valid) {
            console.log('submitForm');
            if (valid) {
                $scope.submit.type = "auto";
                $scope.makeExpress();
                console.log($scope.submit);
                /*backupSettingService.deleteBackupSetting();*/
                /*console.log($scope.submit.minute);*/
                backupSettingService.updateBackupSetting($scope.submit).success(function(response) {
                    alert("Success!");
                });
            }


        };



        /*$scope.hm.backupPath="D:\\backupTest";*/

        $scope.hmSubmit = function() {
            $scope.submit.type = "manaul"; //手动
            $scope.makeExpress();
            console.log($scope.submit);
            backupSettingService.updateBackupSetting($scope.submit).success(function(response) {
                alert("Success!");
            });
            /*backupsService.saveBackups($scope.hm).success(function(response){
            	alert("备份执行成功.");
            });*/

        };

        $scope.download = function() {
            $scope.makeExpress();
            window.location.href = "/API/system/backupSetting/download?tables=" + $scope.submit.tables + "&binlogBack=" + $scope.submit.binlogBack + "&onlineBack=" + $scope.submit.onlineBack;
            /*	$scope.makeExpress();
				var name = "data.sql";
				if($scope.submit.binlogBack){
					name = "data.000100";
				}
				backupSettingService.download($scope.submit).success(function(data, status, headers){
					headers = headers();
	                var contentType = headers['content-type'];
	                var linkElement = document.createElement('a');
	                try {
	                    var blob = new Blob([data], {type: "application/octet-stream"});
	                    var url = window.URL.createObjectURL(blob);
	                    linkElement.setAttribute('href', url);
	                    linkElement.setAttribute("download", name);
	                    var clickEvent = new MouseEvent("click", {
	                        "view": window,
	                        "bubbles": true,
	                        "cancelable": false
	                    });
	                    linkElement.dispatchEvent(clickEvent);
	                } catch (ex) {
	                    console.log(ex);
	                }
	            }).error(function (data) {
	                console.log(data);

				});*/

        }


    }
})();