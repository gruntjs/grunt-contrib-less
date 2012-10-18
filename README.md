# grunt-contrib-less [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-less.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-less)

> Compile LESS files to CSS.

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-contrib-less --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-contrib-less');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The less task

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

 * 2012-10-17 - v0.3.2 - Add support for dumpLineNumbers.
 * 2012-10-11 - v0.3.1 - Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-23 - v0.3.0 - Global options depreciated Revert normalize linefeeds.
 * 2012-09-15 - v0.2.2 - Support all less options Normalize linefeeds Default path to dirname of src file.
 * 2012-09-09 - v0.2.0 - Refactored from grunt-contrib into individual repo.

--
Task submitted by <a href="http://goingslowly.com/">Tyler Kellen</a>.

*Generated on Thu Oct 18 2012 16:46:03.*
