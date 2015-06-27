'use strict';

describe('LogSvc', function() {

  var fakeLogData,
      LogSvc,
      $httpBackend;

  fakeLogData = [
    '"sessionId (id)","page (text)","latency (int)","timeOnPage (float)"',
    'b7af832e,explore,22,118.781',
    '38f5841d,welcome,189,39.657',
    'b63335a2,,57,'
  ].join('\n');

  beforeEach(module('idd'));

  beforeEach(inject(function(_LogSvc_, _LogSvcConstants_, _$httpBackend_) {
    LogSvc       = _LogSvc_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET(_LogSvcConstants_.LOG_URL).respond(fakeLogData);
  }));

  describe('getLogData', function() {
    it('should fetch a list of logs', function() {
      LogSvc.getLogData().then(function(logs) {
        expect(logs).toEqual(fakeLogData);
      });

      $httpBackend.flush();
    });
  });

  describe('parseLogs', function() {
    it('should parse the log headers', function() {
      var parsedLogs = LogSvc.parseLogs(fakeLogData);

      expect(parsedLogs.headers).toEqual([
        'sessionId (id)',
        'page (text)',
        'latency (int)',
        'timeOnPage (float)'
      ]);
    });

    it('should parse the log values', function() {
      var parsedLogs = LogSvc.parseLogs(fakeLogData);

      expect(parsedLogs.values).toEqual([
        ['b7af832e', 'explore', '22', '118.781'],
        ['38f5841d' , 'welcome', '189', '39.657'],
        ['b63335a2' , '', '57', '']
      ]);
    });
  });

  describe('takeLogs', function() {
    it('should return the specified number of logs', function() {
      LogSvc.takeLogs(1).then(function(logs) {
        expect(logs.values.length).toBe(1);
      });

      $httpBackend.flush();
    });
  });

});
