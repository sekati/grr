'use strict'; // jshint ignore:line

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: '.',
    jsFiles: [
      '<%= config.app %>/**/*.js',
      '!<%= config.app %>/**/node_modules/**'
    ]
  };

  grunt.initConfig({

    config: config,

    watch: {
        js: {
            files: config.jsFiles,
            tasks: ['jshint'],
            options: {
                livereload: true
            }
        },
        gruntfile: {
            files: ['Gruntfile.js']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '<%= config.app %>/{,*/}*.*'
            ]
        }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
              '<%= config.app %>'
          ],
          middleware: function(connect) {
            return [
              connect.static(config.app)
            ];
          }
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: config.jsFiles
    }
  });

  grunt.registerTask('default', [
      'jshint',
      'connect:livereload',
      'watch'
  ]);
};
