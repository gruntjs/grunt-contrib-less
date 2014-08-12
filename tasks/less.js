/*
 * grunt-contrib-less
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var _ = require('lodash');
var async = require('async');
var chalk = require('chalk');
var maxmin = require('maxmin');
var less = require('less');

module.exports = function(grunt) {
  var lessOptions = {
    parse: ['paths', 'optimization', 'filename', 'strictImports', 'syncImport', 'dumpLineNumbers', 'relativeUrls',
      'rootpath'],
    render: ['compress', 'cleancss', 'ieCompat', 'strictMath', 'strictUnits', 'urlArgs',
       'sourceMap', 'sourceMapFilename', 'sourceMapURL', 'sourceMapBasepath', 'sourceMapRootpath', 'outputSourceFiles']
  };

  grunt.registerMultiTask('less', 'Compile LESS files to CSS', function() {
    var done = this.async();

    var options = this.options({
      report: 'min',
      banner: ''
    });

    if (this.files.length < 1) {
      grunt.verbose.warn('Destination not written because no source files were provided.');
    }

    async.eachSeries(this.files, function(f, nextFileObj) {
      var destFile = f.dest;

      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      if (files.length === 0) {
        if (f.src.length < 1) {
          grunt.log.warn('Destination not written because no source files were found.');
        }

        // No src files, goto next target. Warn would have been issued above.
        return nextFileObj();
      }

        compileLess(files, options, function(css, err) {
          if (err) {
            nextFileObj(err);
          }
          if(!css){
              grunt.log.warn('Destination not written because compiled files were empty.');
          } else {
            var max = css.max || '';
            var min = css.min || '';
            grunt.file.write(destFile, css.min);
            grunt.log.writeln('File ' + chalk.cyan(destFile) + ' created: ' + maxmin(max, min, options.report === 'gzip'));
          }

          nextFileObj();

        }, function (sourceMapContent) {
          grunt.file.write(options.sourceMapFilename, sourceMapContent);
          grunt.log.writeln('File ' + chalk.cyan(options.sourceMapFilename) + ' created.');
        });

    }, done);
  });

  var compileLess = function(srcFile, options, callback, sourceMapCallback) {
    options = _.assign({filename: srcFile.join()}, options);
    options.paths = options.paths || srcFile.map(function(file){return path.dirname(file)});

    if (typeof options.paths === 'function') {
      try {
        options.paths = options.paths(srcFile);
      } catch (e) {
        grunt.fail.warn(wrapError(e, 'Generating @import paths failed.'));
      }
    }

    if (typeof options.sourceMapBasepath === 'function') {
      try {
        options.sourceMapBasepath = options.sourceMapBasepath(srcFile);
      } catch (e) {
        grunt.fail.warn(wrapError(e, 'Generating sourceMapBasepath failed.'));
      }
    }

    var css;
    var srcCode = srcFile.map(function(file){return grunt.file.read(file)}).join('\n');

    var parser = new less.Parser(_.pick(options, lessOptions.parse));
    var additionalData = {
      banner: options.banner
    };

    // Equivalent to --modify-vars option.
    // Properties under options.modifyVars are appended as less variables
    // to override global variables.
    var modifyVarsOutput = parseVariableOptions(options['modifyVars']);
    if (modifyVarsOutput) {
      srcCode += '\n';
      srcCode += modifyVarsOutput;
    }

    parser.parse(srcCode, function(parse_err, tree) {
      if (parse_err) {
        lessError(parse_err, srcFile);
        callback('',true);
      }
      // Load custom functions
      if (options.customFunctions) {
        Object.keys(options.customFunctions).forEach(function(name) {
          less.tree.functions[name.toLowerCase()] = function() {
            var args = [].slice.call(arguments);
            args.unshift(less);
            var res = options.customFunctions[name].apply(this, args);
            return typeof res === "object" ? res : new less.tree.Anonymous(res);
          };
        });
      }

      var minifyOptions = _.pick(options, lessOptions.render);

      if (minifyOptions.sourceMapFilename) {
        minifyOptions.writeSourceMap = sourceMapCallback;
      }

      try {
        css = minify(tree, minifyOptions);
        callback(css, null);
      } catch (e) {
        lessError(e, srcFile);
        callback(css, true);
      }
    }, additionalData);
  };

  var parseVariableOptions = function(options) {
    var pairs = _.pairs(options);
    var output = '';
    pairs.forEach(function(pair) {
      output += '@' + pair[0] + ':' + pair[1] + ';';
    });
    return output;
  };

  var formatLessError = function(e) {
    var pos = '[' + 'L' + e.line + ':' + ('C' + e.column) + ']';
    return e.filename + ': ' + pos + ' ' + e.message;
  };

  var lessError = function(e, file) {
    var message = less.formatError ? less.formatError(e) : formatLessError(e);

    grunt.log.error(message);
    grunt.fail.warn('Error compiling ' + file);
  };

  var wrapError = function (e, message) {
    var err = new Error(message);
    err.origError = e;
    return err;
  };

  var minify = function (tree, options) {
    var result = {
      min: tree.toCSS(options)
    };
    if (!_.isEmpty(options)) {
      result.max = tree.toCSS();
    }
    return result;
  };
};
