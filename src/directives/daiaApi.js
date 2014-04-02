'use strict';
/**
 * @ngdoc directive
 * @name ng-daia.directive:daiaApi
 * @restrict A
 * @description
 * 
 * ...
 */
ngDAIA.directive('daiaApi',function($http){
    return {
        restrict: 'A',
        templateUrl: 'myDaiaTemplate.html',
        scope: {
            api: '@daiaApi',
            id: '@daiaId',
            templateUrl: '@templateUrl',
        },
        link: function link(scope, element, attr, controller, transclude) {

            scope.daiaRequest = function() {
                console.log(scope.api);
                $http.jsonp( scope.api, {
                    params: { id: scope.id, format:'json',callback:'JSON_CALLBACK' } }
                ).success(function(response) {
                    console.log(response);
                    scope.daia = response;
                });
            };

            // TODO: don't call twice
            scope.$watch('api',function(){ scope.daiaRequest() });
            scope.$watch('id',function(){ scope.daiaRequest() });
        }
    };
});
