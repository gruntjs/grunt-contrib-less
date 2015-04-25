'use strict';

var grunt = require('grunt');

var read = function(src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};


exports.less = {
  compile: function(test) {
    test.expect(3);

    var actual = read('tmp/less.css');
    var expected = read('test/expected/string.css');
    test.equal(expected, actual, 'should compile less with a string configuration');

    actual = read('tmp/less.css');
    expected = read('test/expected/less.css');
    test.equal(expected, actual, 'should compile less, with the ability to handle imported files from alternate include paths');

    actual = read('tmp/concat.css');
    expected = read('test/expected/concat.css');
    test.equal(expected, actual, 'should concat output when passed an array');

    test.done();
  },
  compress: function(test) {
    test.expect(1);

    var actual = read('tmp/compress.css');
    var expected = read('test/expected/compress.css');
    test.equal(expected, actual, 'should compress output when compress option is true');

    test.done();
  },
  nopaths: function(test) {
    test.expect(1);

    var actual = read('tmp/nopaths.css');
    var expected = read('test/expected/nopaths.css');
    test.equal(expected, actual, 'should default paths to the dirname of the less file');

    test.done();
  },
  pathsFunction: function(test) {
    test.expect(1);

    var actual = read('tmp/pathsFunction.css');
    var expected = read('test/expected/pathsFunction.css');
    test.equal(expected, actual, 'should accept function that returns paths');
    test.done();
  },
  plugins: function(test) {
    test.expect(2);

    var actual = read('tmp/plugins.css');
    var expected = read('test/expected/plugins.css');
    test.equal(expected, actual, 'using cleancss plugin, it should cleancss output when cleancss plugin is used and keepSpecialComments is disabled');

    actual = read('tmp/pluginCleancss.css');
    expected = read('test/expected/pluginCleancss.css');
    test.equal(expected, actual, 'should cleancss output when cleancss option is true and concating is enabled');

    test.done();
  },
  ieCompat: function(test) {
    test.expect(2);

    var actual = read('tmp/ieCompatFalse.css');
    var expected = read('test/expected/ieCompatFalse.css');
    test.equal(expected.length, actual.length, 'should generate data-uris no matter the size when ieCompat option is true');

    actual = read('tmp/ieCompatTrue.css');
    expected = read('test/expected/ieCompatTrue.css');
    test.equal(expected, actual, 'should generate data-uris only when under the 32KB mark for Internet Explorer 8');

    test.done();
  },
  variablesAsLess: function(test) {
    test.expect(1);

    var actual = read('tmp/variablesAsLess.css');
    var expected = read('test/expected/variablesAsLess.css');
    test.equal(expected, actual, 'should process css files imported less files');

    test.done();
  },
  modifyVars: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/modifyVars.css');
    var expected = grunt.file.read('test/expected/modifyVars.css');
    test.equal(expected, actual, 'should override global variables');

    test.done();
  },
  sourceMap: function(test) {
    test.expect(1);

    var actual = read('tmp/sourceMap.css');
    test.ok(actual.indexOf('/*# sourceMappingURL=') !== -1, 'compiled file should include a source map.');

    test.done();
  },
  sourceMapFilename: function(test) {
    test.expect(1);

    var sourceMap = grunt.file.readJSON('tmp/sourceMapFilename.css.map');
    test.equal(sourceMap.sources[0], 'test/fixtures/style3.less', 'should generate a sourceMap with the less file reference.');

    test.done();
  },
  sourceMapURL: function(test) {
    test.expect(1);

    var actual = read('tmp/sourceMapWithCustomURL.css');
    test.ok(actual.indexOf('/*# sourceMappingURL=custom/url/for/sourceMap.css.map') !== -1, 'compiled file should have a custom source map URL.');
    test.done();
  },
  sourceMapBasepath: function(test) {
    test.expect(1);

    var sourceMap = grunt.file.readJSON('tmp/sourceMapBasepath.css.map');
    test.equal(sourceMap.sources[0], 'style3.less', 'should use the basepath for the less file references in the generated sourceMap.');

    test.done();
  },
  sourceMapBasepathFunction: function(test) {
    test.expect(1);

    var sourceMap = grunt.file.readJSON('tmp/sourceMapBasepath.css.map');
    test.equal(sourceMap.sources[0], 'style3.less', 'should use the basepath for the less file references in the generated sourceMap.');

    test.done();
  },
  sourceMapRootpath: function(test) {
    test.expect(1);

    var sourceMap = grunt.file.readJSON('tmp/sourceMapRootpath.css.map');
    test.equal(sourceMap.sources[0], 'http://example.org/test/fixtures/style3.less', 'should use the rootpath for the less file references in the generated sourceMap.');

    test.done();
  },
  sourceMapLessInline: function(test) {
    test.expect(1);

    var expected = read('test/fixtures/style3.less');
    var sourceMap = grunt.file.readJSON('tmp/sourceMapLessInline.css.map').sourcesContent[0];
    test.equal(grunt.util.normalizelf(sourceMap), grunt.util.normalizelf(expected), 'should put the less file into the generated sourceMap instead of referencing them.');

    test.done();
  },
  customFunctions: function(test) {
    test.expect(1);

    var actual = read('tmp/customFunctions.css');
    var expected = read('test/expected/customFunctions.css');
    test.equal(expected, actual, 'should execute custom functions');

    test.done();
  },
  banner: function(test) {
    test.expect(2);

    var actual = read('tmp/banner.css');
    var expected = read('test/expected/banner.css');
    test.equal(expected, actual, 'should add a banner');

    actual = read('tmp/banner2.css');
    expected = read('test/expected/banner2.css');
    test.equal(expected, actual, 'should add a banner to the second file');

    test.done();
  }
};
