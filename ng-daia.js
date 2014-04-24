/*!
 * angular-translate - v2.1.0 - 2014-04-02
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module("pascalprecht.translate",["ng"]).run(["$translate",function(a){var b=a.storageKey(),c=a.storage();c?c.get(b)?a.use(c.get(b)):angular.isString(a.preferredLanguage())?a.use(a.preferredLanguage()):c.set(b,a.use()):angular.isString(a.preferredLanguage())&&a.use(a.preferredLanguage())}]),angular.module("pascalprecht.translate").provider("$translate",["$STORAGE_KEY",function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p={},q=[],r=a,s=[],t=!1,u="translate-cloak",v=!1,w=".",x=function(){var a=window.navigator;return(a.language||a.browserLanguage||a.systemLanguage||a.userLanguage||"").split("-").join("_")},y=function(a){for(var b=[],d=angular.lowercase(a),e=0,f=q.length;f>e;e++)b.push(angular.lowercase(q[e]));if(b.indexOf(d)>-1)return d;if(c){var g;for(var h in c)if(c.hasOwnProperty(h)&&angular.lowercase(h)===angular.lowercase(a)&&(g=c[h],b.indexOf(angular.lowercase(g))>-1))return g}var i=a.split("_");return i.length>1&&b.indexOf(angular.lowercase(i[0]))>-1?i[0]:void 0},z=function(a,b){if(!a&&!b)return p;if(a&&!b){if(angular.isString(a))return p[a]}else angular.isObject(p[a])||(p[a]={}),angular.extend(p[a],A(b));return this};this.translations=z,this.cloakClassName=function(a){return a?(u=a,this):u};var A=function(a,b,c,d){var e,f,g,h;b||(b=[]),c||(c={});for(e in a)a.hasOwnProperty(e)&&(h=a[e],angular.isObject(h)?A(h,b.concat(e),c,e):(f=b.length?""+b.join(w)+w+e:e,b.length&&e===d&&(g=""+b.join(w),c[g]="@:"+f),c[f]=h));return c};this.addInterpolation=function(a){return s.push(a),this},this.useMessageFormatInterpolation=function(){return this.useInterpolation("$translateMessageFormatInterpolation")},this.useInterpolation=function(a){return k=a,this},this.useSanitizeValueStrategy=function(a){return t=a,this},this.preferredLanguage=function(a){return a?(b=a,this):b},this.translationNotFoundIndicator=function(a){return this.translationNotFoundIndicatorLeft(a),this.translationNotFoundIndicatorRight(a),this},this.translationNotFoundIndicatorLeft=function(a){return a?(n=a,this):n},this.translationNotFoundIndicatorRight=function(a){return a?(o=a,this):o},this.fallbackLanguage=function(a){return B(a),this};var B=function(a){return a?(angular.isString(a)?(e=!0,d=[a]):angular.isArray(a)&&(e=!1,d=a),angular.isString(b)&&d.push(b),this):e?d[0]:d};this.use=function(a){if(a){if(!p[a]&&!l)throw new Error("$translateProvider couldn't find translationTable for langKey: '"+a+"'");return f=a,this}return f};var C=function(a){return a?(r=a,void 0):i?i+r:r};this.storageKey=C,this.useUrlLoader=function(a){return this.useLoader("$translateUrlLoader",{url:a})},this.useStaticFilesLoader=function(a){return this.useLoader("$translateStaticFilesLoader",a)},this.useLoader=function(a,b){return l=a,m=b||{},this},this.useLocalStorage=function(){return this.useStorage("$translateLocalStorage")},this.useCookieStorage=function(){return this.useStorage("$translateCookieStorage")},this.useStorage=function(a){return h=a,this},this.storagePrefix=function(a){return a?(i=a,this):a},this.useMissingTranslationHandlerLog=function(){return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")},this.useMissingTranslationHandler=function(a){return j=a,this},this.usePostCompiling=function(a){return v=!!a,this},this.determinePreferredLanguage=function(a){var c=a&&angular.isFunction(a)?a():x();return q.length?(b=y(c),void 0):(b=c,this)},this.registerAvailableLanguageKeys=function(a,b){return a?(q=a,b&&(c=b),this):q},this.$get=["$log","$injector","$rootScope","$q",function(a,c,i,q){var w,x,y,D=c.get(k||"$translateDefaultInterpolation"),E=!1,F={},G={},H=function(a,c,e){if(angular.isArray(a)){var g=function(a){for(var b={},d=[],f=function(a){var d=q.defer(),f=function(c){b[a]=c,d.resolve([a,c])};return H(a,c,e).then(f,f),d.promise},g=0,h=a.length;h>g;g++)d.push(f(a[g]));return q.all(d).then(function(){return b})};return g(a)}var i=q.defer();a=a.trim();var j=function(){var a=b?G[b]:G[f];if(x=0,h&&!a){var c=w.get(r);if(a=G[c],d&&d.length){var e=I(d,c);x=e>-1?e+=1:0,d.push(b)}}return a}();return j?j.then(function(){T(a,c,e).then(i.resolve,i.reject)},i.reject):T(a,c,e).then(i.resolve,i.reject),i.promise},I=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},J=function(a){return n&&(a=[n,a].join(" ")),o&&(a=[a,o].join(" ")),a},K=function(a){f=a,i.$emit("$translateChangeSuccess"),h&&w.set(H.storageKey(),f),D.setLocale(f),angular.forEach(F,function(a,b){F[b].setLocale(f)}),i.$emit("$translateChangeEnd")},L=function(a){if(!a)throw"No language key specified for loading.";var b=q.defer();return i.$emit("$translateLoadingStart"),E=!0,c.get(l)(angular.extend(m,{key:a})).then(function(c){var d={};i.$emit("$translateLoadingSuccess"),angular.isArray(c)?angular.forEach(c,function(a){angular.extend(d,A(a))}):angular.extend(d,A(c)),E=!1,b.resolve({key:a,table:d}),i.$emit("$translateLoadingEnd")},function(a){i.$emit("$translateLoadingError"),b.reject(a),i.$emit("$translateLoadingEnd")}),b.promise};if(h&&(w=c.get(h),!w.get||!w.set))throw new Error("Couldn't use storage '"+h+"', missing get() or set() method!");angular.isFunction(D.useSanitizeValueStrategy)&&D.useSanitizeValueStrategy(t),s.length&&angular.forEach(s,function(a){var d=c.get(a);d.setLocale(b||f),angular.isFunction(d.useSanitizeValueStrategy)&&d.useSanitizeValueStrategy(t),F[d.getInterpolationIdentifier()]=d});var M=function(a){var b=q.defer();return p.hasOwnProperty(a)?(b.resolve(p[a]),b.promise):(G[a].then(function(a){z(a.key,a.table),b.resolve(a.table)},b.reject),b.promise)},N=function(a,b,c,d){var e=q.defer();return M(a).then(function(g){g.hasOwnProperty(b)?(d.setLocale(a),e.resolve(d.interpolate(g[b],c)),d.setLocale(f)):e.reject()},e.reject),e.promise},O=function(a,b,c,d){var e,g=p[a];return g.hasOwnProperty(b)&&(d.setLocale(a),e=d.interpolate(g[b],c),d.setLocale(f)),e},P=function(a,b,c,e){var f=q.defer();if(a<d.length){var g=d[a];N(g,b,c,e).then(function(a){f.resolve(a)},function(){var d=P(a+1,b,c,e);f.resolve(d)})}else f.resolve(b);return f.promise},Q=function(a,b,c,e){var f;if(a<d.length){var g=d[a];f=O(g,b,c,e),f||(f=Q(a+1,b,c,e))}return f},R=function(a,b,c){return P(y>0?y:x,a,b,c)},S=function(a,b,c){return Q(y>0?y:x,a,b,c)},T=function(a,b,e){var g=q.defer(),h=f?p[f]:p,i=e?F[e]:D;if(h&&h.hasOwnProperty(a)){var k=h[a];"@:"===k.substr(0,2)?H(k.substr(2),b,e).then(g.resolve,g.reject):g.resolve(i.interpolate(k,b))}else j&&!E&&c.get(j)(a,f),f&&d&&d.length?R(a,b,i).then(function(a){g.resolve(a)},function(a){g.reject(J(a))}):g.reject(J(a));return g.promise},U=function(a,b,e){var g,h=f?p[f]:p,i=e?F[e]:D;if(h&&h.hasOwnProperty(a)){var k=h[a];g="@:"===k.substr(0,2)?U(k.substr(2),b,e):i.interpolate(k,b)}else j&&!E&&c.get(j)(a,f),f&&d&&d.length?(x=0,g=S(a,b,i)):g=J(a);return g};if(H.preferredLanguage=function(){return b},H.cloakClassName=function(){return u},H.fallbackLanguage=function(a){if(void 0!==a&&null!==a){if(B(a),l&&d&&d.length)for(var b=0,c=d.length;c>b;b++)G[d[b]]||(G[d[b]]=L(d[b]));H.use(H.use())}return e?d[0]:d},H.useFallbackLanguage=function(a){if(void 0!==a&&null!==a)if(a){var b=I(d,a);b>-1&&(y=b)}else y=0},H.proposedLanguage=function(){return g},H.storage=function(){return w},H.use=function(a){if(!a)return f;var b=q.defer();return i.$emit("$translateChangeStart"),!p[a]&&l?(g=a,G[a]=L(a).then(function(c){z(c.key,c.table),b.resolve(c.key),g===a&&(K(c.key),g=void 0)},function(a){g=void 0,i.$emit("$translateChangeError"),b.reject(a),i.$emit("$translateChangeEnd")})):(b.resolve(a),K(a)),b.promise},H.storageKey=function(){return C()},H.isPostCompilingEnabled=function(){return v},H.refresh=function(a){function b(){e.resolve(),i.$emit("$translateRefreshEnd")}function c(){e.reject(),i.$emit("$translateRefreshEnd")}if(!l)throw new Error("Couldn't refresh translation table, no loader registered!");var e=q.defer();if(i.$emit("$translateRefreshStart"),a)p[a]?L(a).then(function(c){z(c.key,c.table),a===f&&K(f),b()},c):c();else{var g=[];if(d&&d.length)for(var h=0,j=d.length;j>h;h++)g.push(L(d[h]));f&&g.push(L(f)),q.all(g).then(function(a){angular.forEach(a,function(a){p[a.key]&&delete p[a.key],z(a.key,a.table)}),f&&K(f),b()})}return e.promise},H.instant=function(a,e,g){if(angular.isArray(a)){for(var h={},i=0,k=a.length;k>i;i++)h[a[i]]=H.instant(a[i],e,g);return h}if("undefined"==typeof a||""===a)return a;a=a.trim();var l,m=[];b&&m.push(b),f&&m.push(f),d&&d.length&&(m=m.concat(d));for(var n=0,o=m.length;o>n;n++){var q=m[n];if(p[q]&&"undefined"!=typeof p[q][a]&&(l=U(a,e,g)),"undefined"!=typeof l)break}return l||""===l||(l=a,j&&!E&&c.get(j)(a,f)),l},l&&(angular.equals(p,{})&&H.use(H.use()),d&&d.length))for(var V=0,W=d.length;W>V;V++)G[d[V]]=L(d[V]);return H}]}]),angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation",["$interpolate",function(a){var b,c={},d="default",e=null,f={escaped:function(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=angular.element("<div></div>").text(a[c]).html());return b}},g=function(a){var b;return b=angular.isFunction(f[e])?f[e](a):a};return c.setLocale=function(a){b=a},c.getInterpolationIdentifier=function(){return d},c.useSanitizeValueStrategy=function(a){return e=a,this},c.interpolate=function(b,c){return e&&(c=g(c)),a(b)(c)},c}]),angular.module("pascalprecht.translate").constant("$STORAGE_KEY","NG_TRANSLATE_LANG_KEY"),angular.module("pascalprecht.translate").directive("translate",["$translate","$q","$interpolate","$compile","$parse","$rootScope",function(a,b,c,d,e,f){return{restrict:"AE",scope:!0,compile:function(b,g){var h=g.translateValues?g.translateValues:void 0,i=g.translateInterpolation?g.translateInterpolation:void 0,j=b[0].outerHTML.match(/translate-value-+/i);return function(b,k,l){if(b.interpolateParams={},l.$observe("translate",function(a){b.translationId=angular.equals(a,"")||!angular.isDefined(a)?c(k.text().replace(/^\s+|\s+$/g,""))(b.$parent):a}),l.$observe("translateDefault",function(a){b.defaultText=a}),h&&l.$observe("translateValues",function(a){a&&b.$parent.$watch(function(){angular.extend(b.interpolateParams,e(a)(b.$parent))})}),j){var m=function(a){l.$observe(a,function(c){b.interpolateParams[angular.lowercase(a.substr(14,1))+a.substr(15)]=c})};for(var n in l)l.hasOwnProperty(n)&&"translateValue"===n.substr(0,14)&&"translateValues"!==n&&m(n)}var o=function(b,c,e){e||"undefined"==typeof c.defaultText||(b=c.defaultText),k.html(b);var f=a.isPostCompilingEnabled(),h="undefined"!=typeof g.translateCompile,i=h&&"false"!==g.translateCompile;(f&&!h||i)&&d(k.contents())(c)},p=function(){return h||j?function(){var c=function(){b.translationId&&b.interpolateParams&&a(b.translationId,b.interpolateParams,i).then(function(a){o(a,b,!0)},function(a){o(a,b,!1)})};b.$watch("interpolateParams",c,!0),b.$watch("translationId",c)}:function(){var c=b.$watch("translationId",function(d){b.translationId&&d&&a(d,{},i).then(function(a){o(a,b,!0),c()},function(a){o(a,b,!1),c()})},!0)}}(),q=f.$on("$translateChangeSuccess",p);p(),b.$on("$destroy",q)}}}}]),angular.module("pascalprecht.translate").directive("translateCloak",["$rootScope","$translate",function(a,b){return{compile:function(c){a.$on("$translateLoadingSuccess",function(){c.removeClass(b.cloakClassName())}),c.addClass(b.cloakClassName())}}}]),angular.module("pascalprecht.translate").filter("translate",["$parse","$translate",function(a,b){return function(c,d,e){return angular.isObject(d)||(d=a(d)()),b.instant(c,d,e)}}]);

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
<<<<<<< HEAD
        restrict: 'A',
        scope: {
            daia: '=daiaSimple',
        },
        templateUrl: function(elem, attrs) {
            return attrs.templateUrl ? 
                   attrs.templateUrl : 'template/daia-simple.html';
        },
        link: function(scope, elem, attrs) {
						scope.$watch('daia',function(){
							var simple = $filter('daiaSimple')(scope.daia);
							
							angular.forEach(
									['status','expected','delay','href','limitation'],
									function(key) { scope[key] = simple[key]; }
							);

							var s = scope.status;
							if (s!='openaccess' && s!='loan' && s!='presentation' && s!= 'expected') {
									scope.status = 'none';
							}
						});
        }
    }
});

=======
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
>>>>>>> 8d332bf7bdb9e4fb743ba6ced02db4a8f695a402
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
<<<<<<< HEAD
  } else if(angular.isArray(input)) {
		// TODO
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

angular.module('ngDAIA').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/daia-availability.html',
    "<ul class=\"availability\" ng-if=\"available || unavailable\"><li ng-if=\"available.length\" ng-repeat=\"a in available\"><span class=\"service-label\" translate=\"{{a.service}}\">{{a.service}}:</span> <span class=\"availability availability-available\" translate=\"available\">available</span> <span class=\"availability availability-limitation\" ng-if=\"a.limitation.length\">({{a.limitation[0].content}})</span></li><li ng-if=\"unavailable.length\" ng-repeat=\"u in unavailable\"><span class=\"service-label\" ng-if=\"u.expected.length\" translate=\"{{u.service}}\">{{u.service}}</span> <span ng-if=\"u.expected.length\" class=\"availability availability-expected\" translate=\"unavailable\">unavailable</span> <span class=\"service-label\" ng-if=\"!u.expected.length\" translate=\"{{u.service}}\">{{u.service}}</span> <span ng-if=\"!u.expected.length\" class=\"availability availability-unavailable\" translate=\"unavailable\"></span></li><div class=\"returning\"><li ng-if=\"unavailable[0].href.length && unavailable[0].expected.length\"><div ng-if=\"unavailable[0].expected.length\" class=\"returning returning-expected\"><span translate=\"EXP\">expected back:</span> {{unavailable[0].expected}}</div><a href=\"{{unavailable[0].href}}\" translate=\"RES\">place reservation</a></li></div></ul><div class=\"access\" ng-if=\"((available[1].service || available[0].service) == 'openaccess' || unavailable[0].service == 'openaccess')\"><span translate=\"ACC\">access via:</span> <a ng-if=\"available[1].service == 'openaccess'\" href=\"{{available[1].href}}\">{{available[0].href}}</a> <a ng-if=\"unavailable[0].service == 'openaccess'\" href=\"{{unavailable[0].href}}\">{{available[0].href}}</a></div>"
  );


  $templateCache.put('template/daia-item.html',
    "<div ng-if=\"item.department\"><span class=\"daia-label\" translate=\"DEP\">Department:</span> <a ng-if=\"item.department.href\" href=\"{{item.department.href}}\">{{item.department.content}}</a><span ng-if=\"!item.department.href\">{{item.department.content}}</span></div><div><span class=\"daia-label\" translate=\"SGN\">Shelf mark:</span> {{item.label}}</div><span ng-if=\"!item.available && !item.unavailable\" class=\"daia-label\" translate=\"AVB\">Availability:</span><span ng-if=\"!item.available && !item.unavailable\" translate=\"unknown\">unknown</span><div daia-availability=\"item\"></div>"
  );


  $templateCache.put('template/daia-response.html',
    "<h3>Document availability</h3><div class=\"daia-result\"><div ng-if=\"daia.institution.content.length\"><span class=\"daia-label\" translate=\"INST\">Queried institution:</span> <a ng-if=\"daia.institution.href.length\" href=\"{{daia.institution.href}}\">{{daia.institution.content}}</a></div><div ng-if=\"daia.document[0].href.length\"><a translate=\"CAT\" href=\"{{daia.document[0].href}}\">Catalogue entry</a></div><div><span ng-if=\"!daia.document.length\" translate=\"NR\">no records found</span></div><div ng-if=\"daia.document.length\" daia-documents=\"daia.document\"><div class=\"daia-document\" ng-repeat=\"i in daia.document[0].item\"><div daia-item=\"i\"></div></div></div></div>"
  );


  $templateCache.put('template/daia-simple.html',
    "<span class=\"daia-label\">current status:</span> <span ng-if=\"status == 'openaccess'\" class=\"availability availability-available\">{{status}}</span> <span ng-if=\"status == 'loan'\" class=\"availability availability-available\">{{status}}</span> <span ng-if=\"status == 'presentation'\" class=\"availability availability-presentation\">{{status}}</span> <span ng-if=\"status != 'openaccess' && status != 'loan' && status != 'presentation'\" class=\"availability availability-unavailable\">{{status}}</span> <span ng-if=\"expected\" class=\"availability availability-unavailable\">until {{expected}}</span>"
  );

}]);
=======
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
    $templateCache.put('template/daia-availability.html', '<ul class="availability" ng-if="available || unavailable"><li ng-if="available.length" ng-repeat="a in available"><span class="service-label">{{a.service | translate}}:</span> <span class="availability availability-available" translate="available"></span> <span class="availability availability-limitation" ng-if="a.limitation.length">({{a.limitation[0].content}})</span></li><li ng-if="unavailable.length" ng-repeat="u in unavailable"><span class="service-label" ng-if="u.expected.length">{{u.service | translate}}:</span> <span ng-if="u.expected.length" class="availability availability-expected" translate="unavailable"></span> <span class="service-label" ng-if="!u.expected.length">{{u.service | translate}}:</span> <span ng-if="!u.expected.length" class="availability availability-unavailable" translate="unavailable"></span></li><div class="returning"><li ng-if="unavailable[0].href.length && unavailable[0].expected.length"><div ng-if="unavailable[0].expected.length" class="returning returning-expected"><span translate="">EXP</span>: {{unavailable[0].expected}}</div><a href="{{unavailable[0].href}}" translate="RES">place reservation</a></li></div></ul><div class="access" ng-if="((available[1].service || available[0].service) == \'openaccess\' || unavailable[0].service == \'openaccess\')">access via: <a ng-if="available[1].service == \'openaccess\'" href="{{available[1].href}}">{{available[0].href}}</a> <a ng-if="unavailable[0].service == \'openaccess\'" href="{{unavailable[0].href}}">{{available[0].href}}</a></div>');
    $templateCache.put('template/daia-item.html', '<div ng-if="item.department"><span class="daia-label" translate="DEP">Department:</span> <a ng-if="item.department.href" href="{{item.department.href}}">{{item.department.content}}</a><span ng-if="!item.department.href">{{item.department.content}}</span></div><div><span class="daia-label" translate="SGN">Shelf mark:</span> {{item.label}}</div><span ng-if="!item.available && !item.unavailable" class="daia-label" translate="AVB">Availability:</span><span ng-if="!item.available && !item.unavailable">{{unknown | translate}}</span><div daia-availability="item"></div>');
    $templateCache.put('template/daia-response.html', '<h3>Document availability</h3><div class="daia-result"><div ng-if="daia.institution.content.length"><span class="daia-label" translate="INST">Queried institution:</span> <a ng-if="daia.institution.href.length" href="{{daia.institution.href}}">{{daia.institution.content}}</a></div><div ng-if="daia.document[0].href.length"><span class="daia-label" translate="CAT">Catalogue entry:</span> <a href="{{daia.document[0].href}}">Link</a></div><div><span ng-if="!daia.document.length" translate="NR">no records found</span></div><div ng-if="daia.document.length" daia-documents="daia.document"><div class="daia-document" ng-repeat="i in daia.document[0].item"><div daia-item="i"></div></div></div></div>');
    $templateCache.put('template/daia-simple.html', '<span class="daia-label">current status:</span> <span ng-if="status == \'openaccess\'" class="availability availability-available">{{status}}</span> <span ng-if="status == \'loan\'" class="availability availability-available">{{status}}</span> <span ng-if="status == \'presentation\'" class="availability availability-presentation">{{status}}</span> <span ng-if="status != \'openaccess\' && status != \'loan\' && status != \'presentation\'" class="availability availability-unavailable">{{status}}</span> <span ng-if="expected" class="availability availability-unavailable">until {{expected}}</span>');
  }
]);
>>>>>>> 8d332bf7bdb9e4fb743ba6ced02db4a8f695a402
