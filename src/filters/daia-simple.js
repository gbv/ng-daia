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
		if (angular.isArray(input.document)) {
			angular.forEach(input.document,function(document) {
				angular.forEach(document.item,function(item) {
					items.push(item);
				});
			});
		} else {
			angular.forEach(input.item,function(item) {
				items.push(item);
			});
    }
  } else if(angular.isArray(input)) {
		// TODO
	}
	
	console.log("Items:");
	console.log(items);
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
	
	console.log(1);
	
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
	
	console.log(2);
	
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
	
	console.log(3);
	
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
