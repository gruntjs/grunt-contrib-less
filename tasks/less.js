/*
 * grunt-contrib-less
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var less = require('less');
  var helpers = require('grunt-lib-contrib').init(grunt);

  var lessOptions = {
    parse: ['paths', 'optimization', 'filename', 'strictImports', 'dumpLineNumbers'],
    render: ['compress', 'yuicompress']
  };

  grunt.registerMultiTask('less', 'Compile LESS files to CSS', function() {
    var done = this.async();

    var options = this.options({
      basePath: false,
      flatten: false
    });
    grunt.verbose.writeflags(options, 'Options');

    // get files
    var files = grunt.file.expandFiles(this.file.src);
    var destFile = this.file.dest;

    if (files.length === 0) {
      grunt.fail.warn('Unable to compile; no valid source files were found.');
      done();
    }

    // hack by chris to support compiling individual files
    if (helpers.isIndividualDest(destFile)) {
      var basePath = helpers.findBasePath(files, options.basePath);
      grunt.util.async.forEachSeries(files, function(file, next) {
        var newFileDest = helpers.buildIndividualDest(destFile, file, basePath, options.flatten);
        compileLess(file, options, function(css, err) {
          if(!err) {
            grunt.file.write(newFileDest, css || '');
            grunt.log.writeln('File ' + newFileDest.cyan + ' created.');
            next(null);
          } else {
            done(false);
          }
        });
      });
    } else {
      // normal execution
      grunt.util.async.concatSeries(files, function(file, next) {
        compileLess(file, options, function(css, err) {
          if(!err) {
            next(null, css);
          } else {
            done(false);
          }
        });
      }, function(err, css) {
        grunt.file.write(destFile, css.join('\n') || '');
        grunt.log.writeln('File ' + destFile.cyan + ' created.');
        done();
      });
    }
  });

  var formatLessError = function(e) {
    var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
    return e.filename + ': ' + pos + ' ' + e.message;
  };

  var lessError = function(e) {
    var message = less.formatError ? less.formatError(e) : formatLessError(e);

    grunt.log.error(message);
    grunt.fail.warn('Error compiling LESS.');
  };

  var compileLess = function(srcFile, options, callback) {
    options = grunt.util._.extend({filename: srcFile}, options);
    options.paths = options.paths || [path.dirname(srcFile)];

    var css;
    var srcCode = grunt.file.read(srcFile);

    var parser = new less.Parser(grunt.util._.pick(options, lessOptions.parse));

    parser.parse(srcCode, function(parse_err, tree) {
      if (parse_err) {
        lessError(parse_err);
        callback('',true);
      }

      try {
        css = tree.toCSS(grunt.util._.pick(options, lessOptions.render));
        callback(css, null);
      } catch (e) {
        lessError(e);
        callback(css, true);
      }
    });
  };
};
