'use strict';

angular.module('idd')

.controller('LogsCtrl', ['LogSvc', function(LogSvc) {
  var logsCtrl = this;

  logsCtrl.loading = true;
  logsCtrl.visibleLogs = [];
  logsCtrl.topMargin = 0;

  LogSvc.getLogs().then(setLogs);

  function setLogs(logData) {
    console.log(logData);

    logsCtrl.headers = logData.headers;

    logsCtrl.logs = logData.valueSets;
    logsCtrl.loadMore();
    logsCtrl.loading = false;
  }

  logsCtrl.loadMore = function() {
    logsCtrl.topMargin += logsCtrl.visibleLogs.length * 48;

    var nextSet = logsCtrl.logs.slice(logsCtrl.visibleLogs.length, logsCtrl.visibleLogs.length + 50);

    logsCtrl.visibleLogs = nextSet;

  };


}]);
