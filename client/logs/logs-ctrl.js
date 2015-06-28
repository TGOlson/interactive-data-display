'use strict';

angular.module('idd')

.controller('LogsCtrl', ['$scope', '$window', 'LogSvc', function($scope, $window, LogSvc) {
  var logsCtrl = this;

  logsCtrl.loading = true;
  logsCtrl.visibleLogs = [];
  logsCtrl.topMargin = 0;

  LogSvc.getLogs().then(setLogData);

  function setLogData(logData) {
    window.l = logData.valueSets;
    logsCtrl.headers = logData.headers;

    logsCtrl.logs = logData.valueSets;
    checkDisplayCount();
    logsCtrl.loading = false;
  }


  var itemHeight = 48;
  var bufferCount = 50;

  var mainContent = $window.document.querySelector('md-content');

  angular.element(mainContent).bind('scroll', checkDisplayCount);

  function checkDisplayCount() {
    var contentHeight = mainContent.clientHeight;

    var scrollTop = mainContent.scrollTop;

    var actualElementCount  = Math.ceil(contentHeight / itemHeight);
    var virtualElementCount = Math.ceil((scrollTop + contentHeight) / itemHeight);

    var startIndex = getStartIndex(virtualElementCount, actualElementCount);
    var endIndex = getEndIndex(virtualElementCount);

    logsCtrl.topMargin = startIndex * itemHeight;

    logsCtrl.visibleLogs = logsCtrl.logs.slice(startIndex, endIndex);

    $scope.$apply();
  }

  function getStartIndex(virtualElementCount, actualElementCount) {
    var difference = virtualElementCount - actualElementCount - bufferCount;

    return difference > 0 ? difference : 0;
  }

  function getEndIndex(virtualElementCount) {
    return virtualElementCount + bufferCount;
  }

}]);
