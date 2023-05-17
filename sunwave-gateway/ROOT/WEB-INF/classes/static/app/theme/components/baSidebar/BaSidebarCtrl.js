(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .controller('BaSidebarCtrl', BaSidebarCtrl);

    /** @ngInject */
    function BaSidebarCtrl($rootScope, $scope, baSidebarService, $http, $window) {

        // $scope.getSideBarData = function() {
        //     $http({
        //         url: Url + '/sunwave-authority/authority/sysMenu/initFrontMenuTree',
        //         method: "POST"
        //     }).success(function(response) {
        //         console.log(response);
        //         $scope.menuItems = response.data;
        //         // $scope.menuItems = [{
        //         //     checked: false,
        //         //     icon: "fa fa-user",
        //         //     id: "500",
        //         //     level: 0,
        //         //     name: "Authority",
        //         //     open: null,
        //         //     pCode: null,
        //         //     pId: "0",
        //         //     stateRef: "Authority",
        //         //     title: "Authority",
        //         //     subMenu: [{
        //         //         checked: false,
        //         //         icon: "undefined",
        //         //         id: "507",
        //         //         level: 1,
        //         //         name: "Authority.SeacurityManagement",
        //         //         open: null,
        //         //         pCode: null,
        //         //         pId: "500",
        //         //         title: "SeacurityManagement",
        //         // subMenu: [{
        //         //             checked: false,
        //         //             icon: null,
        //         //             id: "505",
        //         //             level: 2,
        //         //             name: "Authority.SeacurityManagement.seacurityRules",
        //         //             open: null,
        //         //             pCode: null,
        //         //             pId: "507",
        //         //             stateRef: "Authority.SeacurityManagement.seacurityRules",
        //         //             subMenu: null,
        //         //             t: "5",
        //         //             title: "seacurity Rules"
        //         //         },
        //         //         {
        //         //             checked: false,
        //         //             icon: null,
        //         //             id: "506",
        //         //             level: 2,
        //         //             name: "Authority.SeacurityManagement.IpblackList",
        //         //             open: null,
        //         //             pCode: null,
        //         //             pId: "507",
        //         //             stateRef: "Authority.SeacurityManagement.IpblackList",
        //         //             subMenu: null,
        //         //             t: "5",
        //         //             title: "IP Blacklist"
        //         //         }
        //         //     ]
        //         //     }]
        //         // }];
        //         // $scope.menuItems = baSidebarService.getMenuItems();

        //         $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

        //     }).error(function(err) {
        //         console.log(err)
        //     });
        // };
        // $scope.getSideBarData();
        // $scope.$on("toSidebar", function(event, data) {

        //     // $scope.getSideBarData();
        //     $scope.menuItems = data;
        //     $scope.defaultSidebarState = $scope.menuItems[0].stateRef;

        //     // $scope.$apply();
        // });
        $scope.$on("processSignOut", function(data) {

            $scope.menuItems = [];
        });




        // $scope.menuItems = [{

        //     controller: "dashboardCtrl",
        //     name: "dashboard",
        //     sidebarMeta: { icon: "ion-ios-home", order: 0 },
        //     templateUrl: "app/pages/dashboard/dashboard.html",
        //     title: "Homepage",
        //     url: "/dashboard"

        // }, {
        //     abstract: true,
        //     name: "sysManagement",
        //     sidebarMeta: { icon: "ion-android-laptop", order: 100 },
        //     template: "<ui-view autoscroll='true' autoscroll-body-top></ui-view>",
        //     title: "System Management",
        //     url: "/sysManagement",
        //     submenu: [{
        //         controller: "vendorManagementCtrl",
        //         name: "sysManagement.vendorManagement",
        //         sidebarMeta: { order: 0 },
        //         templateUrl: "app/pages/sysManagement/vendorManagement/vendorManagement.html",
        //         title: "vendorManagement",
        //         url: "/vendorManagement"
        //     }]

        // }];
        // console.log($scope.menuItems);

        // $scope.menuItems = baSidebarService.getMenuItems();
        // $scope.defaultSidebarState = $scope.menuItems[0].stateRef;


        $scope.hoverItem = function($event, item) {
            $scope.showHoverElem = true;
            $scope.hoverElemHeight = $event.currentTarget.clientHeight;
            var menuTopValue = 66;
            $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
        };

        $scope.getStateRef = function($event, item) {
            // console.log(item);
            $rootScope.menuId = item.id;
            window.sessionStorage.setItem('menuId', $rootScope.menuId);

            // $rootScope.menuId("toButton", $scope.id);
        };

        $scope.$on('$stateChangeSuccess', function(item) {
            if (baSidebarService.canSidebarBeHidden()) {
                baSidebarService.setMenuCollapsed(true);
            }
        });
    }
})();