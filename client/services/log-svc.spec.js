'use strict';

describe('LogSvc', function() {

  var fakeRawLogs,
      LogSvc,
      $httpBackend;

  fakeRawLogs = [
    '"sessionId (id)","page (text)","latency (int)","timeOnPage (float)"',
    'b7af832e,explore,22,118.781',
    '38f5841d,welcome,189,39.657'
    // 'b90e8b3d,query,63,423.585',
    // '385b525c,query,180,332.658'
  ].join('\n')

  beforeEach(module('idd'));
  //
  // beforeEach(module(function($provide) {
  //   $provide.value('MjEntityService', mockMjEntityService);
  // }));


  beforeEach(inject(function(_LogSvc_, _LogSvcConstants_, _$httpBackend_) {
    LogSvc = _LogSvc_
    $httpBackend = _$httpBackend_

    $httpBackend.whenGET(_LogSvcConstants_.LOG_URL).respond(fakeRawLogs)
    // dataViewCtrl = $controller('DataViewCtrl', {});
  }));

  describe('getRawLogs', function() {
    it('should fetch a list of logs', function() {
      LogSvc.getRawLogs().then(function(logs) {
        expect(logs).toEqual(fakeRawLogs);
      });

      $httpBackend.flush();
    });
  });

  describe('parseLogs', function() {
    it('should parse the log headers', function() {
      var parsedLogs = LogSvc.parseLogs(fakeRawLogs);

      expect(parsedLogs.headers).toEqual([
        'sessionId (id)',
        'page (text)',
        'latency (int)',
        'timeOnPage (float)'
      ]);
    });

    it('should parse the log values', function() {
      var parsedLogs = LogSvc.parseLogs(fakeRawLogs);

      expect(parsedLogs.values).toEqual([
        ['b7af832e', 'explore', '22', '118.781'],
        ['38f5841d' , 'welcome', '189', '39.657']
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
