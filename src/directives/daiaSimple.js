'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaSimple
 * @restrict A
 * @description
 * 
 * This directive displays a DAIA response, document, or item in simplified
 * form, as filtered by {@link ng-daia.filter:daiaSimple daiaSimple}). The
 * default template [template/daia-simple.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-simple.html)
 * can be changed with the `template-url` parameter.
 *
 * ## Scope
 *
 * The DAIA response, document, or item is injected into the template's scope as
 * variable `variable`. The DAIA simple response is provided with its fields
 * `service`, `available`, `expected`, `delay`, `href`, `limitation`, and `queue`.
 *
 * ## Source code
 *
 * The most recent [source 
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daiaSimple.js)
 * of this directive is available at GitHub.

 * @param {string} daia-item DAIA response, document, or item to display
 * @param {string} template-url Custom template URL to display daia result
 */
ngDAIA.directive('daiaSimple',function($filter){
    return {
        restrict: 'A',
        scope: {
            daia: '=daiaSimple',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/daia-simple.html';
        },
        link: function(scope, elem, attrs) {
            scope.$watch('daia',function(){
                var simple = $filter('daiaSimple')(scope.daia);
                angular.forEach(
                    ['service','available','expected','delay','href','limitation','queue'],
                    function(key) { scope[key] = simple[key]; }
                );
            });
        }
    }
});
