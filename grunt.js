/*
 * grunt-contrib-less
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-less/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },
    nodeunit: {
      tasks: ['test/*_test.js']
    },

    clean: {
      test: ["tmp"]
    },

    // Configuration to be run (and then tested).
    less: {
      compile: {
        files: {
          'tmp/less_a.css': ['test/fixtures/style.less'],
          'tmp/less_b.css': ['test/fixtures/style.less'],
          'tmp/less_c.css': ['test/fixtures/**/*.nomatches'],
          'tmp/less_d.css': ['test/fixtures/style.less', 'test/fixtures/style2.less']
        },
        options: {
          paths: ['test/fixtures/include']
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");

  // Whenever "test" is run, perform test setup, run task in as many ways
  // as necessary, then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean less nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');

  // Actually load tasks to be tested.
  grunt.loadTasks('tasks');

};
