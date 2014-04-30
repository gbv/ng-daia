angular.module('ngDAIA').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/daia-availability.html',
    "<ul class=\"availability\" ng-if=\"available || unavailable\"><li ng-if=\"available.length\" ng-repeat=\"a in available\"><span class=\"service-label\" translate=\"{{a.service}}\">{{a.service}}</span> <span class=\"availability availability-available\" translate=\"available\">available</span> <span class=\"availability availability-limitation\" ng-if=\"a.limitation.length\">({{a.limitation[0].content}})</span></li><li ng-if=\"unavailable.length\" ng-repeat=\"u in unavailable\"><span class=\"service-label\" ng-if=\"u.expected.length\" translate=\"{{u.service}}\">{{u.service}}</span> <span ng-if=\"u.expected.length\" class=\"availability availability-expected\" translate=\"unavailable\">unavailable</span> <span class=\"service-label\" ng-if=\"!u.expected.length\" translate=\"{{u.service}}\">{{u.service}}</span> <span ng-if=\"!u.expected.length\" class=\"availability availability-unavailable\" translate=\"unavailable\">unavailable</span></li><div class=\"returning\"><li ng-if=\"unavailable[0].href.length && unavailable[0].expected.length\"><div ng-if=\"unavailable[0].expected.length\" class=\"returning returning-expected\"><span translate=\"EXPECTED_BACK\">expected back:</span> {{unavailable[0].expected}}</div><a href=\"{{unavailable[0].href}}\" translate=\"RESERVATION\">place reservation</a></li></div></ul><div class=\"access\" ng-if=\"((available[1].service || available[0].service) == 'openaccess' || unavailable[0].service == 'openaccess')\"><span translate=\"ACCESS\">access via:</span> <a ng-if=\"available[1].service == 'openaccess'\" href=\"{{available[1].href}}\">{{available[0].href}}</a> <a ng-if=\"unavailable[0].service == 'openaccess'\" href=\"{{unavailable[0].href}}\">{{available[0].href}}</a></div>"
  );


  $templateCache.put('template/daia-item.html',
    "<div ng-if=\"item.department\"><span class=\"daia-label\" translate=\"DEPARTMENT\">Department:</span> <a ng-if=\"item.department.href\" href=\"{{item.department.href}}\">{{item.department.content}}</a><span ng-if=\"!item.department.href\">{{item.department.content}}</span></div><div><span class=\"daia-label\" translate=\"SIGNATURE\">Shelf mark:</span> {{item.label}}</div><span ng-if=\"!item.available && !item.unavailable\" class=\"daia-label\" translate=\"AVAILABILITY\">Availability:</span><span ng-if=\"!item.available && !item.unavailable\" translate=\"unknown\">unknown</span><div daia-availability=\"item\"></div>"
  );


  $templateCache.put('template/daia-response.html',
    "<div class=\"daia-result\"><div ng-if=\"daia.institution.content.length\"><span class=\"daia-label\" translate=\"INSTITUTION\">institution:</span> <a ng-if=\"daia.institution.href.length\" href=\"{{daia.institution.href}}\">{{daia.institution.content}}</a></div><div ng-if=\"daia.document[0].href.length\"><span class=\"daia-label\" translate=\"DOCUMENT\">document</span> <a translate=\"CATALOG_ENTRY\" href=\"{{daia.document[0].href}}\">Catalog entry</a></div><div><span ng-if=\"!daia.document.length\" translate=\"NO_RECORDS\">no records found</span></div><div ng-if=\"daia.document.length\" daia-documents=\"daia.document\"><div class=\"daia-document\" ng-repeat=\"i in daia.document[0].item\"><div daia-item=\"i\"></div></div></div></div>"
  );


  $templateCache.put('template/daia-simple.html',
    "<span ng-if=\"status == 'openaccess'\" class=\"availability availability-available\" translate=\"{{status}}\">{{status}}</span> <span ng-if=\"status == 'loan'\" class=\"availability availability-available\" translate=\"{{status}}\">{{status}}</span> <span ng-if=\"status == 'presentation'\" class=\"availability availability-presentation\" translate=\"{{status}}\">{{status}}</span> <span ng-if=\"status != 'openaccess' && status != 'loan' && status != 'presentation' && status != 'expected'\" class=\"availability availability-unavailable\" translate=\"{{status}}\">{{status}}</span> <span ng-if=\"expected\" class=\"availability availability-unavailable\" translate=\"EXPECTED_BACK\">until</span> <span ng-if=\"expected\" class=\"availability availability-unavailable\">{{expected}}</span>"
  );

}]);
