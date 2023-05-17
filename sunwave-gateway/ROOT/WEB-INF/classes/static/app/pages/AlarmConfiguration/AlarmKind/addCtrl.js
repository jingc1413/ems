angular.module('SunWave.pages.AlarmConfiguration.AlarmKind', [])
    .controller('addCtrl', addCtrl);

function addCtrl($scope, isAdd, AlarmKind, $uibModalInstance, $http, AlarmKindService) {

    $scope.isDisplay = "true";
    $scope.isreadonly = false;

    $scope.AlarmKind = {
            id: "",
            name: "",
            memo: ""

        }
        // 在这里处理要进行的操作
    $scope.isAdd = isAdd;
    if ($scope.isAdd == 'add') {
        $scope.isDisplay = true;
        $scope.title = 'Add';
        $scope.readonly = false;
    } else if ($scope.isAdd == 'modify') {
        $scope.isDisplay = true;
        $scope.title = "Modify";
        $scope.AlarmKind = AlarmKind;
        $scope.isreadonly = true;

    } else {
        $scope.isDisplay = false;
        $scope.title = "View";
        $scope.AlarmKind = AlarmKind;
        $scope.isreadonly = true;

    }

    $scope.ok = function() {
        // if($scope.role_exist == true) return;
        if ($scope.isAdd == 'add') {

            var newItems = {};
            newItems = $scope.AlarmKind;
            newItems.id = Number($scope.AlarmKind.id);
            AlarmKindService.addContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        alert("Success!");
                        $scope.close();
                    } else {
                        alert(response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });

        } else if ($scope.isAdd == 'modify') {
            var newItems = {};
            newItems = $scope.AlarmKind;
            newItems.id = Number($scope.AlarmKind.id);
            AlarmKindService.editContent(newItems)
                .success(function(response) {
                    if (response.data == true) {
                        alert("Success!");
                        $scope.close();
                    } else {
                        alert(response.msg)
                    }

                })
                .error(function(err) {
                    console.info(err);
                });
            // }

        } else {
            $scope.close();
        }


    };
    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };


}