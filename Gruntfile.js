'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.initConfig({
        pkg: require('./package.json'),
        ngdocs: {
            options: {
                html5Mode: false,
                startPage: '/api',
                scripts: [
                    'angular.js',
                    'ng-daia.js',
                ]
            },
            api: {
                title: 'Documentation',
                src: [
                    'src/*.js',
                    'src/**/*.js',
                    'src/*.ngdoc',
                ],
            },
        },
        connect: {
            options: {
                keepalive: true
            },
            server: {}
        },
        clean: ['docs'],
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                keepalive: true,
                singleRun: true,
                autoWatch: false,
            },
            watch: {
                configFile: 'karma.conf.js',
                keepalive: true,
                singleRun: false,
                autoWatch: true,
            }
        },
        concat: {
            dist: {
                src: ['src/*.js','src/**/*.js','ng-daia-templates.js'],
                dest: 'ng-daia.js',
            },
        },
        ngtemplates: {
            app: {
                cwd:  'src/templates',
                src: '**.html', 
                dest: 'ng-daia-templates.js',
            },
            options: {
                module: 'ngDAIA',
                prefix: 'template/',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true, 
                    removeComments: true
                } 
            }
        }
    });

    grunt.registerTask('default',['docs']); // TODO: test
    grunt.registerTask('ng-daia',['ngtemplates','concat']);
    grunt.registerTask('docs',['clean','ng-daia','ngdocs']);
    grunt.registerTask('test',['karma:unit']);
    grunt.registerTask('watch',['karma:watch']);
};
