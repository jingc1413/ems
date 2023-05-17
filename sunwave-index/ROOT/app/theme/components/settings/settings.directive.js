(function () {
  'use strict';

  angular.module('SunWave.theme.components')
      .directive('settings', settings);

  /** @ngInject */
  function settings() {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/settings/settings.html',
      controller: 'SettingsCtrl'
    };
  }

})();
