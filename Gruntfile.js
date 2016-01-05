/*
 * grunt-contrib-less
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    less: {
      compile: {
        options: {
          paths: ['test/fixtures/include']
        },
        files: {
          'tmp/string.css': 'test/fixtures/style.less',
          'tmp/less.css': ['test/fixtures/style.less'],
          'tmp/concat.css': ['test/fixtures/style.less', 'test/fixtures/style2.less', 'test/fixtures/style3.less']
        }
      },
      compress: {
        options: {
          paths: ['test/fixtures/include'],
          compress: true
        },
        files: {
          'tmp/compress.css': ['test/fixtures/style.less']
        }
      },
      nopaths: {
        files: {
          'tmp/nopaths.css': ['test/fixtures/nopaths.less']
        }
      },
      banner: {
        options: {
          banner: '/* banner */\n'
        },
        files: {
          'tmp/banner.css': 'test/fixtures/style3.less',
          'tmp/banner2.css': 'test/fixtures/style4.less'
        }
      },
      pathsFunction: {
        options: {
          paths: function(srcFile) {
            var path = require('path');
            return [path.dirname(srcFile) + '/include'];
          }
        },
        files: {
          'tmp/pathsFunction.css': ['test/fixtures/pathsFunction.less']
        }
      },
      plugins: {
        options: {
          paths: ['test/fixtures/include'],
          plugins: [new (require('less-plugin-clean-css'))({keepSpecialComments: 0})]
        },
        files: {
          'tmp/plugins.css': ['test/fixtures/plugins.less']
        }
      },
      ieCompatTrue: {
        options: {
          paths: ['test/fixtures/include'],
          ieCompat: true
        },
        files: {
          'tmp/ieCompatTrue.css': ['test/fixtures/ieCompat.less']
        }
      },
      ieCompatFalse: {
        options: {
          paths: ['test/fixtures/include'],
          ieCompat: false
        },
        files: {
          'tmp/ieCompatFalse.css': ['test/fixtures/ieCompat.less']
        }
      },
      nofiles: {
      },
      nomatchedfiles: {
        files: {
          'tmp/nomatchedfiles.css': 'test/nonexistent/*.less'
        }
      },
      compressMultipleSource: {
        options: {
          paths: ['test/fixtures/include'],
          compress: true
        },
        files: {
          'tmp/compressMultipleSource.css': ['test/fixtures/style.less', 'test/fixtures/style2.less']
        }
      },
      pluginCleancss: {
        options: {
          paths: ['test/fixtures/include'],
          plugins: [new (require('less-plugin-clean-css'))()],
          compress: true
        },
        files: {
          'tmp/pluginCleancss.css': ['test/fixtures/style.less', 'test/fixtures/style2.less', 'test/fixtures/style3.less']
        }
      },
      variablesAsLess: {
        src: 'test/fixtures/variablesAsLess.less',
        dest: 'tmp/variablesAsLess.css'
      },
      sourceMap: {
        options: {
          sourceMap: true
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMap.css'
      },
      sourceMapFilename: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapFilename.css.map'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapFilename.css'
      },
      sourceMapURL: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMap.css.map',
          sourceMapURL: 'custom/url/for/sourceMap.css.map'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapWithCustomURL.css'
      },
      sourceMapBasepath: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapBasepath.css.map',
          sourceMapBasepath: 'test/fixtures/'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapBasepath.css'
      },
      sourceMapBasepathFunction: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapBasepath.css.map',
          sourceMapBasepath: function(dest) {
            var path = require('path');
            return path.dirname(dest);
          }
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapBasepath.css'
      },
      sourceMapRootpath: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapRootpath.css.map',
          sourceMapRootpath: 'http://example.org/'
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapRootpath.css'
      },
      sourceMapLessInline: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'tmp/sourceMapLessInline.css.map',
          outputSourceFiles: true
        },
        src: 'test/fixtures/style3.less',
        dest: 'tmp/sourceMapLessInline.css'
      },
      testCustomFunctions: {
        options: {
          customFunctions: {
            'get-color': function() {
              return 'red';
            },
            'multiple-args': function(less, arg1, arg2) {
              return (((arg1.value * 1) + (arg2.value))) + arg1.unit.numerator[0];
            },
            'string-result': function() {
                return '"Hello"';
            }
          }
        },
        files: {
          'tmp/customFunctions.css': ['test/fixtures/customFunctions.less']
        }
      },
      modifyVars: {
        options: {
          modifyVars: {
            // Note the double quotes in 'imgPath'
            imgPath: '"/somewhere/else"',
            customPadding: '20px'
          }
        },
        files: {
          'tmp/modifyVars.css': ['test/fixtures/modifyVars.less']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'less', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};
