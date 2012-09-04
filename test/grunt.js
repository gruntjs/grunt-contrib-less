module.exports = function(grunt) {
  "use strict";

  grunt.file.mkdir("tmp/wahtever");

  grunt.initConfig({

    clean: {
      tmp: ["tmp"]
    },

    less: {
      compile: {
        files: {
          "tmp/less_a.css": ["fixtures/style.less"],
          "tmp/less_b.css": ["fixtures/style.less"],
          "tmp/less_c.css": ["fixtures/**/*.nomatches"],
          "tmp/less_d.css": ["fixtures/style.less", "fixtures/style2.less"]
        },
        options: {
          paths: ["fixtures/include"]
        }
      }
    },

    test: {
      tasks: ["*_test.js"]
    }

  });

  grunt.loadTasks("../tasks");
  grunt.registerTask("default", "clean less test clean");
};
