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
    $translate.onReady(function() {
        $scope.selectedLanguage = $translate.use()
    });
    // see https://github.com/angular-translate/angular-translate/issues/566
    $scope.availableLanguages = ['en','de'];
    $scope.$watch('selectedLanguage', function(value) {
        $translate.use(value);
    });


    $scope.myAPI = "//daia.gbv.de/";
    $scope.myID = "opac-de-ma9:ppn:685460711";

    // TODO: move into service
    function query() {
        $http.jsonp( $scope.myAPI, {
            params: { id: $scope.myID, format:'json', callback:'JSON_CALLBACK' } }
        ).success(function(response) {
            $scope.daiaResponse = response;
        });
    }

    function triggerQuery(newValue, oldValue) {
        if (newValue != oldValue) {
            query();
        }
    }
    $scope.$watch("myID",triggerQuery);
    $scope.$watch("myAPI",triggerQuery);

    query();
}]);
