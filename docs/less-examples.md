# Usage Examples

```js
less: {
  development: {
    options: {
      paths: ["assets/css"]
      cleancss: true,
      sourceMap: true,
      sourceMapFilename: '<<= auto >>.map',
      outputSourceFiles: true
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  },
  production: {
    options: {
      paths: ["assets/css"],
      cleancss: true
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  }
}
```
