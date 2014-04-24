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
 * The module provides three AngularJS directives:
 *
 * * {@link ng-daia.directive:daiaItem daiaApi}
 * * {@link ng-daia.directive:daiaItem daiaItem}
 * * {@link ng-daia.directive:daiaAvailability daiaAvailability}
 *
 */
var ngDAIA = angular.module('ngDAIA', []);
ngDAIA.value('version', '0.0.1');
'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaApi
 * @restrict A
 * @description
 * 
 * This directive queries a DAIA server, each time one of its parameters
 * `daia-api` or `daia-id` is changed. The DAIA response (optionally filtered
 * by a filter such as {@link ng-daia.filter:daiaSimple daiaSimple}) is injected 
 * into the template's scope as variable `daia`. 
 *
 * The default template [template/daia-response.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-response.html)
 * makes use of the directives {@link ng-daia.directive:daiaItem daiaItem}
 * and {@link ng-daia.directive:daiaAvailability daiaAvailability}. The 
 * template can be changed with the `template-url` parameter.
 *
 * @param {string} daia-api Base URL of DAIA server to query from
 * @param {string} daia-id Document identifier to query for
 * @param {string} daia-filter AngularJS filter to process daia response, e.g.
 *     {@link ng-daia.filter:daiaSimple daiaSimple}
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
        return attrs.templateUrl ? attrs.templateUrl : 'template/daia-response.html';
      },
      link: function link(scope, element, attr, controller, transclude) {
        scope.daiaRequest = function () {
          $http.jsonp(scope.api, {
            params: {
              id: scope.id,
              format: 'json',
              callback: 'JSON_CALLBACK'
            }
          }).success(function (response) {
            if (scope.filter) {
              scope.daia = $filter(scope.filter)(response);
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
 * can be changed with the `template-url` parameter. The template's scope
 * gets the variables
 *
 * * `daia`: DAIA response, document, or item as passed to the directive
 * * `status`: simplified status (set to `none` by default)
 * * `expected`, `delay`, `href`, `limitation`: optional additional information
 *
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
            'status',
            'expected',
            'delay',
            'href',
            'limitation'
          ], function (key) {
            scope[key] = simple[key];
          });
          var s = scope.status;
          if (s != 'openaccess' && s != 'loan' && s != 'presentation' && s != 'expected') {
            scope.status = 'none';
          }
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
 * returns a simple object with simple key-value pairs, such as:
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
 * The filter can also be used with parameter `daia-filter` at directive
 * {@link ng-daia.directive:daiaApi daiaApi}.
 *
 * To customize the message, use **angular-translate** and the `translate` 
 * directive. 
 */
ngDAIA.filter('daiaSimple', function () {
  return function (input, option) {
    // extract list of items from input
    var items = [];
    if (angular.isObject(input)) {
      if (angular.isArray(input.document)) {
        angular.forEach(input.document, function (document) {
          angular.forEach(document.item, function (item) {
            items.push(item);
          });
        });
      } else {
        angular.forEach(input.item, function (item) {
          items.push(item);
        });
      }
    } else if (angular.isArray(input)) {
    }
    var response = {};
    angular.forEach(items, function (item) {
      if (angular.isArray(item.available)) {
        for (var j = 0; j < item.available.length; j++) {
          if (item.available[j].service == 'openaccess') {
            response.status = 'openaccess';
            response.href = item.available[j].href;
            return;
          }
        }
      }
    });
    if (response.status)
      return response;
    angular.forEach(items, function (item) {
      if (angular.isArray(item.available)) {
        for (var j = 0; j < item.available.length; j++) {
          if (item.available[j].service == 'loan') {
            response.status = 'loan';
            return response;
          }
        }
      }
    });
    if (response.status)
      return response;
    angular.forEach(items, function (item) {
      if (angular.isArray(item.available)) {
        for (var j = 0; j < item.available.length; j++) {
          if (item.available[j].service == 'presentation') {
            response.status = 'presentation';
            return response;
          }
        }
      }
    });
    if (response.status)
      return response;
    angular.forEach(items, function (item) {
      angular.forEach(item.unavailable, function (unavailable) {
        if (unavailable.service == 'loan' && unavailable.expected) {
          var exp = unavailable.expected;
          if (response.expected) {
            if (exp == 'unknown') {
              return;
            } else if (response.expected != 'unknown') {
              if (exp > response.expected) {
                return;
              }
            }
          }
          response.status = 'expected';
          response.expected = exp;
        }
      });
    });
    if (!response.status) {
      response.status = 'none';
    }
    return response;
  };
});
angular.module('ngDAIA').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('template/daia-availability.html', '<ul class="availability" ng-if="available || unavailable"><li ng-if="available.length" ng-repeat="a in available"><span class="service-label" translate="{{a.service}}">{{a.service}}:</span> <span class="availability availability-available" translate="available">available</span> <span class="availability availability-limitation" ng-if="a.limitation.length">({{a.limitation[0].content}})</span></li><li ng-if="unavailable.length" ng-repeat="u in unavailable"><span class="service-label" ng-if="u.expected.length" translate="{{u.service}}">{{u.service}}:</span> <span ng-if="u.expected.length" class="availability availability-expected" translate="unavailable">unavailable</span> <span class="service-label" ng-if="!u.expected.length" translate="{{u.service}}">{{u.service}}:</span> <span ng-if="!u.expected.length" class="availability availability-unavailable" translate="unavailable">unavailable</span></li><div class="returning"><li ng-if="unavailable[0].href.length && unavailable[0].expected.length"><div ng-if="unavailable[0].expected.length" class="returning returning-expected"><span translate="EXP">expected back:</span> {{unavailable[0].expected}}</div><a href="{{unavailable[0].href}}" translate="RES">place reservation</a></li></div></ul><div class="access" ng-if="((available[1].service || available[0].service) == \'openaccess\' || unavailable[0].service == \'openaccess\')"><span translate="ACC">access via:</span> <a ng-if="available[1].service == \'openaccess\'" href="{{available[1].href}}">{{available[0].href}}</a> <a ng-if="unavailable[0].service == \'openaccess\'" href="{{unavailable[0].href}}">{{available[0].href}}</a></div>');
    $templateCache.put('template/daia-item.html', '<div ng-if="item.department"><span class="daia-label" translate="DEP">Department:</span> <a ng-if="item.department.href" href="{{item.department.href}}">{{item.department.content}}</a><span ng-if="!item.department.href">{{item.department.content}}</span></div><div><span class="daia-label" translate="SGN">Shelf mark:</span> {{item.label}}</div><span ng-if="!item.available && !item.unavailable" class="daia-label" translate="AVB">Availability:</span><span ng-if="!item.available && !item.unavailable" translate="unknown">unknown</span><div daia-availability="item"></div>');
    $templateCache.put('template/daia-response.html', '<div class="daia-result"><div ng-if="daia.institution.content.length"><span class="daia-label" translate="INST">Queried institution:</span> <a ng-if="daia.institution.href.length" href="{{daia.institution.href}}">{{daia.institution.content}}</a></div><div ng-if="daia.document[0].href.length"><a translate="CAT" href="{{daia.document[0].href}}">Catalogue entry</a></div><div><span ng-if="!daia.document.length" translate="NR">no records found</span></div><div ng-if="daia.document.length" daia-documents="daia.document"><div class="daia-document" ng-repeat="i in daia.document[0].item"><div daia-item="i"></div></div></div></div>');
    $templateCache.put('template/daia-simple.html', '<span class="daia-label" translate="STATUS">current status:</span> <span ng-if="status == \'openaccess\'" class="availability availability-available" translate="{{status}}">{{status}}</span> <span ng-if="status == \'loan\'" class="availability availability-available" translate="{{status}}">{{status}}</span> <span ng-if="status == \'presentation\'" class="availability availability-presentation" translate="{{status}}">{{status}}</span> <span ng-if="status != \'openaccess\' && status != \'loan\' && status != \'presentation\'" class="availability availability-unavailable" translate="{{status}}">{{status}}</span> <span ng-if="expected" class="availability availability-unavailable" translate="EXP">until</span> <span ng-if="expected" class="availability availability-unavailable">{{expected}}</span>');
  }
]);