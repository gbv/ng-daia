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
 * code](https://github.com/gbv/ng-daia/blob/master/src/filters/daia-simple.js)
 * of this filter is available at GitHub.

 */
ngDAIA.filter('daiaSimple',function(){
  return function(input, option) {
	
  // extract list of items from input
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
	var response = { };
	
	angular.forEach(items,function(item) {
		if (angular.isArray(item.available)) {
			for(var j=0; j<item.available.length; j++){
				if(item.available[j].service == 'openaccess'){
					response.status = "openaccess";
					response.href = item.available[j].href;
					return;
				}
			}
		}
	});
	if (response.status) return response;
	
	angular.forEach(items,function(item) {
		if (angular.isArray(item.available)) {
			for(var j=0; j<item.available.length; j++){
				if(item.available[j].service == 'loan'){
					response.status = "loan";
					return response;
				}
			}
		}
	});
	if (response.status) return response;
	
	angular.forEach(items,function(item) {
		if (angular.isArray(item.available)) {
			for(var j=0; j<item.available.length; j++){
				if(item.available[j].service == 'presentation'){
					response.status = "presentation";
					return response;
				}
			}
		}
	});
	if (response.status) return response;
	
	angular.forEach(items,function(item) {
		angular.forEach(item.unavailable,function(unavailable) {
			if(unavailable.service == 'loan' && unavailable.expected) {
				var exp = unavailable.expected;
				if (response.expected) {
					if (exp == "unknown") {
						return;
					} else if(response.expected != "unknown") {
						if (exp > response.expected) {
							return;
						}
					}
				}
				response.status = "expected";
				response.expected = exp;
			}
		});
	});
	
	if (!response.status) {
		response.status = "none";
	}

	return response;
  }
});
