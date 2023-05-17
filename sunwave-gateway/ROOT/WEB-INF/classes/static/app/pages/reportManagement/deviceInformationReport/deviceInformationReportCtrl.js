(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.deviceInformationReport', ['SunWave.pages.Authority.area',
            'SunWave.pages.deviceManagement.deviceList',
            'SunWave.pages.sysManagement.vendorManagement'
        ])
        .controller('deviceInformationReportCtrl', deviceInformationReportCtrl);

    function deviceInformationReportCtrl($scope, $log, $uibModal, deviceInformationReportService, deviceListService, areaService, $http) {
        var setting = {
            view: {
                // addHoverDom: addHoverDom,
                // removeHoverDom: removeHoverDom,
                selectedMulti: true
            },
            check: {
                enable: true
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
                // beforeRemove:removeNode
            }
        };

        $scope.query = {
            deviceName: "",
            areaStr: "",
            deviceCoverType: "",
            deviceStatus: "",
            companyStr: "",
            deviceType: "",
            // elementId: "",
            // elementNeneId: "",
            startTime: "",
            endTime: "",
            // neRepeaterId: "",
            deviceSn: "",
            // reportId: "",
            deviceLevel: "",
            protocolType: "",
            auAll: false,
            euAll: false,
            ruAll: false
        };
        //查询
        // var searchTree = function() {
        //     deviceInformationReportService.searchTree()
        //         .success(function(response) {
        //             var zNodes = response.tree;
        //             $.fn.zTree.init($("#aTree"), setting, zNodes);
        //             $.fn.zTree.init($("#aTree2"), setting, zNodes);
        //         })
        //         .error(function(err) {
        //             console.info(err);
        //         });
        // };
        // searchTree();

        //type
        $scope.searchDeviceType = function() {
            deviceListService.searchDeviceType().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.deviceTypes = res.data;
                $scope.deviceTypes.push({
                    'dtpBelong': 0,
                    'dtpDevicetypeid': 777,
                    'dtpName': "AU-All"
                }, {
                    'dtpBelong': 0,
                    'dtpDevicetypeid': 888,
                    'dtpName': "EU-All"
                }, {
                    'dtpBelong': 0,
                    'dtpDevicetypeid': 999,
                    'dtpName': "RU-All"
                });
            })
        };
        //status
        $scope.deviceStatuss = function() {
            deviceListService.deviceStatuss().success(function(res) {
                // console.log(`查的DeviceType是：${res.data}`);
                $scope.devStatuss = res.data;
            })
        };
        $scope.deviceStatuss();
        $scope.searchDeviceType();

        //vendor
        $scope.getVendorName = function() {
            deviceListService.findAll().success(function(res) {
                $scope.vNames = res.data;
            })
        };
        $scope.getVendorName();

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
                    $.fn.zTree.init($("#areaTree"), setting, zNodes);

                    var treeObj = $.fn.zTree.init($("#areaTree"), setting, zNodes);
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

            var treeObj = $.fn.zTree.getZTreeObj("areaTree"),
                nodes = treeObj.getCheckedNodes(true),
                areaStrArr = [];
            for (var i = 0; i < nodes.length; i++) {
                areaStrArr.push(nodes[i].id);
            };

            $scope.query.areaStr = areaStrArr.toString();
            console.log(nodes);
        };

        $scope.checkTypeAll = function() {

            switch ($scope.query.deviceType) {
                case 777:
                    $scope.query.auAll = true;
                    break;
                case 888:
                    $scope.query.euAll = true;
                    break;
                case 999:
                    $scope.query.ruAll = true;

                    break;

                default:
                    break;
            }
        };

        //导出
        $scope.exportList = function(item) { 
            $scope.checkTypeAll();
            return $http({    
                url: Url + '/sunwave-report-management/siteinfo/excel',
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
    }
})();