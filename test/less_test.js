'use strict';

var grunt = require('grunt');
var fs = require('fs');

var readFile = function(src) {
  return grunt.file.read(src).replace(/\r\n|\n\r/g, '\n');
};

exports.less = {
  compile: function(test) {
    test.expect(2);

    var actual = readFile('tmp/less.css');
    var expected = readFile('test/expected/less.css');
    test.equal(expected, actual, 'should compile less, with the ability to handle imported files from alternate include paths');

    actual = readFile('tmp/concat.css');
    expected = readFile('test/expected/concat.css');
    test.equal(expected, actual, 'should concat output when passed an array');

    test.done();
  },
  compress: function(test) {
    test.expect(1);

    var actual = readFile('tmp/compress.css');
    var expected = readFile('test/expected/compress.css');
    test.equal(expected, actual, 'should compress output when compress option is true');

    test.done();
  },
  nopaths: function(test) {
    test.expect(1);

    var actual = readFile('tmp/nopaths.css');
    var expected = readFile('test/expected/nopaths.css');
    test.equal(expected, actual, 'should default paths to the dirname of the less file');

    test.done();
  },
  cleancss: function(test) {
    test.expect(2);

    var actual = readFile('tmp/cleancss.css');
    var expected = readFile('test/expected/cleancss.css');
    test.equal(expected, actual, 'should cleancss output when cleancss option is true');

    actual = readFile('tmp/cleancssReport.css');
    expected = readFile('test/expected/cleancssReport.css');
    test.equal(expected, actual, 'should cleancss output when cleancss option is true and concating is enable');

    test.done();
  },
  ieCompat: function(test) {
    test.expect(2);

    var actual = readFile('tmp/ieCompatFalse.css');
    var expected = readFile('test/expected/ieCompatFalse.css');
    test.equal(expected, actual, 'should generate data-uris no matter the size when ieCompat option is true');

    actual = readFile('tmp/ieCompatTrue.css');
    expected = readFile('test/expected/ieCompatTrue.css');
    test.equal(expected, actual, 'should generate data-uris only when under the 32KB mark for Internet Explorer 8');

    test.done();
  },
  variablesAsLess: function(test) {
    test.expect(1);

    var actual = readFile('tmp/variablesAsLess.css');
    var expected = readFile('test/expected/variablesAsLess.css');
    test.equal(expected, actual, 'should process css files imported less files');

    test.done();
  },
  sourceMap: function(test) {
    test.expect(1);

    var actual = readFile('tmp/sourceMap.css');
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

    var actual = readFile('tmp/sourceMapWithCustomURL.css');
    test.ok(actual.indexOf('/*# sourceMappingURL=custom/url/for/sourceMap.css.map') !== -1, 'compiled file should have a custom source map URL.');
    test.done();
  },
  sourceMapBasepath: function(test) {
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

    var expected = readFile('test/fixtures/style3.less');
    var sourceMap = grunt.file.readJSON('tmp/sourceMapLessInline.css.map');
    test.equal(sourceMap.sourcesContent[0], expected, 'should put the less file into the generated sourceMap instead of referencing them.');

    test.done();
  },
  customFunctions: function(test) {
    test.expect(1);

    var actual = readFile('tmp/customFunctions.css');
    var expected = readFile('test/expected/customFunctions.css');
    test.equal(expected, actual, 'should execute custom functions');

    test.done();
  }
};
