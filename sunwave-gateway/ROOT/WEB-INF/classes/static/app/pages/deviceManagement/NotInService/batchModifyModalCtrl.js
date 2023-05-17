(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.NotInService', ['SunWave.pages.Authority.area',
            'SunWave.pages.deviceManagement.deviceList'
        ])
        .controller('batchModifyModalCtrl', batchModifyModalCtrl);

    function batchModifyModalCtrl($scope, $uibModal, checkedItems, NotInServiceService, deviceListService, areaService, $uibModalInstance) {


        $scope.checkedItems = checkedItems;

        $scope.repeterIds = [];

        for (var i = 0; i < $scope.checkedItems.length; i++) {
            $scope.repeterIds = $scope.checkedItems[i].neRepeaterid16;
        };

        $scope.rows = $scope.checkedItems;
        $scope.title = 'Batch Modify';


        $scope.xx = {
            select_all: "",
            select_all2: ""
        };

        // $scope.isTask = isTask;

        $scope.query = { //查询信息
            objId: "",
            objName: "",
            pageIndex: 0,
            pageSize: 10
        };
        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 5,
            pagesLength: 5,
            perPageOptions: [5, 10, 20, 30, 40, 50]

        };

        $scope.row = {
            setValue: "",
            isInpu: false,
            isSelec: false
        };


        $scope.searchAreaTree = function(size) {
            $scope.isArea = 'Area';
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/safe/areaTreeModal.html',
                controller: 'areaTreeModalCtrl',
                size: 'md',
                resolve: {
                    isArea: function() {
                        return $scope.isArea;
                    },
                    // deviceListService: function() {
                    //     return deviceListService;
                    // },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/AlarmManagement/historyAlarm/areaTreeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(changedNodes) {
                // console.log(`已选择的area是${selectArea.name}`);
                $scope.selectArea = changedNodes.name;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };




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


        //关闭保存事件
        $scope.save = function() {

            var newItems = {};
            newItems = $scope.modal;
            newItems.neRepeaterid16 = $scope.repeterIds.toString();

            deviceListService.editNe(newItems).success(function(res) {
                if (res.data == true) {
                    alert('Modify Success!');
                    $uibModalInstance.close(newItems);
                } else {
                    alert('Modify Failed:' + res.msg)
                }

            })

        };


        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();