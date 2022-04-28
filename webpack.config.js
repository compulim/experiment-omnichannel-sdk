const { resolve } = require('path');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './lib/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.webpack.js',
    library: {
      type: 'umd',
      name: 'window'
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [
          resolve(__dirname, 'lib'),
          resolve(__dirname, 'node_modules/@microsoft/omnichannel-chat-components'),
          resolve(__dirname, 'node_modules/@microsoft/omnichannel-chat-widget'),
        ],
        resolve: {
          fullySpecified: false
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ]
            ]
          }
        }
      }, {
        test: /\.(mp3|png|svg)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      net: false,
      os: require.resolve('os-browserify'),
      stream: require.resolve('stream-browserify'),
      timers: require.resolve('timers-browserify'),
      tls: false,
      url: require.resolve('url'),
      util: require.resolve('util'),
      zlib: require.resolve('browserify-zlib')
    },
    mainFields: ['browser', 'main']
  }
};
