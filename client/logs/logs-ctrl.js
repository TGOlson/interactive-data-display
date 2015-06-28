'use strict';

angular.module('idd')

.controller('LogsCtrl', ['$timeout', '$window', 'LogSvc', 'R', function($timeout, $window, LogSvc, R) {
  var logsCtrl = this;

  logsCtrl.loading = true;
  logsCtrl.visibleLogs = [];
  logsCtrl.filteredLogs = [];
  logsCtrl.topMargin = 0;

  var allLogs = [];

  LogSvc.getLogs().then(setLogData);

  function setLogData(logData) {
    logsCtrl.headers = logData.headers;

    allLogs = logData.valueSets;
    logsCtrl.filteredLogs = allLogs;

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

    $timeout(function () {
      logsCtrl.visibleLogs = logsCtrl.filteredLogs.slice(startIndex, endIndex);
    }, 0);
  }

  function getStartIndex(virtualElementCount, actualElementCount) {
    var difference = virtualElementCount - actualElementCount - bufferCount;

    return difference > 0 ? difference : 0;
  }

  function getEndIndex(virtualElementCount) {
    return virtualElementCount + bufferCount;
  }

  logsCtrl.filterLogs = function(searchText) {
    logsCtrl.searching = true;

    $timeout(function() {
      logsCtrl.filteredLogs = R.filter(R.any(R.identical(searchText)), allLogs);

      checkDisplayCount();
      logsCtrl.searching = false;
    }, 100);


  };

  logsCtrl.clearFilter = function() {
    logsCtrl.filteredLogs = allLogs;
    checkDisplayCount();
  };

}]);
