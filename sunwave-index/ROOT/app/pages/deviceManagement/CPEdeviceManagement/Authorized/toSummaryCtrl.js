angular.module('SunWave.pages.deviceManagement.CPEdeviceManagement.CPEdevice', [])
    .controller('toSummaryCtrl', toSummaryCtrl);

function toSummaryCtrl($rootScope, $scope, $location, $filter, $uibModalInstance, Summary, $uibModal, $state, AuthorizedService) {

    $scope.info = {

    }

    $scope.info = Summary;
    $scope.info.creationTime = $filter('date')($scope.info.creationTime, "yyyy-MM-dd HH:mm:ss");

    // var searchState = function() {
    //     AuthorizedService.searchState(Summary.neNeid)
    //         .success(function(response) {
    //             $scope.info.status = response.data;
    //             if ($scope.info.status == 'on-line') {
    //                 $scope.onlineStatus = true;
    //                 $scope.isLoading = false;
    //             } else if ($scope.info.status == 'off-line') {
    //                 $scope.onlineStatus = false;
    //                 $scope.isLoading = false;
    //             } else {
    //                 $scope.isLoading = true;
    //             }
    //         })
    //         .error(function(err) {
    //             console.info(err);
    //         });
    // };
    // searchState();

    $scope.toSearchTree = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/modalTree.html',
            controller: 'modalTreeCtrl',
            size: 'md',
            resolve: {
                element: function() {
                    return $scope.info;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/modalTreeCtrl.js']);
                    }
                ]
            }
        });
    };
    // $scope.toDMC = function () {
    //     var modalInstance = $uibModal.open({
    //         animation: true,
    //         backdrop: "static",
    //         templateUrl: 'app/pages/deviceManagement/Authorized/DMC.html',
    //         controller: 'DMCCtrl',
    //         size: 'md',
    //         resolve: {
    //             isAdd: function () {
    //                 return $scope.isAdd;
    //             },
    //             deps: ['$ocLazyLoad',
    //                 function ($ocLazyLoad) {
    //                     return $ocLazyLoad.load(['app/pages/deviceManagement/Authorized/DMCCtrl.js']);
    //                 }
    //             ]
    //         }
    //     });
    // }


    //upload device
    $scope.toUpgrade = function() {
        var e = [];
        e.push($scope.info.neNeid);
        //console.log(e);
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/uploadFile.html',
            controller: 'uploadFileCtrl',
            size: 'md',
            resolve: {
                item: function() {
                    return $scope.info.manufacturer;
                },
                itemsId: function() {
                    return e;
                },
                AuthorizedService: function() {
                    return AuthorizedService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/uploadFileCtrl.js']);
                    }
                ]
            }
        });
    };

    // reboot device
    $scope.reboot = function() {
        var truthBeTold = window.confirm("Are you sure reboot this device ?")
        if (truthBeTold) {
            var e = [];
            e.push($scope.info.neNeid);
            //console.log(e)
            AuthorizedService.reboot(e)
                .success(function(response) {
                    if (response == 200) {
                        alert("Success!");
                    }
                })
                .error(function(err) {
                    console.info(err);
                });
        } else {

        }
    };
    //Restore factory settings
    $scope.recovery = function() {
        var truthBeTold = window.confirm("Are you sure Restore factory settings this device ? ?")
        if (truthBeTold) {
            var e = [];
            e.push($scope.info.neNeid);
            //console.log(e)
            AuthorizedService.recovery(e)
                .success(function(response) {
                    if (response == 200) {
                        alert("Success!");
                    }

                    // //console.log("22222222222" + response);
                    // $scope.paginationConf.totalItems = 200;
                    // $scope.items = response;
                    // //console.log($scope.items)
                })
                .error(function(err) {
                    console.info(err);
                });
        } else {

        }

    };

    //Add to favorite
    $scope.addFavorite = function() {
        alert("Are you sure ?")
        var e = $scope.info.neNeid
            //console.log(e)
            // AuthorizedService.reboot(e)
            //     .success(function (response) {
            //         //console.log("22222222222" + response);
            //         // $scope.paginationConf.totalItems = 200;
            //         // $scope.items = response;
            //         // //console.log($scope.items)
            //     })
            //     .error(function (err) {
            //         console.info(err);
            //     });
        alert("Success !");
    };

    $scope.toDetails = function() {
        //console.log("toDetails")
        $state.go('deviceManagement.CPEdeviceManagement.CPEdeviceDetails', {
            args: {
                NAME: $scope.info,
            },
        });
        $scope.close();
    }

    $scope.toConfigure = function() {
        //console.log($scope.info.neNeid);
        var modalInstance = $uibModal.open({
            animation: true,
            backdrop: "static",
            templateUrl: 'app/pages/deviceManagement/CPEdeviceManagement/Authorized/searchConfig.html',
            controller: 'searchConfigCtrl',
            size: 'md',
            resolve: {
                items: function() {
                    return $scope.info.neNeid;
                },
                AuthorizedService: function() {
                    return AuthorizedService;
                },
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad) {
                        return $ocLazyLoad.load(['app/pages/deviceManagement/CPEdeviceManagement/Authorized/searchConfigCtrl.js']);
                    }
                ]
            }
        });

    };
    $scope.close = function(item) {
        $uibModalInstance.close(item);
    };


    /*点取消按钮*/
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

}