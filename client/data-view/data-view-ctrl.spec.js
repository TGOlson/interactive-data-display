describe('DataViewCtrl', function() {
  'use strict';

  var dataViewCtrl;

  beforeEach(module('idd'));

  beforeEach(inject(function($controller) {
    dataViewCtrl = $controller('DataViewCtrl', {});
  }));

  it('should have a message', function() {
    expect(dataViewCtrl.message).toBe('Hi again!');
  });

});
