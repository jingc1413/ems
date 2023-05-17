angular.module('SunWave.pages.PerformanceManagement.FormulaLibrary', [])
    .controller('TreeModelCtrl', TreeModelCtrl);

function TreeModelCtrl($rootScope, $scope, $uibModalInstance, FormulaLibraryService, isAdd, Id, item) {
    $scope.title = isAdd;
    $scope.modal = {
        id: "",
        indexName: "",
        manufactureId: ""
    };
    if ($scope.title == "Add") {

    } else {
        $scope.modal.indexName = angular.copy(item.indexName);
        $scope.modal.id = angular.copy(item.id);
    }


    //save
    $scope.save = function() {
        //console.log($scope.modal);
        if ($scope.title == "Add") {
            $scope.modal.manufactureId = Id
            FormulaLibraryService.addTreeNode($scope.modal)
                .success(function(response) {
                    if (response.code == 200) {
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                        $scope.close()
                    } else {

                    }
                })
                .error(function(err) {
                    console.info(err);
                })
        } else {
            FormulaLibraryService.editTreeNode($scope.modal)
                .success(function(response) {
                    if (response.code == 200) {
                        swal({
                            title: "Tips:",
                            text: "Success !",
                            icon: "success",
                            timer: 4000,
                        });
                        $scope.close()
                    } else {

                    }
                })
                .error(function(err) {
                    console.info(err);
                })
        }


    };

    $scope.close = function() {
        $uibModalInstance.close('cancel');
    };
}