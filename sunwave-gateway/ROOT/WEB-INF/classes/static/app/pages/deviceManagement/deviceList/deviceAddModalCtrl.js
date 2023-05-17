angular.module('SunWave.pages.deviceManagement.deviceList', ['SunWave.pages.sysManagement.vendorManagement'])
    .controller('deviceAddModalCtrl', deviceAddModalCtrl);

function deviceAddModalCtrl($rootScope, $scope, isAdd, $filter, transmitModalItems, deviceListService, $uibModalInstance, $uibModal, $log, vendorManagementService) {

    $scope.modal = {
        neName: "",
        neCommtypeid: 7,
        neAreaid: "", //area
        areaName: "",
        neDeviceip: "",
        neDeviceport: "161",
        // neCompanyid: "",
        neCompany: {
            coCompanyid: ""
        },
        // neRepeaterid: "",
        neRepeaterid16: "",
        neDeviceid: "",
        neInoutid: "",
        neSitelevelid: "",
        neProtocoltypeid: 1,
        // neDevicetypeid: 223,
        neLastupdatetime: "",
        // neDevicestatusid: 0,
        neLat: "",
        neLon: "",
        neInstallplace: "",
        neMemo: ""
    };

    $scope.area = {
        selectArea: ""
    };

    $scope.notView = true;
    $scope.deviceIp = false;
    $scope.isAu = false;



    //type
    $scope.searchDeviceType = function() {
        deviceListService.searchDeviceType().success(function(res) {
            // console.log(`查的DeviceType是：${res.data}`);
            $scope.deviceTypes = res.data;
        })
    };


    // var type_o = transmitModalItems.neDeviceid;
    //change type
    var au_flag = 0;
    $scope.changeDeviceType = function() {
        let typeid = $scope.modal.neDevicetype.dtpDevicetypeid;

        // $scope.typeid = $scope.modal.neDeviceid;
        if (typeid == 225 || typeid == 230 || typeid == 240) {
            // if (typeid == 230 || typeid == 225) {
            $scope.modal.neDeviceid = '0';
            $scope.isAu = true;
            au_flag = 1;
        } else {
            // if (au_flag == 1) {
            //     $scope.modal.neDeviceid = $scope.typeid;
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


    //status
    $scope.deviceStatuss = function() {
        deviceListService.deviceStatuss().success(function(res) {
            // console.log(`查的DeviceType是：${res.data}`);
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
        $scope.title = 'Add';
        $scope.notView = true;

    } else if ($scope.isAdd == 'View') {
        $scope.title = "View";
        $scope.modal = transmitModalItems;

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
        $scope.modal.neLastupdatetime = $filter('date')(transmitModalItems.neLastupdatetime, 'yyyy-MM-dd')
        $scope.notView = false;
        $scope.changeDeviceType();
    } else {
        $scope.title = "Modify";
        $scope.modal = transmitModalItems;
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
        $scope.modal.neLastupdatetime = $filter('date')(transmitModalItems.neLastupdatetime, 'yyyy-MM-dd')
        $scope.notView = true;
        $scope.changeDeviceType();
        // $scope.neDevicetypeid=transmitModalItems.neDevicetypeid;
    }



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
            // console.log(`已选择的area是${selIdectArea.name}`);
            $scope.modal.areaName = selectArea.name;
            $scope.modal.areaId = selectArea.id;
        }, function() {
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
                if (res.data.result == 'success') {
                    // $rootScope.loading = false;
                    alert('success');
                    $uibModalInstance.close();
                } else {
                    alert(res.data.result)
                }
            })

        } else {

            // if (newItems.neRepeaterid !== newItems.neDeviceid) {
            // $rootScope.loading = true;
            deviceListService.editNe(newItems).success(function(res) {
                if (res.msg == '操作成功') {
                    // $rootScope.loading = false;
                    alert('success');
                    $scope.close();
                } else {
                    alert('failed:' + res.msg)
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