(function () {
  'use strict';

  angular.module('SunWave.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($timeout, $rootScope, $q, baSidebarService) {
    $timeout(function () {
      if (!$rootScope.$pageFinishedLoading) {
        $rootScope.$pageFinishedLoading = true;
      }
    }, 500);

    $rootScope.$baSidebarService = baSidebarService;
  }

})();
