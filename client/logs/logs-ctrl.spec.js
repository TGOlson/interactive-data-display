describe('LogsCtrl', function() {
  'use strict';

  var logsCtrl;

  beforeEach(module('idd'));

  beforeEach(inject(function($controller) {
    logsCtrl = $controller('LogsCtrl', {});
  }));

  xit('should have a message', function() {
    expect(logsCtrl.message).toBe('Hi again!');
  });

});
