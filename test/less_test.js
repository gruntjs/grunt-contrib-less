var grunt = require('grunt');

exports['less'] = {
  main: function(test) {
    'use strict';

    var expect, result;

    test.expect(4);

    expect = 'body {\n  color: #ffffff;\n}\n';
    result = grunt.file.read('tmp/less_a.css');
    test.equal(expect, result, 'should compile less, with the ability to handle imported files from alternate include paths');

    expect = 'body {\n  color: #ffffff;\n}\n';
    result = grunt.file.read('tmp/less_b.css');
    test.equal(expect, result, 'should support multiple destination:source sets');

    expect = '';
    result = grunt.file.read('tmp/less_c.css');
    test.equal(expect, result, 'should write an empty file when no less sources are found');

    expect = 'body {\n  color: #ffffff;\n}\n\n#header {\n  background: #ffffff;\n}\n';
    result = grunt.file.read('tmp/less_d.css');
    test.equal(expect, result, 'should concat output when passed an array');

    test.done();
  }
};