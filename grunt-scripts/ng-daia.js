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
var ngDAIA = angular.module('ngDAIA',[]);
ngDAIA.value('version', '0.0.1');

'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaApi
 * @restrict A
 * @description
 * 
 * This directive queries a DAIA server, each time one of its parameters
 * <code>daia-api</code> or <code>daia-id</code> is changed. The DAIA 
 * response is injected into the template scope as <code>daia</code>. 
 * The template <code>template/daia-response.html</code> can be changed
 * with the <code>template-url</code> parameter.
 *
 * The default template makes use of the directives 
 * {@link ng-daia.directive:daiaItem daiaItem} and
 * {@link ng-daia.directive:daiaAvailability daiaAvailability}.
 *
 * @param {string} daia-api Base URL of DAIA server to query from
 * @param {string} daia-id Document identifier to query for
 * @param {string} template-url Custom template to display DAIA result
 */
ngDAIA.directive('daiaApi',function($http){
    return {
        restrict: 'A',
        scope: {
            api: '@daiaApi',
            id: '@daiaId',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/daia-response.html';
        },
        link: function link(scope, element, attr, controller, transclude) {

            scope.daiaRequest = function() {
                console.log(scope.api);
                $http.jsonp( scope.api, {
                    params: { id: scope.id, format:'json',callback:'JSON_CALLBACK' } }
                ).success(function(response) {
                    //console.log(response);
                    scope.daia = response;
                });
            };

            // TODO: don't call twice
            scope.$watch('api',function(){ scope.daiaRequest() });
            scope.$watch('id',function(){ scope.daiaRequest() });
        }
    };
});

'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaAvailability
 * @restrict A
 * @description
 * 
 * This directive displays the availability of a DAIA item, given as JSON 
 * object with parameter <code>daia-availability</code>. The template 
 * <code>template/daia-availability.html</code> can be changed with the 
 * <code>template-url</code> parameter.
 *
 * The item is injected into the template's scope as <code>item</code>. 
 * For easier access, its members <code>available</code> and 
 * <code>unavailable</code> are provided as well, unless they are empty.
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

angular.module('ngDAIA').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/daia-availability.html',
    "<ul class=\"availability\" ng-if=\"available || unavailable\"><li ng-if=\"available.length\" ng-repeat=\"a in available\"><span class=\"service-label\">{{a.service}}:</span> <span class=\"availability availability-available\">available</span> <span class=\"availability availability-limitation\" ng-if=\"a.limitation.length\">({{a.limitation[0].content}})</span></li><li ng-if=\"unavailable.length\" ng-repeat=\"u in unavailable\"><span class=\"service-label\" ng-if=\"u.expected.length\">{{u.service}}:</span> <span ng-if=\"u.expected.length\" class=\"availability availability-expected\">unavailable</span> <span class=\"service-label\" ng-if=\"!u.expected.length\">{{u.service}}:</span> <span ng-if=\"!u.expected.length\" class=\"availability availability-unavailable\">unavailable</span></li><div class=\"returning\"><li ng-if=\"unavailable[0].href.length && unavailable[0].expected.length\"><div ng-if=\"unavailable[0].expected.length\" class=\"returning returning-expected\">expected back: {{unavailable[0].expected}}</div><a href=\"{{unavailable[0].href}}\">place reservation</a></li></div></ul><div class=\"access\" ng-if=\"((available[1].service || available[0].service) == 'openaccess' || unavailable[0].service == 'openaccess')\">access via: <a ng-if=\"available[1].service == 'openaccess'\" href=\"{{available[1].href}}\">{{available[0].href}}</a> <a ng-if=\"unavailable[0].service == 'openaccess'\" href=\"{{unavailable[0].href}}\">{{available[0].href}}</a></div>"
  );


  $templateCache.put('template/daia-item.html',
    "<div ng-if=\"item.department.href.length\"><span class=\"daia-label\">Department:</span> <a href=\"{{item.department.href}}\">{{item.department.content}}</a></div><div><span class=\"daia-label\">Shelf mark:</span>{{item.label}}</div><span ng-if=\"!item.available && !item.unavailable\" class=\"daia-label\">Availability:</span><span ng-if=\"!item.available && !item.unavailable\">unknown</span><div daia-availability=\"item\"></div>"
  );


  $templateCache.put('template/daia-response.html',
    "<h3>Document availability</h3><div class=\"daia-result\"><div ng-if=\"daia.institution.content.length\"><span class=\"daia-label\">Queried institution:</span> <a ng-if=\"daia.institution.href.length\" href=\"{{daia.institution.href}}\">{{daia.institution.content}}</a> <span ng-if=\"daia.institution.content.length & !daia.institution.href.length\">{{daia.institution.content}}</span></div><div ng-if=\"daia.document[0].href.length\"><span class=\"daia-label\">Catalogue entry:</span> <a href=\"{{daia.document[0].href}}\">Link</a></div><div><span ng-if=\"!daia.document.length\">no records found</span></div><div ng-if=\"daia.document.length\" daia-documents=\"daia.document\"><div class=\"daia-document\" ng-repeat=\"i in daia.document[0].item\"><div daia-item=\"i\"></div></div></div></div>"
  );

}]);