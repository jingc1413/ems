angular.module('SunWave.pages.AlarmConfiguration.AlarmLevel', [])
    .controller('modifyModalCtrl', modifyModalCtrl);

function modifyModalCtrl($rootScope, $scope, isAdd, checkedItems, $uibModalInstance, $http, AlarmLevelService, messageAlertService) {


    $scope.modal = {
        alvAlarmlevelid: "",
        alvName: "",
        alvMemo: "",
        alvColor: "",
        alvSound: ""
    };
    $scope.isSave = true;
    $scope.isAdd = isAdd;
    $scope.isModify = false;
    $scope.checkedItems = checkedItems;


    //color picker

    // 基本实例化:
    // $(function() {
    //     $('#color').colorpicker({
    //         allowEmpty: true, //允许为空,显示清楚颜色按钮
    //         color: "#ffffff", //初始化颜色
    //         showInput: true, //显示输入
    //         containerClassName: "full-spectrum",
    //         showInitial: true, //显示初始颜色,提供现在选择的颜色和初始颜色对比
    //         showPalette: true, //显示选择器面板
    //         showSelectionPalette: true, //记住选择过的颜色
    //         showAlpha: true, //显示透明度选择
    //         maxPaletteSize: 7, //记住选择过的颜色的最大数量
    //         preferredFormat: "hex" //输入框颜色格式,(hex十六进制,hex3十六进制可以的话只显示3位,hsl,rgb三原
    //     });
    // });
    $(function() {
        // 基本实例化:
        $('#cp2').colorpicker({
            fillcolor: true
        });

    });

    // 状态判断
    if ($scope.isAdd == 'Add') {
        // $scope.title = 'Add';
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
    } else if ($scope.isAdd == 'Modify') {
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '修改'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.modal = $scope.checkedItems;
        $scope.isSave = true;
        $scope.isModify = true;
    } else {
        // $scope.title = "View";
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        };
        $scope.modal = $scope.checkedItems;
        $scope.isSave = false;
        $scope.isModify = true;
    };

    $scope.save = function() {
        var newItems = {};
        newItems = $scope.modal;
        if ($scope.isAdd == 'Modify') {
            AlarmLevelService.modifyContent(newItems)
                .success(function(res) {
                    if (res.data == true) {
                        // alert("Success")
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        // alert('Failed' + res.msg);
                        messageAlertService.successFun('failed');
                    }

                })
                .error(function(err) {
                    console.info(err);
                });

        } else {}
    };
    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}