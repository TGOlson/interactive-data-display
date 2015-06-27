'use strict';

angular.module('idd')

.constant('LogSvcConstants', {
  // local copy of data for dev
  LOG_URL: '/data/input.csv'
  // LOG_URL: 'https://s3.amazonaws.com/challenge.wagon/input.csv'
})

.factory('LogSvc', ['$http', 'LogSvcConstants', 'R', function($http, LogSvcConstants, R) {

  var parseItems   = R.split(',');
  var parseHeaders = R.compose(parseItems, R.replace(/"/g, ''), R.head);
  var parseValues  = R.compose(R.map(parseItems), R.tail);

  var getLogs = R.composeP(parseLogs, getRawLogs);

  function getRawLogs() {
    return $http.get(LogSvcConstants.LOG_URL)
      .then(R.prop('data'));
  }

  function parseLogs(rawLogs) {
    var logs = R.split('\n', rawLogs);

    return {
      headers : parseHeaders(logs),
      values  : parseValues(logs)
    };
  }

  function takeLogs(n) {
    return getLogs().then(R.evolve({values: R.take(n)}));
  }

  return {
    getRawLogs : getRawLogs,
    parseLogs  : parseLogs,
    getLogs    : getLogs,
    takeLogs   : takeLogs
  };
}])

;
