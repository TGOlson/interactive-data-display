'use strict';

angular.module('idd')

.constant('LogSvcConstants', {
  LOG_URL : '/data/input.csv' // local copy of data for dev
  // LOG_URL: 'https://s3.amazonaws.com/challenge.wagon/input.csv'
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

  function parseLogs(rawLogs) {
    var logs = R.split('\r', rawLogs);

    return {
      headers   : parseHeaders(logs),
      valueSets : parseValues(logs)
    };
  }

  function takeLogs(n) {
    return getLogs().then(R.evolve({valueSets: R.take(n)}));
  }

  return {
    getLogData : getLogData,
    parseLogs  : parseLogs,
    getLogs    : getLogs,
    takeLogs   : takeLogs
  };
}])

;
