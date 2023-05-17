angular.module('SunWave.pages.LogManagement.logTransfer', [])
    .controller('addCtrl', addCtrl);

function addCtrl($rootScope, $scope, isAdd, modal, $uibModalInstance, logTransferService, messageAlertService, $filter) {

    $scope.isDisplay = true;
    // $scope.isAlarm = false;

    $scope.modal = {
        taskName: "",
        sftpIp: "",
        sftpPort: "22",
        sftpSavePath: "",
        sftpUser: "",
        sftpPasswd: "",
        taskType: "",
        lastExecutionTimeStr: "",
        taskInterval: "",
        taskStatus: 1
    };
    $scope.isShow = false;
    $scope.isCM = false;


    // $scope.typeDataModel = [];
    $scope.Intervals = [
        // { id: '', label: "--please select--" },
        { id: 30, label: "30 min" },
        { id: 60, label: "1 hour" },
        { id: 1440, label: "1 day" },
    ];

    $scope.typeDatas = [
        { id: 1, label: "PM" },
        // { id: 2, label: "CM_ConfInfo" }
        { id: 2, label: "CM" }
        // { id: 3, label: "CM_SysPara" }
    ];


    $scope.typeSelectSetting = {
        smartButtonMaxItems: 4,
        smartButtonTextConverter: function(itemText, originalItem) {
            this.itemText = itemText;
            return this.itemText;
        }
    };

    $scope.deterMType = function() {
        if ($scope.typeDataModel == 2) {
            $scope.modal.taskInterval = 1440;
            $scope.isCM = true;
        } else {
            $scope.isCM = false;
        }
    }

    //taskType-modify view
    let selectViewFun = function() {
        // let taskTypeArr = $scope.modal.taskType.split(',');
        // for (let i = 0; i < $scope.typeDatas.length; i++) {
        //     const typeI = $scope.typeDatas[i].id;
        //     for (let j = 0; j < taskTypeArr.length; j++) {
        //         const typeJ = taskTypeArr[j];
        //         if (typeI == typeJ) {
        //             $scope.typeDataModel.push($scope.typeDatas[i]);
        //         }
        //     }
        // }

        $scope.typeDataModel = Number($scope.modal.taskType);
    }

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'add') {
        $scope.isDisplay = true;
        // $scope.title = 'Add';
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        }
        $scope.readonly = false;
        $scope.isShow = true;

    } else if ($scope.isAdd == 'modify') {
        $scope.isDisplay = true;
        // $scope.title = "Modify";
        if ($rootScope.language == 'chinese') {
            $scope.title = '修改'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        }
        $scope.modal = modal;
        $scope.modal.lastExecutionTimeStr = $filter('date')(modal.lastExecutionTime, 'yyyy-MM-dd HH:mm');
        $scope.isShow = true;
        if ($scope.modal.taskType == '2') {
            $scope.modal.taskInterval = 1440;
            $scope.isCM = true;
        } else {
            $scope.isCM = false;
        }
        selectViewFun();

    } else {
        $scope.isDisplay = false;
        // $scope.title = "View";
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        }
        $scope.modal = modal;
        $scope.isShow = false;
        if ($scope.modal.taskType == '2') {
            $scope.modal.taskInterval = 1440;
            $scope.isCM = true;
        } else {
            $scope.isCM = false;
        }
        selectViewFun();
    }

    $scope.pwshow = false;
    $scope.changePsd_eye = function() {
        // var inputType = document.getElementById('psd-input');
        $scope.pwshow = !$scope.pwshow;
    }


    $scope.save = function() {
        // if($scope.role_exist == true) return;


        // var typeArr = [];
        // for (let index = 0; index < $scope.typeDataModel.length; index++) {
        //     const el = $scope.typeDataModel[index];
        //     typeArr.push(el.id);
        // };
        // $scope.modal.taskType = typeArr.toString();
        $scope.modal.taskType = $scope.typeDataModel;

        delete $scope.modal.lastExecutionTime;

        // $scope.modal.taskInterval = Number($scope.modal.taskInterval);
        if ($scope.modal.taskType == '' || $scope.modal.taskType == null || $scope.modal.taskType == undefined) {
            alert("Type cannot be empty!");
            return
        };

        if ($scope.modal.lastExecutionTimeStr == '' || $scope.modal.lastExecutionTimeStr == null || $scope.modal.lastExecutionTimeStr == undefined) {
            alert("ExecutionTime cannot be empty!");
            return
        };

        if ($scope.modal.taskInterval == '' || $scope.modal.taskInterval == null || $scope.modal.taskInterval == undefined) {
            alert("Interval cannot be empty!");
            return
        }
        if ($scope.isAdd == 'add') {

            var newItems = {};
            newItems = $scope.modal;
            delete newItems.taskIntervalStr;
            logTransferService.addContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
                        // alert("Success!");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        alert(response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'modify') {
            var newItems = {};
            newItems = $scope.modal;
            delete newItems.taskIntervalStr;
            logTransferService.editContent(newItems)
                .success(function(response) {
                    if (response.code == 200) {
                        // alert("Success!");
                        messageAlertService.successFun('success');
                        $scope.close();
                    } else {
                        alert(response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });
            // }

        } else {
            $scope.close();
        }


    };
    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };


}