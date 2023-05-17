angular.module('SunWave.pages.deviceManagement.deviceList', ['SunWave.pages.sysManagement.vendorManagement'])
    .controller('deviceAddModalCtrl', deviceAddModalCtrl);

function deviceAddModalCtrl($scope, isAdd, $filter, transmitModalItems, deviceListService, $uibModalInstance, $uibModal, $log, vendorManagementService, ) {

    $scope.modal = {
        neName: "",
        neCommtypeid: "7",
        neAreaid: "", //area
        areaName: "",
        neDeviceip: "",
        neDeviceport: "",
        // neCompanyid: "",
        neRepeaterid: "",
        neRepeaterid16: "",
        // neCompanyid: "",
        neDeviceid: "",
        neInoutid: "",
        neDevicelevelid: 1,
        neProtocoltypeid: "0",
        // neDevicetypeid: 223,
        neOpendate: "",
        // neDevicestatusid: 0,
        neLat: "",
        neLon: "",
        neInstallplace: "",
        neRemark: ""
    };

    $scope.area = {
        selectArea: ""
    };

    $scope.notView = true;



    //type
    $scope.searchDeviceType = function() {
        deviceListService.searchDeviceType().success(function(res) {
            // //console.log(`查的DeviceType是：${res.data}`);
            $scope.deviceTypes = res.data;
        })
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

    $scope.searchDeviceType();
    $scope.deviceStatuss();
    $scope.getVendorName();

    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'Add') {
        $scope.title = 'Add';
        $scope.notView = true;

    } else if ($scope.isAdd == 'View') {
        $scope.title = "View";
        $scope.modal = transmitModalItems.neElement;
        $scope.area.selectArea = transmitModalItems.neElement.neAreaid;
        $scope.modal.neOpendate = $filter('date')(transmitModalItems.neElement.neOpendate, 'yyyy-MM-dd')
        $scope.notView = false;
    } else {
        $scope.title = "Modify";
        $scope.modal = transmitModalItems.neElement;
        $scope.area.selectArea = transmitModalItems.neElement.neAreaid;
        $scope.modal.neOpendate = $filter('date')(transmitModalItems.neElement.neOpendate, 'yyyy-MM-dd')
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
                        return $ocLazyLoad.load(['app/pages/deviceManagement/deviceList/areaTreeModalCtrl.js']);
                    }
                ]
            }
        });

        modalInstance.result.then(function(selectArea) {
            // //console.log(`已选择的area是${selIdectArea.name}`);
            $scope.modal.areaName = selectArea.name;
            $scope.modal.areaId = selectArea.id;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.save = function(newItems) {
        var newItems = $scope.modal;
        var dsName = "";

        newItems.neDeviceid = Number(newItems.neDeviceid);
        newItems.neRepeaterid = Number(newItems.neRepeaterid);
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
            if (newItems.neRepeaterid !== newItems.neDeviceid) {
                deviceListService.addNe(newItems).success(function(res) {
                    if (res.data == true) {
                        alert('Success!');
                        $uibModalInstance.close(newItems);
                    } else {
                        alert('failed:' + res.message)
                    }

                })
            } else {
                alert('Device ID and device sub ID cannot be the same')
            }

        } else {
            deviceListService.editNe(newItems).success(function(res) {
                if (res.data == true) {
                    alert('Modify Success!');
                    $uibModalInstance.close(newItems);
                } else {
                    alert('Modify Failed:' + res.data)
                }

            })
        }

    };

    $scope.close = function() {
        $uibModalInstance.close();
    };

}