angular.module('myApp', ['ngDAIA', 'pascalprecht.translate'])

.config(['$translateProvider', function ($translateProvider) {
    
    // load translations
    $translateProvider.useStaticFilesLoader({
        files: [{   // ng-daia
            prefix: '../src/translations/lang-',
            suffix: '.json'
        },{         // this demo
            prefix: 'translations/',
            suffix: '.json'
        }]
    })

    // choose a language based on browser settings
    .registerAvailableLanguageKeys(['en', 'de'], { 'en_*': 'en', 'de_*': 'de' })
    .fallbackLanguage('en')
    .determinePreferredLanguage();

}])

.controller('myController', ['$translate', '$scope', '$http', 'ngDAIA.version',
  function ($translate, $scope, $http, version) {
    $scope.version = version;

    // get and watch current language
    // see https://github.com/angular-translate/angular-translate/issues/566
    $scope.availableLanguages = ['en','de'];
    $scope.selectedLanguage = 'en';
    $translate.onReady(function() {
        $scope.selectedLanguage = $translate.use()
    });
    $scope.$watch('selectedLanguage', function(value) {
        $translate.use(value);
    });

    $scope.myAPI = "//daia.gbv.de/";
    $scope.myID = "opac-de-ma9:ppn:685460711";
    $scope.cors = false;

    // TODO: move this into daia query service
    // TODO: add patron and Authorization
    function query() {
        var daiaQuery;
        if ($scope.cors) {
            daiaQuery = $http({
                url: $scope.myAPI,
                method: 'GET',
                params: { id: $scope.myID, format: 'json' },
                headers: {
                    'Accept-Language': $translate.use(),
                    // 'Authorization': access_token
                }
            });
        } else {
            // TODO: headers?
            daiaQuery = $http.jsonp( $scope.myAPI, {
                params: { id: $scope.myID, format: 'json', callback: 'JSON_CALLBACK' } }
            )
        }
        daiaQuery.success(function(response) {
            $scope.daiaResponse = response;
        }).error(function () {
            $scope.daiaResponse = {};
        });
    }

    function triggerQuery(newValue, oldValue) {
        if (newValue != oldValue) {
            $scope.daiaResponse = {};
            query();
        }
    }
    $scope.$watch("myID",triggerQuery);
    $scope.$watch("myAPI",triggerQuery);
    $scope.$watch("cors",triggerQuery);

    query();
}]);
