/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.deviceLog', [])
    .controller('detailDeviceNameModalLogCtrl', detailDeviceNameModalLogCtrl);

function detailDeviceNameModalLogCtrl($rootScope, $scope, deviceLogService, checkedItems, $filter, $http) {

    $scope.checkedItems = checkedItems;

    $scope.modal = {
        neElement: {
            neName: "",
            neRepeaterid16: "",
            neDeviceid: "",
            neDevicetype: {
                dtpName: ""
            },
        },
        qryBegintime: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        qryType2: "",
        qryTasklogid: "",
        manTask: {
            tskStyle: ""
        }

    };


    var setQryTypeFun = function() {
        if ($scope.checkedItems.qryType == 0) {
            $scope.modal.qryType2 = 'Query'
        } else if ($scope.checkedItems.qryType == 1) {
            $scope.modal.qryType2 = 'Set'
        };
    };
    var setTask = function() {
        if ($scope.checkedItems.manTask == null) {
            return
        } else {
            switch ($scope.checkedItems.manTask.tskStyle) {
                case 0:
                    $scope.modal.manTask.tskStyle = '';
                    break;
                case 1:
                    $scope.modal.manTask.tskStyle = 'General Polling';
                    break;
                case 2:
                    $scope.modal.manTask.tskStyle = 'Fast Polling';
                    break;
                case 200:
                    $scope.modal.manTask.tskStyle = 'Batch Upgrade';
                    break;
                case 213:
                    $scope.modal.manTask.tskStyle = 'Batch Query Task';
                    break;
                case 214:
                    $scope.modal.manTask.tskStyle = 'Batch Design Task';
                    break;
                default:
                    break;
            }
        }

    };


    //赋值
    $scope.modal = $scope.checkedItems;
    $scope.modal.qryBegintime = $filter('date')($scope.checkedItems.qryBegintime, 'yyyy-MM-dd HH:mm:ss');
    $scope.lists = $scope.checkedItems.paramsList;
    $scope.rows = [];
    $scope.object = {
        ParameterId: '',
        ParameterName: '',
        Contents: ''
    };
    setQryTypeFun();
    setTask();

    if ($scope.lists != null) {
        for (let i = 0; i < $scope.lists.length; i++) {
            const element = $scope.lists[i].split(',');
            $scope.object = {
                ParameterId: element[0],
                ParameterName: element[1],
                Contents: element[2]
            };
            // $scope.object.ParameterId = element[0];
            // $scope.object.ParameterName = element[1];
            // $scope.object.Contents = element[2];
            $scope.rows.push($scope.object);
        };
    } else {
        return
    };


    // angular.forEach($scope.checkedItems.paramsList, function(element, index) {
    //     $scope.elements = element.split(',');
    //     $scope.object.ParameterId = $scope.elements[0];
    //     $scope.object.ParameterName = $scope.elements[1];
    //     $scope.object.Contents = $scope.elements[2];
    //     $scope.rows.push($scope.object);
    // });

    //导出
    $scope.exportDeviceLogListDetail = function(item) { 
        $rootScope.loading = true;
        return $http({    
            url: Url + '/sunwave-log-management/log/ManEleqryLog/export/detail',
                method: "POST",
                headers: {      
                'Content-type': 'application/json',
                'Authorization': window.localStorage.myToken    
            },
            //     data: $scope.checkedItems.qryEleqrylogid + '',
            data: JSON.stringify(
                $scope.checkedItems.qryEleqrylogid
            ),
            responseType: 'arraybuffer'  
        }).success(function(data) {   //     var blob = new Blob([data], {type:
            $rootScope.loading = false;
            // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
               // 使用{type:
            // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
              
            var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            //         var time=$scope.CurentTime();
                
            var filename = 'Device Log Detail.xlsx';  
            if (window.navigator.msSaveOrOpenBlob) { // For IE:
                       navigator.msSaveBlob(blob, filename);     } else { // For other browsers:
                    
                var objectUrl = URL.createObjectURL(blob);    
                var a = document.createElement('a');    
                document.body.appendChild(a);     // var filename =
                // data.headers('Content-Disposition').split(';')[1].trim().substr('filename='.length); 
                //       
                    
                //console.log("filename:" + filename);    
                a.setAttribute('style', 'display:none');    
                a.setAttribute('href', objectUrl);    
                a.setAttribute('download', filename);    
                a.click();    
                URL.revokeObjectURL(objectUrl);  
            }  

        });
    };



    //params
    $scope.getParams = function() {};

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

}
// });