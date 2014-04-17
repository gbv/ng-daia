'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaAvailability
 * @restrict A
 * @description
 * 
 * This directive displays the availability of a DAIA item, given as JSON 
 * object with parameter `daia-availability`. The default template 
 * [template/daia-availability.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-availability.html)
 * can be changed with the `template-url` parameter.
 *
 * The item is injected into the template's scope as `item`. 
 * For easier access, its members `available` and 
 * `unavailable` are provided as well, unless they are empty.
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
