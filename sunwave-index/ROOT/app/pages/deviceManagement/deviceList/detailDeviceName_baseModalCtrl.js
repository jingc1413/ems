/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.deviceManagement.deviceList', ['SunWave.pages.top'])
    .controller('detailDeviceName_baseModalCtrl', detailDeviceName_baseModalCtrl);

function detailDeviceName_baseModalCtrl($rootScope, $scope, deviceListService, topService, checkedItems, $uibModalInstance, messageAlertService) {

    $scope.checkedItems = checkedItems;

    $scope.title = $scope.checkedItems.neName;

    var setting = {
        view: {
            // addHoverDom: addHoverDom,
            // removeHoverDom: removeHoverDom,
            selectedMulti: false
        },


        check: {
            enable: true,
            chkboxType: { "Y": "", "N": "" }
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        edit: {
            // enable: true,
            // removeTitle: "Delete",
            // renameTitle: "Modify",
            // addTitle: "Add"
        },
        // callback: {
        //     beforeEditName: toModifyNode,
        //     // onClick:clickNode,
        //     beforeRemove: removeNode,
        //     onCheck: onChecked
        // }
        callback: {
            //只能选中一个功能
            beforeClick: function() {
                //禁止节点被选中
                var e = e || window.event;
                e.stopPropagation();
                return false;
            },
            onCheck: function(e, treeId, treeNode) {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var status = treeNode.checked;
                treeObj.checkAllNodes(false);
                treeObj.checkNode(treeNode, status, false);
            }
        }
    };

    function onChecked(event, treeId, treeNode) {
        $scope.checkNode = treeNode;
        //console.log($scope.checkNode);
    };
    var zNodes = [
        // { id:1, pId:0, name:"SGMRT", open:true},
        // { id:11, pId:1, name:"Floor23"},
    ];


    // 配置分页基本参数
    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 50,
        pagesLength: 50,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    //search table
    $scope.search = function() {
        deviceListService.searchJson().success(function(res) {
            $scope.items = res.data;
            for (let i = 0; i < $scope.items.length; i++) {
                const item = $scope.items[i];
                if (item.SetValue.length !== 0 && item.SetValue !== null) {
                    $scope.value_isSet = true;
                }
            }
            $scope.paginationConf.totalItems = response.data.totalElements;
            $scope.paginationConf.totalPages = response.data.totalPages;
        })
    };
    $scope.search();

    //查tree
    $scope.searchTree = function() {
        deviceListService.getTree_json()
            .success(function(response) {
                zNodes = response.data;
                //console.log(response.data);
                var treeObj = $.fn.zTree.init($("#paramTree"), setting, zNodes);
                var nodes = treeObj.getNodes();
                for (var i = 0; i < nodes.length; i++) { //设置节点展开
                    treeObj.expandNode(nodes[i], true, false, true);
                }
            })
            .error(function(err) {
                console.info(err);
            });
    };
    $scope.searchTree();

    $scope.xx = {
        select_all: ""
    };

    $scope.row = {
        setValue: "",
        isEnable: "",
        isInpu: false,
        isSelec: false
    };

    $scope.noClick = true;


    //max
    $scope.max = true;
    $scope.min = false;

    $scope.InitInterface = function(e, ele) {
        if (window.screen) {
            var mymodal = document.getElementById('mymodal');
            $scope.wid = document.getElementById('mymodal').clientWidth;
            $scope.hei = document.getElementById('mymodal').clientHeight;

            $scope.myw = screen.availWidth;
            $scope.myh = screen.availHeight;
            window.moveTo(0, 0);
            mymodal.style.width = $scope.myw + "px";
            mymodal.style.height = $scope.myh + "px";
            //偏移
            mymodal.style.left = ($scope.wid - $scope.myw) / 2 + "px";
            $scope.max = false;
            $scope.min = true;
        }
    };
    $scope.InitInterface2 = function(e, ele) {
        if (window.screen) {
            var mymodal = document.getElementById('mymodal');

            $scope.myw = screen.availWidth;
            $scope.myh = screen.availHeight;
            // window.moveTo(0, 0);
            mymodal.style.width = $scope.wid + "px";
            mymodal.style.height = $scope.hei + "px";
            mymodal.style.left = "0px";
            $scope.min = false;
            $scope.max = true;
        }
    };

    var noClickFun = function() {
        let noClick_typeid = $scope.checkedItems.neDevicetype.dtpDevicetypeid;
        if (noClick_typeid == 240 || noClick_typeid == 225 || noClick_typeid == 230) {
            $scope.noClick = false;
        };
        let noClick_commtypeid = $scope.checkedItems.neCommtypeid;
        if (noClick_commtypeid == 6) {
            $scope.isUDP = false;
        };
    };
    noClickFun();

    (function emit_noClickFun() {
        $scope.$emit('noClickFun', noClickFun());
    })();


    //windowid生成
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    };

    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
        $scope.rowsCOM = [];
        $scope.al_COM_rows = [];
        $scope.ra_rowsCOM = [];
    };

}
// });