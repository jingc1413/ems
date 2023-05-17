(function() {
    'use strict';

    angular.module('SunWave.pages.AlarmConfiguration.AlarmCompress', [])
        .controller('AlarmCompressCtrl', AlarmCompressCtrl);

    function AlarmCompressCtrl() {
        var setting = {
            view: {
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom,
                selectedMulti: false
            },
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true
                }
            },
            edit: {
                enable: true
            }
        };

        var zNodes = [
            { id: 1, pId: 0, name: "SGMRT", open: true },
            { id: 11, pId: 1, name: "Floor23" },
            { id: 111, pId: 11, name: "Lab Meeting Room" },
            { id: 12, pId: 1, name: "STATION01" },
            { id: 121, pId: 12, name: "Centre1" },
            { id: 122, pId: 12, name: "Centre1_3" },
            { id: 123, pId: 12, name: "Centre2" },
            { id: 13, pId: 1, name: "STATION02" },
            { id: 131, pId: 13, name: "TE02", open: true },
            { id: 14, pId: 1, name: "STATION03" },
            { id: 15, pId: 1, name: "STATION04" },
            { id: 16, pId: 1, name: "Sunwave" },
            { id: 161, pId: 16, name: "0710aaa" },
        ];

        $(document).ready(function() {
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        });

        var newCount = 1;

        function addHoverDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
            var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
                "' title='Add Node' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_" + treeNode.tId);
            if (btn) btn.bind("click", function() {
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.addNodes(treeNode, { id: (100 + newCount), pId: treeNode.id, name: "new node" + (newCount++) });
                return false;
            });
        };

        function removeHoverDom(treeId, treeNode) {
            $("#addBtn_" + treeNode.tId).unbind().remove();
        };

    }
})();