'use strict';

angular.module('idd')

.factory('LazyLoadSvc', ['$window', 'R', function($window, R) {
  var ELEMENT_BUFFER_COUNT = 20;

  function makeLoaderFromSelector(parentSelector, itemHeight) {
    return makeLoaderFromElement(getElement(parentSelector), itemHeight);
  }

  function getElement(selector) {
    var element = $window.document.querySelector(selector);
    return angular.element(element);
  }

  function makeLoaderFromElement(parentElement, itemHeight) {
    return {
      parentElement   : parentElement,
      itemHeight      : itemHeight,
      previousIndices : null
    };
  }

  function onLoaderChange(loader, callback) {
    maybeUpdateLoaderIndices(loader, callback);

    loader.parentElement.bind('scroll', function() {
      maybeUpdateLoaderIndices(loader, callback);
    });
  }

  function maybeUpdateLoaderIndices(loader, callback) {
    var indices = getLoaderIndices(loader);

    if(loaderShouldUpdate(loader, indices)) {
      updateLoaderIndices(loader, indices, callback);
    }
  }

  function updateLoaderIndices(loader, indices, callback) {
    loader.previousIndices = indices;
    callback(indices);
  }

  function loaderShouldUpdate(loader, indices) {
    return R.not(R.equals(loader.previousIndices, indices));
  }

  function getLoaderIndices(loader) {
    return getIndices(loader.parentElement, loader.itemHeight);
  }

  function resetLoader(loader) {
    loader.parentElement.prop({scrollTop: '0px'});
  }

  function getIndices(parentElement, itemHeight) {
    var contentHeight = parentElement.prop('clientHeight');
    var scrollTop     = parentElement.prop('scrollTop');

    var actualElementCount  = Math.ceil(contentHeight / itemHeight);
    var virtualElementCount = Math.ceil((scrollTop + contentHeight) / itemHeight);

    var startIndex = getStartIndex(virtualElementCount, actualElementCount);
    var endIndex   = getEndIndex(virtualElementCount);

    return [startIndex, endIndex];
  }

  function getStartIndex(virtualElementCount, actualElementCount) {
    var startIndex = virtualElementCount - actualElementCount - ELEMENT_BUFFER_COUNT;
    return R.max([0, startIndex]);
  }

  var getEndIndex = R.add(ELEMENT_BUFFER_COUNT);

  return {
    makeLoaderFromElement  : makeLoaderFromElement,
    makeLoaderFromSelector : makeLoaderFromSelector,
    onLoaderChange         : onLoaderChange,
    getLoaderIndices       : getLoaderIndices,
    resetLoader            : resetLoader
  };
}]);
