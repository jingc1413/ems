/*天线创建modal controller*/
// (function() {
//     'use strict';

angular.module('SunWave.pages.sysManagement.sysAnnouncement', [])
    .controller('sysAnnouncementModalCtrl', sysAnnouncementModalCtrl);

function sysAnnouncementModalCtrl($scope, $http, sysAnnouncementService, isAdd, $filter, transmitModalItems, $uibModalInstance) {

    console.log('transmitModalItems:' + transmitModalItems);

    $scope.modal = {
        afficheContent: "",
        // affiche: "",
        afficheInvalidate: $filter('date')(new Date(), 'yyyy-MM-dd'),
        // afficheInvalidate: $filter('date')(new Date().setDate(new Date().getDate() - 29), 'yyyy-MM-dd'),
        afficheTitle: ""
    }
    $scope.isAdd = isAdd;
    $scope.isSave = true;
    if ($scope.isAdd == 'Add') {
        $scope.title = 'Add';
    } else if ($scope.isAdd == 'Modify') {
        $scope.title = "Modify";
        $scope.modal = transmitModalItems;
        $scope.modal.afficheInvalidate = $filter('date')(transmitModalItems.afficheInvalidate, 'yyyy-MM-dd');
    } else {
        $scope.title = "View";
        $scope.isSave = false;
        $scope.modal = transmitModalItems;
        $scope.modal.afficheInvalidate = $filter('date')(transmitModalItems.afficheInvalidate, 'yyyy-MM-dd');
    }


    $scope.save = function() {

        var form = new FormData();
        // var file = document.getElementById("fileUpload").files[0];
        var modal = JSON.stringify($scope.modal);

        var newItems = {};
        newItems = $scope.modal;

        // form.append('affiche', file);
        form.append('afficheTitle', $scope.modal.afficheTitle);
        form.append('afficheInvalidate', $filter('date')($scope.modal.afficheInvalidate, "yyyy-MM-dd"));
        form.append('afficheContent', $scope.modal.afficheContent);
        form.append('affichePulish', Number($scope.modal.affichePulish));
        form.append('afficheId', $scope.modal.afficheId);

        console.log(form);
        if ($scope.isAdd == 'Add') {
            sysAnnouncementService.addContent(form).success(function() {
                alert('success');
                $scope.close();
            }).error(function() {
                alert(err.msg);
            })
        } else if ($scope.isAdd == 'Modify') {
            sysAnnouncementService.editContent(form).success(function(res) {
                alert('success');
                $scope.close();
            }).error(function() {
                alert(err.msg);
            })
        }
    };



    $scope.close = function(newItems) {
        $uibModalInstance.close(newItems);
    };

    // });
}
// });