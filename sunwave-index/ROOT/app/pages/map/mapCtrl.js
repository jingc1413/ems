(function() {
    'use strict';

    angular.module('SunWave.pages.map', ['SunWave.pages.top', 'SunWave.pages.deviceManagement.deviceList'])
        .controller('mapCtrl', mapCtrl);

    function mapCtrl($scope, mapService, topService, deviceListService, $uibModal) {

        $scope.query = {
            // extent: "",
            neElementName: "",
            // areaId: ""
        };

        var layer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });


        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');
        var overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });


        closer.onclick = function() {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        $scope.openDetailModal = function() {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/deviceManagement/deviceList/detailDeviceNameModal.html',
                controller: 'detailDeviceNameModalCtrl',
                size: "lg",
                resolve: {
                    checkedItems: function() {
                        return $scope.idatas;
                    },

                    deviceListService: function() {
                        return deviceListService;
                    },
                    topService: function() {
                        return topService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/deviceManagement/deviceList/detailDeviceNameModalCtrl.js',
                            ]);
                        }
                    ]
                }
            });

            $scope.modalInstance.result.then(function(newItems) {
                //console.log(newItems);
            }, function(newItems) {
                //console.log(newItems);

            });

        };

        var controls = new Array();
        var mousePositionControl = new ol.control.MousePosition({
            className: 'custom-mouse-position',
            target: document.getElementById('location'),
            coordinateFormat: ol.coordinate.createStringXY(5), //保留5位小数
            undefinedHTML: ' '
        });
        controls.push(mousePositionControl);

        // //缩放控件
        // var zoomSliderControl = new ol.control.ZoomSlider({});
        // controls.push(zoomSliderControl);

        // var rotate = new ol.control.Rotate({
        //     //				label:"↑",
        //     tipLabel: "重置",
        //     target: document.getElementById('rotation'),
        //     autoHide: false
        // });
        // controls.push(rotate);

        // 创建地图
        var map = new ol.Map({
            // 设置地图图层
            controls: ol.control.defaults({
                attribution: false,
                rotate: false,
                zoom: false
            }).extend(controls),
            layers: [
                // 创建一个使用Open Street Map地图源的瓦片图层
                new ol.layer.Tile({
                    source: new ol.source.OSM({
                        url: 'http://10.7.3.249:8080/tile/{z}/{x}/{y}.png'
                    })
                }),
                layer
            ],

            overlays: [overlay],
            // 设置显示地图的视图
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [120.2, 30.3], // 定义地图显示中心于经度0度，纬度0度处
                zoom: 10 // 并且定义地图显示层级为2
            }),
            // 让id为map的div作为地图的容器
            target: 'map'
        });

        map.addControl(new ol.control.FullScreen());
        //添加比例尺控件
        map.addControl(new ol.control.ScaleLine());
        //添加缩放控件
        map.addControl(new ol.control.Zoom());
        //添加缩放滑动控件
        map.addControl(new ol.control.ZoomSlider());
        //添加缩放到当前视图滑动控件
        // map.addControl(new ol.control.ZoomToExtent());
        //添加全屏控件
        map.addControl(new ol.control.FullScreen());


        //边界获取

        map.on('moveend', function(event) {
            //获取可视化区域得范围
            //console.log(map.getView().calculateExtent(map.getSize()));
            $scope.lats = map.getView().calculateExtent(map.getSize());
            $scope.lat2 = $scope.lats[0];
            $scope.lat1 = $scope.lats[1];
            $scope.lon2 = $scope.lats[2];
            $scope.lon1 = $scope.lats[3];
            $scope.getDeviceByLats();
        });

        //获取区域内设备
        $scope.getDeviceByLats = function() {
            $scope.getDeviceByLats = function() {
                mapService.getDeviceByLats($scope.lat1, $scope.lat2, $scope.lon1, $scope.lon2).success(function(res) {
                    //console.log(res.data);
                    $scope.areaSites = res.data;
                    $scope.getFeatures($scope.areaSites);

                })
            };
        };
        $scope.getDeviceByLats();

        //查询设备
        // var LLdatas = $scope.site;
        var arrays = [];
        $scope.searchDevice = function() {
            mapService.searchDevice($scope.query).success(function(res) {
                $scope.flag = 'query';
                $scope.sites = res.data;
                $scope.getFeatures($scope.sites, $scope.flag);

            });
        };

        //区域内设备描点

        $scope.getFeatures = function(sites, flag) {
            // var LLdatas = [{ 'neLat': 120.2, 'neLon': 30.3 }, { 'neLat': 120.2, 'neLon': 30.4 }, { 'neLat': 120.3, 'neLon': 30.3 }]; //这是后端来的数据
            arrays = [];
            for (var i = 0; i < sites.length; i++) {
                if (sites[i].neLat != null && sites[i].neLon != null) {
                    var site = new ol.Feature({
                        geometry: new ol.geom.Point([sites[i].neLon, sites[i].neLat])
                    });
                    console.info(i + '--->' + sites[i].neLon + ':' + sites[i].neLat);
                    site.setStyle(new ol.style.Style({
                        image: new ol.style.Icon({
                            src: 'assets/img/site.svg'
                        })
                    }));
                    site.setProperties(sites[i], true);
                    arrays.push(site);
                }
            };
            layer.getSource().addFeatures(arrays); //改成了addFeatures方法

            if (flag == 'query') {
                let view = map.getView();
                // site.setStyle(new ol.style.Style({
                //     image: new ol.style.Icon({
                //         src: 'assets/img/site.svg'
                //     })
                // }));
                view.setZoom(15);
                view.setCenter([sites[0].neLon, sites[0].neLat]);
                // map.addLayer(layer);
            } else {}

        };


        // 监听地图层级变化
        map.getView().on('change:resolution', function() {
            for (var i = 0; i < arrays.length; i++) {
                var isite = arrays[i];
                var style = isite.getStyle();
                // 重新设置图标的缩放率，基于层级10来做缩放
                style.getImage().setScale(this.getZoom() / 10);
                isite.setStyle(style);
            }

        });

        var container = $scope.modalInstance;
        var overlay = new ol.Overlay( /** @type {olx.OverlayOptions} */ ({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250 //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度.
            }
        }));

        //click---单击事件    dblclick---双击事件
        map.on('click', function(event) {
            var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
                return feature;
            });
            if (feature) {

                $scope.idatas = feature.getProperties();
                $scope.openDetailModal();
                map.addOverlay(overlay);
                // var coordinate = event.coordinate;
                // // var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
                // //     coordinate, 'EPSG:3857', 'EPSG:4326'));

                // content.innerHTML = '<p>You clicked here:</p><code>' + coordinate[0] + ':' + coordinate[1] +
                //     '</code>';
                // // 设置overlay的位置，从而显示在鼠标点击处
                // overlay.setPosition(coordinate);
            } else if (overlay) {
                overlay.setPosition(undefined);
            }
        });

        var displayFeatureInfo = function(evt) {
            var pixel = map.getEventPixel(evt.originalEvent);
            var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
                return feature;
            });
            if (feature) {
                // content.innerHTML = feature.getId() + ': ' + feature.get('name');
                // overlay.setPosition(evt.coordinate)
            } else {
                // content.innerHTML = '&nbsp;';
                // overlay.setPostion(undefined)
            }
        };

        map.on('pointermove', function(evt) {
            if (evt.dragging) {
                return;
            }
            var pixel = map.getEventPixel(evt.originalEvent);
            var hit = map.forEachFeatureAtPixel(pixel, function() {
                return true;
            });
            if (hit == true) {
                var data = displayFeatureInfo(evt);
            };
            // map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });

        // // 监测鼠标放到屏幕上的事件
        // map.on('pointermove', function(e) {
        //     var feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
        //         return feature;
        //     });
        //     if (feature) {

        //         alert('hhhhh');
        //     } else if (overlay) {
        //         overlay.setPosition(undefined);
        //     }
        // });

        // var selectControl = new OpenLayers.Control.SelectFeature(this.markerLayer, {
        //     hover: true
        // });
        // selectControl.events.register('featurehighlighted', null, onFeatureHighlighted);

        // function onFeatureHighlighted(evt) {
        //     // Needed only for interaction, not for the display.
        //     var onPopupClose = function(evt) {
        //         // 'this' is the popup.
        //         var feature = this.feature;
        //         if (feature.layer) {
        //             selectControl.unselect(feature);
        //         }
        //         this.destroy();
        //     }

        //     feature = evt.feature;
        //     popup = new OpenLayers.Popup.FramedCloud("featurePopup",
        //         feature.geometry.getBounds().getCenterLonLat(),
        //         new OpenLayers.Size(100, 100),
        //         "<h2>" + feature.attributes.station_na + "</h2>" +
        //         "Location: " + feature.attributes.location + '<br/>' +
        //         "Elevation: " + feature.attributes.elev_,
        //         null, true, onPopupClose);
        //     feature.popup = popup;
        //     popup.feature = feature;
        //     map.addPopup(popup, true);
        // };

        //定位设备
        function zoomToExtent(extent) {
            let view = map.getView();
            // var point = [120.19989, 30.39201];
            view.setZoom(10);
            view.setCenter(ol.extent.getCenter(site.getGeometry().getExtent()));
            //console.log(site.values_.geometry.extent_);
            // let closeFeature = view.getClosestFeatureToCoordinate(point);
        };


    }
})();