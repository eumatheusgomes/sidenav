module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    watch: {
      html: {
        files: ['example/**/*.html'],
        options: {livereload: true}
      },
      scss: {
        files: ['src/**/*.scss'],
        tasks: ['sass'],
        options: {livereload: true}
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit', 'concat'],
        options: {livereload: true}
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    clean: {
      files: ['dist/']
    },
    sass: {
      main: {
        files: {'dist/sidenav.css': 'src/scss/main.scss'}
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/sidenav.min.css': ['dist/sidenav.css']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    concat: {
      options: {separator: ';'},
      main: {
        src: ['src/**/*.js'],
        dest: 'dist/sidenav.js'
      }
    },
    uglify: {
      main: {
        files: {'dist/sidenav.min.js': ['<%= concat.main.dest %>']}
      }
    },
  });

  grunt.registerTask('default', [
    'clean',
    'sass',
    'cssmin',
    'jshint',
    'qunit',
    'concat',
    'uglify',
  ]);
};
