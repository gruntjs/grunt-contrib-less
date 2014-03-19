# Options

## paths
Type: `String` `Array` `Function`

Default: Directory of input file.

Specifies directories to scan for @import directives when parsing. Default value is the directory of the source, which is probably what you want.

If you specify a function the source filepath will be the first argument. You can return either a string or an array of paths to be used.

## rootpath
Type: `String`

Default: `""`

A path to add on to the start of every url resource.

## compress
Type: `Boolean`

Default: `false`

Compress output by removing some whitespaces.

## cleancss
Type: `Boolean`

Default: `false`

Compress output using [clean-css](https://npmjs.org/package/clean-css).

## ieCompat
Type: `Boolean`

Default: `true`

Enforce the css output is compatible with Internet Explorer 8.

For example, the [data-uri](https://github.com/cloudhead/less.js/pull/1086) function encodes a file in base64 encoding and embeds it into the generated CSS files as a data-URI. Because Internet Explorer 8 limits `data-uri`s to 32KB, the [ieCompat](https://github.com/cloudhead/less.js/pull/1190) option prevents `less` from exceeding this.

## optimization
Type: `Integer`

Default: `null`

Set the parser's optimization level. The lower the number, the less nodes it will create in the tree. This could matter for debugging, or if you want to access the individual nodes in the tree.

## strictImports
Type: `Boolean`

Default: `false`

Force evaluation of imports.

## strictMath
Type: `Boolean`

Default: `false`

When enabled, math is required to be in parenthesis.

## strictUnits
Type: `Boolean`

Default: `false`

When enabled, less will validate the units used (e.g. 4px/2px = 2, not 2px and 4em/2px throws an error).

## syncImport
Type: `Boolean`

Default: `false`

Read @import'ed files synchronously from disk.

## dumpLineNumbers
Type: `String`

Default: `false`

Configures -sass-debug-info support.

Accepts following values: `comments`, `mediaquery`, `all`.

## relativeUrls
Type: `Boolean`

Default: `false`

Rewrite urls to be relative. false: do not modify urls.

## customFunctions
Type: `Object`

Default: none

Define custom functions to be available within your LESS stylesheets. The function's name must be lowercase.
In the definition, the first argument is the less object, and subsequent arguments are from the less function call.
Values passed to the function are types defined within less, the return value may be either one of them or primitive.
See the LESS documentation for more information on the available types.

## report
Choices: `'min'`, `'gzip'`  
Default: `'min'`

Either report only minification result or report minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).

## sourceMap
Type: `Boolean`

Default: `false`

Enable source maps.

## sourceMapFilename
Type: `String`

Default: none

Write the source map to a separate file with the given filename.

## sourceMapURL
Type: `String`

Default: none

Override the default url that points to the sourcemap from the compiled css file.

## sourceMapBasepath
Type: `String`

Default: none

Sets the base path for the less file paths in the source map.

## sourceMapRootpath
Type: `String`

Default: none

Adds this path onto the less file paths in the source map.

## outputSourceFiles
Type: `Boolean`

Default: false

Puts the less files into the map instead of referencing them.

## modifyVars
Type: `Object`

Default: none

Overrides global variables. Equivalent to ```--modify-vars='VAR=VALUE'``` option in less.
