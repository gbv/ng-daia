var app = angular.module('myApp', ['ngDAIA', 'pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '../src/translations/lang-',
        suffix: '.json'
    });
    $translateProvider.registerAvailableLanguageKeys(['en', 'de'], {
    'en_US':'en','en_UK':'en','de_DE':'de','de_AT':'de','de_CH':'de',
    })
    $translateProvider.fallbackLanguage('en');
    $translateProvider.determinePreferredLanguage();
}]);

app.controller('myController', ['$translate', '$scope', function ($translate, $scope) {
    $scope.myAPI = "//daia.gbv.de/";
    $scope.myID = "opac-de-ma9:ppn:685460711";
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}]);

