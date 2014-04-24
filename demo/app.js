var app = angular.module('myApp', ['ngDAIA', 'pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        INST: 'Queried institution:',
        CAT: 'Catalogue entry:',
        DEP: 'Department:',
        SGN: 'Shelf mark:',
        NR: 'no records found',
        AVB: 'Availability',
        unknown: 'unknown',
        available: 'available',
        unavailable: 'unavailable',
        presentation: 'presentation',
        loan: 'loan',
        interloan: 'interloan',
        expected: 'expected',
        EXP: 'expected back',
        RES: 'place reservation',
        STATUS: 'Current status',
        BUTTON_LANG_DE: 'German',
        BUTTON_LANG_EN: 'English',
    });
    $translateProvider.translations('de', {
        INST: 'Institution:',
        CAT: 'Katalogeintrag:',
        DEP: 'Abteilung:',
        SGN: 'Signatur:',
        NR: 'Keine Treffer',
        AVB: 'Verfügbarkeit',
        unknown: 'unbekannt',
        available: 'verfügbar',
        unavailable: 'nicht verfügbar',
        presentation: 'Vor Ort',
        loan: 'Ausleihe',
        interloan: 'Fernleihe',
        expected: 'erwartet',
        EXP: 'Ausgeliehen bis',
        RES: 'Vorkmerken',
        STATUS: 'Aktueller Status',
        BUTTON_LANG_DE: 'Deutsch',
        BUTTON_LANG_EN: 'Englisch',
    });
    $translateProvider.preferredLanguage('de');
}]);
app.controller('myController', ['$translate', '$scope', function ($translate, $scope) {
 
    $scope.myAPI = "http://daia.gbv.de/";
    $scope.myID = "opac-de-ma9:ppn:0685460711";
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };
}]);

