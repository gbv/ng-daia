'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        foo: 123,
        pkg: require('./package.json'),
        version: {
            moduleVersion: {
                options: {
                    prefix: "\\('version',\\s*'"
                },
                src: ['src/ng-daia.js']
            },
            ngdocVersion: {
                options: { prefix: 'version ' },
                src: ['src/api.ngdoc']
            }
        },
        ngdocs: {
            options: {
                html5Mode: false,
                startPage: '/api',
                navTemplate: 'src/docsnav.html',
                scripts: [
                    'angular.js',
                    'ng-daia.js',
                ]
            },
            api: {
                title: 'API documentation',
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
        },
        shell: {
            site: {
                command: "rm -rf site && mkdir site && cp -r docs/* site"
            }
        }
    });

    grunt.registerTask('default',['docs']); // TODO: test
    grunt.registerTask('site', ['docs','shell:site']);
    grunt.registerTask('ng-daia',['version','ngtemplates','concat']);
    grunt.registerTask('docs',['clean','ng-daia','ngdocs']);
    grunt.registerTask('test',['karma:unit']);
    grunt.registerTask('watch',['karma:watch']);
};
