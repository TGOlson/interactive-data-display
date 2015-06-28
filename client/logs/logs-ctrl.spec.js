'use strict';

describe('LogsCtrl', function() {
  var logsCtrl,
      mockLogsSvc,
      fakeLogs;

  fakeLogs = {
    headers: ['h1', 'h2', 'h3'],
    valueSets: [
      [1, 2, 3],
      [4, 5, 6]
    ]
  };

  var fakeLogsPromise = {
    then: function(cb) {
      cb(fakeLogs);
      return fakeLogsPromise;
    }
  };

  mockLogsSvc = {
    getLogs: function() {
      return fakeLogsPromise;
    }
  };

  beforeEach(module('idd'));

  beforeEach(inject(function($controller) {
    logsCtrl = $controller('LogsCtrl', {
      $scope : {$evalAsync : angular.noop},
      LogSvc : mockLogsSvc
    });
  }));

  it('should set a header', function() {
    expect(logsCtrl.headers).toBe(fakeLogs.headers);
  });

  it('should set log data', function() {
    expect(logsCtrl.allLogs).toBe(fakeLogs.valueSets);
    expect(logsCtrl.filteredLogs).toBe(fakeLogs.valueSets);
  });

  describe('filterLogs', function() {
    it('should set the filtered logs by a strict search', function() {
      logsCtrl.filterLogs(2);

      expect(logsCtrl.allLogs).toBe(fakeLogs.valueSets);
      expect(logsCtrl.filteredLogs).toEqual([[1, 2, 3]]);
    });
  });

  describe('clearFilter', function() {
    it('should reset filtered logs', function() {
      logsCtrl.filterLogs(2);
      logsCtrl.clearFilter();

      expect(logsCtrl.allLogs).toBe(logsCtrl.filteredLogs);
    });
  });

});
