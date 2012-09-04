module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({

    lint: {
      all: ["grunt.js", "tasks/*.js"]
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

    less: {
      compile: {
        files: {
          "tmp/less_a.css": ["test/fixtures/style.less"],
          "tmp/less_b.css": ["test/fixtures/style.less"],
          "tmp/less_c.css": ["test/fixtures/**/*.nomatches"],
          "tmp/less_d.css": ["test/fixtures/style.less", "test/fixtures/style2.less"]
        },
        options: {
          paths: ["test/fixtures/include"]
        }
      }
    },

    nodeunit: {
      tasks: ["test/*_test.js"]
    }

  });

  grunt.registerTask("testprep", "prepare for tests", function() {
    require("rimraf").sync("tmp");
    grunt.file.mkdir("tmp");
  });

  grunt.registerTask("default", "lint");
  grunt.renameTask("test", "nodeunit");
  grunt.registerTask("test", "testprep less nodeunit");
  grunt.loadTasks("tasks");
};

