angular.module('ngDAIA').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/daia-availability.html',
    "<ul class=\"availability\" ng-if=\"available || unavailable\"><li ng-if=\"available.length\" ng-repeat=\"a in available\"><span>{{a.service}}:</span> <span class=\"availability availability-available\">available</span> <span class=\"availability availability-limitation\" ng-if=\"a.limitation.length\">({{a.limitation[0].content}})</span></li><li ng-if=\"unavailable.length\" ng-repeat=\"u in unavailable\"><span ng-if=\"u.expected.length\">{{u.service}}:</span> <span ng-if=\"u.expected.length\" class=\"availability availability-expected\">unavailable</span> <span ng-if=\"u.expected.length\" class=\"availability availability-return\">(expected: {{u.expected}})</span> <span ng-if=\"!u.expected.length\">{{u.service}}:</span> <span ng-if=\"!u.expected.length\" class=\"availability availability-unavailable\">unavailable</span></li><div class=\"returning\"><li ng-if=\"unavailable[0].href.length && unavailable[0].expected.length\"><a href=\"{{unavailable[0].href}}\">place reservation</a></li></div></ul>"
  );


  $templateCache.put('template/daia-item.html',
    "<div ng-if=\"item.department.href.length\"><span class=\"daia-label\">Department:</span> <a href=\"{{item.department.href}}\">{{item.department.content}}</a></div><div><span class=\"daia-label\">Shelf mark:</span>{{item.label}}</div><span ng-if=\"!item.available && !item.unavailable\" class=\"daia-label\">Availability:</span><span ng-if=\"!item.available && !item.unavailable\">unknown</span><div daia-availability=\"item\"></div>"
  );


  $templateCache.put('template/daia-response.html',
    "<h3>Document availability</h3><div class=\"daia-result\"><div ng-if=\"daia.institution.content.length\"><span class=\"daia-label\">Queried institution:</span> <a ng-if=\"daia.institution.href.length\" href=\"{{daia.institution.href}}\">{{daia.institution.content}}</a> <span ng-if=\"daia.institution.content.length & !daia.institution.href.length\">{{daia.institution.content}}</span></div><div ng-if=\"daia.document[0].href.length\"><span class=\"daia-label\">Catalogue entry:</span> <a href=\"{{daia.document[0].href}}\">Link</a></div><div><span class=\"daia-label\">Copies:</span><span ng-if=\"!daia.document.length\">no records found</span></div><div ng-if=\"daia.document.length\" daia-documents=\"daia.document\"><div class=\"daia-document\" ng-repeat=\"i in daia.document[0].item\"><div daia-item=\"i\"></div></div></div></div>"
  );

}]);
