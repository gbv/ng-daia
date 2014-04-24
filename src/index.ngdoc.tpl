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

## Getting started

The current release of ng-daia (<%= version %>) can be [downloaded from this
page](grunt-scripts/ng-daia.js). 

The module is in a very early stage of
development. To get started have a look at the documentation of the AngularJS
directives provided by {@link ng-daia module ng-daia}.  

The following minmal example might help to include ng-daia into your website:

<pre>
<html ng-app="myApp">
<head>
  <script src="angular.min.js"></script>
  <script src="ng-daia.js"></script>
  <script>angular.module('myApp', ['ngDAIA']);</script>
  <link href="ng-daia.css" rel="stylesheet" />
</head>
<body>
  <div daia-api="http://your-daia-base-url" daia-id="your-document-id">
  </div>
</body>
</html>
</pre>
 
The default template files, included in `ng-daia.js`, can be styled with CSS classes.
Try [`ng-daia.css`](https://github.com/gbv/ng-daia/raw/master/demo/ng-daia.css) for a
default layout.

The templates are using the following classes:

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

The [demo directory](https://github.com/gbv/ng-daia/tree/master/demo) of the
source code repository contains a more detailed sample application that makes
use of ng-daia as well as [angular-translate](http://angular-translate.github.io/docs/#/guide/02_getting-started). The demo should be run from a server (e.g. localhost).

## Author and Contributors

* <%= author %>
* <%= contributor %>

## License

Code licensed under the [AGPL](http://www.gnu.org/licenses/agpl-3.0.html).
Documentation licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)

