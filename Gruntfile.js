'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-template');

    grunt.initConfig({
        pkg: require('./package.json'),
        version: {
            moduleVersion: {
                options: {
                    prefix: "\\('version',\\s*'"
                },
                src: ['src/ng-daia.js']
            },
        },
        template: {
            index: {
                options: {
                     data: function() { 
                        return grunt.config.get('pkg'); 
                    }
                },
                files: {
                    'src/index.ngdoc': ['src/index.ngdoc.tpl']
                }
            }
        },
        ngdocs: {
            options: {
                html5Mode: false,
                titleLink: '#/api',
                startPage: '/api',
                navTemplate: 'src/docs-nav.html',
                scripts: [
                    'angular.js',
                    'ng-daia.min.js',
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
        ngmin: {
            angular: {
                src: ['ng-daia.js'],
                dest: 'ng-daia.js',
            }
        },
        uglify : {
            options: {
                report: 'min',
                mangle: false
            },
            my_target : {
                files : {
                    'ng-daia.min.js' : ['ng-daia.js']
                }
            }
        },
        shell: {
            maps: {
                command: "cp -f lib/1.2.7/*.map docs/js"
            },
            demo: {
                // TODO: use ng-daia.min.js instead of partials in demo
                command: "rm -rf docs/demo && cp -r demo docs"
            },
            site: {
                command: "rm -rf site && mkdir site && cp -r docs/* site"
            },
            working_copy_must_be_clean: {
                command: "if git status --porcelain 2>/dev/null | grep -q .; then exit 1; fi",
                options: { failOnError: true } 
            },
            push_site: {
                command: "git push origin gh-pages",
                options: { failOnError: true } 
            },
            gh_pages: {
                command: [
                    'git checkout gh-pages',
                    'git pull origin gh-pages',
                    'cp -rf site/* .',
                    'rm -rf site',
                    'git add .',
                    'git commit -m "updated site"',
                    'git checkout master'
                ].join('&&'),
                options: { 
                    stdout: true,
                    stderr: true,
                    failOnError: true
                } 
            }
        }
    });

    grunt.registerTask('default',['docs']);
    grunt.registerTask('ng-daia',['version','ngtemplates','concat','ngmin','uglify']);
    grunt.registerTask('docs',['clean','ng-daia','template','ngdocs','shell:maps','shell:demo']);
    // TODO: test before release
    grunt.registerTask('gh-pages', ['shell:working_copy_must_be_clean','site','shell:gh_pages']);
    grunt.registerTask('push-site', ['gh-pages','shell:push_site']);
    grunt.registerTask('site', ['docs','shell:site']);
    grunt.registerTask('test',['karma:unit']);
    grunt.registerTask('watch',['karma:watch']);
};
