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
 * can be changed with the `template-url` parameter. The template's scope
 * gets the variables
 *
 * * `daia`: DAIA response, document, or item as passed to the directive
 * * `status`: simplified status (set to `none` by default)
 * * `expected`, `delay`, `href`, `limitation`: optional additional information
 *
 * ## Scope
 *
 * The DAIA response, document, or item is injected into the template's scope as
 * variable `variable`. The DAIA simple response is provided with its fields
 * `status`, `expected`, `delay`, `href`, and `limitation`.

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
                    ['status','expected','delay','href','limitation'],
                    function(key) { scope[key] = simple[key]; }
                );

                var s = scope.status;
                if (s!='openaccess' && s!='loan' && s!='presentation' && s!= 'expected') {
                        scope.status = 'none';
                }
            });
        }
    }
});
