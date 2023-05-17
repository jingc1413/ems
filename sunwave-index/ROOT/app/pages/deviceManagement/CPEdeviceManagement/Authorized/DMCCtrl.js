angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('DMCCtrl', DMCCtrl);

function DMCCtrl($rootScope, $scope, isAdd, $filter, $uibModalInstance, $uibModal, $log, ) {

    $scope.tabs = [{
            name: "Available tabs",
            subTabs: [{
                    name: "Sub tabs1",
                    subTabs: []
                },
                {
                    name: "Sub tabs2",
                    subTabs: []
                },
            ]
        },
        {
            name: "Available tabs2",
            subTabs: []
        },
        {
            name: "Available tabs3",
            subTabs: [{
                    name: "Sub tabs4",
                    subTabs: []
                },
                {
                    name: "Sub tabs3",
                    subTabs: []
                },
            ]
        },


    ]

    $scope.isShow = true;
    $scope.subTabs = [];
    $scope.subIndex = 0;
    $scope.currentName = "";
    $scope.subTabs = function(params) {
        //console.log(params);
        $scope.currentName = params;
        if ($scope.isShow == true) {
            $scope.isShow = false;
        } else {
            $scope.isShow = true
        }
        // for (let index = 0; index < $scope.tabs.length; index++) {
        //     const element = $scope.tabs[index].name;
        //     if (element ==params) {
        //         $scope.subIndex=index;
        //     }

        // }
        // if ($scope.tabs[$scope.subIndex].subTabs.length>0) {
        //     $scope.subTabs=$scope.tabs[$scope.subIndex].subTabs;
        // } else {

        // }



    }

    $scope.navFunc = function(arg) {

        $scope.navAction = arg;
    };

    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };
    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}