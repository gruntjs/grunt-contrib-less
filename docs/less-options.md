# Options

## paths
Type: `String|Array`
Default: Directory of input file.

Specifies directories to scan for @import directives when parsing. Default value is the directory of the source, which is probably what you want.

## compress
Type: `Boolean`
Default: False

Compress output by removing some whitespaces.

## yuicompress
Type: `Boolean`
Default: False

Compress output using cssmin.js

## ieCompat
Type: `Boolean`
Default: true

Enforce the css output is compatible with Internet Explorer 8.

For example, the [data-uri](https://github.com/cloudhead/less.js/pull/1086) function encodes a file in base64 encoding and embeds it into the generated CSS files as a data-URI. Because Internet Explorer 8 limits `data-uri`s to 32KB, the [ieCompat](https://github.com/cloudhead/less.js/pull/1190) option prevents `less` from exceeding this.

## optimization
Type: `Integer`
Default: null

Set the parser's optimization level. The lower the number, the less nodes it will create in the tree. This could matter for debugging, or if you want to access the individual nodes in the tree.

## strictImports
Type: `Boolean`
Default: False

Force evaluation of imports.

## dumpLineNumbers
Type: `String`
Default: false

Configures -sass-debug-info support.

Accepts following values: `comments`, `mediaquery`, `all`.
