angular.module('SunWave.pages.PerformanceManagement.dataReportForm', [])
    .controller('dataReportFormCtrl', dataReportFormCtrl)
    // .filter('filterRow', function() {
    //     return function(collection, keyName) {
    //         value = "period";
    //         //console.log(collection);
    //         //console.log(value);
    //         var output = []
    //         angular.forEach(collection, function(item) {
    //             if (item[keyName] === value) { output.push(item) }
    //         })
    //         //console.log(output.length)
    //         return output
    //     };
    // })

function dataReportFormCtrl($scope, $uibModal, $state, $stateParams, PerformanceDataReportService, $filter) {
    $scope.query = { //查询信息
        id: null,
        pageIndex: 0,
        pageSize: 6,
        name: "",
        keyword: "",
        beginTime: null,
        endTime: null,
        statmentId: $stateParams.id
    };

    // $scope.headerItems = [{
    //         "name": "时间",
    //         "id": "period"
    //     },
    //     {
    //         "name": "QCI为5的业务E-RAB掉话率（%）",
    //         "id": "297e20f575bfa6a20175bfa6eca40001"
    //     },
    //     {
    //         "name": "VoLTE无线掉话率（%）",
    //         "id": "297e20f575bfa6a20175bfa6eca40002"
    //     },
    //     {
    //         "name": "test",
    //         "id": "297e20f575bfa6a20175bfa6eca40003"
    //     }
    // ];

    // $scope.bodyItem = {
    //     "297e20f575bfa6a20175bfa6eca40001": [
    //         "0.1",
    //         "0.2",
    //         "0.3",
    //         "0.4",
    //         "0.5",
    //         "0.6",
    //         "0.7",
    //         "0.8",
    //         "0.9",
    //         "1.0",
    //         "1.1"
    //     ],
    //     "297e20f575bfa6a20175bfa6eca40002": [
    //         "NaN1",
    //         "NaN2",
    //         "NaN3",
    //         "NaN4",
    //         "NaN5",
    //         "NaN6",
    //         "NaN7",
    //         "NaN8",
    //         "NaN9",
    //         "NaN10",
    //         "NaN11"
    //     ],
    //     "297e20f575bfa6a20175bfa6eca40003": [
    //         "NaN1",
    //         "NaN2",
    //         "NaN3",
    //         "NaN4",
    //         "NaN5",
    //         "NaN6",
    //         "NaN7",
    //         "NaN8",
    //         "NaN9",
    //         "NaN10",
    //         "NaN111"
    //     ],
    //     "period": [
    //         "2020-11-24 09:43:59.0-2020-11-24 09:58:59.01",
    //         "2020-11-24 09:58:59.0-2020-11-24 10:13:59.02",
    //         "2020-11-24 10:13:59.0-2020-11-24 10:28:59.03",
    //         "2020-11-24 10:28:59.0-2020-11-24 10:43:59.04",
    //         "2020-11-24 10:43:59.0-2020-11-24 10:58:59.05",
    //         "2020-11-24 10:58:59.0-2020-11-24 11:13:59.06",
    //         "2020-11-24 11:13:59.0-2020-11-24 11:28:59.07",
    //         "2020-11-24 11:28:59.0-2020-11-24 11:43:59.08",
    //         "2020-11-24 11:43:59.0-2020-11-24 11:58:59.09",
    //         "2020-11-24 11:58:59.0-2020-11-24 12:13:59.010",
    //         "2020-11-24 12:13:59.0-2020-11-24 12:28:59.011"
    //     ],
    // };

    var init = function() {
        //对象
        // $scope.bodyItems = [];
        // for (let index = 0; index < $scope.headerItems.length; index++) {
        //     const element = $scope.headerItems[index].id;
        //     $scope.finalLength = $scope.bodyItem[element].length;
        //     for (let index2 = 0; index2 < $scope.bodyItem[element].length; index2++) {
        //         var items = {};
        //         for (let index3 = 0; index3 < $scope.headerItems.length; index3++) {
        //             const element = $scope.headerItems[index3].id;
        //             items[element] = $scope.bodyItem[element][index2];
        //         };
        //         $scope.bodyItems.push(items);
        //     };
        // };
        // //console.log($scope.bodyItems);
        // $scope.bodyItems = $scope.bodyItems.slice(0, $scope.finalLength);
        // //console.log($scope.bodyItems);

        //数组

        //查询设备序列号
        PerformanceDataReportService.searchSerialNumber()
            .success(function(response) {
                //console.log(response)
                $scope.initList = response.data;
                $scope.dataList = $scope.initList;
            })
            .error(function(err) {
                console.info(err);
            });
    };

    init();

    $scope.paginationConf = { //分页信息
        currentPage: 1,
        itemsPerPage: 15,
        pagesLength: 15,
        perPageOptions: [15, 20, 30, 50, 100, 200]

    };

    $scope.search = function() {
        //console.log($scope.query);
        $scope.query.pageIndex = $scope.paginationConf.currentPage;
        $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
        PerformanceDataReportService.searchReport($scope.query)
            .success(function(response) {
                $scope.paginationConf.totalItems = response.data.totalElements;
                var header = response.data.header;
                var headers = [];
                //遍历header数组，确保时间列排在第一列
                for (let index = 0; index < header.length; index++) {
                    const element = header[index];
                    if (element.id == 'period') {
                        headers.push(header[index]);
                        header.splice(index, 1);
                        break;
                    }
                };
                for (let index = 0; index < header.length; index++) {
                    const element = header[index];
                    headers.push(element);
                };
                $scope.headerItems = headers;
                $scope.bodyItem = response.data.data;
                $scope.bodyItems = [];
                if ($scope.headerItems.length > 0) { //判断header是否有数据
                    for (let index = 0; index < $scope.headerItems.length; index++) {
                        const element = $scope.headerItems[index].id;
                        if ($scope.bodyItem.length > 0) {
                            $scope.finalLength = $scope.bodyItem[element].length;
                            for (let index2 = 0; index2 < $scope.bodyItem[element].length; index2++) {
                                var items = {};
                                var a = [];
                                for (let index3 = 0; index3 < $scope.headerItems.length; index3++) {
                                    const element = $scope.headerItems[index3].id;
                                    items[element] = $scope.bodyItem[element][index2];
                                    a.push(items[element]);
                                };
                                $scope.bodyItems.push(a);
                            };
                        };
                    };
                    //console.log($scope.bodyItems);
                    $scope.bodyItems = $scope.bodyItems.slice(0, $scope.finalLength);
                    //console.log($scope.bodyItems);
                };
            })
            .error(function(err) {
                console.info(err);
            });
    };

    $scope.inValue = '';

    $scope.inValue_display = '';
    $scope.getValue = function(value) {
        $scope.inValue_display = value;
    }
    $scope.$on('selectInput', function(evt, inputObj) {

        if ('select-input-mark' == inputObj.inputId) {

            $scope.inValue = '';

            $scope.inValue_display = inputObj.inputText;
            // $scope.selectItem.ndmPath = $scope.inValue_display;
            $scope.fuzzyQuery();

        }

    });

    $scope.fuzzyQuery = function() {
        $scope.dataList = [];
        angular.forEach($scope.initList, function(item) {

            if (-1 != item.indexOf($scope.inValue_display)) {
                $scope.dataList.push(item);
            };



        });
        if ($scope.dataList.length == 0) {
            $scope.dataList = $scope.initList;

        } else {

        }

    };
}