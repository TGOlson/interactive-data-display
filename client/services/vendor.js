angular.module('vendor', [])

.factory('R', ['$window', function($window) {
  return $window.R;
}]);
