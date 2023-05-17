(function() {
    'use strict';

    angular.module('SunWave.pages.deviceManagement.NotInService', ['SunWave.pages.Authority.area',
            'SunWave.pages.deviceManagement.deviceList'
        ])
        .controller('batchModifyModalCtrl', batchModifyModalCtrl);

    function batchModifyModalCtrl($scope, $uibModal, checkedItems, NotInServiceService, deviceListService, areaService, messageAlertService, $uibModalInstance, $filter) {


        $scope.checkedItems = checkedItems;

        // $scope.repeterIds = [];

        for (let i = 0; i < $scope.checkedItems.length; i++) {
            $scope.checkedItems[i].checked = false;
        };

        $scope.rows = $scope.checkedItems;

        for (let i = 0; i < $scope.checkedItems.length; i++) {
            const el = $scope.checkedItems[i];
            el.neLastupdatetime = $filter('date')(el.neLastupdatetime, 'yyyy-MM-dd HH:mm:ss');
        };
        $scope.title = 'Batch Modify';


        $scope.xx = {
            select_all: ""
        };

        $scope.modal = {
            newDeviceName: "",
            newneInstallplace: ""
        }

        $scope.reader = new FileReader();

        // $scope.isTask = isTask;

        $scope.query = { //查询信息
            pageIndex: 0,
            pageSize: 10
        };
        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        $scope.row = {
            setValue: "",
            isInpu: false,
            isSelec: false
        };


        $scope.editDeviceName = function() {
            if ($scope.checkedModalItems.length == 0) {
                messageAlertService.alertFun('must');
            } else {
                for (let i = 0; i < $scope.checkedModalItems.length; i++) {
                    const checked = $scope.checkedModalItems[i];
                    checked.neName = $scope.modal.newDeviceName;
                };
            }
        }

        $scope.editArea = function() {
            if ($scope.checkedModalItems.length == 0) {
                messageAlertService.alertFun('must');
            } else {
                for (let i = 0; i < $scope.checkedModalItems.length; i++) {
                    const checked = $scope.checkedModalItems[i];
                    checked.areaName = $scope.selectArea;
                };
            }

        };

        let changeFun = function(e, r) {
            if (r) {
                r = e;
            } else {
                // r = '';
                return
            }
        };

        $scope.editFile = function(params) {
            // if ($scope.checkedModalItems.length == 0) {
            //     messageAlertService.alertFun('must');
            // } else {
            let file = document.getElementById("fileUpload").files[0];
            let form = new FormData();
            form.append('file', file);
            NotInServiceService.getNeElementByFile(form).success(function(res) {
                    if (res.data) {
                        for (let i = 0; i < res.data.length; i++) {
                            const el = res.data[i];
                            for (let j = 0; j < $scope.rows.length; j++) {
                                const row = $scope.rows[j];
                                if (el.neRepeaterid16 == row.neRepeaterid16) {
                                    changeFun(row.neName, el.neName);
                                    changeFun(row.neRoute, el.neRoute);
                                    changeFun(row.nelnstallplace, el.nelnstallplace);
                                    changeFun(row.areaName, el.areaName);
                                }
                            }
                        }
                    } else {}
                })
                // }
        }

        $scope.editLocation = function() {
            if ($scope.checkedModalItems.length == 0) {
                messageAlertService.alertFun('must');
            } else {
                for (let i = 0; i < $scope.checkedModalItems.length; i++) {
                    const checked = $scope.checkedModalItems[i];
                    checked.neInstallplace = $scope.modal.newneInstallplace;
                };
            }

        }


        $scope.searchAreaTree = function(size) {
            $scope.isArea = 'Area';
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/Authority/safe/areaTreeModal.html',
                controller: 'treeModalCtrl',
                size: 'md',
                resolve: {
                    isArea: function() {
                        return $scope.isArea;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/deviceManagement/NotInService/treeModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(changedNodes) {
                // //console.log(`已选择的area是${selectArea.name}`);
                $scope.selectArea = changedNodes.name;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };




        $scope.m = [];
        $scope.checkedModal = []; //选中的ID
        $scope.checkedModalItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checkedModal = [];
                $scope.checkedModalItems = [];
                angular.forEach($scope.rows, function(i) {
                    i.checked = true;
                    $scope.checkedModal.push(i.neNeid);
                    $scope.checkedModalItems.push(i);
                });
            } else {
                angular.forEach($scope.rows, function(i) {
                    i.checked = false;
                    $scope.checkedModal = [];
                    $scope.checkedModalItems = [];
                });
            }
            //console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.rows, function(i) {
                var index = $scope.checkedModal.indexOf(i.neNeid);
                if (i.checked && index == -1) {
                    $scope.checkedModal.push(i.neNeid);
                    $scope.checkedModalItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checkedModal.splice(index, 1);
                    $scope.checkedModalItems.splice(index, 1);
                };
            });


            if ($scope.rows.length == $scope.checkedModal.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            //console.log($scope.checkedModalItems);
        };


        // $scope.getFile = function() {
        //     $scope.reader.readAsDataUrl($scope.myFile, $scope)
        //         .then(function(result) {
        //             $scope.imageSrc = result;
        //         });
        // };


        //file
        $scope.getFileMessage = function() {
            var file;
            deviceListService.getFileMessage(file).success(function(res) {
                if (res.data == true) {
                    alert('Modify Success!');
                    $uibModalInstance.close();
                } else {
                    alert('Modify Failed:' + res.msg)
                }
            })
        }


        //关闭保存事件
        $scope.save = function() {

            var newItems = {};
            if ($scope.checkedItems.length == 0) {
                messageAlertService.alertFun('must');
            } else {
                newItems = $scope.checkedItems;

                //console.log(newItems);
                NotInServiceService.batchModify(newItems).success(function(res) {
                    if (res.data == true) {
                        alert('Modify Success!');
                        $uibModalInstance.close(newItems);
                    } else {
                        alert('Modify Failed:' + res.msg)
                    }

                })
            }


        };


        $scope.close = function() {
            $uibModalInstance.close();
        };

    }
})();