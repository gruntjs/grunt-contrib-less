## options.paths
Type: `String|Array`
Default: Directory of input file.

Specifies directories to scan for @import directives when parsing. Default value is the directory of the source, which is probably what you want.

## options.compress
Type: `Boolean`
Default: False

Compress output by removing some whitespaces.

## options.yuicompress
Type: `Boolean`
Default: False

Compress output using cssmin.js

## options.optimization
Type: `Integer`
Default: null

Set the parser's optimization level. The lower the number, the less nodes it will create in the tree. This could matter for debugging, or if you want to access the individual nodes in the tree.

## options.strictImports
Type: `Boolean`
Default: False

Force evaluation of imports.

## options.dumpLineNumbers
Type: `String`
Default: false

Configures -sass-debug-info support.

Accepts following values: `comments`, `mediaquery`, `all`.