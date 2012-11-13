# grunt-contrib-less [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-less.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-less)

> Compile LESS files to CSS.


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-less --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Less task
_Run this task with the `grunt less` command._

### Overview

In your project's Gruntfile, add a section named `less` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  less: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```
### Options

#### options.paths
Type: `String|Array`
Default: Directory of input file.

Specifies directories to scan for @import directives when parsing. Default value is the directory of the source, which is probably what you want.

#### options.compress
Type: `Boolean`
Default: False

Compress output by removing some whitespaces.

#### options.yuicompress
Type: `Boolean`
Default: False

Compress output using cssmin.js

#### options.optimization
Type: `Integer`
Default: null

Set the parser's optimization level. The lower the number, the less nodes it will create in the tree. This could matter for debugging, or if you want to access the individual nodes in the tree.

#### options.strictImports
Type: `Boolean`
Default: False

Force evaluation of imports.

#### options.dumpLineNumbers
Type: `String`
Default: false

Configures -sass-debug-info support.

Accepts following values: `comments`, `mediaquery`, `all`.
### Usage Examples

```js
less: {
  development: {
    options: {
      paths: ["assets/css"]
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  },
  production: {
    options: {
      paths: ["assets/css"],
      yuicompress: true
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  }
}
```

## Release History

 * 2012-10-17   v0.3.2   Add support for dumpLineNumbers.
 * 2012-10-11   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-23   v0.3.0   Global options depreciated Revert normalize linefeeds.
 * 2012-09-15   v0.2.2   Support all less options Normalize linefeeds Default path to dirname of src file.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Tyler Kellen](http://goingslowly.com/)

*This file was generated on Tue Nov 13 2012 16:14:04.*
