angular.module('idd', [
  'ngMaterial',
  'ui.router'
])

.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/data-view');

  $stateProvider.state('data-view', {
    url         : '/data-view',
    templateUrl : '/client/data-view.html',
    controller  : 'DataViewCtrl as dataViewCtrl'
  });
}]);
