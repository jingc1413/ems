(function() {
    'use strict';

    angular.module('SunWave.pages.PollingManagement.PollingTask', [])
        .controller('paramsAddModalCtrl', paramsAddModalCtrl);

    function paramsAddModalCtrl($scope, transmitModalItems, paramsQueryFlag, selectedManTaskdetail, PollingTaskService, isTask, $uibModalInstance) {


        $scope.transmitModalItems = transmitModalItems;
        $scope.paramsQueryFlag = paramsQueryFlag;


        $scope.xx = {
            select_all: "",
            select_all2: ""
        };

        $scope.isTask = isTask;


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
        $scope.count2 = 0;


        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 10,
            perPageOptions: [10, 20, 30, 40, 50]

        };


        //Parameter Type查询条件过滤
        $scope.filterParamsType = function() {
            switch ($scope.paramsType) {
                case '0':
                    $scope.query.objActivetype = '';
                    break;
                case '1':
                    $scope.query.objActivetype = 'base';
                    break;
                case '2':
                    $scope.query.objActivetype = 'omc';
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


        var checFun = () => {

        };

        //查询BatchQuery
        $scope.searchBatchQuery = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            PollingTaskService.searchBatchQuery($scope.query).success(function(response) {
                $scope.paginationConf.totalItems = response.data.totalElements;
                $scope.rows = response.data.content;
                for (let index = 0; index < $scope.rows.length; index++) {
                    const element = $scope.rows[index];
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
                if ($scope.paramsQueryFlag == 'modify' || $scope.paramsQueryFlag == 'view') {
                    if ($scope.rows2.length == 0) {
                        $scope.selectedManTaskdetail = selectedManTaskdetail;
                        $scope.tkdBase = selectedManTaskdetail.tkdBase.split(",");
                        $scope.tkdRadio = selectedManTaskdetail.tkdRadio.split(",");
                        $scope.tkdAlarmen = selectedManTaskdetail.tkdAlarmen.split(",");
                        $scope.tkdAlarm = selectedManTaskdetail.tkdAlarm.split(",");


                        // $scope.rows2 = [];
                        $scope.checkTKDS($scope.tkdBase);
                        $scope.checkTKDS($scope.tkdRadio);
                        $scope.checkTKDS($scope.tkdAlarmen);
                        $scope.checkTKDS($scope.tkdAlarm);

                    } else {

                    };

                    $scope.count2 = $scope.rows2.length;

                } else {

                };


                // $scope.rows2 = [];
            });

        };
        // $scope.searchBatchQuery();




        $scope.checkTKDS = function(tkd) {

            if ($scope.paramsQueryFlag == 'modify') {
                if (tkd.length != 0) {
                    var leftRows = $scope.rows;
                    for (var i = 0; i < leftRows.length;) {
                        if (tkd.indexOf(leftRows[i].objObjid) > -1) {
                            $scope.rows2.push(leftRows[i]);
                            leftRows.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                    $scope.rows = leftRows;
                }
            }

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
            console.log($scope.checked);
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
            console.log($scope.checkedItems);
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
            console.log($scope.checked2);
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
            console.log($scope.checkedItems2);
        };

        //   --------------------------------第二个end------------------------------
        $scope.doubleSelectToRight = function() {
            var cnt = $scope.rows.length;
            for (let i = 0; i < cnt; i++) {
                if ($scope.rows[i].checked == true) {
                    console.log($scope.rows2);
                    $scope.rows2.push($scope.rows[i]);
                    console.log($scope.rows2);
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
            $scope.orignRows2 = $scope.rows2;

        };
        $scope.doubleSelectToLeft = function() {

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

            $scope.checked2 = [];
            $scope.checkedItems2 = [];
            $scope.xx.select_all2 = false;
            $scope.count2 = $scope.rows2.length;

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
                    if ($scope.query_front.objObjname_front == row.objObjname && $scope.query_front.objActivetype == row.objActivetype) {
                        $scope.rows2_new.push(row);
                    }
                    //满足一个查询条件
                } else if ($scope.query_front.objObjname_front !== '' || $scope.paramsType_front != '0') {
                    if ($scope.query_front.objObjname_front == row.objObjname) {
                        $scope.rows2_new.push(row);
                    } else if ($scope.query_front.objActivetype == row.objActivetype) {
                        $scope.rows2_new.push(row);
                    }
                } else {
                    $scope.rows2_new = $scope.orignRows2;
                }

            };

            $scope.rows2 = $scope.rows2_new;
        };
        /////////////////////////--------------前台条件查询end--------------/////////////////////////////


        $scope.save = function() {
            if ($scope.rows2.length == 0) {
                alert('Please select one!');
            } else {
                $uibModalInstance.close($scope.rows2);
            }

        };

        $scope.close = function(newItems) {
            $uibModalInstance.close($scope.rows2);
        };


    }
})();