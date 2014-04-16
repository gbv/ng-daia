'use strict';
/**
 * @ngdoc filter
 * @name ng-daia.filter:daiaSimple
 * @function
 * @param {string=} preference what DAIA service(s) to ask for
 * @description
 * 
 * This filter can be used to transform a document or item from a DAIA 
 * response into a simple availability status.
 *
 *     {{ document | daiaSimple }}
 *
 * Possible return values:
 *
 * * `{ status: "openaccess" }`
 * * `{ status: "loan" }`
 * * `{ status: "presentation" }`
 * * `{ status: "expected" }`
 * * `{ status: "expected", expected: "..." }`
 *
 * To customize the message, use **angular-translate** and the `translate` 
 * directive. 
 */
ngDAIA.filter('daiaSimple',function(){
  return function(input, option) {

    // extract list of items from input
    var items = [];
    if (angular.isObject(input)) {
        if (input.document) {
            items = input.document.item;
        } else if(input.item) {
            items = input.item;
        }
    }

    var response = {
        status: "none"
    };

    // check...

    return response;
  }
});
