angular.module('ngDAIA').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/daia-availability.html',
    " <span ng-if=\"!available && !unavailable\">Availability unknown</span><ul class=\"availability\" ng-if=\"available || unavailable\"><li ng-if=\"unavailable[0].expected.length\" class=\"availability availability-limitation\"><span class=\"availability availability-limitation\">currently lent until: {{unavailable[0].expected}}</span></li><li ng-if=\"unavailable[0].expected.length\"><a href=\"{{unavailable[0].href}}\">place reservation</a></li><li ng-if=\"available.length\" ng-repeat=\"a in available\"><span ng-if=\"unavailable[0].expected.length\" class=\"availability availability-expected\">{{a.service}}</span> <span ng-if=\"!unavailable[0].expected.length\" class=\"availability availability-available\">{{a.service}}</span> <span class=\"availability availability-limitation\" ng-if=\"a.limitation.length\">({{a.limitation[0].content}})</span></li><li ng-if=\"unavailable.length\" ng-repeat=\"u in unavailable\"><span ng-if=\"u.expected.length\" class=\"availability availability-expected\">{{u.service}}</span> <span ng-if=\"!u.expected.length\" class=\"availability availability-unavailable\">{{u.service}}</span> <span class=\"availability availability-limitation\" ng-if=\"u.limitation.length\">({{u.limitation[0].content}})</span></li></ul>"
  );


  $templateCache.put('template/daia-item.html',
    "<div ng-if=\"item.department.href.length\"><span class=\"bold\">Department:</span> <a href=\"{{item.department.href}}\">{{item.department.content}}</a></div><span class=\"bold\">Shelf mark:</span>{{item.label}}<br><p class=\"bold\">Availability:</p><div daia-availability=\"item\"></div>"
  );


  $templateCache.put('template/daia-response.html',
    "<h3>Extracted Result</h3><div class=\"result\"><div><span class=\"bold\">Queried institution:</span> <a href=\"{{daia.institution.href}}\">{{daia.institution.content}}</a></div><div><span class=\"bold\">Catalogue entry:</span> <a href=\"{{daia.document[0].href}}\">Link</a></div><div><span class=\"bold\">Copies:</span></div><div daia-documents=\"daia.document\"><div class=\"document\" ng-repeat=\"i in daia.document[0].item\"><div daia-item=\"i\"></div></div></div></div><h3>DAIA response via AngularJS template</h3><div class=\"well\">api: {{api}}<br>id: {{id}}<br>daia: {{daia | json}}</div>"
  );

}]);
