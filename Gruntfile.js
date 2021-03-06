'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-git-is-clean');

    grunt.initConfig({
        pkg: require('./package.json'),
        ngdocs: {
            options: {
                html5Mode: false,
                titleLink: '#/api',
                navTemplate: 'src/docs-nav.html',
                scripts: [ 
                    'angular.js',
                    'ng-daia.min.js',
                ]
            },
            api: {
                title: 'Documentation',
                src: [
                    'src/*.js',
                    'src/**/*.js',
                    '*.ngdoc',
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
        ngtemplates: {
            app: {
                cwd:  'src/templates',
                src: '**.html', 
                dest: 'templates.js',
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
        concat: {
            dist: {
                src: [
                    'src/*.js','src/**/*.js',
                    'templates.js'
                ],
                dest: 'ng-daia.js',
            },
        },
        ngAnnotate: {
            angular: {
                files: {
                    'ng-daia.js': ['ng-daia.js']
                }
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
        // update/bump version number in package and source files
        version: {
            bump: {
                src: ['package.json', 'bower.json'],
            },
            module: {
                options: { 
                    prefix: "\\('ngDAIA.version',\\s*'" 
                },
                src: ['src/ng-daia.js'],
            },
        },
        // release to npmjs and GitHub
        release: {
            options: {
                bump: false,
                commit: false
            }
        },
        shell: {
            prepare_ngdocs: {
                command: [
                    'cp src/index.ngdoc.tpl index.ngdoc',
                    'cat README.md >> index.ngdoc',
                    'cp CONTRIBUTING.md contributing.ngdoc'
                ].join('&&')
            },
            demo: {
                command: [
                    "rm -rf docs/demo",
                    "cp -r demo docs",
                    "find docs/demo -type l -exec rm '{}' ';'",
                    "mkdir -p docs/grunt-scripts",
                    "cp ng-daia.js docs/grunt-scripts/",
                    "cp node_modules/angular-translate/dist/angular-translate.min.js docs/grunt-scripts",
                    "cp node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js docs/grunt-scripts",
                    "cp ng-daia.css docs",
                    "perl -pi -e 's|<script src=\"\\.\\./src.+|<script src=\"../grunt-scripts/ng-daia.js\"></script>|' docs/demo/*.html",
                    "perl -pi -e 's|<script src=\"\\.\\./node_modules/angular-translate/dist/([a-z-]+/)?|<script src=\"../grunt-scripts/|' docs/demo/*.html",
                    "mkdir -p docs/src",
                    "cp -r src/translations docs/src"
                ].join('&&')
            },
            gh_pages: {
                command: [
                    'rm -rf site && mkdir site && cp -r docs/* site',
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
            },
            push_gh_pages: {
                command: "git push origin gh-pages",
                options: { failOnError: true } 
            }
        }
    });

    grunt.registerTask('default',['docs']);

    grunt.registerTask('build',['version','ngtemplates','concat','ngAnnotate','uglify']);
    grunt.registerTask('test',['karma:unit']);
    grunt.registerTask('publish',['build','git-is-clean','test','release','homepage']);

    grunt.registerTask('docs',['clean','build','shell:prepare_ngdocs','ngdocs','shell:demo']);

    grunt.registerTask('gh-pages', ['test','git-is-clean','shell:gh_pages']);
    grunt.registerTask('homepage', ['gh-pages','git-is-clean','shell:push_gh_pages']);

    grunt.registerTask('site', ['docs','shell:site']);
};
