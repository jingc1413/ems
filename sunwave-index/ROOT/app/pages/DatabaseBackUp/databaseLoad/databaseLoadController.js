(function() {
    'use strict';

    angular.module('SunWave.pages.DatabaseBackUp.databaseLoad', [])
        .controller('databaseLoadCtrl', databaseLoadCtrl);

    function databaseLoadCtrl($rootScope, $scope, backupsService, $http, messageAlertService) {

        $scope.reader = new FileReader();

        $scope.openDatePick = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };


        $scope.isSuccess = true;
        $scope.istSuccess = false;


        $scope.query = { //提交信息

        };

        //			$scope.$on('$viewContentLoaded', function() {
        //				 App.init();
        //				 TableManaged.init();
        //	});

        // 配置分页基本参数
        $scope.paginationConf = { //分页信息
            currentPage: 1,
            itemsPerPage: 50,
            pagesLength: 50,
            perPageOptions: [15, 20, 30, 50, 100, 200]

        };

        $scope.submitForm = function() {

            $scope.query.pageIndex = $scope.paginationConf.currentPage;
            $scope.query.pageSize = $scope.paginationConf.itemsPerPage;
            console.info($scope.query);
            backupsService.getbackupLoads($scope.query).success(function(response) {
                $scope.paginationConf.totalItems = response.totalElements;
                $scope.items = response.content;
                for (let i = 0; i < $scope.items.length; i++) {
                    const el = $scope.items[i];
                    if (!el.backupResult || el.backupResult == 'Failure' || el.backupResult == 'Failure.' || el.backupResult == '') {
                        $scope.isSuccess = false;
                        $scope.istSuccess = true;
                    } else {
                        $scope.isSuccess = true;
                        $scope.istSuccess = false;
                    }

                }
            });

        };

        $scope.submitForm();

        $scope.dbLoad = function(id) {
            if (messageAlertService.confirmFun('sure')) {
                // console.info(backupName);
                // backupsService.executeDbLoad(id).success(function(response) {
                //     alert("Restore complete!");
                // });
                $rootScope.loading = true;

                backupsService.executeDbLoad(id).success(function(response) {
                    if (response == true) {
                        // alert("Restore complete!");
                        $rootScope.loading = false;
                        messageAlertService.dbLoadTips('success');
                    } else {
                        $rootScope.loading = false;
                        messageAlertService.dbLoadTips('');
                    }
                });
            }

        }



        $scope.getFile = function() {
            $scope.reader.readAsDataUrl($scope.myFile, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        };

        $scope.downLoad = function(backupName) {
            if (messageAlertService.confirmFun('sure')) {
                // console.info(backupName);
                var backupName = backupName;
                // backupName = 'xxx.zip';

                $rootScope.loading = true;
                $http({    

                    url: Url + '/sunwave-dbbackups/API/system/backups/download',
                    method: "GET",
                    headers: {   
                        // 'Content-type': 'application/json',
                        // 'Content-type': 'application/octet-stream',
                        'Authorization': window.localStorage.myToken    
                    },
                    responseType: 'arraybuffer',
                    params: {
                        "fileName": backupName
                    }  
                }).success(function(data) { 
                    console.log(data);

                    $rootScope.loading = false;
                    // var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    var blob = new Blob([data], { type: "application/zip" });    
                    // var blob = new Blob([data], { type: "application/octet-stream" }); 
                    // var filename = 'file';  
                    // var dateStr = new Date().toLocaleDateString().replace(/\//g, '-');　　
                    if (window.navigator.msSaveOrOpenBlob) {　　　　
                        navigator.msSaveBlob(blob, backupName);
                    } else {　　　　
                        // let url = URL.createObjectURL(blob);　　　
                        // let a = document.createElement('a');　　　　
                        // a.style.display = 'none';　　　　
                        // a.href = url;　　　　
                        // a.setAttribute('download', backupName);　　　　
                        // document.body.appendChild(a);　　　　
                        // a.click();　　　　
                        // document.body.removeChild(a);　　　　
                        // window.URL.revokeObjectURL(url);　　
                        let linkNode = document.createElement('a')
                            // linkNode.download = fileName + '.tar'
                        linkNode.style.display = 'none'
                        linkNode.href = URL.createObjectURL(blob)
                        document.body.appendChild(linkNode)
                        linkNode.click()
                        URL.revokeObjectURL(linkNode.href)
                        document.body.removeChild(linkNode)
                    }

                });


                // // $rootScope.loading = true;
                // backupsService.downLoad(backupName).success(function(response) {
                //     if (response.error == null || response.error == undefined) {
                //         // $rootScope.loading = false;
                //         alert("Download complete!");
                //     }
                // });
            }
        }

        /*上传binlog文件并恢复*/
        $scope.importBinlog = function() {
            $scope.myFile = document.getElementById("fileInput").files[0];
            if ($scope.myFile == undefined) {
                // alert('Please select one.');
                messageAlertService.alertFun('');
                return;
            }
            backupsService.uploadExcel($scope.myFile).success(function(response) {
                // alert("Success.");
                messageAlertService.successFun('success');
                /*alert(response);*/
            });

        }



        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.submitForm);


    }
})();