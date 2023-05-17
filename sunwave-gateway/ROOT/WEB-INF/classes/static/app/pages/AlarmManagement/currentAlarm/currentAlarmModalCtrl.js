/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.AlarmManagement.currentAlarm', [])
    .controller('currentAlarmModalCtrl', currentAlarmModalCtrl);

function currentAlarmModalCtrl($scope,isAdd, transmitModalItems, $uibModalInstance) {

//     $scope.modal={
//         TaskName:"",
//         Status:"",
//         ExecutionTime:"",
//         Duration:"",
//         RetryTimes:1
//     }

//     $scope.isAdd = isAdd;
//     if ($scope.isAdd) {
//         $scope.title = '录入';
//     } else {
//         $scope.title = "编辑";
//         $scope.modal = transmitModalItems;
//     }

//     $scope.query = {  //查询信息
// 		pageIndex : 0,
// 		pageSize : 10,
//     };

//     // var searchRight = function(){
//     //     PollingTaskModalService.searchContent($scope.query).success(function(response) {
//     //         $scope.rows2 = response.content2;
//     //     });
//     // }
//     // searchRight();

//     var searchForm = function() {   //查询
// 		$scope.query.pageIndex = $scope.paginationConf.currentPage;
// 		$scope.query.pageSize = $scope.paginationConf.itemsPerPage;

// 		PollingTaskModalService.searchContent($scope.query).success(function(response) {
// 			$scope.paginationConf.totalItems = response.totalElements;
//             $scope.rows = response.content;
//             return function () {
//                 return $scope.rows;
//             }
//         });

//     };

//     // 配置分页基本参数
// 	$scope.paginationConf = {  //分页信息
// 		currentPage : 1,
// 		itemsPerPage : 5,
// 		pagesLength : 5,
// 		perPageOptions : [ 5, 10, 20, 30, 40, 50 ]

// 	};

//     /***************************************************************
//     当页码和页面记录数发生变化时监控后台查询
//     如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
//     ***************************************************************/
//    $scope.$watch(
//     'paginationConf.currentPage + paginationConf.itemsPerPage',searchForm);


//     //获取status和type
//     var getStatusAndType = function(){
//         PollingTaskModalService.getStatusAndType().success(function(response){
//             $scope.statuses = response.status;
//             $scope.types = response.type;
//         })
//     }
//     getStatusAndType();




//     //初始化数据
//     // $scope.rows = [
//     //     { id: 1, name: 'admin1', other: '备注1' },
//     //     { id: 2, name: 'admin2', other: '备注2' },
//     //     { id: 3, name: 'admin3', other: '备注3' },
//     //     { id: 4, name: 'admin4', other: '备注4' }
//     // ];

//     $scope.count = 0; //已选择数量
//     $scope.selectData = []; //已选对象
//     $scope.count2 = 0; //已选择数量
//     $scope.selectData2 = []; //已选对象


//     //选择单个（取消选择单个
//     $scope.changeCurrent = function(current, $event) {
//         //计算已选数量 true加， false减
//         $scope.current = current;
//         $scope.count += current.checked ? 1 : -1;
//         //判断是否全选，选数量等于数据长度为true
//         $scope.selectAll = $scope.count === $scope.rows.length;
//         //统计已选对象
//         $scope.selectId = [];
//         $scope.selectData = [];
//         angular.forEach($scope.rows, function(item) {
//             if (item.checked) {
//                 $scope.selectData[$scope.selectData.length] = item;
//                 // alert('选中:'+item.id);
//                 $scope.selectId.push(item.id);
//             }
//         });


//         $event.stopPropagation(); //阻止冒泡
//         return function() {
//             return $scope.current;
//         }

//     };
//     // var current = $scope.current;


//     //单击行选中
//     $scope.changeCurrents = function(current, $event) {
//         if (current.checked == undefined) {
//             current.checked = true;
//         } else {
//             current.checked = !current.checked;
//         }
//         $scope.changeCurrent(current, $event);
//     };

//     //全选（取消全选
//     $scope.changeAll = function() {
//         //console.log(scope.selectAll);
//         angular.forEach($scope.rows, function(item) {
//             item.checked = $scope.selectAll;
//         });
//         $scope.count = $scope.selectAll ? $scope.rows.length : 0;
//         if ($scope.selectAll) {

//             $scope.selectData = $scope.rows.slice();
//         } else {
//             $scope.selectData = [];

//         }

//     };
    //编辑事件
    $scope.zdTableEdit = function(item, $event) {
        console.log(item);
        $event.stopPropagation(); //阻止冒泡
    };
    //删除事件
    $scope.zdTableRemove = function(item, $event) {
        console.log(item);
        $event.stopPropagation(); //阻止冒泡
    };


    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

    // });
}
// });