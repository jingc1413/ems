(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.customReport', ['SunWave.pages.Authority.area',
            'SunWave.pages.deviceManagement.deviceList',
            'SunWave.pages.sysManagement.vendorManagement'
        ])
        .controller('customReportCtrl', customReportCtrl);

    function customReportCtrl($scope, $log, $uibModal, deviceListService, areaService, customReportService, $http) {
        $scope.xx = {
            select_all: ""
        };

        $scope.query = {
            areaStr: "",
            companyStr: "",
            diviceType: "",
            // elementId: "",
            // elementNeneId: "",
            endTime: "",
            neRepeaterid16: "",
            deviceSn: "",
            // neVer: "",
            reportId: "",
            deviceLevel: "",
            startTime: "",
            deviceId: "",
            deviceSwVer: ""
        };

        $scope.search = function() {
            searchReportList();
        };
        //查询
        var searchReportList = function() {
            // $scope.query.pageIndex = $scope.paginationConf.currentPage;
            // $scope.query.pageSize = $scope.paginationConf.itemsPerPage;

            customReportService.searchReportList()
                .success(function(response) {
                    // $scope.paginationConf.totalItems = response.totalElements;
                    $scope.items = response.data;
                    console.log($scope.items);
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        searchReportList();


        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
            })
        };

        $scope.searchDeviceType();

        //vendor
        $scope.getVendorName = function() {
            deviceListService.findAll().success(function(res) {
                $scope.vNames = res.data;
            })
        };
        $scope.getVendorName();


        // $scope.searchDeviceName = function() {

        //     var modalInstance = $uibModal.open({
        //         animation: true,
        //         backdrop: "static",
        //         templateUrl: 'app/pages/reportManagement/customReport/deviceName.html',
        //         controller: 'deviceNameCtrl',
        //         size: "md",
        //         resolve: {
        //             transmitModalItems: function() {
        //                 return $scope.transmitModalItems;
        //             },
        //             deviceListService: function() {
        //                 return deviceListService;
        //             },
        //             deps: ['$ocLazyLoad',
        //                 function($ocLazyLoad) {
        //                     return $ocLazyLoad.load([
        //                         'app/pages/reportManagement/customReport/deviceNameCtrl.js'
        //                     ]);
        //                 }
        //             ]
        //         }
        //     });

        //     modalInstance.result.then(function(selectParams) {
        //         console.log(selectParams);
        //         $scope.query.deviceName = selectParams;
        //     }, function(newItems) {
        //         console.log(newItems);
        //         $log.info('Modal dismissed at: ' + new Date());
        //     });
        // };


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.xx.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.id);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.items, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                var index = $scope.checked.indexOf(i.id);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.id);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.items.length == $scope.checked.length) {
                $scope.xx.select_all = true;
            } else {
                $scope.xx.select_all = false;
            }
            console.log($scope.checkedItems);
        };

        var cancelCheckF = () => {
            for (let i = 0; i < $scope.items.length; i++) {
                const item = $scope.items[i];
                if (item.checked == true) {
                    item.checked = false;
                }
            }
        };

        $scope.reset = function() {
            $scope.xx.select_all = false;
            $scope.checked = [];
            $scope.checkedItems = [];
            cancelCheckF();
            $scope.query = {
                deviceName: "",
                areaStr: "",
                companyStr: "",
                diviceType: "",
                // elementId: "",
                // elementNeneId: "",
                endTime: "",
                neRepeaterid16: "",
                deviceSn: "",
                // neVer: "",
                reportId: "",
                deviceLevel: "",
                startTime: "",
                deviceId: "",
                deviceSwVer: ""
            };
            var treeObj = $.fn.zTree.getZTreeObj("aTree");
            treeObj.cancelSelectedNode();
            $.fn.zTree.init($("#aTree"), setting, zNodes);
            var nodes = treeObj.getNodes();
            for (var i = 0; i < nodes.length; i++) { //设置节点展开
                treeObj.expandNode(nodes[i], true, false, true);
            }
        };
        var zNodes = [
            // { id:1, pId:0, name:"SGMRT", open:true},
            // { id:11, pId:1, name:"Floor23"},
        ];

        var setting = {
            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            // check: {
            //     enable: true
            // },
            check: {
                enable: true,
                chkboxType: { "Y": "ps", "N": "ps" }
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            edit: {
                // enable: true
            },
            callback: {
                // beforeEditName:editNode,
                // onClick:clickNode,
                onCheck: zTreeOnCheck
                    // beforeRemove:removeNode
            }
        };


        $scope.searchArea = function() {
            areaService.searchAuthTree().success(function(res) {
                    zNodes = res.data;
                    $.fn.zTree.init($("#aTree"), setting, zNodes);
                    var treeObj = $.fn.zTree.init($("#aTree"), setting, zNodes);
                    var nodes = treeObj.getNodes();
                    for (var i = 0; i < nodes.length; i++) { //设置节点展开
                        treeObj.expandNode(nodes[i], true, false, true);
                    }
                })
                .error(function(err) {
                    console.info(err);
                });
        };
        $scope.searchArea();

        //tree checked
        function zTreeOnCheck(event, treeId, treeNode) {
            $scope.treeNode = treeNode;
            console.log($scope.treeNode);

            var treeObj = $.fn.zTree.getZTreeObj("aTree"),
                nodes = treeObj.getCheckedNodes(true),
                areaStrArr = [];
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].check_Child_State !== 1) {
                    areaStrArr.push(nodes[i].id);
                } else {}

            };

            $scope.query.areaStr = areaStrArr.toString();
            console.log(nodes);
        };


        /**添加**/
        $scope.addReport = function() {
            $scope.transmitModalItems = null;
            $scope.isAdd = 'add';
            $scope.openAddDialog();

        };
        /**修改**/
        $scope.modifyReport = function() {
            if ($scope.checked.length == 0) {
                alert("Must select one。");
                return;
            } else if ($scope.checked.length > 1) {
                alert("Only Select one");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = 'modify';
                $scope.openAddDialog();

            }

        };

        //导出
        $scope.exportList = function(item) {
            zTreeOnCheck(); 
            $scope.query.reportId = $scope.checked.toString();
            if ($scope.query.reportId == null || $scope.query.reportId == '') {
                alert('Please select one');
                return
            } else {
                return $http({    
                    url: Url + '/sunwave-report-management/report/excel',
                        method: "POST",
                        headers: {      
                        'Content-type': 'application/json',
                        'Authorization': window.localStorage.myToken    
                    },
                        data: $scope.query,
                        responseType: 'arraybuffer'  
                }).success(function(data) {   //     var blob = new Blob([data], {type:
                    // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                       // 使用{type:
                    // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                      
                    var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    //         var time=$scope.CurentTime();
                        
                    var filename = 'report.xlsx';  
                    if (window.navigator.msSaveOrOpenBlob) { // For IE:
                              
                        navigator.msSaveBlob(blob, filename);
                    } else { // For other browsers:
                            
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
            }
        };

        //delete
        $scope.deleteReport = function() {
            if ($scope.checked.length == 0) {
                alert("Must select one。");
                return;
            } else {
                if (confirm("Are you sure to delete?")) {
                    var delIds = [];
                    for (var i = 0; i < $scope.checked.length; i++) {
                        delIds.push($scope.checked[i]);
                    };
                    customReportService.deleteItem(JSON.stringify(delIds)).success(function(response) {
                        if (response.data == true) {
                            alert("Delete success!");
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            $scope.search();
                        } else {
                            alert("Delete failed!");
                        }
                    });
                }
            }
        };
        //modal
        $scope.openAddDialog = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/reportManagement/customReport/addModal.html',
                controller: 'addModalCtrl',
                size: 'lg',
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    isAdd: function() {
                        return $scope.isAdd;
                    },
                    customReportService: function() {
                        return customReportService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['app/pages/reportManagement/customReport/addModalCtrl.js']);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(newItems) {
                console.log(newItems);
                $scope.checked = [];
                $scope.checkedItems = [];
                $scope.xx.select_all = false;
                // $scope.items.push(newItems);
                $scope.search();
            }, function(newItems) {
                console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }
})();