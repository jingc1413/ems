angular.module('SunWave.pages.deviceManagement.deviceList', ['SunWave.pages.sysManagement.vendorManagement'])
    .controller('deviceAddModalCtrl', deviceAddModalCtrl);

function deviceAddModalCtrl($rootScope, $scope, isAdd, $filter, transmitModalItems, deviceListService, $uibModalInstance, $uibModal, $log, vendorManagementService, messageAlertService) {

    $scope.modal = {
        neName: "",
        neCommtypeid: 6,
        neAreaid: "", //area
        areaName: "",
        neDeviceip: "",
        neDeviceport: "7777",
        // neCompanyid: "",
        neCompany: {
            coCompanyid: 14
        },
        // neRepeaterid: "",
        neRepeaterid16: "",
        neDeviceid: "",
        neInoutid: 1,
        neSitelevelid: "1",
        neProtocoltypeid: 1,
        // neDevicetypeid: 223,
        neOpendate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        neDevicestatusid: {
            dsId: 0
        },
        neLat: "",
        neLon: "",
        neInstallplace: "",
        neMemo: "",
        btsId: "",
        btsName: ""
    };

    $scope.area = {
        selectArea: ""
    };

    $scope.notView = true;
    $scope.deviceIp = false;
    $scope.isAu = false;

    $scope.proTypes = [
        { id: 1, label: "GROUP PROTOCOLTYPE" }
    ];


    $scope.nePositions = [
        { id: 1, label: "indoor" },
        { id: 2, label: "outdoor" }
    ];



    //type
    $scope.searchDeviceType = function() {
        deviceListService.searchDeviceType().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.deviceTypes = res.data;
        })
    };


    // var type_o = transmitModalItems.neDeviceid;
    //change type
    var au_flag = 0;
    $scope.changeDeviceType = function() {
        let typeid = $scope.modal.neDevicetype.dtpDevicetypeid;

        // $scope.typeid = $scope.modal.neDeviceid;
        if (typeid == 225 || typeid == 230 || typeid == 240 || typeid == 200) {
            // if (typeid == 230 || typeid == 225) {
            $scope.modal.neDeviceid = '0';
            $scope.isAu = true;
            au_flag = 1;
        } else {
            // if (au_flag == 1) {
            //     $scope.modal.neDeviceid = $scope.typeid;
            $scope.modal.neDeviceid = '';
            $scope.isAu = false;
            // if ($scope.isAdd == 'Add') {
            //     $scope.modal.neDeviceid = '';
            // } else {
            //     $scope.modal.neDeviceid = transmitModalItems.neDevicetypeid;

            // }
            //     au_flag = 0;
            // }
            // if ($scope.isAdd == 'Add') {
            //     $scope.modal.neDeviceid = '';
            //     $scope.isAu = false;
            // } else {
            //     $scope.modal.neDeviceid = type_o;
            //     $scope.isAu = false;
            // }
        }
    };


    //
    var decideSubID = function() {
        let typeid = $scope.modal.neDevicetype.dtpDevicetypeid;

        if (typeid == 225 || typeid == 230 || typeid == 240 || typeid == 200) {
            $scope.modal.neDeviceid = '0';
            $scope.isAu = true;
            au_flag = 1;
        } else {
            // $scope.modal.neDeviceid = '';
            $scope.isAu = false;
        }
    };


    //status
    $scope.deviceStatuss = function() {
        deviceListService.deviceStatuss().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.devStatuss = res.data;
        })
    };

    //vendor
    $scope.getVendorName = function() {
        deviceListService.findAll().success(function(res) {
            $scope.vNames = res.data;
        })
    };
    //获取commtype
    $scope.getCommtype = function() {
        deviceListService.getCommtype().success(function(res) {
            $scope.commtypes = res.data;
        })
    };
    $scope.getCommtype();

    $scope.searchDeviceType();
    $scope.deviceStatuss();
    $scope.getVendorName();

    //selectCommtype
    $scope.selectCommtype = function() {
        if ($scope.modal.neCommtypeid == 6) { //udp
            $scope.modal.neDeviceport = '7777';
        } else if ($scope.modal.neCommtypeid == 7) {
            $scope.modal.neDeviceport = '161';
        } else {
            $scope.modal.neDeviceport = '';
        }
    };
    $scope.selectCommtype();

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        if ($rootScope.language == 'chinese') {
            $scope.title = '新增'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Add';
        } else {
            $scope.title = 'Add';
        };
        $scope.notView = true;

    } else if ($scope.isAdd == 'View') {
        if ($rootScope.language == 'chinese') {
            $scope.title = '查看'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'View';
        } else {
            $scope.title = 'View';
        };
        $scope.modal = transmitModalItems;
        if (typeof(transmitModalItems.neInout) == 'undefined') {
            $scope.modal.neInoutid = transmitModalItems.neInoutid;
        } else {
            $scope.modal.neInoutid = transmitModalItems.neInout.ioId;
        };
        // if (transmitModalItems.neSitelevelid == 'Vip') {
        //     $scope.modal.neSitelevelid = '2';
        // } else if (transmitModalItems.neSitelevelid == 'Normal') {
        //     $scope.modal.neSitelevelid = '1';
        // };
        // if (transmitModalItems.neSitelevel.slvSitelevelid != null) {
        //     $scope.modal.neSitelevelid = transmitModalItems.neSitelevel.slvSitelevelid + '';
        // } else {
        $scope.modal.neSitelevelid = transmitModalItems.neSitelevelid + '';
        // };


        $scope.modal.areaId = transmitModalItems.neAreaid;
        $scope.modal.neOpendate = $filter('date')(transmitModalItems.neOpendate, 'yyyy-MM-dd')
        $scope.notView = false;
        decideSubID();
        // $scope.changeDeviceType();
    } else {
        if ($rootScope.language == 'chinese') {
            $scope.title = '修改'
        } else if ($rootScope.language == 'english') {
            $scope.title = 'Modify';
        } else {
            $scope.title = 'Modify';
        };
        $scope.modal = transmitModalItems;
        if (typeof(transmitModalItems.neInout) == 'undefined') {
            $scope.modal.neInoutid = transmitModalItems.neInoutid;
        } else {
            $scope.modal.neInoutid = transmitModalItems.neInout.ioId;
        };

        // if (transmitModalItems.neSitelevelid == 'Vip') {
        //     $scope.modal.neSitelevelid = '2';
        // } else if (transmitModalItems.neSitelevelid == 'Normal') {
        //     $scope.modal.neSitelevelid = '1';
        // };
        // if (transmitModalItems.neSitelevel.slvSitelevelid != null) {
        // $scope.modal.neSitelevelid = transmitModalItems.neSitelevel.slvSitelevelid + '';
        // } else {
        $scope.modal.neSitelevelid = transmitModalItems.neSitelevelid + '';
        // };
        $scope.modal.neRepeaterid16 = transmitModalItems.neRepeaterid16;
        $scope.modal.areaId = transmitModalItems.neAreaid;
        $scope.modal.neOpendate = $filter('date')(transmitModalItems.neOpendate, 'yyyy-MM-dd')
        $scope.notView = true;
        decideSubID();
        // $scope.changeDeviceType();
        // $scope.neDevicetypeid=transmitModalItems.neDevicetypeid;
    }



    $scope.searchAreaTree = function(size) {
        $scope.isArea = 'Area';
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/deviceManagement/deviceList/areaTreeModal.html',
            controller: 'areaTree_deviceModalCtrl',
            size: 'md',
            resolve: {
                isArea: function() {
                    return $scope.isArea;
                },
                isAdd: function() {
                    return $scope.isAdd;
                },
                item: function() {
                    return transmitModalItems;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/deviceManagement/deviceList/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(selectArea) {
                // //console.log(`已选择的area是${selIdectArea.name}`);
                $scope.modal.areaName = selectArea.name;
                $scope.modal.areaId = selectArea.id;
                $scope.modal.sysArea = selectArea;
            },
            function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
    };

    $scope.save = function() {
        var newItems = $scope.modal;

        newItems.neDeviceid = Number(newItems.neDeviceid);
        newItems.neRepeaterid = parseInt($scope.modal.neRepeaterid16, 16);
        // newItems.neLat = Number(newItems.neLat);
        // newItems.neLon = Number(newItems.neLon);
        newItems.neProtocoltypeid = 1;

        var neDevicestatus = {};
        var neCompany = {};
        var neDevicetype = {};


        neCompany.coCompanyid = $scope.modal.neCompany.coCompanyid;
        neDevicetype.dtpDevicetypeid = $scope.modal.neDevicetype.dtpDevicetypeid;
        neDevicestatus.dsId = $scope.modal.neDevicestatus.dsId;

        newItems.neDevicestatus = neDevicestatus;
        newItems.neCompany = neCompany;
        newItems.neDevicetype = neDevicetype;
        newItems.neAreaid = $scope.modal.areaId;

        if (isAdd == 'Add') {
            // if (newItems.neRepeaterid !== newItems.neDeviceid) {
            deviceListService.addNe(newItems).success(function(res) {
                // $rootScope.loading = true;
                // if (res.data.result == 'success') {
                if (res.code == 200) {
                    // $rootScope.loading = false;
                    // alert('Success!');
                    messageAlertService.successFun('success');

                    $uibModalInstance.close();
                } else {
                    // alert(res.data.result)
                    messageAlertService.successFun('failed', res.msg);

                }
            })

        } else {

            // if (newItems.neRepeaterid !== newItems.neDeviceid) {
            // $rootScope.loading = true;
            deviceListService.editNe(newItems).success(function(res) {
                if (res.code == 200) {
                    // $rootScope.loading = false;
                    // alert('Success!');
                    messageAlertService.successFun('success');

                    $scope.close();
                } else {
                    // alert('failed:' + res.msg)
                    messageAlertService.successFun('failed', res.msg);

                }

            })
        }


    };

    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };


}