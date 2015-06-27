describe('LogsCtrl', function() {
  'use strict';

  var logsCtrl;

  beforeEach(module('idd'));

  beforeEach(inject(function($controller) {
    logsCtrl = $controller('LogsCtrl', {});
  }));

  it('should have a message', function() {
    expect(logsCtrl.message).toBe('Hi again!');
  });

});
