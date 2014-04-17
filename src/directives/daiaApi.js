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
 * @param {string} daia-filter AngularJS filter to process daia response, e.g.
 *     {@link ng-daia.filter:daiasimple daiaSimple}.
 * @param {string} template-url Custom template to display DAIA result
 */
ngDAIA.directive('daiaApi',function($http,$filter){
    return {
        restrict: 'A',
        scope: {
            api: '@daiaApi',
            id: '@daiaId',
						filter: '@daiaFilter',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/daia-response.html';
        },
        link: function link(scope, element, attr, controller, transclude) {

						console.log(scope.filter);
						
            scope.daiaRequest = function() {
                console.log(scope.api);
                $http.jsonp( scope.api, {
                    params: { id: scope.id, format:'json',callback:'JSON_CALLBACK' } }
                ).success(function(response) {
                    //console.log(response);
										if (scope.filter) {
											scope.daia = $filter(scope.filter)(response);
										} else {
											scope.daia = response;
										}
                });
            };

            // TODO: don't call twice
            scope.$watch('api',function(){ scope.daiaRequest() });
            scope.$watch('id',function(){ scope.daiaRequest() });
        }
    };
});
