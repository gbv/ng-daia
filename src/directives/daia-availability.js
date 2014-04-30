'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaAvailability
 * @restrict A
 * @description
 * 
 * This directive displays the availability of a DAIA item, given as JSON 
 * object with parameter `daia-availability`. This directive is used by the 
 * default template of directive {@link ng-daia.directive:daiaItem daiaItem}.
 * The default template 
 * [template/daia-availability.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-availability.html)
 * of this directive can be changed with the `template-url` parameter.
 *
 * ## Scope
 *
 * The DAIA item is injected into the template's scope as variable `item`. 
 * For easier access, its members `available` and `unavailable` are 
 * provided as well, unless they are empty.
 *
 * ## Source code
 *
 * The most recent [source 
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daia-availability.js)
 * of this directive is available at GitHub.
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
