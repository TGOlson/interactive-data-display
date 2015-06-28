'use strict';

angular.module('idd')

.controller('LogsCtrl', ['$scope', 'LazyLoadSvc', 'LogSvc', 'R', function($scope, LazyLoadSvc, LogSvc, R) {
  var logsCtrl = this;

  var LOG_ITEM_HEIGHT = 48;
  var loader = LazyLoadSvc.makeLoaderFromSelector('md-content', LOG_ITEM_HEIGHT);

  logsCtrl.loading      = true;
  logsCtrl.topMargin    = 0;
  logsCtrl.visibleLogs  = [];
  logsCtrl.filteredLogs = [];
  logsCtrl.allLogs      = [];

  LogSvc.getLogs()
    .then(R.tap(setHeaders))
    .then(R.tap(setLogs))
    .then(function() {
      logsCtrl.loading = false;
    });

  function setHeaders(logData) {
    logsCtrl.headers = logData.headers;
  }

  function setLogs(logData) {
    logsCtrl.allLogs      = logData.valueSets;
    logsCtrl.filteredLogs = logData.valueSets;

    LazyLoadSvc.onLoaderChange(loader, updateVisibleLogs);
  }

  function updateVisibleLogs(indices) {
    var startIndex = R.head(indices);
    var endIndex   = R.last(indices);

    logsCtrl.topMargin = startIndex * LOG_ITEM_HEIGHT;

    $scope.$evalAsync(function() {
      logsCtrl.visibleLogs = logsCtrl.filteredLogs.slice(startIndex, endIndex);
    });
  }

  logsCtrl.filterLogs = function(searchText) {
    logsCtrl.filteredLogs = R.filter(R.any(R.identical(searchText)), logsCtrl.allLogs);
    resetCurrentLoader();
  };

  logsCtrl.clearFilter = function() {
    logsCtrl.filteredLogs = logsCtrl.allLogs;
    resetCurrentLoader();
  };

  function resetCurrentLoader() {
    LazyLoadSvc.resetLoader(loader);

    var indices = LazyLoadSvc.getLoaderIndices(loader);
    updateVisibleLogs(indices);
  }

}]);
