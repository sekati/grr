'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: '.'
  };

  grunt.initConfig({

    config: config,

    watch: {
        js: {
            files: ['<%= config.app %>/js/{,*/}*.js'],
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
                '<%= config.app %>/{,*/}*.html',
                '<%= config.app %>/css/{,*/}*.css',
                '<%= config.app %>/img/{,*/}*'
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
      all: [
        'Gruntfile.js',
        '<%= config.app %>/js/{,*/}*.js'
      ]
    }
  });

  grunt.registerTask('default', [
      'connect:livereload',
      'watch'
  ]);
};
