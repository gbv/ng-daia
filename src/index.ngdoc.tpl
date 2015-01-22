@ngdoc overview
@name Documentation 
@id index
@description

# <%= name %>

> <%= description %>

**ng-daia** is an {@link http://angularjs.org/ AngularJS} module to
facilitate access to {@link http://purl.org/NET/DAIA Document Availability
Information API} (DAIA) services and to display the responses given by a DAIA
server.

The latest release of <%= name %> is version <%= version %>. Source code and issue tracker
can be found at <<%= repository.url.replace(/^git:/,'https:').replace(/.git$/,'') %>>.

## Download

The current release of ng-daia is version <%= version %>:

* [ng-daia.min.js](grunt-scripts/ng-daia.min.js): minified version for production
* [ng-daia.js](grunt-scripts/ng-daia.js): original source code for development
* [ng-daia.css](https://github.com/gbv/ng-daia/raw/master/src/ng-daia.css):
  stylesheet for the default templates, including DAIA icons 
  (based on <a href="https://picol.org/">PICOL</a>)

Install from [npmjs](https://www.npmjs.com):

    npm install ng-daia --safe

## Getting started

The [demo](demo) illustrates display of availability information with
directives and filters provided by {@link ng-daia module ng-daia}. Please have
a look at the documentation of each directive/filter.

The following minimal example might help to include ng-daia into your website:

<pre>
<html ng-app="myApp">
<head>
  <script src="angular.min.js"></script>
  <script src="ng-daia.min.js"></script>
  <script>angular.module('myApp', ['ngDAIA']);</script>
  <link href="ng-daia.css" rel="stylesheet" />
</head>
<body>
  <div daia-api="http://your-daia-base-url" daia-id="your-document-id">
  </div>
</body>
</html>
</pre>

## Customization

The default templates, included in `ng-daia.js`, can be styled with CSS,
translated with angular-translate, and replaced with the `template-url`
parameter:

* [template/daia-response.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-response.html)
* [template/daia-availability.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-availability.html)
* [template/daia-item.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-item.html)
* [template/daia-simple.html](https://github.com/gbv/ng-daia/blob/master/src/templates/daia-simple.html)
  
The following CSS classes are used:

* `daia-response`: the whole response
* `daia-result`: the whole result
* `daia-document`: each copy of the result 
* `daia-label`: style of descriptions
* `availability`: overall style for display of availability
* `service-label`: style for availability labels
* `availability-available`: style for display of available services
* `availability-unavailable`: style for display of unavailable services
* `availability-expected`: style for display of unavailable services with expected availability
* `availability-limitation`: style for limitations (in brackets after the corresponding availability status)
* `returning`: overall style for message concerning 'expected' date and link for preordering
* `returning-expected`: style for message concerning 'expected' date
* `access`: style for display of possible access-link
* `simple-openaccess`: style for simple availability "openaccess"
* `simple-loan`: style for simple availability "loan"
* `simple-presentation`: style for simple availability "presentation"

The default templates are fully prepared for internationalization (i18n) with
[angular-translate](http://angular-translate.github.io/docs/#/guide/02_getting-started).
To use the translations module, first include the following in your html:

<pre>
<script src="../lib/angular-translate.min.js"></script>
</pre>

There are several ways to manage translations with angular-translate. You might want to add them directly into your `myApp` module, or the translations can be put into their own json files and retrieved by your app, which will require an additional package:

<pre>
<script src="../lib/angular-translate-loader-static-files.min.js"></script>
</pre>

You then have to extend the app module to enable loading the translations (the filenames would in this case have the format "lang-en.json", etc.):

<pre>
angular.module('myApp', ['ngDAIA', 'pascalprecht.translate']).config(['$translateProvider', function ($translateProvider) {
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
</pre>

As well as exporting the translation tables, this example shows the support for automatic language-detection. The default templates are using the following translation terms:

### daia-response terms

* `unknown`
* `available`
* `unavailable`
* `presentation`
* `loan`
* `interloan`
* `none`
* `expected`
* `openaccess`

### labels and other text

* `INSTITUTION` : reference label to holding institution
* `DOCUMENT` : reference label for searched document
* `CATALOG_ENTRY` : reference label for document link
* `DEPARTMENT` : label for specific part of the institution
* `SIGNATURE` : label for alternative id (like shelf mark for physical medium)
* `NO_RECORDS`: message shown when no items can be displayed
* `AVAILABILITY` : label used before `unknown` if no items can be displayed
* `EXPECTED_BACK` : message 
* `RESERVATION` : displayed link text for reservation link
* `ACCESS` : label displayed if a direct document link exists
* `STATUS` : label text for `daia-simple` output

## Demo

The [demo](demo) (see [demo
directory](https://github.com/gbv/ng-daia/tree/master/demo) of source code
repository) contains a more detailed sample application that makes use of
`ng-daia` as well as angular-translate. The demo should be run from a server
(e.g. localhost).

## Feedback

Please report feature requests and bug reports at
<https://github.com/gbv/ng-daia/issues> or contribute to the source code. The
file `README.md` contains a guidline for gettings started. Likes and stars at
<https://github.com/gbv/ng-daia> and <http://ngmodules.org/modules/ng-daia> are
also welcome!

## Author and Contributors

* <%= author %>
* <%= contributor %>

## License

Code licensed under the [AGPL](http://www.gnu.org/licenses/agpl-3.0.html).
Documentation licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)

