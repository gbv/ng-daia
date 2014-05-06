var app = angular.module('myApp', ['ngDAIA', 'pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        INSTITUTION: 'institution:',
        DOCUMENT: 'document:',
        CATALOG_ENTRY: 'catalog entry',
        DEPARTMENT: 'department:',
        SIGNATURE: 'shelf mark:',
        NO_RECORDS: 'no records found',
        AVAILABILITY: 'availability: ',
        unknown: 'unknown',
        available: 'available',
        unavailable: 'unavailable',
        presentation: 'presentation',
        loan: 'loan',
        interloan: 'interloan',
        none: 'not available',
        expected: 'expected',
        openaccess: 'open access',
        EXPECTED_BACK: ' expected back:',
        RESERVATION: 'place reservation',
        ACCESS: 'access via:',
        STATUS: 'current status',
        BUTTON_LANG_DE: 'German',
        BUTTON_LANG_EN: 'English',
    });
    $translateProvider.translations('de', {
        INSTITUTION: 'Institution:',
        DOCUMENT: 'Dokument:',
        CATALOG_ENTRY: 'Katalogeintrag',
        DEPARTMENT: 'Abteilung:',
        SIGNATURE: 'Signatur:',
        NO_RECORDS: 'Keine Treffer',
        AVAILABILITY: 'Verfügbarkeit: ',
        unknown: 'unbekannt',
        available: 'verfügbar',
        unavailable: 'nicht verfügbar',
        presentation: 'Vor Ort',
        loan: 'Ausleihe',
        interloan: 'Fernleihe',
        none: 'nicht verfügbar',
        expected: 'erwartet',
        openaccess: 'Open Access',
        EXPECTED_BACK: ' Ausgeliehen bis:',
        RESERVATION: 'Vormerken',
        ACCESS: 'Volltext:',
        STATUS: 'Aktueller Status',
        BUTTON_LANG_DE: 'Deutsch',
        BUTTON_LANG_EN: 'Englisch',
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
}]);
app.controller('myController', ['$translate', '$scope', function ($translate, $scope) {
 
    $scope.myAPI = "http://daia.gbv.de/";
    $scope.myID = "opac-de-ma9:ppn:0685460711";
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}]);

