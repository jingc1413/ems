(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmMask', [])
        .controller('alarmModalCtrl', alarmModalCtrl);

    function alarmModalCtrl($scope, isAdd, transmitModalItems, params_transf, AlarmMaskService, $uibModalInstance, $window, $q) {


        $scope.transmitModalItems = transmitModalItems;
        $scope.params_transf = params_transf;
        $scope.isAdd = isAdd;
        var alarmCheckedIds = [];
        var alarmCheckedIds_str = [];
        var alarmCheckedIds_obj = [];
        // $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked');

        var toObj = function(arr1, arr2) {
            let options = [];
            for (let i = 0; i < arr1.length; i++) {
                let obj = {};
                obj.transmitAlarmIdArr = arr1[i];
                obj.transmitAlarmNameArr = arr2[i];
                options.push(obj)
            }

            return options;
        }

        if ($scope.isAdd == 'Modify') {
            var transmitAlarmIdArr = $scope.transmitModalItems.altMaskalarmid.split(',');
            var transmitAlarmNameArr = $scope.transmitModalItems.altMaskalarmStr.split(',');

            // alarmCheckedIds_obj = toObj(transmitAlarmIdArr, transmitAlarmNameArr);
            angular.forEach(transmitAlarmIdArr, function(tr_m, index) {
                if (alarmCheckedIds.indexOf(tr_m) === -1) {
                    alarmCheckedIds.push(tr_m);
                }
            });
            // angular.forEach(transmitAlarmNameArr, function(ss, index) {
            //     if (alarmCheckedIds_str.indexOf(ss) === -1) {
            //         alarmCheckedIds_str.push(ss);
            //     }
            // });
            $window.sessionStorage.setItem('AlarmMask_Modal_alarmList_checked', alarmCheckedIds);
            // $window.sessionStorage.setItem('AlarmMask_Modal_alarmList_checked_obj', alarmCheckedIds_obj);
        }

        if ($scope.params_transf) {
            angular.forEach($scope.params_transf, function(tr, index) {
                if (alarmCheckedIds.indexOf(tr) === -1) {
                    alarmCheckedIds.push(tr)
                }
            });
            $window.sessionStorage.setItem('AlarmMask_Modal_alarmList_checked', alarmCheckedIds);
        };

        $scope.title = 'Select Alarm';
        $scope.xx = {
            select_all: ""
        };

        $scope.query = { //查询信息
            almName: "",
            pageIndex: 0,
            pageSize: 50
        };
        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };



        var saveCheckedFun = function(transf, transf_m) {
            //两种格式的参数构造---
            if (transf) {
                var transfArr = [];
                angular.forEach(transf, function(tr, index) {
                    if (alarmCheckedIds.indexOf(tr.almObjid) === -1) {
                        alarmCheckedIds.push(tr.almObjid)
                    }
                });
            };
            if (transf_m) {
                angular.forEach(transf_m, function(tr_m, index) {
                    if (alarmCheckedIds.indexOf(tr_m) === -1) {
                        alarmCheckedIds.push(tr_m)
                    }
                });
                // for (let i = 0; i < alarmCheckedIds.length; i++) {
                //     const el = alarmCheckedIds[i];
                //     for (let j = 0; j < $scope.rows.length; j++) {
                //         const row = $scope.rows[j];
                //         if (row.almObjid == el) {
                //             row.checked = true;
                //         }
                //     }
                // }
            };
            //-----
            angular.forEach($scope.rows, function(row, index) {
                if (row.checked == true && alarmCheckedIds.indexOf(row.almObjid) === -1) {
                    alarmCheckedIds.push(row.almObjid);
                    alarmCheckedIds_str.push(row.almName);

                } else if (!row.checked == true && alarmCheckedIds.indexOf(row.almObjid) !== -1) {
                    let indexCC = alarmCheckedIds.indexOf(row.almObjid);
                    alarmCheckedIds.splice(indexCC, 1);
                    alarmCheckedIds_str.splice(indexCC, 1);
                };
                if (row.checked == true && $scope.checked.indexOf(row.almObjid) === -1) {
                    $scope.checked.push(row.almObjid);
                    $scope.checkedItems.push(row);
                }
            });

            alarmCheckedIds_obj = toObj(alarmCheckedIds, alarmCheckedIds_str);
            $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked');
            // $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked_obj');
            $window.sessionStorage.setItem('AlarmMask_Modal_alarmList_checked', alarmCheckedIds);
            // $window.sessionStorage.setItem('AlarmMask_Modal_alarmList_checked_obj', alarmCheckedIds_obj);

        };

        var getCheckedFun = function() {
            var alarmCheckedIdsStr = $window.sessionStorage.getItem('AlarmMask_Modal_alarmList_checked');
            var StrArr = alarmCheckedIdsStr.split(',');
            for (let i = 0; i < StrArr.length; i++) {
                const el = StrArr[i];
                for (let j = 0; j < $scope.rows.length; j++) {
                    const row = $scope.rows[j];
                    if (row.almObjid == el) {
                        row.checked = true;
                    }
                }
            }
        };


        $scope.searchContent = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            saveCheckedFun();

            AlarmMaskService.searchAlarmList($scope.query).success(function(res) {
                $scope.paginationConf.totalItems = res.data.totalElements;
                for (let i = 0; i < res.data.content.length; i++) {
                    const el = res.data.content[i];
                    if (el.almObjid == 'F901') {
                        res.data.content.splice(i, 1)
                    }
                }
                $scope.rows = res.data.content;
                getCheckedFun();
                if ($scope.isAdd == 'Modify') {
                    // var transmitAlarmIdArr = $scope.transmitModalItems.altMaskalarmid.split(',');
                    // for (let i = 0; i < $scope.rows.length; i++) {
                    //     const row = $scope.rows[i];
                    //     for (let j = 0; j < transmitAlarmIdArr.length; j++) {
                    //         const alarmid = transmitAlarmIdArr[j];
                    //         if (alarmid === row.almObjid) {
                    //             row.checked = true;
                    //         }
                    //     }
                    // };
                    // saveCheckedFun("", transmitAlarmIdArr);

                }
                // if ($scope.params_transf) {
                //     saveCheckedFun($scope.params_transf);
                // };

                // if ($scope.isAdd == 'Modify') {
                //     let transmitAlarmIdArr = $scope.transmitModalItems.altMaskalarmid.split(',');
                //     for (let i = 0; i < $scope.rows.length; i++) {
                //         const row = $scope.rows[i];
                //         for (let j = 0; j < transmitAlarmIdArr.length; j++) {
                //             const alarmid = transmitAlarmIdArr[j];
                //             if (alarmid === row.almObjid) {
                //                 row.checked = true;
                //             }
                //         }
                //     };
                //     saveCheckedFun();
                // };
                getCheckedFun();
            })

        };
        // $scope.searchContent();


        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.searchContent);


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.almObjid);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.rows, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.rows, function(i) {
                var index = $scope.checked.indexOf(i.almObjid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.almObjid);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.rows.length == $scope.checked.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            console.log($scope.checkedItems);
        };


        $scope.save = function() {
            if ($scope.isAdd == 'Add') {
                saveCheckedFun();
                if (alarmCheckedIds.length == 0) {
                    alert('Must Select One!')
                    return
                } else {
                    // saveCheckedFun();
                    $scope.close(alarmCheckedIds);
                }
            } else {
                if (alarmCheckedIds.length == 0) {
                    alert('Must Select One!')
                    return
                } else {
                    saveCheckedFun();
                    $scope.close(alarmCheckedIds);
                }
            }


        };


        $scope.close = function(newItems) {
            // $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked');
            $uibModalInstance.close(newItems);
        };
        $scope.cancel = function() {
            $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked');
            // $window.sessionStorage.removeItem('AlarmMask_Modal_alarmList_checked_modify');
            $uibModalInstance.dismiss('cancel');
        };
    }
})();