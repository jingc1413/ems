(function() {
    'use strict';

    angular.module('SunWave.theme.components')
        .provider('baSidebarService', baSidebarServiceProvider);

    /** @ngInject */
    function baSidebarServiceProvider() {
        var staticMenuItems = [];

        this.addStaticItem = function() {
            staticMenuItems.push.apply(staticMenuItems, arguments);
        };

        /** @ngInject */
        this.$get = function($state, layoutSizes) {
            return new _factory();

            function _factory() {
                var isMenuCollapsed = shouldMenuBeCollapsed();

                this.getMenuItems = function() {
                    var states = defineMenuItemStates();
                    var menuItems = states.filter(function(item) {
                        return item.level == 0;
                    });

                    menuItems.forEach(function(item) {
                        var children = states.filter(function(child) {
                            return child.level == 1 && child.name.indexOf(item.name) === 0;
                        });
                        item.subMenu = children.length ? children : null;
                    });

                    return menuItems.concat(staticMenuItems);
                };

                this.shouldMenuBeCollapsed = shouldMenuBeCollapsed;
                this.canSidebarBeHidden = canSidebarBeHidden;

                this.setMenuCollapsed = function(isCollapsed) {
                    isMenuCollapsed = isCollapsed;
                };

                this.isMenuCollapsed = function() {
                    return isMenuCollapsed;
                };

                this.toggleMenuCollapsed = function() {
                    isMenuCollapsed = !isMenuCollapsed;
                };

                this.getAllStateRefsRecursive = function(item) {
                    var result = [];
                    _iterateSubItems(item);
                    return result;

                    function _iterateSubItems(currentItem) {
                        currentItem.subMenu && currentItem.subMenu.forEach(function(subItem) {
                            subItem.stateRef && result.push(subItem.stateRef);
                            _iterateSubItems(subItem);
                        });
                    }
                };

                function defineMenuItemStates() {

                    //         var a=$scope.menuItems = [{

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
                    return $state.get()
                        .filter(function(s) {
                            return s.sidebarMeta;
                        })
                        .map(function(s) {
                            var meta = s.sidebarMeta;
                            return {
                                name: s.name,
                                title: s.title,
                                level: (s.name.match(/\./g) || []).length,
                                order: meta.order,
                                icon: meta.icon,
                                stateRef: s.name,
                            };
                        })
                        .sort(function(a, b) {
                            return (a.level - b.level) * 100 + a.order - b.order;
                        });
                }

                function shouldMenuBeCollapsed() {
                    return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
                }

                function canSidebarBeHidden() {
                    return window.innerWidth <= layoutSizes.resWidthHideSidebar;
                }
            }

        };

    }
})();