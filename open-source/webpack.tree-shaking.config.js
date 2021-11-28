const path = require('path');

module.exports = [{
  mode: 'production',
  entry: './tree-shaking.basic.js',
  output: {
    filename: 'eg.tree-shaking.basic.output.js',
    path: path.resolve(__dirname, './output'),
    libraryTarget: 'commonjs2'
  },
  optimization: {
    usedExports: true,
  }
}, {
  mode: 'production',
  entry: './tree-shaking.table-xlsx.js',
  output: {
    filename: 'eg.tree-shaking.table-xlsx.output.js',
    path: path.resolve(__dirname, './output'),
    libraryTarget: 'commonjs2'
  },
  externals: [{
    '@pengchen/xlsx': {
      root: '@pengchen/xlsx',
      commonjs2: '@pengchen/xlsx',
      commonjs: '@pengchen/xlsx',
      amd: '@pengchen/xlsx',
    }
  }],
  optimization: {
    usedExports: true,
  }
}];
