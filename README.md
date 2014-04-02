**ng-daia** is an [AngularJS](http://angularjs.org/) module to facilitate access to DAIA services.

[![Build Status](https://travis-ci.org/gbv/ng-daia.png?branch=master)](https://travis-ci.org/gbv/ng-daia)

# Requirements

Require AngularJS >= 1.2.

# Development

First, install Node.js unless it is already installed. Node.js includes `npm`
to install additional packages. For global installation one might require to
call npm via `sudo -H`.

Second, locally install Grunt and all npm modules listed in `package.json`:

    npm install grunt 
    npm install

## Running unit tests

First install Karma using npm:

    npm install -g karma

Testing is configured in `karma.conf.js` and all tests are located in the
`test` directory. Unit tests are written with
[Jasmine](http://pivotal.github.io/jasmine/).

To execute of all unit tests call:

    grunt test

For contious testing (tests are re-run on changes), call:

    grunt watch

As configured in `.travis.yml` the tests are automatically 
[executed at travis-ci](https://travis-ci.org/gbv/ng-skos)
when pushed to GitHub.

## Documentation

Documentation is written using
[ngdoc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)
with module [grunt-ngdocs].

[grunt-ngdocs]: https://www.npmjs.org/package/grunt-ngdoc

Just call

    grunt docs

