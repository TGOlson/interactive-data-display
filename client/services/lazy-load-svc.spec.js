'use strict';

describe('LazyLoadSvc', function() {
  var LazyLoadSvc,
      fakeParentElement,
      dummyElementHeight,
      loader;

  beforeEach(module('idd'));

  beforeEach(inject(function(_LazyLoadSvc_) {
    LazyLoadSvc = _LazyLoadSvc_;

    fakeParentElement = {
      clientHeight : 500,
      scrollTop    : 600,
      bind         : angular.noop,
      prop         : function(prop) {
        return fakeParentElement[prop];
      },
    };

    dummyElementHeight = 20;

    loader = LazyLoadSvc.makeLoaderFromElement(fakeParentElement, dummyElementHeight);
  }));

  describe('makeLoaderFromElement', function() {
    it('should return a new loader', function() {
      expect(loader).toEqual({
        parentElement   : fakeParentElement,
        itemHeight      : dummyElementHeight,
        previousIndices : null
      });
    });
  });

  describe('onLoaderChange', function() {
    it('should immediately invoke the provided callback', function() {
      LazyLoadSvc.onLoaderChange(loader, function(indices) {
        expect(indices).toEqual([10, 75]);
      });
    });
  });

  describe('getIndices', function() {
    it('should return the displayable indices for a container', function() {
      var indices = LazyLoadSvc.getLoaderIndices(loader);
      expect(indices).toEqual([10, 75]);
    });

    it('should default to a start index of zero if the actual index with buffer is below zero', function() {
      loader.itemHeight = 50;
      var indices = LazyLoadSvc.getLoaderIndices(loader);
      
      expect(indices).toEqual([0, 42]);
    });
  });
});
