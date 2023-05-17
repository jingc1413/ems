(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.generationSettings', [])
        .controller('generalSettingsCtrl', generalSettingsCtrl);

    function generalSettingsCtrl($scope, $uibModal, $log, generationService){
        $scope.options = {
            compress: false,
            forward: false,
            mask: false,
            timeSelect:'',
            forwardTime1:'',
            forwardTime2:''
        };

        $scope.mytime = new Date();
        $scope.mytime2 = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = !$scope.ismeridian;
        };

        // $scope.update = function() {
        //     var d = new Date();
        //     d.setHours(14);
        //     d.setMinutes(0);
        //     $scope.mytime = d;
        // };

        $scope.changed = function() {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
            $scope.mytime2 = null;
        };

         //查询
         var searchForm = function() {
            generationService.searchContent()
            .success(function(response) {
                // $scope.items = response.content;
                $scope.options.mask=(response.data.alarmMaskEnable == "true" ?true:false);
                $scope.options.compress=(response.data.AlarmCompressEnabled == "true" ?true:false);
                $scope.options.forward=(response.data.AlarmTransferEnabled == "true" ?true:false);
                $scope.options.timeSelect=(response.data.AlarmTransferTime == "24" ?'1':'2');
                if (response.data.AlarmTransferTime != "24") {
                    let str =[];
                    str=response.data.AlarmTransferTime.split("|");
                    $scope.options.forwardTime1=str[0];
                    $scope.options.forwardTime2=str[1];
                } else {
                    
                }
            })
            .error(function(err) {
                console.info(err);
            });

        };    
        searchForm();     
        // searchForm();
        $scope.save = function() {

            // var forwardTime = "";
            // $scope.forwardTime1.
            console.log($scope.options.mask);
            let ward = $scope.options.forward;
            let forwardTime = 0;
            if (ward) {
                let select = $scope.options.timeSelect;
                if (select == '1') {
                    forwardTime = '24';
                } else if (select == '2') {
                    let forward1 = $scope.options.forwardTime1;
                    let forward2 = $scope.options.forwardTime2;
                    // if (forward1.indexOf(' ') > -1) {
                    //     forwardTime = forward1.substring(forward1.indexOf(' ') + 1);
                    // }
                    // if (forward2.indexOf(' ') > -1) {
                    //     forwardTime = forwardTime + '|' + forward2.substring(forward2.indexOf(' ') + 1);
                    // }
                    forwardTime = forward1+ '|' + forward2;
                    console.log(forwardTime);
                }
            }
            generationService
                .modifyGeneralSettings($scope.options.compress, $scope.options.forward, forwardTime, $scope.options.mask)
                .success(function(res) {
                    if (res.data == true) {
                        alert('Success!')
                    } else {
                        alert(res.msg)
                    }
                })
                .error(function(err) {
                    alert('Failed!' + err)
                });
        };
        
        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

    }
})();