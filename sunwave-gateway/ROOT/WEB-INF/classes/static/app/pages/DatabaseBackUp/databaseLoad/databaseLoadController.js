(function() {
    'use strict';

    angular.module('SunWave.pages.DatabaseBackUp.databaseLoad', [])
        .controller('databaseLoadCtrl', databaseLoadCtrl);

    function databaseLoadCtrl($scope, backupsService) {

        $scope.reader = new FileReader();

        $scope.openDatePick = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };



        $scope.query = { //提交信息

        };

        //			$scope.$on('$viewContentLoaded', function() {
        //				 App.init();
        //				 TableManaged.init();
        //	});

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 200,
            pagesLength: 200,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        $scope.submitForm = function() {

            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            console.info($scope.query);
            backupsService.getbackupLoads($scope.query).success(function(response) {
                $scope.paginationConf.totalItems = response.totalElements;
                $scope.items = response.content;
            });

        };

        $scope.submitForm();

        $scope.dbLoad = function(id) {
            console.info(id);
            backupsService.executeDbLoad(id).success(function(response) {
                alert("Restore complete!");
            });
        }



        $scope.getFile = function() {
            $scope.reader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };

        /*上传binlog文件并恢复*/
        $scope.importBinlog = function() {
            if ($scope.myFile == undefined) {
                alert('Please select one.');
                return;
            }
            backupsService.uploadExcel($scope.myFile).success(function(response) {
                alert("Success.");
                /*alert(response);*/
            });

        }



        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.submitForm);


    }
})();