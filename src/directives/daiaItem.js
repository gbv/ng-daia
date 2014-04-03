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
