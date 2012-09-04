var grunt = require("grunt");

exports.less = {
  main: function(test) {
    test.expect(4);

    var expectA = "body {\n  color: #ffffff;\n}\n";
    var resultA = grunt.file.read("tmp/less_a.css");
    test.equal(expectA, resultA, "should compile less, with the ability to handle imported files from alternate include paths");

    var expectB = "body {\n  color: #ffffff;\n}\n";
    var resultB = grunt.file.read("tmp/less_b.css");
    test.equal(expectB, resultB, "should support multiple destination:source sets");

    var expectC = "";
    var resultC = grunt.file.read("tmp/less_c.css");
    test.equal(expectC, resultC, "should write an empty file when no less sources are found");

    var expectD = "body {\n  color: #ffffff;\n}\n\n#header {\n  background: #ffffff;\n}\n";
    var resultD = grunt.file.read("tmp/less_d.css");
    test.equal(expectD, resultD, "should concat output when passed an array");

    test.done();
  }
};