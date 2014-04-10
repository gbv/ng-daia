angular.module('myApp', ['ngDAIA']);

function myController($scope) {
  $scope.myAPI = "http://daia.gbv.de/";
  $scope.myID = "opac-de-ma9:ppn:0685460711";
}
