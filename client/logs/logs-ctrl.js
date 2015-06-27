'use strict';

angular.module('idd')

.controller('LogsCtrl', ['LogSvc', function(LogSvc) {
  var logsCtrl = this;

  var LOG_COUNT = 100;

  logsCtrl.loading = true;

  logsCtrl.message = 'Hi again!';

  LogSvc.takeLogs(LOG_COUNT).then(setLogs);

  function setLogs(logs) {
    logsCtrl.logs    = logs;
    logsCtrl.loading = false;
  }

}]);
