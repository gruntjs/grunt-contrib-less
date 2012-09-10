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

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  grunt.registerMultiTask('less', 'Compile LESS files to CSS', function() {

    var _ = grunt.util._;
    var async = grunt.util.async;
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = helpers.normalizeMultiTaskFiles(this.data, this.target);

    var done = this.async();

    var srcFiles;
    var sourceCode;
    var helperOptions;

    async.forEachSeries(this.files, function(file, next) {
     srcFiles = grunt.file.expandFiles(file.src);

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        helperOptions = _.extend({filename: srcFile}, options);
        sourceCode = grunt.file.read(srcFile);

        compileLess(sourceCode, helperOptions, function(css, err) {
          if(!err) {
            nextConcat(null, css);
          } else {
            done();
          }
        });
      }, function(err, css) {
        grunt.file.write(file.dest, css.join('\n') || '');
        grunt.log.writeln('File ' + file.dest + ' created.');

        next();
      });

    }, function() {
      done();
    });
  });

  var lessError = function(e) {
    var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
    grunt.log.error(e.filename + ': ' + pos + ' ' + e.message);
    grunt.fail.warn('Error compiling LESS.', 1);
  };

  var compileLess = function(source, options, callback) {
    require('less').Parser(options).parse(source, function(parse_error, tree) {
      if (parse_error) {
        lessError(parse_error);
      }

      try {
        var css = tree.toCSS();
        callback(css, null);
      } catch (e) {
        lessError(e);
        callback(css, true);
      }
    });
  };
};
