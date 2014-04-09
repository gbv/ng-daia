angular.module('myApp', ['ngDAIA']);

function myController($scope) {
  $scope.myAPI = "http://daia.gbv.de/";
  $scope.myID = "opac-de-89:ppn:532043170";
}
