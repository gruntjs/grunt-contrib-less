var grunt = require('grunt');
var path = require('path');

// The temporary directory, as-created in the test_setup task.
var TMP = global.TMP;

exports['less'] = {
  'main': function(test) {
    'use strict';

    test.expect(4);

    var actual, expected;

    actual = grunt.file.read(path.join(TMP, 'less_a.css'));
    expected = 'body {\n  color: #ffffff;\n}\n';
    test.equal(actual, expected, 'should compile less, with the ability to handle imported files from alternate include paths');

    actual = grunt.file.read(path.join(TMP, 'less_b.css'));
    expected = 'body {\n  color: #ffffff;\n}\n';
    test.equal(actual, expected, 'should support multiple destination:source sets');

    actual = grunt.file.read(path.join(TMP, 'less_c.css'));
    expected = '';
    test.equal(actual, expected, 'should write an empty file when no less sources are found');

    actual = grunt.file.read(path.join(TMP, 'less_d.css'));
    expected = 'body {\n  color: #ffffff;\n}\n\n#header {\n  background: #ffffff;\n}\n';
    test.equal(actual, expected, 'should concat output when passed an array');

    test.done();
  }
};