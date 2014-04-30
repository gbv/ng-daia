module.exports = function(config) {
    config.set({
        files: [
            'lib/angular.min.js',
            'lib/angular-*.js',
            'src/*.js',
            'src/**/*.js',
            'test/**/*.js',
        ],
        exclude: [
        ],

        frameworks: ['jasmine'],

        browsers: ['Firefox'],

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher'
        ],

        // continuous integration mode
        autoWatch: true,
        singleRun: false,
    });
};
