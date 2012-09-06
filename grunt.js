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

  // This needs to be run before our task + tests are run.
  grunt.registerTask("test_setup", "prepare for tests", function() {
    require("rimraf").sync("tmp");
    grunt.file.mkdir("tmp");
  });

  // Whenever "test" is run, perform test setup, run task in as many ways
  // as necessary, then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'test_setup less nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');

  // Actually load tasks to be tested.
  grunt.loadTasks('tasks');

};
