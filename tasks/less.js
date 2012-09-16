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

  var _ = grunt.util._;
  var less = require('less');
  var path = require('path');
  var async = grunt.util.async;
  var helpers = require('grunt-contrib-lib').init(grunt);

  var lessOptions = {
    parse: ['paths', 'optimization', 'filename', 'strictImports'],
    render: ['compress', 'yuicompress']
  };

  grunt.registerMultiTask('less', 'Compile LESS files to CSS', function() {
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
        helperOptions.paths = helperOptions.paths || [path.dirname(srcFile)];

        sourceCode = grunt.file.read(srcFile);

        compileLess(sourceCode, helperOptions, function(css, err) {
          if(!err) {
            nextConcat(null, css);
          } else {
            done();
          }
        });
      }, function(err, css) {
        grunt.file.write(file.dest, css.join(grunt.util.linefeed) || '');
        grunt.log.writeln('File ' + file.dest + ' created.');

        next();
      });

    }, function() {
      done();
    });
  });

  var formatLessError = function(e) {
    var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
    return e.filename + ': ' + pos + ' ' + e.message;
  };

  var lessError = function(e) {
    var message = less.formatError ? less.formatError(e) : formatLessError(e);

    grunt.log.error(message);
    grunt.fail.warn('Error compiling LESS.', 1);
  };

  // TODO: ditch when grunt upgrades to underscore 1.3.3
  var pick = function(obj, keys) {
    var result = {};
    keys.forEach(function(key) {
      if (key in obj) { result[key] = obj[key]; }
    });

    return result;
  };

  var compileLess = function(source, options, callback) {
    var css;
    var parser = new less.Parser(pick(options, lessOptions.parse));
    parser.parse(source, function(parse_error, tree) {
      if (parse_error) {
        lessError(parse_error);
      }

      try {
        css = tree.toCSS(pick(options, lessOptions.render));
        callback(css, null);
      } catch (e) {
        lessError(e);
        callback(css, true);
      }
    });
  };
};
