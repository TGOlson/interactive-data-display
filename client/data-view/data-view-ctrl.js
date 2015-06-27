angular.module('idd')

.controller('DataViewCtrl', ['LogSvc', function(LogSvc) {
  var dataViewCtrl = this;

  dataViewCtrl.message = 'Hi again!';

  // dataViewCtrl.loading = true;

}]);
