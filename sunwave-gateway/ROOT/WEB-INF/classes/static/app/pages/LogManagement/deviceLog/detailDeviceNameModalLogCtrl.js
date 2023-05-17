/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.LogManagement.deviceLog', [])
    .controller('detailDeviceNameModalLogCtrl', detailDeviceNameModalLogCtrl);

function detailDeviceNameModalLogCtrl($scope, deviceLogService, checkedItems, $filter, $http) {

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
        qrtEventtime: $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        qryType2: "",
        qryTasklogid: "",
        manTask: {
            tskStyle: ""
        }

    };


    var setQryTypeFun = () => {
        if ($scope.checkedItems.qryType == 0) {
            $scope.modal.qryType2 = 'Query'
        } else if ($scope.checkedItems.qryType == 1) {
            $scope.modal.qryType2 = 'Set'
        };
    };

    //赋值
    $scope.modal = $scope.checkedItems;
    $scope.modal.qrtEventtime = $filter('date')($scope.checkedItems.qrtEventtime, 'yyyy-MM-dd HH:mm:ss');
    $scope.lists = $scope.checkedItems.paramsList;
    $scope.rows = [];
    $scope.object = {
        ParameterId: '',
        ParameterName: '',
        Contents: ''
    };
    setQryTypeFun();

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
    $scope.exportListDetail = function(item) { 
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
                    
                console.log("filename:" + filename);    
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