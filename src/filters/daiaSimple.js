'use strict';
/**
 * @ngdoc filter
 * @name ng-daia.filter:daiaSimple
 * @function
 * @description
 * 
 * This filter can be used to transform a DAIA response, document, or item 
 * into simple availability status ([DAIA 
 * Simple](http://gbv.github.io/daiaspec/daia.html#daia-simple)). The filter
 * returns a plain object with simple key-value pairs, such as:
 *
 * <pre class="prettyprint linenums">
 * { status: "openaccess" }
 * { status: "loan" }
 * { status: "presentation" }
 * { status: "expected" }
 * { status: "expected", expected: "2014-12-07" }
 * { status: "openaccess", href: "http://dx.doi.org/10.1901%2Fjaba.1974.7-497a" }
 * { status: "none" }
 * </pre>
 *
 * The filter is used by directive {@link ng-daia.directive:daiaSimple daiaSimple}.
 * It can also be used with directive
 * {@link ng-daia.directive:daiaApi daiaApi} to query and display an 
 * availability status.
 *
 * ## Source code
 *
 * The most recent [source 
 * code](https://github.com/gbv/ng-daia/blob/master/src/filters/daiaSimple.js)
 * of this filter is available at GitHub.
 */
ngDAIA.filter('daiaSimple', function() {
  return function(input, option) {
    var services = ['openaccess','loan','presentation'];
	
    // collect list of items
    var items = [];
    if (angular.isObject(input)) {
        if (angular.isArray(input.document)) {
            angular.forEach(input.document,function(document) {
                angular.forEach(document.item,function(item) {
                    items.push(item);
                });
            });
        } else if (angular.isArray(input.item)) {
            angular.forEach(input.item,function(item) {
                items.push(item);
            });
        } else {
            items.push(input);
        }
    }

    // default DAIA simple response
    var response = {
        service: "none",
        available: false
    };
    
    // find any item with available openaccess 
    // otherwise find any item with available loan
    // otherwise find any item with available presentation
    if ( services.some(function (service) {
        return items.some( function (item) {
            var a = angular.isArray(item.available) ? item.available : [];
            return a.some( function (available) {
                if (available.service != service) { 
                    return;
                }
                response.available = true;
                ['service','href','limitation','delay'].forEach(function (key) { 
                    var value = available[key];
                    if ( value || value == 0 ) { response[key] = value; }
                });
                if (response.limitation) { 
                    response.limitation = response.limitation[0].content;
                }
                return true;
            });
        });
    })) {
        return response;
    }
    
    // otherwise find item that is next expected
    var expect;
    items.forEach( function (item) {
        var a = angular.isArray(item.unavailable) ? item.unavailable : [];
        a.forEach( function (unavail) {
            // any expected openaccess, loan, or presentation
            var uexp = unavail.expected;
            if (services.indexOf(unavail.service) != -1 && uexp) {
                if (!expect || expect == "unknown" || 
                    (uexp != "unknown" && uexp < expect)) {
                    ['service','href','limitation','expected','queue'].forEach(function (key) {
                        var value = unavail[key];
                        if ( value || value == 0 ) { response[key] = value; }
                    });
                    if (response.limitation) {
                        response.limitation = response.limitation[0].content;
                    }
                }
            }
        });
    });
    if (expect) {
        return response;
    }

    // otherwise find any additional href or limitation
    services.some(function (service) {
        // TODO!!!
    });
      
      return response;
    }
});
