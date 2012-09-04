module.exports = function(grunt) {
  "use strict";

  grunt.file.mkdir("tmp");

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

    clean: {
      tmp: ["tmp"]
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

    test: {
      tasks: ["test/*_test.js"]
    }

  });

  grunt.registerTask("default", "lint");
  //grunt.renameTask("test", "test2");
  //grunt.registerTask("test", "clean less test2 clean");
  grunt.loadTasks("tasks");
};

