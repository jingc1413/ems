angular.module('SunWave.pages.deviceManagement.NotInService', ['SunWave.pages.sysManagement.vendorManagement', 'SunWave.pages.deviceManagement.deviceList'])
    .controller('deviceAddModalCtrl', deviceAddModalCtrl);

function deviceAddModalCtrl($scope, isAdd, transmitModalItems, deviceListService, $uibModalInstance, $uibModal, $log, vendorManagementService, ) {

    $scope.modal = {
        neName: "",
        neCommtypeid: "",
        // neAreaid: "", //area
        areaName: "",
        neDeviceip: "",
        neDeviceport: "",
        // neCompanyid: "",
        neCompany: {
            coCompanyid: ""
        },
        neDevicetype: {
            dtpDevicetypeid: ""
        },
        neDevicestatus: {
            dsId: ""
        },
        neRepeaterid16: "",
        // neCompanyid: "",
        neDeviceid: "",
        neInoutid: 0,
        neDevicelevelid: "",
        neProtocoltypeid: "0",
        // neDevicetypeid: 223,
        neLastupdatetime: "",
        // neDevicestatusid: 0,
        neLat: "",
        neLon: "",
        neInstallplace: "",
        neRemark: ""
    };

    $scope.notView = true;



    //type
    $scope.searchDeviceType = function() {
        deviceListService.searchDeviceType().success(function(res) {
            // console.log(`查的DeviceType是：${res.data}`);
            $scope.deviceTypes = res.data;
        })
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
        vendorManagementService.findAll().success(function(res) {
            $scope.vNames = res.data;
        })
    };

    $scope.searchDeviceType();
    $scope.deviceStatuss();
    $scope.getVendorName();

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        $scope.title = 'Add';
        $scope.notView = true;

    } else if ($scope.isAdd == 'View') {
        $scope.title = "View";
        $scope.modal = transmitModalItems;
        $scope.notView = false;
    } else {
        $scope.title = "Modify";
        $scope.modal = transmitModalItems;
        // $scope.area.selectArea = transmitModalItems.neAreaid;
        // $scope.modal.neCompanyid = transmitModalItems.neCompany.coCompanyid;
        $scope.notView = true;
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
                // deviceListService: function() {
                //     return deviceListService;
                // },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/deviceManagement/NotInService/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(selectArea) {
            // console.log(`已选择的area是${selectArea.name}`);
            $scope.modal.areaName = selectArea.name;
            $scope.modal.areaId = selectArea.id;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.save = function() {
        var newItems = $scope.modal;
        var dsName = "";

        newItems.neDeviceid = Number(newItems.neDeviceid);
        newItems.neRepeaterid16 = Number(newItems.neRepeaterid16);
        newItems.neLat = Number(newItems.neLat);
        newItems.neLon = Number(newItems.neLon);
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
            if (newItems.neRepeaterid16 !== newItems.neDeviceid) {
                deviceListService.addNe(newItems).success(function(res) {
                    if (res.data == true) {
                        alert('success');
                        $uibModalInstance.close(newItems);
                    } else {
                        alert('failed:' + res.data)
                    }

                })
            } else {
                alert('Device ID And Device SubID 不能相同')
            }

        } else {
            deviceListService.editNe(newItems).success(function(res) {
                // if (res.data == true) {
                if (res.error != undefined && res.error != null && res.error != '') {
                    alert('Modify Failed:' + res.data)
                } else {
                    alert('Modify Success!');
                    $uibModalInstance.close(newItems);
                }

            })
        }

    };

    $scope.close = function() {
        $uibModalInstance.close();
    };

}