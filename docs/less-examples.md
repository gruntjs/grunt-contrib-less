# Usage Examples

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
      plugins: {
        'autoprefix': {browsers: ["last 2 versions"]},
        'clean-css': cleanCssOptions
      },
      modifyVars: {
        imgPath: '"http://mycdn.com/path/to/images"',
        bgColor: 'red'
      }
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  }
}
```
