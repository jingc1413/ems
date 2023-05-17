angular.module('buttonPermission2', []).directive('buttonPermission2', function($http, $compile) {
    return {
        restrict: 'AE',
        /*scope :true ,*/
        //        scope: {},
        scope: true,
        require: 'ngModel',
        template: '<div>' + '<div class="ng-scope" ng-show="button2" id = "postModel2{{prenum}}" name="postModel2{{preNum}}" ></div>' + '</div>',
        replace: true,
        controller: function($scope) {},
        link: function(scope, element, attrs, controller) {

            // var menuId = scope.menuId;
            var buttonData2 = window.sessionStorage.getItem('buttonData2');
            scope.buttonData2 = buttonData2;
            scope.isshow = attrs.isshow;
            // var menuId = window.sessionStorage.getItem('menuId');
            // $http({
            //     url: Url + "/sunwave-authority/authority/sysMenu/getMenuButtonById",
            //     method: "POST",
            //     params: {
            //         'menuId': menuId
            //     }
            // }).success(function(res) {

            //     var buttonsArr1 = [];
            //     var buttonsArr2 = [];
            //     scope.button1 = false;
            //     scope.button2 = false;

            //     // for (let i = 0; i < res.data.length; i++) {
            //     //     const element = res.data[i];
            //     //     if (element.dependents == '1') {
            //     //         buttonsArr1.push(element);
            //     //     } else if (element.dependents == '2') {
            //     //         buttonsArr2.push(element);
            //     //     } else {};
            //     // }

            //     scope.buttonDatas = res.data;

            //     // scope.buttonData1 = buttonsArr1;

            //     // scope.buttonData2 = buttonsArr2;
            //

            // }).error(function(err) {

            // });
            scope.initData();
            scope.nowurl = attrs.nowurl;
            if (attrs.prenum == undefined) {
                scope.prenum = '';
            } else {
                scope.prenum = attrs.prenum;
            }

            scope.initData = function() {
                // $http({
                //     url: "index.html",
                //     method: "GET",
                //    				params : {
                //    					'nowurl' : scope.nowurl
                //    				}
                // }).success(function(response) {
                //    				scope.responseMes = response;
                var _html = '<div style="margin-bottom: 0px;margin-right:5px;float:left;" ng-repeat="x in buttonData2">' +
                    '<button class="{{x.clazzs}}"  ng-click="{{x.url}}"><i class="{{x.icon}}"></i>{{x.name}}</button>' +
                    '</div>';
                // var _html2 = '<div style="margin-bottom: 0px;margin-right:5px;float:left;" ng-repeat="x in buttonData2">' +
                //     '<button class="{{x.clazzs}}"  ng-click="{{x.url}}"><i class="{{x.icon}}"></i>{{x.name}}</button>' +
                //     '</div>';
                scope.myHtml = _html;
                // scope.myHtml2 = _html2;
                var ele = $compile(scope.myHtml)(scope);
                // var ele2 = $compile(scope.myHtml2)(scope);
                scope.ele = ele;
                // scope.ele2 = ele2;
                $("#postModel" + scope.prenum).append(ele);
                // $("#postModel2" + scope.prenum).append(ele2);
                // scope.button1 = true;
                scope.button2 = true;


                // }).then(function(res) {

                // });
            };
            // return;

        }

    };
});