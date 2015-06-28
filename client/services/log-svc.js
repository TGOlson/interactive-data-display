'use strict';

angular.module('idd')

.constant('LogSvcConstants', {
  LOG_URL : '/data/logs.csv'
})

.factory('LogSvc', ['$http', 'LogSvcConstants', 'R', function($http, LogSvcConstants, R) {

  var parseItems   = R.split(',');
  var parseHeaders = R.compose(parseItems, R.replace(/"/g, ''), R.head);
  var parseValues  = R.compose(R.map(parseItems), R.tail);

  var getLogs = R.composeP(parseLogs, getLogData);

  function getLogData() {
    return $http.get(LogSvcConstants.LOG_URL)
      .then(R.prop('data'));
  }

  function parseLogs(logData) {
    var logs = R.split('\r', logData);

    return {
      headers   : parseHeaders(logs),
      valueSets : parseValues(logs)
    };
  }

  return {
    getLogData : getLogData,
    parseLogs  : parseLogs,
    getLogs    : getLogs
  };
}]);
