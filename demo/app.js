angular.module('myApp', ['ngDAIA', 'pascalprecht.translate'])
.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '../src/translations/lang-',
        suffix: '.json'
    });
    $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
        'en_US':'en','en_UK':'en','de_DE':'de','de_AT':'de','de_CH':'de'
    });
    $translateProvider.fallbackLanguage('en');
    $translateProvider.determinePreferredLanguage();
}])
.controller('myController', ['$translate', '$scope', '$http', 'ngDAIA.version',
  function ($translate, $scope, $http, version) {
    $scope.version = version;

    $scope.myAPI = "//daia.gbv.de/";
    $scope.myID = "opac-de-ma9:ppn:685460711";
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };

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
