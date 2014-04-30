'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaApi
 * @restrict A
 * @description
 * 
 * This directive queries a DAIA server, each time one of its parameters
 * `daia-api` or `daia-id` is changed. The DAIA response can optionally be 
 * filtered, for instance with {@link ng-daia.filter:daiaSimple daiaSimple}.
 * The default template [template/daia-response.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-response.html)
 * makes use of the directives {@link ng-daia.directive:daiaItem daiaItem}
 * and {@link ng-daia.directive:daiaAvailability daiaAvailability}. The 
 * template can be changed with the `template-url` parameter.
 *
 * ## Scope
 *
 * The DAIA response is injected into the template's scope as variable `daia`.
 *
 * ## Source code
 *
 * The most recent [source 
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daia-api.js)
 * of this directive is available at GitHub.
 
 * @param {string} daia-api Base URL of DAIA server to query from
 * @param {string} daia-id Document identifier to query for
 * @param {string} daia-filter AngularJS filter to process daia response, e.g.
 *                 {@link ng-daia.filter:daiaSimple daiaSimple}
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
        link: function link(scope, element, attr) {
            scope.daiaRequest = function() {
                $http.jsonp( scope.api, {
                    params: { id: scope.id, format:'json',callback:'JSON_CALLBACK' } }
                ).success(function(response) {
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
