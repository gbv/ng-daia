'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaItem
 * @restrict A
 * @description
 * 
 * This directive displays a DAIA item, given as JSON object with parameter
 * `daia-item`. The item is injected into the template's scope as variable 
 * `item`. The default template 
 * [template/daia-item.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-item.html)
 * makes use of directive {@link ng-daia.directive:daiaAvailability daiaAvailability}.
 * The template can be changed with the `template-url` parameter.
 *
 * ## Scope
 *
 * The DAIA item is injected into the template's scope as variable `item`. 
 *
 * ## Source code
 *
 * The most recent [source 
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daia-item.js)
 * of this directive is available at GitHub.
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
