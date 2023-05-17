(function () {
  'use strict';

  angular.module('SunWave.theme')
      .directive('checkName', checkName);

  /** @ngInject */
  function checkName() {

    /** Base baPanel directive */
    return {
      restrict: 'A',
        require: "ngModel",  
        link: function(scope, elem, attrs, ctrl) {  
            ctrl.$parsers.push(function(value) {
              scope.deviceIp=false;
              if(value.charCodeAt(0)==32||value.charCodeAt(value.length-1)==32){
                scope.deviceIp=true;
                return value;
              }
                var len = 0;    
            for (var i=0; i<value.length; i++) {    
              if (value.charCodeAt(i)>127 || value.charCodeAt(i)==94) {    
                len += 2;    
              } else {    
                len ++;    
              }
               if(len>5){
                scope.deviceIp=true;
                return value;
               }
                
            }    
                return value;  
            });  
  
        }  
    };
  }

})();
