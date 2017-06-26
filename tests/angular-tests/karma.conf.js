var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], // run in Chrome
    singleRun: true, // set this to false to leave the browser open
    frameworks: [ 'mocha' ], // use the mocha test framework
    files: [
      { pattern: path.resolve(__dirname, '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'), watched: false },
      { pattern: path.resolve(__dirname, '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js'), watched: false },
      'tests.webpack.ts'
    ],
    preprocessors: {
      'tests.webpack.ts': [ 'webpack', 'sourcemap' ] // preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], // report results in this format
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [
          path.resolve(__dirname, '../webcomponents'),
          path.resolve(__dirname, './node_modules')
        ]
      },
      module: {
        rules: [
          // Support for .ts files.
          {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    },
    webpackServer: {
      // noInfo: true // please don't spam the console when running in karma!
    }
  });
};