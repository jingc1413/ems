(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.performanceReport', [])
        .controller('performanceReportCtrl', performanceReportCtrl);

    function performanceReportCtrl($rootScope, $scope, $log, $uibModal, performanceReportService, $http, messageAlertService, $filter) {
        $scope.query = { //查询条件
            pageIndex: "1",
            pageSize: "10",
            startTime: $filter('date')(new Date(), 'yyyy-MM-dd 00:00:00'),
            endTime: $filter('date')(new Date(), 'yyyy-MM-dd 23:59:59'),
            paramName: "",
            neRepeaterId: "",
            neName: ""
        };

        $scope.search = function() {
            searchForm();
        };
        //查询
        var searchForm = function() {

            if ($scope.query.startTime && $scope.query.endTime) {
                $rootScope.loading = true;
                $scope.query.pageIndex = $scope.paginationConf.currentPage;
                $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
                performanceReportService.searchContent($scope.query)
                    .success(function(response) {
                        $rootScope.loading = false;
                        $scope.paginationConf.totalItems = response.data.totalElements;
                        $scope.items = response.data.content;
                        $scope.OperationTypes = response.OperationTypes;
                    })
                    .error(function(err) {
                        console.info(err);
                        $rootScope.loading = false;
                    });
            } else {
                alert('Must select time!')
            }

        };

        $scope.reset = function() {
            $scope.query.neRepeaterId = '';
            $scope.query.neName = '';
            $scope.query.paramName = '';
            $scope.query.startTime = '';
            $scope.query.endTime = '';
        };


        $scope.m = [];
        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组

        $scope.selectAll = function() {
            if ($scope.select_all) {
                $scope.checked = [];
                $scope.checkedItems = [];
                angular.forEach($scope.items, function(i) {
                    i.checked = true;
                    $scope.checked.push(i.id);
                    $scope.checkedItems.push(i);
                });
            } else {
                angular.forEach($scope.items, function(i) {
                    i.checked = false;
                    $scope.checked = [];
                    $scope.checkedItems = [];
                });
            }
            //console.log($scope.checked);
        };
        $scope.selectOne = function() {
            angular.forEach($scope.items, function(i) {
                var index = $scope.checked.indexOf(i.id);
                if (i.checked && index == -1) {
                    $scope.checked.push(i.id);
                    $scope.checkedItems.push(i);
                } else if (!i.checked && index !== -1) {
                    $scope.checked.splice(index, 1);
                    $scope.checkedItems.splice(index, 1);
                };
            });


            if ($scope.items.length == $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
            //console.log($scope.checkedItems);
        };

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch(
            'paginationConf.currentPage + paginationConf.itemsPerPage', searchForm);

        //Performance Parameter
        $scope.searchDatchtask = function() {
            $scope.openDatchTaskModal();
        };

        /**添加**/
        $scope.toAddItem = function(page, size) {
            $scope.transmitModalItems = null;
            $scope.isAdd = true;
            $scope.openAddDialog(page, size);

        };

        $scope.toModifyItem = function(page, size) {
            if ($scope.checked.length == 0) {
                // alert("Must select one。");
                messageAlertService.alertFun('must');
                return;
            } else if ($scope.checked.length > 1) {
                messageAlertService.alertFun('only');
                // alert("只能选择一项。");
                return;
            } else if ($scope.checked.length == 1) {
                $scope.transmitModalItems = $scope.checkedItems[0];
                $scope.isAdd = false;
                $scope.openAddDialog(page, size);

            }

        };

        $scope.openDatchTaskModal = function() {
            $scope.query.paramName = "";
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: "static",
                templateUrl: 'app/pages/reportManagement/performanceReport/datchTaskModal.html',
                controller: 'datchTaskModalCtrl',
                size: "md",
                resolve: {
                    transmitModalItems: function() {
                        return $scope.transmitModalItems;
                    },
                    performanceReportService: function() {
                        return performanceReportService;
                    },
                    deps: ['$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/pages/reportManagement/performanceReport/datchTaskModalCtrl.js'
                            ]);
                        }
                    ]
                }
            });

            modalInstance.result.then(function(selectParams) {
                //console.log(selectParams);
                var renderArr = [];
                for (let i = 0; i < selectParams.length; i++) {
                    renderArr.push(selectParams[i].objName);
                };
                $scope.query.paramName = renderArr.toString();
            }, function(newItems) {
                //console.log(newItems);
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        //导出
        $scope.exportList = function(item) { 
            $rootScope.loading = true;
            return $http({    
                url: Url + '/sunwave-report-management/performance/excel',
                    method: "POST",
                    headers: {      
                    'Content-type': 'application/json',
                    'Authorization': window.localStorage.myToken    
                },
                    data: $scope.query,
                    responseType: 'arraybuffer'  
            }).success(function(data, status, headers, config) {   //     var blob = new Blob([data], {type:
                $rootScope.loading = false;
                // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                   // 使用{type:
                // "application/vnd.ms-excel"}的写法，可以保存为xls格式的excel文件（兼容老版本）。而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
                  
                var contentType = headers('Content-Type');
                if (contentType == 'multipart/form-data;charset=utf-8') {
                    var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    //         var time=$scope.CurentTime();
                        
                    var filename = 'Performance Report.xlsx';  
                    if (window.navigator.msSaveOrOpenBlob) { // For IE:
                               navigator.msSaveBlob(blob, filename);     } else { // For other browsers:
                            
                        var objectUrl = URL.createObjectURL(blob);    
                        var a = document.createElement('a');    
                        document.body.appendChild(a);     // var filename =
                        // data.headers('Content-Disposition').split(';')[1].trim().substr('filename='.length); 
                        //       
                            
                        //console.log("filename:" + filename);    
                        a.setAttribute('style', 'display:none');    
                        a.setAttribute('href', objectUrl);    
                        a.setAttribute('download', filename);    
                        a.click();    
                        URL.revokeObjectURL(objectUrl);  
                    }  
                } else {
                    let resBlob = new Blob([data])
                    let reader = new FileReader()
                    reader.readAsText(resBlob, "utf-8")
                    reader.onload = () => {
                        let res = JSON.parse(reader.result)
                        alert(res.msg);
                    }
                }
                $rootScope.loading = false;
            });
        };

    }
})();