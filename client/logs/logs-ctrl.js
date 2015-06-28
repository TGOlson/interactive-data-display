'use strict';

angular.module('idd')

.controller('LogsCtrl', ['LogSvc', function(LogSvc) {
  var logsCtrl = this;

  logsCtrl.loading = true;

  LogSvc.getLogs().then(setLogs);

  function setLogs(logData) {
    console.log(logData);

    logsCtrl.headers = logData.headers;

    logsCtrl.logs = logData.valueSets;
    logsCtrl.visibleLogs = logsCtrl.logs.slice(0, 30);
    logsCtrl.loading = false;
  }


}]);
