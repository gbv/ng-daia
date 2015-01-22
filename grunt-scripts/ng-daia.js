/**
 * @ngdoc overview
 * @name ng-daia
 * @module ng-daia
 * @description
 *
 * The <b>ngDAIA</b> module for AngularJS facilitates access to 
 * {@link http://purl.org/NET/DAIA Document Availability Information API}
 * (DAIA) services and to display the responses given by a DAIA server.
 *
 * The module provides four AngularJS directives:
 *
 * * {@link ng-daia.directive:daiaApi daiaApi} queries a DAIA server
 *   and displays the result.
 * * {@link ng-daia.directive:daiaItem daiaItem} 
 *   displays a DAIA item with department, shelf mark and availability.
 * * {@link ng-daia.directive:daiaAvailability daiaAvailability}
 *   displays the availability of a DAIA item.
 * * {@link ng-daia.directive:daiaSimple daiaSimple} displays a simplified 
 *   availability status of a DAIA response, document, or item.
 *
 * The `daiaSimple` directive is based on a filter with the same name:
 *
 * * {@link ng-daia.filter:daiaSimple daiaSimple} transforms a DAIA 
 *   response, document, or item into simple availability status.
 *
 */
var ngDAIA = angular.module('ngDAIA', []);
ngDAIA.value('version', '0.1.2');
'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaApi
 * @restrict A
 * @description
 * 
 * This directive queries a DAIA server, each time one of its parameters
 * `daia-api` or `daia-id` is changed. The DAIA response can optionally be 
 * filtered, for instance with {@link ng-daia.filter:daiaSimple daiaSimple}.
 *
 * The default template [template/daia-response.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-response.html)
 * makes use of the directives {@link ng-daia.directive:daiaItem daiaItem}
 * and {@link ng-daia.directive:daiaAvailability daiaAvailability}. The 
 * template can be changed with the `template-url` parameter. If parameter
 * `daia-filter` is set to `daiaSimple`, the default template 
 * The default template [template/daia-response.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-response.html)
 *
 *
 * ## Scope
 *
 * Without `daia-filter`, the DAIA response is injected into the template's 
 * scope as variable `daia`. With `daia-filter` the filtered response is used
 * as scope.
 *
 * ## Source code
 *
 * The most recent [source 
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daiaApi.js)
 * of this directive is available at GitHub.
 * 
 * @param {string} daia-api Base URL of DAIA server to query from
 * @param {string} daia-id Document identifier to query for
 * @param {string} daia-filter AngularJS filter to process daia response, e.g.
 *                 {@link ng-daia.filter:daiaSimple daiaSimple}
 * @param {string} template-url Custom template to display DAIA result
 */
ngDAIA.directive('daiaApi', [
  '$http',
  '$filter',
  function ($http, $filter) {
    return {
      restrict: 'A',
      scope: {
        api: '@daiaApi',
        id: '@daiaId',
        filter: '@daiaFilter'
      },
      templateUrl: function (elem, attrs) {
        if (attrs.templateUrl) {
          return attrs.templateUrl;
        } else {
          return attrs.daiaFilter == 'daiaSimple' ? 'template/daia-simple.html' : 'template/daia-response.html';
        }
      },
      link: function link(scope, element, attr) {
        scope.daiaRequest = function () {
          $http.jsonp(scope.api, {
            params: {
              id: scope.id,
              format: 'json',
              callback: 'JSON_CALLBACK'
            }
          }).success(function (response) {
            if (scope.filter) {
              var filtered = $filter(scope.filter)(response);
              // FIXME: purge existing variables from scope
              angular.forEach(filtered, function (value, key) {
                scope[key] = value;
              });
            } else {
              scope.daia = response;
            }
          });
        };
        // TODO: don't call twice
        scope.$watch('api', function () {
          scope.daiaRequest();
        });
        scope.$watch('id', function () {
          scope.daiaRequest();
        });
      }
    };
  }
]);
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
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daiaAvailability.js)
 * of this directive is available at GitHub.
 *
 * @param {string} daia-item The DAIA item to display
 * @param {string} template-url Custom template URL to display daia result
 */
ngDAIA.directive('daiaAvailability', function () {
  return {
    restrict: 'A',
    scope: { item: '=daiaAvailability' },
    templateUrl: function (elem, attrs) {
      return attrs.templateUrl ? attrs.templateUrl : 'template/daia-availability.html';
    },
    link: function (scope, elem, attrs) {
      if (scope.item.available && scope.item.available.length) {
        scope.available = scope.item.available;
      }
      if (scope.item.unavailable && scope.item.unavailable.length) {
        scope.unavailable = scope.item.unavailable;
      }
    }
  };
});
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
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daiaItem.js)
 * of this directive is available at GitHub.
 *
 * @param {string} daia-item The DAIA item to display
 * @param {string} template-url Custom template URL to display daia result
 */
ngDAIA.directive('daiaItem', function () {
  return {
    restrict: 'A',
    scope: { item: '=daiaItem' },
    templateUrl: function (elem, attrs) {
      return attrs.templateUrl ? attrs.templateUrl : 'template/daia-item.html';
    }
  };
});
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
 * can be changed with the `template-url` parameter.
 *
 * ## Scope
 *
 * The DAIA response, document, or item is injected into the template's scope as
 * variable `variable`. The DAIA simple response is provided with its fields
 * `service`, `available`, `expected`, `delay`, `href`, `limitation`, and `queue`.
 *
 * ## Source code
 *
 * The most recent [source 
 * code](https://github.com/gbv/ng-daia/blob/master/src/directives/daiaSimple.js)
 * of this directive is available at GitHub.

 * @param {string} daia-item DAIA response, document, or item to display
 * @param {string} template-url Custom template URL to display daia result
 */
ngDAIA.directive('daiaSimple', [
  '$filter',
  function ($filter) {
    return {
      restrict: 'A',
      scope: { daia: '=daiaSimple' },
      templateUrl: function (elem, attrs) {
        return attrs.templateUrl ? attrs.templateUrl : 'template/daia-simple.html';
      },
      link: function (scope, elem, attrs) {
        scope.$watch('daia', function () {
          var simple = $filter('daiaSimple')(scope.daia);
          angular.forEach([
            'service',
            'available',
            'expected',
            'delay',
            'href',
            'limitation',
            'queue'
          ], function (key) {
            scope[key] = simple[key];
          });
        });
      }
    };
  }
]);
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
ngDAIA.filter('daiaSimple', function () {
  return function (input, option) {
    var services = [
        'openaccess',
        'loan',
        'presentation'
      ];
    // collect list of items
    var items = [];
    if (angular.isObject(input)) {
      if (angular.isArray(input.document)) {
        angular.forEach(input.document, function (document) {
          angular.forEach(document.item, function (item) {
            items.push(item);
          });
        });
      } else if (angular.isArray(input.item)) {
        angular.forEach(input.item, function (item) {
          items.push(item);
        });
      } else {
        items.push(input);
      }
    }
    // default DAIA simple response
    var response = {
        service: 'none',
        available: false
      };
    // find any item with available openaccess 
    // otherwise find any item with available loan
    // otherwise find any item with available presentation
    if (services.some(function (service) {
        return items.some(function (item) {
          var a = angular.isArray(item.available) ? item.available : [];
          return a.some(function (available) {
            if (available.service != service) {
              return;
            }
            response.available = true;
            [
              'service',
              'href',
              'limitation',
              'delay'
            ].forEach(function (key) {
              var value = available[key];
              if (value || value == 0) {
                response[key] = value;
              }
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
    items.forEach(function (item) {
      var a = angular.isArray(item.unavailable) ? item.unavailable : [];
      a.forEach(function (unavail) {
        // any expected openaccess, loan, or presentation
        var uexp = unavail.expected;
        if (services.indexOf(unavail.service) != -1 && uexp) {
          if (!expect || expect == 'unknown' || uexp != 'unknown' && uexp < expect) {
            [
              'service',
              'href',
              'limitation',
              'expected',
              'queue'
            ].forEach(function (key) {
              var value = unavail[key];
              if (value || value == 0) {
                response[key] = value;
              }
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
    });
    return response;
  };
});
angular.module('ngDAIA').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/daia-availability.html', '<ul class="availability" ng-if="available || unavailable"><li ng-if="available" ng-repeat="a in available"><span class="service-label" translate="{{a.service}}">{{a.service}}</span> <span class="availability availability-available" translate="available">available</span> <span class="availability availability-limitation" ng-if="a.limitation">({{a.limitation[0].content}})</span></li><li ng-if="unavailable" ng-repeat="u in unavailable"><span class="service-label" ng-if="u.expected" translate="{{u.service}}">{{u.service}}</span> <span ng-if="u.expected" class="availability availability-expected" translate="expected">expected</span> <span class="service-label" ng-if="!u.expected" translate="{{u.service}}">{{u.service}}</span> <span ng-if="!u.expected" class="availability availability-unavailable" translate="unavailable">unavailable</span></li><div class="returning"><li ng-if="unavailable[0].href && unavailable[0].expected"><div ng-if="unavailable[0].expected" class="returning returning-expected"><span translate="EXPECTED_BACK">expected back:</span> {{unavailable[0].expected}}</div><a href="{{unavailable[0].href}}" translate="RESERVATION">place reservation</a></li></div></ul><div class="access" ng-if="((available[1].service || available[0].service) == \'openaccess\' || unavailable[0].service == \'openaccess\')"><span translate="ACCESS">access via:</span> <a ng-if="available[1].service == \'openaccess\'" href="{{available[1].href}}">{{available[1].href}}</a> <a ng-if="unavailable[0].service == \'openaccess\'" href="{{unavailable[0].href}}">{{available[0].href}}</a></div>');
    $templateCache.put('template/daia-item.html', '<div ng-if="item.department"><span class="daia-label" translate="DEPARTMENT">Department:</span> <a ng-if="item.department.href" href="{{item.department.href}}">{{item.department.content}}</a> <span ng-if="!item.department.href">{{item.department.content}}</span></div><div ng-if="item.label"><span class="daia-label" translate="SIGNATURE">Shelf mark:</span> {{item.label}}</div><span ng-if="!item.available && !item.unavailable" class="daia-label" translate="AVAILABILITY">Availability:</span> <span ng-if="!item.available && !item.unavailable" translate="unknown">unknown</span><div daia-availability="item"></div>');
    $templateCache.put('template/daia-response.html', '<div class="daia-result"><div ng-if="daia.institution.content"><span class="daia-label" translate="INSTITUTION">institution:</span> <a ng-if="daia.institution.href" href="{{daia.institution.href}}">{{daia.institution.content}}</a></div><div ng-if="daia.document[0].href"><span class="daia-label" translate="DOCUMENT">document:</span> <a translate="CATALOG_ENTRY" href="{{daia.document[0].href}}">Catalog entry</a></div><div><span ng-if="!daia.document" translate="NO_RECORDS">no records found</span></div><div ng-if="daia.document" daia-documents="daia.document"><div class="daia-document" ng-repeat="i in daia.document[0].item"><div daia-item="i"></div></div></div></div>');
    $templateCache.put('template/daia-simple.html', '<span ng-if="available"><span ng-switch="service"><span ng-switch-when="openaccess"><span class="availability-available">frei verf\xfcgbar</span> <a ng-if="href" href="{{href}}">aufrufen</a></span> <span ng-switch-when="loan"><span class="availability-available">ausleihbar</span> <a ng-if="href" href="{{href}}">bestellen</a></span> <span ng-switch-when="presentation"><span class="availability-available">vor Ort verf\xfcgbar</span> <a ng-if="href" href="{{href}}">bestellen</a></span> <span ng-switch-default=""><span class="availability-available">verf\xfcgbar</span> <a ng-if="href" href="{{href}}">bestellen</a></span></span> <span ng-if="delay">(Wartezeit<span ng-if="delay != \'unknown\'">etwa {{delay}}</span>)</span> <span ng-if="limitation">| <span class="daia-limitation">{{limitation}}</span></span></span> <span ng-if="!available"><span class="availability-unavailable"><span ng-if="expected">momentan</span> nicht verf\xfcgbar</span> <span ng-if="expected && expected != \'unknown\'">bis voraussichtlich {{expected}}</span> <span ng-if="href"><a href="{{href}}">vormerken</a></span> <span ng-if="queue">({{queue}} Vormerkungen)</span> <span ng-if="limitation">| <span class="daia-limitation">{{limitation}}</span></span></span>');
  }
]);