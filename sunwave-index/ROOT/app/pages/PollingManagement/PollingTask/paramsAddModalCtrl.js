(function() {
    'use strict';

    angular.module('SunWave.pages.PollingManagement.PollingTask', [])
        .controller('paramsAddModalCtrl', paramsAddModalCtrl);

    function paramsAddModalCtrl($scope, transmitModalItems, paramsQueryFlag, selectedManTaskdetail, PollingTaskService, isTask, checkIdsArr_transf, $uibModalInstance, $window, messageAlertService) {


        $scope.transmitModalItems = transmitModalItems;
        $scope.paramsQueryFlag = paramsQueryFlag;
        // $scope.checkIdsArr_transf = [];

        var checkIdsArr_transf2 = JSON.parse(JSON.stringify(checkIdsArr_transf));

        $scope.xx = {
            select_all: "",
            select_all2: ""
        };

        $scope.tkdBase = "";
        $scope.tkdRadio = "";
        $scope.tkdAlarmen = "";
        $scope.tkdAlarm = "";

        $scope.isTask = isTask;


        var firstSearchR = true;

        if ($scope.isTask == 'Query') {
            $scope.title = 'Batch Query Task';
        } else if ($scope.isTask == 'Design') {
            $scope.title = "Batch Design Task"; //set
        } else {
            return
        };


        $scope.query = { //查询信息
            objObjids: "",
            objObjname: "",
            pageIndex: 0,
            pageSize: 10
        };
        $scope.rows2 = [];


        $scope.orignRows2 = [];
        if (checkIdsArr_transf2) {
            if (checkIdsArr_transf2.length !== 0) {
                $scope.rows2 = checkIdsArr_transf2;
                $scope.orignRows2 = $scope.rows2;
                firstSearchR = false;
            } else {
                $scope.rows2 = [];
            }
        }

        $scope.count2 = 0;



        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };


        //Parameter Type查询条件过滤
        $scope.filterParamsType = function() {
            switch ($scope.paramsType) {
                case '0':
                    $scope.query.objActivetype = '';
                    break;
                case '1':
                    $scope.query.objActivetype = 'base,param__base';
                    break;
                case '2':
                    $scope.query.objActivetype = 'omc,param__omc';
                    break;
                case '3':
                    $scope.query.objActivetype = 'alarm';
                    break;
                case '4':
                    $scope.query.objActivetype = 'alarmYN';
                    break;
                case '5':
                    $scope.query.objActivetype = 'radio';
                    break;
                case '6':
                    $scope.query.objActivetype = 'realtime';
                    break;

                default:
                    break;
            }
        };

        var paramsCheckFun = function() {
            var rows_ = $scope.rows;
            for (let i = $scope.rows.length - 1; i > -1; i--) {
                const row = $scope.rows[i];
                for (let j = 0; j < checkIdsArr_transf2.length; j++) {
                    const check = checkIdsArr_transf2[j];
                    if (check.objObjid == row.objObjid) {
                        $scope.rows.splice(i, 1);
                    }
                }
            }
        }

        $scope.searchLeft = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            var idsArr = [];
            $scope.query.objObjids = "";
            if ($scope.orignRows2.length !== 0) {
                for (let i = 0; i < $scope.orignRows2.length; i++) {
                    idsArr.push($scope.orignRows2[i].objObjid)
                };
                $scope.query.objObjids = idsArr.toString();
            };
            PollingTaskService.searchBatchQuery($scope.query).success(function(response) {
                //-----original(移动左边不删除)----
                // $scope.paginationConf.totalItems = response.data.totalElements;
                // $scope.paginationConf.totalPages = response.data.totalPages;
                // $scope.rows = response.data.content;
                //-----original----
                $scope.paginationConf.totalItems = response.data.totalElements;
                // $scope.totals = response.data.totalElements;
                $scope.paginationConf.totalPages = response.data.totalPages;
                $scope.rows = response.data.content;


                for (let index = 0; index < $scope.rows.length; index++) {
                    const element = $scope.rows[index];
                    //list Parameter Type转义
                    switch (element.objActivetype) {
                        case 'base':
                            element.objActivetype = 'Device Information';
                            break;
                        case 'param__base':
                            element.objActivetype = 'Device Information';
                            break;
                        case 'omc':
                            element.objActivetype = 'Network Management';
                            break;
                        case 'param__omc':
                            element.objActivetype = 'Network Management';
                            break;
                        case 'alarm':
                            element.objActivetype = 'Alarm Name';
                            break;
                        case 'alarmYN':
                            element.objActivetype = 'Alarm Enable';
                            break;
                        case 'radio':
                            element.objActivetype = 'Set Parameter';
                            break;
                        case 'realtime':
                            element.objActivetype = 'Sampling data';
                            break;
                        default:
                            break;
                    }
                };
                // if ($scope.checkIdsArr_transf.length !== 0) {
                //     // paramsCheckFun();
                // };

            });
        }


        //查询BatchQuery
        $scope.searchBatchQuery = function() {

            if ($scope.paramsQueryFlag == 'modify' || $scope.paramsQueryFlag == 'view') {

                if (firstSearchR == true) {

                    $scope.selectedManTaskdetail = selectedManTaskdetail;

                    if ($scope.selectedManTaskdetail.tkdBase || $scope.selectedManTaskdetail.tkdRadio || $scope.selectedManTaskdetail.tkdAlarmen || $scope.selectedManTaskdetail.tkdAlarm) {
                        if (selectedManTaskdetail.tkdBase) {
                            $scope.tkdBase = selectedManTaskdetail.tkdBase.split(",");
                        } else {}
                        if (selectedManTaskdetail.tkdRadio) {
                            $scope.tkdRadio = selectedManTaskdetail.tkdRadio.split(",");
                        };
                        if (selectedManTaskdetail.tkdAlarmen) {
                            $scope.tkdAlarmen = selectedManTaskdetail.tkdAlarmen.split(",");
                        };
                        if (selectedManTaskdetail.tkdAlarm) {
                            $scope.tkdAlarm = selectedManTaskdetail.tkdAlarm.split(",");
                        };
                        $scope.searchObjids = $scope.tkdBase + ',' + $scope.tkdRadio + ',' + $scope.tkdAlarmen + ',' + $scope.tkdAlarm;

                        //查右边
                        PollingTaskService.findParamsByIds($scope.searchObjids).success(function(response) {
                            firstSearchR = false;
                            $scope.rows2 = response.data;
                            for (let index = 0; index < $scope.rows2.length; index++) {
                                const element = $scope.rows2[index];
                                //list Parameter Type转义
                                switch (element.objActivetype) {
                                    case 'base':
                                        element.objActivetype = 'Device Information';
                                        break;
                                    case 'param__base':
                                        element.objActivetype = 'Device Information';
                                        break;
                                    case 'omc':
                                        element.objActivetype = 'Network Management';
                                        break;
                                    case 'param__omc':
                                        element.objActivetype = 'Network Management';
                                        break;
                                    case 'alarm':
                                        element.objActivetype = 'Alarm Name';
                                        break;
                                    case 'alarmYN':
                                        element.objActivetype = 'Alarm Enable';
                                        break;
                                    case 'radio':
                                        element.objActivetype = 'Set Parameter';
                                        break;
                                    case 'realtime':
                                        element.objActivetype = 'Sampling data';
                                        break;
                                    default:
                                        break;
                                }
                            };
                            $scope.orignRows2 = $scope.rows2;
                            //拷贝
                            $scope.count2 = $scope.rows2.length;
                            $scope.searchLeft();
                            // $scope.checkTKDS($scope.tkdBase);
                            // $scope.checkTKDS($scope.tkdRadio);
                            // $scope.checkTKDS($scope.tkdAlarmen);
                            // $scope.checkTKDS($scope.tkdAlarm);
                        });
                    } else {
                        $scope.searchLeft();
                    }

                } else {
                    $scope.searchLeft();
                }

            } else {
                $scope.searchLeft();
            };
            $scope.count2 = $scope.rows2.length;
        };


        var getSessionDataFun = function() {
            let select_f_Session = $window.sessionStorage.getItem('pollingTask_params');
            if (select_f_Session) {
                let select_f_SessionArr = select_f_Session.split(',');
                for (var i = 0; i < $scope.rows.length;) {
                    const row = $scope.rows[i];
                    for (let j = 0; j < select_f_SessionArr.length; j++) {
                        const el = select_f_SessionArr[j];
                        if (el.objObjid == row.objObjid) {
                            $scope.rows.splice(i, 1);
                            // $scope.rows2.push($scope.rows[i]);
                        }
                    }
                }
            } else {
                return
            }

        };



        $scope.checkTKDS = function(tkd) {

            if ($scope.paramsQueryFlag == 'modify') {

                if (tkd != "" && tkd.length != 0) {
                    var leftRows = $scope.rows;
                    for (var i = 0; i < leftRows.length;) {
                        if (tkd.indexOf(leftRows[i].objObjid) > -1) {
                            // $scope.rows2.push(leftRows[i]);
                            leftRows.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    $scope.rows = leftRows;
                }
            };
            // getSessionDataFun();
        };



        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.searchBatchQuery);


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.objObjid);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.rows, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            //console.log($scope.checked);
        };
        $scope.selectOne = function() {
            $scope.checked = [];
            $scope.checkedItems = [];
            angular.forEach($scope.rows, function(i) {
                var index = $scope.checked.indexOf(i.objObjid);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.objObjid);
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
            //console.log($scope.checkedItems);
        };


        // -----------------------------第二个-------------------------------------

        $scope.m = [];
        $scope.checked2 = []; //选中的ID
        $scope.checkedItems2 = []; //选中的对象数组

        $scope.selectAll2 = function() {
            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            if ($scope.xx.select_all2) {
                $scope.checked2 = [];
                $scope.checkedItems2 = [];
                angular.forEach($scope.rows2, function(i) {
                    i.checked = true;
                    $scope.checked2.push(i.objObjid);
                    $scope.checkedItems2.push(i);
                });
            } else {
                angular.forEach($scope.rows2, function(i) {
                    i.checked = false;
                    $scope.checked2 = [];
                    $scope.checkedItems2 = [];
                });
            }
            //console.log($scope.checked2);
        };
        $scope.selectOne2 = function() {
            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            angular.forEach($scope.rows2, function(i) {
                var index = $scope.checked2.indexOf(i.objObjid);
                if (i.checked && index == -1) {
                    $scope.checked2.push(i.objObjid);
                    $scope.checkedItems2.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked2.splice(index, 1);
                    $scope.checkedItems2.splice(index, 1);
                };
            });


            if ($scope.rows2.length == $scope.checked2.length) {
                $scope.xx.select_all2 = true;
            } else {
                $scope.xx.select_all2 = false;
            }
            //console.log($scope.checkedItems2);
        };

        //   --------------------------------第二个end------------------------------
        $scope.doubleSelectToRight = function() {
            if ($scope.checked.length !== 0) {
                var cnt = $scope.rows.length;
                for (let i = 0; i < cnt; i++) {
                    if ($scope.rows[i].checked == true) {
                        //console.log($scope.rows2);

                        $scope.rows2.push($scope.rows[i]);
                        //console.log($scope.rows2);
                    }
                };
                // for (let i = 0; i < cnt; i++) {
                for (let j = 0; j < $scope.rows.length;) {
                    var index = $scope.checked.indexOf($scope.rows[j].objObjid);
                    if (index > -1) {
                        $scope.rows.splice(j, 1);
                        $scope.checkedItems[index].checked = false;
                    } else {
                        j++;
                    }

                }




                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.xx.select_all = false;
                $scope.count2 = $scope.rows2.length;
                //移到右边时保存原数组做恢复
                // $scope.orignRows2 = $scope.rows2;
                for (let k = 0; k < $scope.rows2.length; k++) {
                    const row2 = $scope.rows2[k];
                    if ($scope.orignRows2.indexOf(row2) > -1) {

                    } else {
                        $scope.orignRows2.push(row2);
                    }
                }
                $scope.searchBatchQuery();
            }

        };
        $scope.doubleSelectToLeft = function() {


            if ($scope.checked2.length !== 0) {
                var cnt = $scope.rows2.length;
                for (let i = 0; i < cnt; i++) {
                    if ($scope.rows2[i].checked == true) {
                        $scope.rows.push($scope.rows2[i]);
                    }
                };
                for (let j = 0; j < $scope.rows2.length;) {
                    var index = $scope.checked2.indexOf($scope.rows2[j].objObjid);
                    if (index > -1) {
                        $scope.rows2.splice(j, 1);
                        $scope.checkedItems2[index].checked = false;
                    } else {
                        j++;
                    }
                }
                for (let k = 0; k < $scope.orignRows2.length;) {

                    var index2 = $scope.checked2.indexOf($scope.orignRows2[k].objObjid);
                    if (index2 > -1) {
                        $scope.orignRows2.splice(k, 1);

                    } else {
                        k++;
                    }
                }

                $scope.checked2 = [];
                $scope.checkedItems2 = [];
                $scope.xx.select_all2 = false;
                $scope.count2 = $scope.rows2.length;
                $scope.searchBatchQuery();
            }

        };



        /////////////////////////--------------前台条件查询--------------/////////////////////////////
        //前台查询条件
        $scope.query_front = {
            objObjname_front: "",
            objActivetype: ""
        };

        //Parameter Type前台查询条件过滤
        $scope.filterParamsType_front = function() {
            switch ($scope.paramsType_front) {
                case '0':
                    $scope.query_front.objActivetype = '';
                    break;
                case '1':
                    $scope.query_front.objActivetype = 'Device Information';
                    break;
                case '2':
                    $scope.query_front.objActivetype = 'Network Management';
                    break;
                case '3':
                    $scope.query_front.objActivetype = 'Alarm Name';
                    break;
                case '4':
                    $scope.query_front.objActivetype = 'Alarm Enable';
                    break;
                case '5':
                    $scope.query_front.objActivetype = 'Set Parameter';
                    break;
                case '6':
                    $scope.query_front.objActivetype = 'Sampling data';
                    break;

                default:
                    break;
            }
        };
        //前台条件查询
        $scope.searchForm2 = function() {
            $scope.rows2_new = [];
            for (let i = 0; i < $scope.orignRows2.length; i++) {
                let row = $scope.orignRows2[i];

                //同时满足
                if ($scope.query_front.objObjname_front !== '' && $scope.paramsType_front != '0') {
                    if ((row.objObjname.indexOf($scope.query_front.objObjname_front) != -1) && $scope.query_front.objActivetype == row.objActivetype) {
                        $scope.rows2_new.push(row);
                    }
                    //满足一个查询条件
                } else if ($scope.query_front.objObjname_front == '' && $scope.paramsType_front != '0') {
                    if ($scope.query_front.objActivetype == row.objActivetype) {
                        $scope.rows2_new.push(row);
                    } else {
                        // $scope.rows2_new = $scope.orignRows2;
                    }

                } else if ($scope.query_front.objObjname_front != '' && $scope.paramsType_front == '0') {
                    if (row.objObjname.indexOf($scope.query_front.objObjname_front) != -1) {
                        $scope.rows2_new.push(row);
                    } else {
                        // $scope.rows2_new = $scope.orignRows2;

                    }
                } else {
                    $scope.rows2_new = $scope.orignRows2;
                }

                // if (($scope.orignRows2.length !== 0) && ($scope.rows2_new.length === 0) && ($scope.query_front.objObjname_front !== '' || $scope.paramsType_front != '0')) {
                //     $scope.rows2_new = $scope.orignRows2;

                // }

            };

            $scope.rows2 = $scope.rows2_new;
            $scope.count2 = $scope.rows2.length;
        };
        /////////////////////////--------------前台条件查询end--------------/////////////////////////////

        $scope.save = function() {
            $scope.rows2 = $scope.orignRows2;
            $scope.count2 = $scope.rows2.length;
            // $scope.$apply();

            if (messageAlertService.confirmFun('sure')) {
                if ($scope.rows2.length == 0) {
                    alert('Please select one!');
                } else {

                    let selectobjids = [];
                    for (let i = 0; i < $scope.rows2.length; i++) {
                        const row = $scope.rows2[i];
                        selectobjids.push(row.objObjid);
                    };
                    let selectobjidsStr = selectobjids.toString();
                    // $window.sessionStorage.setItem('pollingTask_params', selectobjidsStr);
                    // $scope.close($scope.rows2);
                    $uibModalInstance.close($scope.rows2);
                }
            }

        };

        $scope.close = function(row) {
            $uibModalInstance.close(row);
        };

    }
})();