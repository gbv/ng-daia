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
 * The module provides four AngularJS directives:
 *
 * * {@link ng-daia.directive:daiaApi daiaApi} queries a DAIA server
 *   and displays the result.
 * * {@link ng-daia.directive:daiaItem daiaItem} 
 *   displays a DAIA item with department, shelf mark and availability.
 * * {@link ng-daia.directive:daiaAvailability daiaAvailability}
 *   displays the availability of a DAIA item.
 * * {@link ng-daia.directive:daiaSimple daiaSimple} displays a simplified 
 *   availability status of a DAIA response, document, or item.
 *
 * The `daiaSimple` directive is based on a filter with the same name:
 *
 * * {@link ng-daia.filter:daiaSimple daiaSimple} transforms a DAIA 
 *   response, document, or item into simple availability status.
 *
 */
var ngDAIA = angular.module('ngDAIA',[]);
ngDAIA.value('version', '0.1.0');
