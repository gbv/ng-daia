angular.module('ngDAIA').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/daia-availability.html',
    " <span ng-if=\"!available && !unavailable\">Availability unknown</span><ul class=\"availability\" ng-if=\"available || unavailable\"><li ng-if=\"available.length\" ng-repeat=\"a in available\"><span ng-if=\"unavailable[0].expected.length\" class=\"availability availability-expected\">{{a.service}}</span> <span ng-if=\"!unavailable[0].expected.length\" class=\"availability availability-available\">{{a.service}}</span> <span class=\"availability availability-limitation\" ng-if=\"a.limitation.length\">({{a.limitation[0].content}})</span></li><li ng-if=\"unavailable.length\" ng-repeat=\"u in unavailable\"><span ng-if=\"u.expected.length\" class=\"availability availability-expected\">{{u.service}}</span> <span ng-if=\"!u.expected.length\" class=\"availability availability-unavailable\">{{u.service}}</span> <span class=\"availability availability-limitation\" ng-if=\"u.limitation.length\">({{u.limitation[0].content}})</span></li><div class=\"returning\"><li ng-if=\"unavailable[0].expected.length\" class=\"availability availability-limitation\"><span class=\"availability availability-limitation\">currently lent until: {{unavailable[0].expected}}</span></li><li ng-if=\"unavailable[0].href.length && unavailable[0].expected.length\"><a href=\"{{unavailable[0].href}}\">place reservation</a></li></div></ul>"
  );


  $templateCache.put('template/daia-item.html',
    "<div ng-if=\"item.department.href.length\"><span class=\"daia-label\">Department:</span> <a href=\"{{item.department.href}}\">{{item.department.content}}</a></div><div><span class=\"daia-label\">Shelf mark:</span>{{item.label}}</div><p class=\"daia-label\">Availability:</p><div daia-availability=\"item\"></div>"
  );


  $templateCache.put('template/daia-response.html',
    "<h3>Document availability</h3><div class=\"daia-result\"><div ng-if=\"daia.institution.content.length\"><span class=\"daia-label\">Queried institution:</span> <a ng-if=\"daia.institution.href.length\" href=\"{{daia.institution.href}}\">{{daia.institution.content}}</a> <span ng-if=\"daia.institution.content.length & !daia.institution.href.length\">{{daia.institution.content}}</span></div><div ng-if=\"daia.document[0].href.length\"><span class=\"daia-label\">Catalogue entry:</span> <a href=\"{{daia.document[0].href}}\">Link</a></div><div><span class=\"daia-label\">Copies:</span><span ng-if=\"!daia.document.length\">no records found</span></div><div ng-if=\"daia.document.length\" daia-documents=\"daia.document\"><div class=\"daia-document\" ng-repeat=\"i in daia.document[0].item\"><div daia-item=\"i\"></div></div></div></div>"
  );

}]);
