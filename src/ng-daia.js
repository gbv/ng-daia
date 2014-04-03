/**
 * @ngdoc overview
 * @name ng-daia
 * @module ng-daia
 * @description
 *
 * The <b>ngDAIA</b> module for AngularJS facilitates access to 
 * {@link http://purl.org/NET/DAIA Document Availability Information API}
 * (DAIA) services and to display the responses given by a DAIA server.
 *
 * The module provides three directives:
 * {@link ng-daia.directive:daiaItem daiaApi},
 * {@link ng-daia.directive:daiaItem daiaItem}, and
 * {@link ng-daia.directive:daiaAvailability daiaAvailability}.
 *
 */
var ngDAIA = angular.module('ngDAIA',[]);
ngDAIA.value('version', '0.0.1');
