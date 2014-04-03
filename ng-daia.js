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

'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaApi
 * @restrict A
 * @description
 * 
 * This directive queries a DAIA server, each time one of its parameters
 * <code>daia-api</code> or <code>daia-id</code> is changed. The DAIA 
 * response is injected into the template scope as <code>daia</code>. 
 * The template <code>template/daia-response.html</code> can be changed
 * with the <code>template-url</code> parameter.
 *
 * The default template makes use of the directives 
 * {@link ng-daia.directive:daiaItem daiaItem} and
 * {@link ng-daia.directive:daiaAvailability daiaAvailability}.
 *
 * @param {string} daia-api Base URL of DAIA server to query from
 * @param {string} daia-id Document identifier to query for
 * @param {string} template-url Custom template to display DAIA result
 */
ngDAIA.directive('daiaApi',function($http){
    return {
        restrict: 'A',
        scope: {
            api: '@daiaApi',
            id: '@daiaId',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/daia-response.html';
        },
        link: function link(scope, element, attr, controller, transclude) {

            scope.daiaRequest = function() {
                console.log(scope.api);
                $http.jsonp( scope.api, {
                    params: { id: scope.id, format:'json',callback:'JSON_CALLBACK' } }
                ).success(function(response) {
                    //console.log(response);
                    scope.daia = response;
                });
            };

            // TODO: don't call twice
            scope.$watch('api',function(){ scope.daiaRequest() });
            scope.$watch('id',function(){ scope.daiaRequest() });
        }
    };
});

'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaAvailability
 * @restrict A
 * @description
 * 
 * This directive displays the availability of a DAIA item, given as JSON 
 * object with parameter <code>daia-availability</code>. The template 
 * <code>template/daia-availability.html</code> can be changed with the 
 * <code>template-url</code> parameter.
 *
 * The item is injected into the template's scope as <code>item</code>. 
 * For easier access, its members <code>available</code> and 
 * <code>unavailable</code> are provided as well, unless they are empty.
 *
 * See also {@link ng-daia.directive:daiaItem daiaItem} directive.
 *
 * @param {string} daia-item The DAIA item to display
 * @param {string} template-url Custom template URL to display daia result
 */
ngDAIA.directive('daiaAvailability',function(){
    return {
        restrict: 'A',
        scope: {
            item: '=daiaAvailability',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/daia-availability.html';
        },
        link: function(scope, elem, attrs) {
            if (scope.item.available && scope.item.available.length) {
                scope.available = scope.item.available;
            }
            if (scope.item.unavailable && scope.item.unavailable.length) {
                scope.unavailable = scope.item.unavailable;
            }
        }
    }
});

'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaItem
 * @restrict A
 * @description
 * 
 * This directive displays a DAIA item, given as JSON object with parameter
 * <code>daia-item</code>. The item is injected into the template's scope
 * as <code>item</code>. The template <code>template/daia-item.html</code>
 * can be changed with the <code>template-url</code> parameter.
 *
 * See also {@link ng-daia.directive:daiaAvailability daiaAvailability} directive.
 *
 * @param {string} daia-item The DAIA item to display
 * @param {string} template-url Custom template URL to display daia result
 */
ngDAIA.directive('daiaItem',function(){
    return {
        restrict: 'A',
        scope: {
            item: '=daiaItem',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/daia-item.html';
        },
    }
});
