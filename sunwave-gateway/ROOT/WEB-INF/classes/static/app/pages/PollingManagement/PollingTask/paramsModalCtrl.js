(function() {
    'use strict';

    angular.module('SunWave.pages.PollingManagement.PollingTask', [])
        .controller('paramsModalCtrl', paramsModalCtrl);

    function paramsModalCtrl($scope, transmitModalItems, paramsDesignFlag, selectedManTaskdetail, PollingTaskService, isTask, $uibModalInstance) {


        $scope.transmitModalItems = transmitModalItems;
        $scope.paramsDesignFlag = paramsDesignFlag;


        if (paramsDesignFlag == 'modify') {
            $scope.selectedManTaskdetail = selectedManTaskdetail;

            $scope.tkdSetparam = $scope.selectedManTaskdetail.tkdSetparam.split(",");
            $scope.tkdSetvalue = $scope.selectedManTaskdetail.tkdSetvalue.split(",");

        };

        $scope.xx = {
            select_all: "",
            select_all2: ""
        };

        $scope.isTask = isTask;

        $scope.query = { //查询信息
            objObjids: "",
            objObjname: "",
            objActivetype: "",
            pageIndex: 0,
            pageSize: 10
        };
        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 10,
            pagesLength: 10,
            perPageOptions: [10, 20, 30, 40, 50]

        };

        $scope.row = {
            setValue: "",
            isInpu: false,
            isSelec: false
        };


        // /**
        //  * 单元格单击变编辑
        //  * @param e
        //  */
        // $scope.edit = function(e) {
        //     var td = $(e.target);
        //     var txt = td.text();
        //     var input = $("<input type='text' value='" + txt + "' style='width:100%;height:26px;'/>");
        //     td.html(input);
        //     input.click(function() { return false; });
        //     //获取焦点
        //     input.trigger("focus");
        //     //文本框失去焦点后提交内容，重新变为文本
        //     input.blur(function() {
        //         var newtxt = $(this).val();
        //         //判断文本有没有修改
        //         if (newtxt != txt) {
        //             td.html(newtxt);
        //         } else {
        //             td.html(newtxt);
        //         }
        //     });
        // };

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

        //查询BatchDesign
        $scope.searchBatchDesign = function() {
            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            PollingTaskService.searchBatchDesign($scope.query).success(function(response) {
                $scope.paginationConf.totalItems = response.data.totalElements;
                $scope.rows = response.data;
                for (let index = 0; index < $scope.rows.length; index++) {
                    const element = $scope.rows[index];
                    switch (element.activeType) {
                        case 'base':
                            element.activeType = 'Device Information';
                            break;
                        case 'param__base':
                            element.activeType = 'Device Information';
                            break;
                        case 'omc':
                            element.activeType = 'Network Management';
                            break;
                        case 'param__omc':
                            element.activeType = 'Network Management';
                            break;
                        case 'alarm':
                            element.activeType = 'Alarm Name';
                            break;
                        case 'alarmYN':
                            element.activeType = 'Alarm Enable';
                            break;
                        case 'radio':
                            element.activeType = 'Set Parameter';
                            break;
                        case 'realtime':
                            element.activeType = 'Sampling data';
                            break;
                        default:
                            break;
                    }
                }
            });

        };



        //判断查询Query or Design
        var search = function(searchFlag) {
            if ($scope.isTask == 'Query') {
                $scope.searchBatchQuery();
            } else if ($scope.isTask == 'Design') {
                $scope.searchBatchDesign();
            } else {
                return
            }
        };

        if ($scope.isTask == 'Query') {
            $scope.title = 'Batch Query Task';
            search();
        } else if ($scope.isTask == 'Design') {
            $scope.title = "Batch Design Task"; //set
            search();
        } else {
            return
        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        // $scope.$watch(
        //     'paginationConf.currentPage + paginationConf.itemsPerPage', $scope.searchBatchDesign);


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.objId);
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
                var index = $scope.checked.indexOf(i.objId);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.objId);
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

        $scope.conf = [];

        //点击事件 set Params/add params
        $scope.clickInput = function(row, e) {

            if (row.objValueSet.length != 0) {
                row.isSelec = true;
                if ($scope.paramsDesignFlag == 'modify') {

                    for (var i = 0; i < $scope.tkdSetparam.length; i++) {
                        for (var j = 0; j < $scope.tkdSetvalue.length; j++) {
                            if (row.objId == $scope.tkdSetparam[i]) {
                                row.objSetValueKey = $scope.tkdSetvalue[i];
                            }
                        }
                    }
                } else {
                    return
                };
            } else {
                row.isInpu = true;
                if ($scope.paramsDesignFlag == 'modify') {
                    for (var i = 0; i < $scope.tkdSetparam.length; i++) {
                        for (var j = 0; j < $scope.tkdSetvalue.length; j++) {
                            if (row.objId == $scope.tkdSetparam[i]) {
                                row.setValue = $scope.tkdSetvalue[i];
                            }
                        }
                    }
                } else {
                    return
                };
            }

        };
        //关闭保存事件
        $scope.save = function() {
            // $scope.conf;
            if ($scope.checkedItems.length == 0) {
                alert('Please check one!')
            } else {
                var ff = false;
                for (let i = 0; i < $scope.checkedItems.length; i++) {
                    const element = $scope.checkedItems[i];
                    if (element.setValue == null && (element.objSetValueKey == null || element.objSetValueKey == undefined)) {
                        alert('Please set value!');
                        return;
                    } else {
                        ff = true
                    }
                };
                if (ff == true) {
                    $uibModalInstance.close($scope.checkedItems);
                }
            }
        };


        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();