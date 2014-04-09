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
 * * available
 * * no-loan
 * * ...
 *
 * To customize the message, use **angular-translate** and the `translate` 
 * directive. For instance a German translation table:
 *
 *     {
 *         'available': 'verfügbar',
 *         ...
 *     }
 *
 */
ngDAIA.filter('daiaSimple',function(){
  return function(input, option) {
    // {{ document | daiaSimple:loan }} // prefer 'loan' service
    // {{ document | daiaSimple:interloan }} // prefer 'loan' service

    // order of preferences: daiaSimple:loan-presentation

    // input.items
    //

  }
});
