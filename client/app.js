'use strict';

angular.module('idd', [
  'ngMaterial',
  'ngAnimate',
  'ui.router',
  'vendor',
])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/logs');

  $stateProvider.state('logs', {
    url         : '/logs',
    templateUrl : '/client/logs/logs.html',
    controller  : 'LogsCtrl as logsCtrl'
  });
}]);
